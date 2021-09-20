import request from "request";
import cheerio from "cheerio";
import rp from "request-promise";

import {formatDate, convertToTwoDigits, replaceSpaceWithDash} from "./utils";
import {WEBSITES} from "../constants/WEBSITES";

export const getNextEpisodeDate = async (
  name: string
): Promise<string | null> => {
  const dashedName = replaceSpaceWithDash(name);
  const response = await rp
    .get({
      uri: WEBSITES.NEXT_EPISODE + dashedName,
      transform: body => {
        return cheerio.load(body);
      },
    })
    .then($ => {
      const nextEpisode = $("#next_episode").text();
      const dateIndex = nextEpisode.indexOf("Date:");

      if (dateIndex === -1) return null;

      const UTCdate = nextEpisode.slice(dateIndex + 5, dateIndex + 21);
      const realeseDate = formatDate(new Date(UTCdate));
      console.log("getNextEpisodeDate", realeseDate);

      return realeseDate;
    });
  // .catch(err => console.log(err));
  return response as string;
};
export const getLatestEpisode = async (
  name: string
): Promise<string | null> => {
  const dashedName = replaceSpaceWithDash(name);
  const response = await rp
    .get({
      uri: WEBSITES.NEXT_EPISODE + dashedName,
      transform: body => {
        return cheerio.load(body);
      },
    })
    .then($ => {
      const nextEpisode = $("#next_episode").text();
      console.log(nextEpisode);
      const seasonIndex = nextEpisode.indexOf("Season:");

      if (seasonIndex === -1) return null;

      const season = convertToTwoDigits(
        parseInt(nextEpisode.slice(seasonIndex + 7, seasonIndex + 9).trim())
      );
      const epIndex = nextEpisode.indexOf("Episode:") + 8;
      const episode = convertToTwoDigits(
        parseInt(nextEpisode.slice(epIndex, epIndex + 2).trim())
      );
      return "S" + season + "E" + episode;
    });
  // .catch(err => console.log(err));
  return response;
};
