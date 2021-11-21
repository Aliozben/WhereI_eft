import cron from "node-cron";
import {
  RichTextInput,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";

import COLUMN_NAMES from "./constants/COLUMNS";
import {CRON_FREQUENCIES} from "./constants/CRON";

import {
  retriveAllPagesFromDb,
  updateDateOnPage,
  updateRichTextOnPage,
} from "./utils/notionUtils";
import {getLatestEpisode, getNextEpisodeDate} from "./utils/scrapUtils";

export const fetchNewEpisodes = () => {
  cron.schedule(CRON_FREQUENCIES.TWELVE_OCLOCK, async () => {
    const shows = await retriveAllPagesFromDb();
    let timer = 5000;
    shows.forEach(show => {
      setTimeout(async () => {
        const showName = (
          show.properties[COLUMN_NAMES.TITLE] as TitlePropertyValue
        ).title[0].plain_text;
        const date = await getNextEpisodeDate(showName);
        console.log(showName, date);
        if (date)
          updateDateOnPage(show.id, COLUMN_NAMES.NEW_EPISODE_DATE, date);
        else console.log("1", showName);
        const episode = await getLatestEpisode(showName);
        if (episode) {
          const richEpisode: RichTextInput[] = [
            {
              type: "text",
              text: {
                content: episode,
              },
              annotations: {
                color: "red_background",
              },
            },
          ];
          updateRichTextOnPage(
            show.id,
            COLUMN_NAMES.LATEST_EPISODE,
            richEpisode
          );
        }
      }, timer);
      timer += 2500;
    });
  });
};
