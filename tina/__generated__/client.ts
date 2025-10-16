import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/butterchen/Desktop/New-psykhe-website/psykhe-website/tina/__generated__/.cache/1760399066458', url: 'https://content.tinajs.io/1.6/content/local/github/main', token: 'local', queries,  });
export default client;
  