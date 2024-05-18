import {DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState} from "react";
import {GithubProfileProps, GithubUserProfile} from "./GithubProfile.type";
import {MissingRequiredPropsVariable} from "../../lib/exception/MissingRequiredPropsVariable";
import {AlignBox, Link, MarginBox, Profile} from "juny-react-style";
import styled, {keyframes} from "styled-components";

const profileDefaultSize = "30px";

const SpinStyled = keyframes`
	0% { 
		transform: rotate(0deg); 
	}
	100% { 
		transform: rotate(360deg); 
	}
`;

const Spinner = styled.div`
	width: ${profileDefaultSize};
	height: ${profileDefaultSize};
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left: 4px solid #767676; 
	border-radius: 50%;
	margin: 20px auto; 
	animation: 1s ${SpinStyled} linear infinite;
`;


/**
 * Represents a GitHub user profile component that fetches and displays user profile data
 * from GitHub's API based on a provided personal access token. The component displays user
 * information such as avatar, name, bio, location, email, and links, with options to hide
 * certain information. It also includes a spinner animation while the data is being fetched.
 *
 * Props:
 * @param {GithubProfileProps} props - Component props.
 * @param {string} props.gitPersonalAccessToken - GitHub personal access token required to fetch user data.
 * @param {Record<string, boolean>} [props.profileHidden] - Optional settings to hide specific user information fields.
 * @param {ImgHTMLAttributes<HTMLImageElement>} [props.styleProps] - Optional additional styling props for the image.
 *
 * State:
 * @param {GithubUserProfile | null} githubUserProfileData - The GitHub user profile data fetched from the API.
 * @param {string | null} githubUserProfileError - Error message in case of a failed API request.
 *
 * Effects:
 * @effect On mount and when `githubUserProfileData` changes, fetches user data from GitHub.
 * If no personal access token is provided, it throws an error.
 *
 * Component Structure:
 * - Displays a spinner if data is being fetched.
 * - Shows error message if an error occurred during data fetching.
 * - Displays the user profile information if data is available and not set to be hidden.
 */
const GithubProfile = (props: GithubProfileProps) => {
	const [githubUserProfileData, setGithubUserProfileData] = useState<GithubUserProfile | null>(null);
	const [githubUserProfileError, setGithubUserProfileError] = useState<string | null>(null);

	const {gitPersonalAccessToken , profileHidden, ...styleProps} = props;
	
	useEffect(() => {
		if(!gitPersonalAccessToken){
			throw new MissingRequiredPropsVariable('gitPersonalAccessToken');
		}
		if(githubUserProfileData === null){
			fetch("https://api.github.com/user", {
				method: 'GET',
				headers: {
					'Accept' : "application/vnd.github+json",
					'X-GitHub-Api-Version': "2022-11-28",
					'Authorization': `Bearer ${gitPersonalAccessToken}`
				},
			})
			.then(response => {
				if(response.status !== 200){
					setGithubUserProfileError(response.statusText);
					// throw new Error(response.statusText);
				
				}
				setGithubUserProfileError(response.statusText);
	
				return response.json();
			})
			.then((result: GithubUserProfile) => {
				
				setGithubUserProfileData(result);
			})
			.catch(error => {
				setGithubUserProfileError(error.toString());
				// throw new Error(error.toString());
			});
		}

	},[githubUserProfileData,setGithubUserProfileError]);
	
	return (
		(githubUserProfileData === null) 
			? (githubUserProfileError)
				? <span>githubUserProfileError</span>
				: <Spinner />
			: (
				<div>
					<Profile src={githubUserProfileData.avatar_url}/>
					<AlignBox
						align={"left"}
					>
					{githubUserProfileData.name && !profileHidden?.name &&
						<MarginBox
							top="5px"
							bottom="10px"
						>
							<h1><strong>😀 {githubUserProfileData.name}</strong></h1>
						</MarginBox>}
					{githubUserProfileData.bio && !profileHidden?.bio &&
						<MarginBox
							bottom="10px"
						>
						<div>{githubUserProfileData.bio}</div>
						</MarginBox>
					}
					{githubUserProfileData.location && !profileHidden?.location &&
						<MarginBox bottom="2px">
							<span>🌐 {githubUserProfileData.location}</span>
						</MarginBox>
					}
					{githubUserProfileData.email && !profileHidden?.email &&
						<MarginBox bottom="2px">
							<Link
								href={`mailto: ${githubUserProfileData.email}`}
								target={"_blank"}
								rel={"nofollow"}
							>
								✉️ {githubUserProfileData.email}
							</Link>
						</MarginBox>}
					{githubUserProfileData.html_url && !profileHidden?.html_url &&
						<MarginBox bottom="2px" >
							<Link
								href={githubUserProfileData.html_url}
								target={"_blank"}
								rel={"nofollow"}
								// img={{
								// 	src:'%PUBLIC_URL%/images/github.png'
								// }}
							>
								{/*<TextOverFlow>*/}
								🔗 {githubUserProfileData.html_url}
								{/*</TextOverFlow>*/}
							</Link>
						</MarginBox>
					}
					{githubUserProfileData.blog && !profileHidden?.blog &&
						<MarginBox bottom="2px" >
							<Link
								href={githubUserProfileData.blog}
								target={"_blank"}
								rel={"nofollow"}
							>
								📝 {githubUserProfileData.blog}
							</Link>
						</MarginBox>
					}
					</AlignBox>
				</div>

			)
	)
}

export default GithubProfile;