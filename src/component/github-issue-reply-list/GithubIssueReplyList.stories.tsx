
import {StoryFn} from "@storybook/react";
import { GithubIssueReplyList } from "./index";

export default {
    title: 'GithubIssueReplyList',
    component: GithubIssueReplyList
}

const Template: StoryFn<typeof GithubIssueReplyList> = (args) => <GithubIssueReplyList {...args} />
export const GithubIssueReplyTemplate = Template.bind({});
GithubIssueReplyTemplate.args = {
    gitPersonalAccessToken: "###_####",
    gitRepo: "juny",
    gitOwner: "jun-young1993",
    gitIssueNumber: 6
}