import {DetailedHTMLProps, ImgHTMLAttributes} from "react";

export interface ProfileProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>,HTMLImageElement>{
	radius?: string
	size?: string
	src?: string
}

export interface GithubProfileHidden {
	name?: boolean
	bio?: boolean
	location?: boolean
	email?: boolean
	html_url?: boolean
	blog?: boolean
}
export interface GithubProfileProps extends ProfileProps{
	gitPersonalAccessToken: string
	profileHidden?: GithubProfileHidden
}

export interface GithubUserProfile {
	bio?: string
	avatar_url: string
	blog?: string
	html_url?: string
	name?: string
	email?:string
	location?: string
}