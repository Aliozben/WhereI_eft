import {config} from "dotenv";
import {Client} from "@notionhq/client";
import {
  RichTextInput,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";
import {PagesUpdateParameters} from "@notionhq/client/build/src/api-endpoints";

config();

const notion = new Client({auth: process.env.NOTION_API_KEY});
const databaseId = process.env.NOTION_DATABASE_ID!;

export const getPageFromDbByName = async (name: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Name",
        text: {
          equals: name,
        },
      },
    });
    return response.results[0];
  } catch (error) {
    console.error("Could't find the page. Error: ", error);
  }
};

export const retriveAllPagesFromDb = async () => {
  const response = await notion.databases.query({database_id: databaseId});
  return response.results;
};

export const getPageNameByID = async (id: string) => {
  const response = await notion.pages.retrieve({page_id: id});
  return (response.properties["Name"] as TitlePropertyValue).title[0]
    .plain_text;
};

export const updateRichTextOnPage = async (
  id: string,
  title: string,
  richText: RichTextInput[]
) => {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      [title]: {
        type: "rich_text",
        rich_text: richText,
      },
    },
  } as PagesUpdateParameters);
  console.log("updateRichTextOnPage ->", response);
};

export const updateDateOnPage = async (
  id: string,
  title: string,
  date: string
) => {
  console.log("updateDateOnPage =>", id, title, date);
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      [title]: {
        type: "date",
        date: {
          start: date,
        },
      },
    },
  } as PagesUpdateParameters);
};

export const updateTitleOnPage = async (
  id: string,
  title: string,
  content: string
) => {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      [title]: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content,
            },
          },
        ],
      },
    },
  } as PagesUpdateParameters);
};

export const createNewPage = async (
  name: string,
  season: string,
  episode: string
) => {
  const response = await notion.pages.create({
    parent: {database_id: databaseId},
    properties: {
      "Latest Episode": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {content: "TBA"},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "red_background",
            },
            plain_text: "TBA",
          },
        ],
      },
      "New Episode": {
        type: "date",
        date: {start: "1000-01-01"},
      },
      "Watched Episode": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: season,
            },
            annotations: {
              color: "gray",
              bold: false,
              code: false,
              italic: false,
              strikethrough: false,
              underline: false,
            },
          },
          {
            type: "text",
            text: {
              content: episode,
            },
            annotations: {
              color: "brown",
              bold: false,
              code: false,
              italic: false,
              strikethrough: false,
              underline: false,
            },
          },
        ],
      },
      Name: {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: {content: name},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: name,
          },
        ],
      },
    },
  });
};
