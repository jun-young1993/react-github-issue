export interface GithubIssueProps {
    gitPersonalAccessToken: string
    gitOwner: string,
    gitRepo: string
    gitIssueNumber: number
}

export interface GithubIssueResponse {
    updated_at: Date
    body: string
    user: {
        login: string,
        site_admin: boolean,
        avatar_url: string
    }
}