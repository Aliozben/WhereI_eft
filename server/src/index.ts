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
app.post("/test", async (req: express.Request, res: express.Response) => {
  console.log("test");
  // console.log(req);
  return req.body;
});
app.use(request);
// (async () => {
//   console.log("started");
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   console.log("started1");
//   await page.goto("https://www.youtube.com/watch?v=sFFTbtqx5Mg", {
//     waitUntil: "networkidle2",
//   });
//   console.log("started2");
//   await page.screenshot({path: "e.png"});
//   console.log("started3");
//   const recorder = new puppeteerRecord();
//   await recorder.init(page, "./video");
//   await recorder.start();
//   setTimeout(() => {
//     recorder.stop();
//     browser.close();
//   }, 5000);
// })();
app.listen(5000, () => {
  console.log("port 5000 is running.");
});
