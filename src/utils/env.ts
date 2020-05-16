import * as dotenv from "dotenv";

dotenv.config();
const envPath: string = `${__dirname}/../../.env`;
dotenv.config({ path: envPath });

export const PORT = process.env.PORT;
export const MORGAN_METHOD = process.env.MORGAN_METHOD;
export const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
