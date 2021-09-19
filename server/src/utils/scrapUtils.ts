import request from "request";
import cheerio from "cheerio";

import {formatDate, convertToTwoDigits} from "./utils";
import {WEBSITES} from "../constants/WEBSITES";

export const getNextEpisodeDate = async (url: string) => {
  request(WEBSITES.NEXT_EPISODE + url, (err, res, body) => {
    const $ = cheerio.load(body);
    const nextEpisode = $("#next_episode").text();
    const dateIndex = nextEpisode.indexOf("Date:") + 5;
    const UTCdate = nextEpisode.slice(dateIndex, dateIndex + 16);
    const realeseDate = formatDate(new Date(UTCdate));
    console.log(realeseDate);
  });
};

export const getLatestEpisode = async (url: string) => {
  request(WEBSITES.NEXT_EPISODE + url, (err, res, body) => {
    const $ = cheerio.load(body);
    const nextEpisode = $("#next_episode").text();
    console.log(nextEpisode);
    const seasonIndex = nextEpisode.indexOf("Season:");

    if (seasonIndex === -1) return "Unknown";

    const season = convertToTwoDigits(
      parseInt(nextEpisode.slice(seasonIndex + 7, seasonIndex + 9).trim())
    );
    const epIndex = nextEpisode.indexOf("Episode:") + 8;
    const episode = convertToTwoDigits(
      parseInt(nextEpisode.slice(epIndex, epIndex + 2).trim())
    );
    return "S" + season + "E" + episode;
  });
};
