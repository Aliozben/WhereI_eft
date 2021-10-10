import express from "express";
import cors from "cors";
import {
  RichTextInput,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";
import _ from "underscore";

import {request} from "./routes/requests";
import {getLatestEpisode, getNextEpisodeDate} from "./utils/scrapUtils";
import {
  retriveAllPagesFromDb,
  updateDateOnPage,
  updateRichTextOnPage,
} from "./utils/notionUtils";
import COLUMN_NAMES from "./constants/COLUMNS";
import rp from "request-promise";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(request);

app.listen(5001, () => {
  console.log("port 5000 is running.");
});
rp.get({uri:"https://api.themoviedb.org/3/search/tv",qs:{
  api_key:"3ef7d32ef7c85f488d6a044270f8908a",
  query:"archer"
}}).then(res=>{
  const result = JSON.parse(res);
  console.log(result.results[0])
}).catch(err=> console.log(err));
// (async ()=>{
//   const shows = await retriveAllPagesFromDb();
//   shows.forEach(async show =>{
//     const showName = (show.properties[COLUMN_NAMES.TITLE] as TitlePropertyValue).title[0].plain_text;
//     console.log(showName);
//   })
// })();
// console.log(getNextEpisodeDate("archer"));
// (async () => {
//   const shows = await retriveAllPagesFromDb();
//   shows.forEach(async show => {
//     const showName = (show.properties[COLUMN_NAMES.TITLE] as TitlePropertyValue)
//       .title[0].plain_text;
//     console.log(showName);
//     const date = await getNextEpisodeDate(showName);
//     console.log(showName, date);
//     if (date) updateDateOnPage(show.id, COLUMN_NAMES.NEW_EPISODE_DATE, date);
//     else console.log("1", showName);
//     const episode = await getLatestEpisode(showName);
//     if (episode) {
//       const richEpisode: RichTextInput[] = [
//         {
//           type: "text",
//           text: {
//             content: episode,
//           },
//           annotations: {
//             color: "red_background",
//           },
//         },
//       ];
//       updateRichTextOnPage(show.id, COLUMN_NAMES.LATEST_EPISODE, richEpisode);
//     }
//   });
// })();
