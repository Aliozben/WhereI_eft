import cheerio from "cheerio";
import rp from "request-promise";

import {formatDate, convertToTwoDigits, replaceSpaceWithDash} from "./utils";
import {WEBSITES} from "../constants/WEBSITES";
import {SCRAP_PATHS} from "../constants/SCRAP_PATHS";

export const getNextEpisodeDate = async (
  name: string
): Promise<string | null | void> => {
  const dashedName = replaceSpaceWithDash(name);
  const response = await rp
    .get({
      uri: WEBSITES.NEXT_EPISODE + dashedName,
      transform: body => {
        return cheerio.load(body);
      },
    })
    .then($ => {
      const nextEpisode = $(SCRAP_PATHS.NEXT_EPISODE_DATE).text();
      const dateIndex = nextEpisode.indexOf("Date:");

      if (dateIndex === -1) return null;

      const UTCdate = nextEpisode.slice(dateIndex + 5, dateIndex + 21);
      const realeseDate = formatDate(new Date(UTCdate));
      console.log("getNextEpisodeDate", realeseDate);

      return realeseDate;
    })
    .catch(err => console.log(err));
  return response;
};
export const getLatestEpisode = async (
  name: string
): Promise<string | null | void> => {
  const dashedName = replaceSpaceWithDash(name);
  const response = await rp
    .get({
      uri: WEBSITES.NEXT_EPISODE + dashedName,
      transform: body => {
        return cheerio.load(body);
      },
    })
    .then($ => {
      const latestEpisode: string = $(SCRAP_PATHS.LATEST_EPISODE)
        .text()
        .slice(-2);
      const latestSeason: string = $(SCRAP_PATHS.LATEST_SEASON).text();

      const seasonIndex = latestSeason.indexOf("Season:");
      if (seasonIndex === -1) return null;

      const season = convertToTwoDigits(
        parseInt(latestSeason.slice(seasonIndex + 7, seasonIndex + 9).trim())
      );
      const episode = convertToTwoDigits(parseInt(latestEpisode));
      return "S" + season + "E" + episode;
    })
    .catch(err => console.log(err));
  return response;
};
