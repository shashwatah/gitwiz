export interface QueryData {
  rateLimit?: RateLimit;
  message?: string;
  data?: {
    search: {
      edges: Array<DataEdge>;
    };
  };
}

export interface RateLimit {
  cost: number;
  remaining: number;
  resetAt: string;
}

export interface DataEdge {
  node: {
    name: string;
    nameWithOwner: string;
    url: string;
    description: string | null;
    parent?: {
      nameWithOwner: string;
    } | null;
    languages: {
      nodes: Array<{
        name: string;
      }>;
    };
    releases: {
      nodes: Array<{
        tagName: string;
      }>;
    };
    forkCount: number;
    stargazers: {
      totalCount: number;
    };
    diskUsage: number;
    repositoryTopics: {
      nodes: Array<{
        topic: {
          name: string;
        };
      }>;
    };
  };
}
