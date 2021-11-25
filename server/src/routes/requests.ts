import Router, {Response, Request} from "express";

import COLUMN_NAMES from "../constants/COLUMNS";
import {convertToTwoDigits} from "../utils/utils";
import {
  createNewPage,
  getPageFromDbByName,
  updateRichTextOnPage,
} from "../utils/notionUtils";
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
    const seasonEpidose: [number, number] = episode.split(":");
    const season = "S" + convertToTwoDigits(seasonEpidose[0]);
    const ep = "E" + convertToTwoDigits(seasonEpidose[1]);
    if (page === undefined) {
      const newPage = await createNewPage(show, season + ep);
      res.status(200).send(newPage);
      return;
    }
    const watchedSeasonEpisode = page.properties[
      COLUMN_NAMES.WATCHED_EPISODE
    ] as RichTextPropertyValue;
    const richText: RichTextInput[] = [
      {
        type: "text",
        text: {
          content: season,
        },
        annotations: {
          color: "gray",
          bold: false,
          code: false,
          italic: false,
          strikethrough: false,
          underline: false,
        },
      },
      {
        type: "text",
        text: {
          content: ep,
        },
        annotations: {
          color: "brown",
          bold: false,
          code: false,
          italic: false,
          strikethrough: false,
          underline: false,
        },
      },
    ];
    if (
      watchedSeasonEpisode === undefined ||
      watchedSeasonEpisode.rich_text.length === 0
    ) {
      await updateRichTextOnPage(
        page.id,
        COLUMN_NAMES.WATCHED_EPISODE,
        richText
      );
      res.status(200).send();
      return;
    }
    const watchedSeason = parseInt(
      watchedSeasonEpisode.rich_text[0].plain_text.slice(1)
    );
    const watchedEpisode = parseInt(
      watchedSeasonEpisode.rich_text[1].plain_text.slice(1)
    );
    if (watchedSeason > seasonEpidose[0]) return;
    if (watchedSeason == seasonEpidose[0] && watchedEpisode >= seasonEpidose[1])
      return;

    await updateRichTextOnPage(page.id, COLUMN_NAMES.WATCHED_EPISODE, richText);
    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});
