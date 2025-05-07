export interface GitHubProfile {
    id: string;
    username?: string;
    displayName?: string;
    emails?: { value: string }[];
}

export interface DoneFunction {
    (error: any, user?: any): void;
}