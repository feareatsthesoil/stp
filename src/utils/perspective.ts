import { google } from "googleapis";

export const checkComment = async (text: string) => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const client = await google.discoverAPI(
    "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
  );
  //@ts-ignore-next-line
  return client.comments.analyze({
    key,
    resource: {
      comment: { text },
      requestedAttributes: { TOXICITY: {} },
    },
  });
};
