import {gitPersonalAccessToken} from "../index.type";
import React, {ReactNode} from "react";

/**
 * Properties for the `GithubIssueComment` component which allows for creating and managing comments
 * in a GitHub issue-like interface with optional preview functionality.
 *
 * @interface
 * @property {string} gitPersonalAccessToken - personal access token for GitHub API calls.
 * @property {string} [title] - Optional title to display above the comment box, defaults to undefined.
 * @property {'write' | 'preview'} [activeTab] - Specifies the initially active tab, can be either 'write' or 'preview'.
 * @property {(comment: string) => void} [onChange] - Optional callback function that is called when the comment text changes.
 * @property {string} [placeHolder] - Optional placeholder text for the comment input box.
 * @property {(comment: string) => void} [onSubmit] - Optional callback function that is called when the comment is submitted.
 * @property {string} [submitText] - Optional text to display on the submit button, default is "Comment".
 * @property {boolean} [hiddenPreview] - If true, hides the preview tab, allowing only textual input.
 * @property {ReactNode} [previewBox] - Optional component or node to display in the preview tab; used to render markdown or custom previews.
 * @property {string} [gitOAuthClientId]
 * @property {string} [gitOAuthScope] default is "read:user profile:read issues:write pull_requests:write repo"
 * @property {string} [gitOwner] git owner
 * @property {string} [gitRepo] git repo
 * @property {string} [gitIssueNumber] git issue number
 * @property {string} [autoComment] The use, please enter the gitOwner, gitRepo, and gitIssueNumber property.
 *    use the logged-in use's  token(gitPersonalAccessToken) to make a 'post' request tot the Github issue with the comment button's 'onLick' event. default true
 *    Handle the response using the 'onAutoComment' property
 * @property {(response: Response) => void} [onAutoComment]
 */
export interface GithubIssueCommentProps {
    gitPersonalAccessToken?: string
    title?: string
    activeTab?: 'write' | 'preview'
    onChange?: (comment: string) => void
    placeHolder?: string
    onSubmit?: (comment: string) => void
    submitText?: string
    hiddenPreview?: boolean
    previewBox?: ReactNode
    isLoading?:boolean
    isLogin?: boolean
    onLogin?: () => void
}