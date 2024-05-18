import { GithubIssueReply } from "./index";
import {StoryFn} from "@storybook/react";

export default {
    title: 'GithubIssueReply',
    component: GithubIssueReply
}

const Template: StoryFn<typeof GithubIssueReply> = (args) => <GithubIssueReply {...args} />
export const GithubIssueReplyTemplate = Template.bind({});
GithubIssueReplyTemplate.args = {
    gitPersonalAccessToken: "###__###",
    gitRepo: "juny",
    gitOwner: "jun-young1993",
    gitIssueNumber: 6
}