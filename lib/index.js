import got from "got";
import pkg from "../package.json";

export default function(key, token, webhookId) {
  return got(`https://api.trello.com/1/webhooks/${webhookId}?key=${key}&token=${token}`, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `${pkg.name}@${pkg.version}`
    },
    json: true,
    method: "DELETE"
  });
}
