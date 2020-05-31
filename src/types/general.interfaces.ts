export interface MainQueryData {
  rateLimit?: object;
  message: string;
  data: object;
}

export interface Tag {
  type: string;
  icon: boolean;
  content: string | number;
}

export interface ProcessedData {
  platform: string;
  link: string;
  name: string;
  domain: string;
  sub: string;
  desc: string;
  tags: Array<Tag>;
}
