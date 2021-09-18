import Router, {Response, Request} from "express";

import {WEBSITES} from "./constants/WEBSITES";
import COLUMN_NAMES from "./constants/COLUMNS";
import {convertToTwoDigits} from "./utils/utils";
import {getPageFromDb, updateRichTextOnPage} from "./utils/notionUtils";
import {RichTextInput} from "@notionhq/client/build/src/api-types";

export const request = Router();

request.post("/episode", async (req: Request, res: Response) => {
  const {episode, show, website} = req.body;
  console.log(req.body);

  const ep = (() => {
    switch (website) {
      case WEBSITES.swatchseries:
        const season = "S" + convertToTwoDigits(episode.split(":")[0]);
        const ep = "E" + convertToTwoDigits(episode.split(":")[1]);
        return {season, ep};
      default:
        return {season: "NULL", ep: ""};
    }
  })();

  const page = await getPageFromDb(show);
  const richText: RichTextInput[] = [
    {
      type: "text",
      text: {
        content: ep.season,
      },
      annotations: {
        color: "gray",
      },
    },
    {
      type: "text",
      text: {
        content: ep.ep,
      },
      annotations: {
        color: "brown",
      },
    },
  ];

  updateRichTextOnPage(page.id, COLUMN_NAMES.WATCHED_EPISODE, richText);
});
