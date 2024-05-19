react-github-issue / [Exports](modules.md)

# [👉 move to the homepage 👈](https://www.juny.blog/blog/docs/react-github-issue.md)

# react-github-issue

# install
```shell
npm i react-github-issue
```
# components
## GithubIssueComment

<img src="https://juny.vercel.app/api/github/image/Pasted image 20240519112050.png">


### example
```tsx
import { GithubIssueComment } from 'react-github-issue';

<GithubIssueComment
	gitPersonalAccessToken={your token}
/>
```

## GithubIssueReplyList

<img src="https://juny.vercel.app/api/github/image/Pasted image 20240519113424.png">

### example
```tsx
import { GithubIssueReplyList } from 'react-github-issue';
<GithubIssueReplyList 
	gitPersonalAccessToken={your token},  
	gitRepo={your repository name},  
	gitOwner={your git owner},  
	gitIssueNumber={your git issue number}
/>
```
## GithubIssueReply

<img src="https://juny.vercel.app/api/github/image/Pasted image 20240519112554.png">

### example
```tsx
import { GithubIssueReply } from 'react-github-issue';

<GithubIssueReply
	updated_at={new Date()},  
	body: "test",  
	user: {  
	    avatar_url: "https://avatars.gith?v=4",  
	    site_admin: true,  
	    login: "jun-young"  
	}
/>
```

## othre
### Get Property
>gitOwner:  the text inside the red board is 'gitOwner'
>gitRepo: the text inside the blue board is 'gitRepo'
>gitIssueNumber: the text inside the green board is 'gitIssueNumber'

<img src="https://juny.vercel.app/api/github/image/Pasted image 20240519113655.png">

### Get Git Personal Token
> to get a 'gitPersonalToken' click the link
> https://github.com/settings/tokens

<img src="https://juny.vercel.app/api/github/image/Pasted image 20240519114653.png">