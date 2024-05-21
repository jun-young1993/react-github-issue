import {gitPersonalAccessToken} from "../index.type";
import React, {ReactNode} from "react";

/**
 * Properties for the `GithubIssueComment` component which allows for creating and managing comments
 * in a GitHub issue-like interface with optional preview functionality.
 *
 * @interface
 * @property {string} gitPersonalAccessToken - Required personal access token for GitHub API calls.
 * @property {string} [title] - Optional title to display above the comment box, defaults to undefined.
 * @property {'write' | 'preview'} [activeTab] - Specifies the initially active tab, can be either 'write' or 'preview'.
 * @property {(comment: string) => void} [onChange] - Optional callback function that is called when the comment text changes.
 * @property {string} [placeHolder] - Optional placeholder text for the comment input box.
 * @property {(comment: string) => void} [onSubmit] - Optional callback function that is called when the comment is submitted.
 * @property {string} [submitText] - Optional text to display on the submit button, default is "Comment".
 * @property {boolean} [hiddenPreview] - If true, hides the preview tab, allowing only textual input.
 * @property {ReactNode} [previewBox] - Optional component or node to display in the preview tab; used to render markdown or custom previews.
 * @property {string} [gitOAuthClientId]
 * @property {string} [gitOAuthScope] default is "read:user"
 */
export interface GithubIssueCommentProps {
    gitPersonalAccessToken?: gitPersonalAccessToken
    title?: string
    activeTab?: 'write' | 'preview'
    onChange?: (comment: string) => void
    placeHolder?: string
    onSubmit?: (comment: string) => void
    onLogin?: () => void
    submitText?: string
    hiddenPreview?: boolean
    previewBox?: ReactNode
    gitOAuthClientId: string
    gitOAuthScope?: string
    gitOwner?: string
    gitRepo?: string
    gitIssueNumber?: string
    autoComment?: boolean
    onAutoComment?:  (response: Response) => void
}