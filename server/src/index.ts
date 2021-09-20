import express from "express";
import cors from "cors";

import {request} from "./routes/requests";
import {replaceSpaceWithDash} from "./utils/utils";
import {getNextEpisodeDate} from "./utils/scrapUtils";
import {retriveAllPagesFromDb, updateDateOnPage} from "./utils/notionUtils";
import COLUMN_NAMES from "./constants/COLUMNS";
import {TitlePropertyValue} from "@notionhq/client/build/src/api-types";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(request);

app.listen(5000, () => {
  console.log("port 5000 is running.");
});

(async () => {
  const shows = await retriveAllPagesFromDb();
  shows.forEach(async show => {
    const showName = (show.properties[COLUMN_NAMES.TITLE] as TitlePropertyValue)
      .title[0].plain_text;
    console.log(showName);
    const date = await getNextEpisodeDate(showName);
    console.log(showName, date);
    if (date) updateDateOnPage(show.id, COLUMN_NAMES.NEW_EPISODE_DATE, date);
    else console.log("1", showName);
    // const episode = await get
  });
})();
