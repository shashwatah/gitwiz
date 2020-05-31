export interface MainQueryData {
  rateLimit?: object;
  message: string;
  data: object;
}

//This will be changed later when the data will be processed on the frontend instead
export interface ProcessedData {
  platform: string;
  htmlString: string;
}
