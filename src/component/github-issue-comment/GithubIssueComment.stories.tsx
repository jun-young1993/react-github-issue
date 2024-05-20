import { GithubIssueComment } from "./index";
import {StoryFn} from "@storybook/react";

export default {
    title: 'GithubIssueComment',
    component: GithubIssueComment
}

const Template: StoryFn<typeof GithubIssueComment> = (args) => <GithubIssueComment {...args} />
export const GithubIssueTemplate = Template.bind({});
GithubIssueTemplate.args = {
    gitPersonalAccessToken: "d38d51492371b471c8cc",
    gitOAuthClientId:"Ov23liGM382w3Bfh3NqJ",
    hiddenPreview: false,
    previewBox: undefined
}