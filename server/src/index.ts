import express from "express";
import cors from "cors";
import _ from "underscore";
import {request} from "./routes/requests";
import {fetchNewEpisodes} from "./cronjobs";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(request);
app.listen(process.env.PORT, () => {
  console.log(`port ${process.env.PORT} is running.`);
});

fetchNewEpisodes();
