import {StoryFn} from "@storybook/react";
import {GithubIssueReply} from "./index";
import {GithubIssueResponse} from "./GithubIssueReply.type";


export default {
    title: 'GithubIssueReply',
    component: GithubIssueReply
}

const Template: StoryFn<typeof GithubIssueReply> = (args: GithubIssueResponse) => <GithubIssueReply {...args} />

export const GithubIssueReplyTemplate = Template.bind({});
GithubIssueReplyTemplate.args = {
    updated_at: new Date(),
    body: "test",
    user: {
        avatar_url: "https://avatars.githubusercontent.com/u/102360897?v=4",
        site_admin: true,
        login: "jun-young"
    }

}
