import {config} from "dotenv";
import {Client} from "@notionhq/client";
import {RichTextInput} from "@notionhq/client/build/src/api-types";

config();

const notion = new Client({auth: process.env.NOTION_API_KEY});
const databaseId = process.env.NOTION_DATABASE_ID!;

export const getPageFromDb = async (name: string) => {
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
  });
  console.log("updateRichTextOnPage ->", response);
};

export const updateDateOnPage = async (
  id: string,
  title: string,
  date: string
) => {
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
  });
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
  });
};
