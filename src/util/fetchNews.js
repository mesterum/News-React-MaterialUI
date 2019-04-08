// import 'isomorphic-unfetch';

import { apiKey } from "./config";

const TOP_URI = "https://newsapi.org/v2/top-headlines";
const ALL_URI = "https://newsapi.org/v2/everything";
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];

const fetchWithErrorHandling = async url => {
  try {
    const r = await (await fetch(url, {
      headers: {
        "X-Api-Key": apiKey
      }
    })).json();
    if (r.status == "error") console.error(r);
    return r;
  } catch (err) {
    console.error(err);
    return { error: true };
  }
};

export const getTopHeadlines = async (searchTxt) =>

  fetchWithErrorHandling(searchTxt
    ?`${ALL_URI}?language=en&q=${encodeURIComponent(searchTxt)}`
    :`${TOP_URI}?language=en`);
