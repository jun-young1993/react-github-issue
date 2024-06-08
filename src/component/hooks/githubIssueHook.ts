import { GithubIssueResponse } from "../github-issue-reply/GithubIssueReply.type";
import { useCallback, useEffect, useState } from "react"

interface UseGithubIssueProps {
	gitIssueNumber: string | number;
	gitUserPersonalAccessToken?: string;
	gitOwner: string;
	gitRepo: string;
	direction?: string;
}

interface CommentOption {
	onComment?: (response: Response) => void
	onError?: (error: Error) => void
}


const useGithubIssue = ({
	gitUserPersonalAccessToken,
	gitIssueNumber,
	gitOwner,
	gitRepo,
	direction,
}: UseGithubIssueProps) => {
	const [reloadNumber, setReloadNumber] = useState<number>(0);
	const [isCommentLoading, setIsCommentLoading] = useState(false);
	const [data, setReplyList] = useState<GithubIssueResponse[] | []>([]);
	const [isLogin, setIsLogin] = useState(Boolean(gitUserPersonalAccessToken) ?? false);

	useEffect(() => {
		if(gitUserPersonalAccessToken){
			fetch(`https://api.github.com/repos/${gitOwner}/${gitRepo}/issues/${gitIssueNumber}/comments?sort=updated&direction=${direction ?? 'desc'}`, {
				method: 'GET',
				headers: {
					'Accept' : "application/vnd.github+json",
					'X-GitHub-Api-Version': "2022-11-28",
					'Authorization': `Bearer ${gitUserPersonalAccessToken}`
				},
			})
				.then(response => {
					if(response.status !== 200){
						throw new Error(`[Github API Exception] ${response.status} ${response.statusText}`)
					}
					return response.json();
				})
				.then((result: GithubIssueResponse[] | []) => {
					setReplyList(result);
				})
				.catch(error => {
					throw new Error(error.toString()+`
			    https://api.github.com/repos/${gitOwner}/${gitRepo}/issues/${gitIssueNumber}/comments
			    `);
				});
		}


	},[reloadNumber, gitUserPersonalAccessToken, gitIssueNumber, gitOwner, gitRepo, direction]);

	const locationLogin = (gitOAuthClientId: string) => {
		const githubLoginUrl = "https://github.com/login/oauth/authorize"
		const githubLoginUrlQueryString = new URLSearchParams({
			client_id: gitOAuthClientId,
			scope: 'read:user profile:read issues:write pull_requests:write repo'
		    }).toString();
		window.location.href = `${githubLoginUrl}?${githubLoginUrlQueryString}`;
	}


	const comment = useCallback((message: string,options?:CommentOption) => {
		if(isCommentLoading === false && gitUserPersonalAccessToken){

			setIsCommentLoading(true);
			fetch(`https://api.github.com/repos/${gitOwner}/${gitRepo}/issues/${gitIssueNumber}/comments`,{
			method: "POST",
			headers: {
				"Accept": "application/vnd.github+json",
				"Authorization": `Bearer ${gitUserPersonalAccessToken}`,
				"X-GitHub-Api-Version": "2022-11-28"
			},
			body: JSON.stringify({
				body: message
			})
			})
			.then((response) => {
				response.json()
				.then((result) => {
					options?.onComment && options.onComment(response);
					reload();
					setIsCommentLoading(false);
				})
				.catch((error) => {
					options?.onError && options.onError(error);
					setIsCommentLoading(false);
				});
			})
			.catch((error) => {
				options?.onError && options.onError(error);
				setIsCommentLoading(false);
			});
		}
	},[gitUserPersonalAccessToken]);

	const reload = useCallback(() => {
		setReloadNumber(reloadNumber + 1);
	},[]);
	return {reload, comment, data, isCommentLoading, isLogin, locationLogin}
}

export default useGithubIssue;