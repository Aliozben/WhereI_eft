import Router, {Response, Request} from "express";

import COLUMN_NAMES from "../constants/COLUMNS";
import {convertToTwoDigits} from "../utils/utils";
import {getPageFromDbByName, updateRichTextOnPage} from "../utils/notionUtils";
import {
  RichTextInput,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";

export const request = Router();

request.post("/episode", async (req: Request, res: Response) => {
  const {episode, show, website} = req.body;
  console.log(req.body);
  try {
    const page = await getPageFromDbByName(show);
    const watchedSeasonEpisode = page.properties[
      COLUMN_NAMES.WATCHED_EPISODE
    ] as RichTextPropertyValue;

    const watchedSeason = parseInt(
      watchedSeasonEpisode.rich_text[0].plain_text.slice(1)
    );
    const watchedEpisode = parseInt(
      watchedSeasonEpisode.rich_text[1].plain_text.slice(1)
    );
    const seasonEpidose: [number, number] = episode.split(":");
    console.log(seasonEpidose);
    if (watchedSeason > seasonEpidose[0]) return;
    if (
      watchedSeason === seasonEpidose[0] &&
      watchedEpisode >= seasonEpidose[1]
    )
      return;

    const season = "S" + convertToTwoDigits(seasonEpidose[0]);
    const ep = "E" + convertToTwoDigits(seasonEpidose[1]);

    const richText: RichTextInput[] = [
      {
        type: "text",
        text: {
          content: season,
        },
        annotations: {
          color: "gray",
        },
      },
      {
        type: "text",
        text: {
          content: ep,
        },
        annotations: {
          color: "brown",
        },
      },
    ];
    await updateRichTextOnPage(page.id, COLUMN_NAMES.WATCHED_EPISODE, richText);
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});
