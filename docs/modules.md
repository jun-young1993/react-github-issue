[react-github-issue](README.md) / Exports

# react-github-issue

## Table of contents

### Functions

- [GithubIssueReply](modules.md#githubissue)
- [GithubIssueComment](modules.md#githubissuecomment)
- [GithubProfile](modules.md#githubprofile)

## Functions

### GithubIssueReply

▸ **GithubIssueReply**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GithubIssueProps` |

#### Returns

`Element`

#### Defined in

[github-issue/GithubIssueReply.tsx:4](https://github.com/jun-young1993/react-github-issue/blob/24962b11252d1c7ee6b422c2a3347174995ea29b/src/component/github-issue/GithubIssue.tsx#L4)

___

### GithubIssueComment

▸ **GithubIssueComment**(`props`): `Element`

A React component that serves as a GitHub issue comment interface with responsive behavior.
This component includes a GitHub profile display, a comment input area with "Write" and "Preview" tabs,
and a button to submit the comment. It uses styled-components for CSS styling and has responsive
features that hide the profile display on screens narrower than 700px.

Props:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `GithubIssueCommentProps` | The properties passed to the component. |

#### Returns

`Element`

**`Function`**

handleCommentChange - Handles changes to the textarea, updating the `comment` state, and invokes the onChange prop callback if provided.

**`Function`**

handleCommentSubmit - Invokes the onSubmit prop callback when the comment is submitted, passing the current comment state.

Usage:
<GithubIssueComment
  gitPersonalAccessToken="your_token_here"
  title="Optional custom title"
  activeTab="write"
  onChange={(text, event) => console.log(text)}
  onSubmit={(text, event) => console.log('Submitted:', text)}
  placeHolder="Type your comment here"
  submitText="Post Comment"
/>

#### Defined in

[github-issue-comment/GithubIssueComment.tsx:134](https://github.com/jun-young1993/react-github-issue/blob/24962b11252d1c7ee6b422c2a3347174995ea29b/src/component/github-issue-comment/GithubIssueComment.tsx#L134)

___

### GithubProfile

▸ **GithubProfile**(`props`): `Element`

Represents a GitHub user profile component that fetches and displays user profile data
from GitHub's API based on a provided personal access token. The component displays user
information such as avatar, name, bio, location, email, and links, with options to hide
certain information. It also includes a spinner animation while the data is being fetched.

Props:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `GithubProfileProps` | Component props. |

#### Returns

`Element`

**`Effect`**

On mount and when `githubUserProfileData` changes, fetches user data from GitHub.
If no personal access token is provided, it throws an error.

Component Structure:
- Displays a spinner if data is being fetched.
- Shows error message if an error occurred during data fetching.
- Displays the user profile information if data is available and not set to be hidden.

#### Defined in

[github-profile/GithubProfile.tsx:105](https://github.com/jun-young1993/react-github-issue/blob/24962b11252d1c7ee6b422c2a3347174995ea29b/src/component/github-profile/GithubProfile.tsx#L105)
