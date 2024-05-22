import {GithubIssueResponse} from "../github-issue-reply/GithubIssueReply.type";
export interface GithubIssueProps {
    gitPersonalAccessToken: string
    gitOwner: string,
    gitRepo: string
    gitIssueNumber: number
    direction?: 'asc' | 'desc'
    reload?: any
    onLoaded?: (data: GithubIssueResponse[] | []) => void
}