import Router, {Response, Request} from "express";

import {WEBSITES} from "./constants/WEBSITES";
import COLUMN_NAMES from "./constants/COLUMNS";
import {convertToTwoDigits} from "./utils/utils";
import {getPageFromDb, updateRichTextOnPage} from "./utils/notionUtils";
import {
  PropertyValue,
  RichTextInput,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";

export const request = Router();

request.post("/episode", async (req: Request, res: Response) => {
  const {episode, show, website} = req.body;
  console.log(req.body);

  const page = await getPageFromDb(show);
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
  if (watchedEpisode >= seasonEpidose[1]) return;

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

  updateRichTextOnPage(page.id, COLUMN_NAMES.WATCHED_EPISODE, richText);
});
