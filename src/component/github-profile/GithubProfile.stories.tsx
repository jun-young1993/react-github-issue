import { StoryFn } from "@storybook/react";
import {GithubProfile} from './index';


export default {
	title: 'GithubProfile',
	component: GithubProfile
}

const Template: StoryFn<typeof GithubProfile> = (args) => <GithubProfile {...args} />

export const ProfileTemplate = Template.bind({})
ProfileTemplate.args = {
	size: "30px",
	gitPersonalAccessToken: "###__###",
	profileHidden: {
		name: false,
		bio: false,
		location: false,
		email: false,
		html_url: false,
		blog: false
	}
}