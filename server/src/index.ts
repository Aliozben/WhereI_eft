import express from "express";
import cors from "cors";
import _ from "underscore";

import {request} from "./routes/requests";
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
