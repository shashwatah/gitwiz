export interface QueryData {
    message?: string,
    data?: {
        projects: {
            edges: Array<DataEdge>
        }
    }
};

export interface DataEdge {
    node: {
        name: string,
        nameWithNamespace: string,
        webUrl: string, 
        description: string | null,
        starCount: number,
        forksCount: number,
        repository: {
            rootRef: string | null
        } | null,
        createdAt: string
    }
};