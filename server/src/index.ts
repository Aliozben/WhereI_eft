import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

import {request} from "./requests";

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
