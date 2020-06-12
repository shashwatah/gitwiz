import NodeCache from "node-cache";
export const cache: NodeCache = new NodeCache({ stdTTL: 7200 });
