import cron from "node-cron";
import {TitlePropertyValue} from "@notionhq/client/build/src/api-types";

import COLUMN_NAMES from "./constants/COLUMNS";
import {CRON_FREQUENCIES} from "./constants/CRON";

import {retriveAllPagesFromDb, updateDateOnPage} from "./utils/notionUtils";
import {getNextEpisodeDate} from "./utils/scrapUtils";

export const fetchNewEpisodes = () => {
  cron.schedule(CRON_FREQUENCIES.TWELVE_OCLOCK, async () => {
    const shows = await retriveAllPagesFromDb();
    shows.forEach(show => {
      const showName = (
        show.properties[COLUMN_NAMES.TITLE] as TitlePropertyValue
      ).title[0].plain_text;
      const date = getNextEpisodeDate(showName);
      // if (date) updateDateOnPage(show.id, COLUMN_NAMES.NEW_EPISODE_DATE, date);
    });
  });
};
