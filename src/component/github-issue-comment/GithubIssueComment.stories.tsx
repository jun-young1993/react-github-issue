import { GithubIssueComment } from "./index";
import {StoryFn} from "@storybook/react";

export default {
    title: 'GithubIssueComment',
    component: GithubIssueComment
}

const Template: StoryFn<typeof GithubIssueComment> = (args) => <GithubIssueComment {...args} />
export const GithubIssueTemplate = Template.bind({});
GithubIssueTemplate.args = {
    
    hiddenPreview: false,
    previewBox: undefined
}