import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b6e71e0c651165fe54e1a9a5070f65d4fd2d36bc', queries,  });
export default client;
  