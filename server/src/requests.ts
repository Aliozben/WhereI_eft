import Router, {Response, Request} from "express";
import {WEBSITES} from "./constants/WEBSITES";

export const request = Router();

request.post("/episode", async (req: Request, res: Response) => {
  const {episode, show, website} = req.body;
  console.log(req.body);
  switch (website) {
    case WEBSITES.swatchseries:
      const season = "S" + convertToTwoDigits(episode.split(":")[0]);
      const ep = "E" + convertToTwoDigits(episode.split(":")[1]);
      console.log(season + ep);
      break;

    default:
      break;
  }
});

const convertToTwoDigits = (number: string): string => {
  if (parseInt(number) <= 9) return "0" + number;
  else return number;
};
