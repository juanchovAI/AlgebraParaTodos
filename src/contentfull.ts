// src/contentful.js
import { createClient } from "contentful";

const client = createClient({
  space: "YOUR_SPACE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
});

export const getContent = async (contentType: string) => {
  const response = await client.getEntries({
    content_type: contentType,
  });
  return response.items;
};
