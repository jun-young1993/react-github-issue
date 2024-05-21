export interface GithubIssueProps {
    gitPersonalAccessToken: string
    gitOwner: string,
    gitRepo: string
    gitIssueNumber: number
    direction?: 'asc' | 'desc'
}