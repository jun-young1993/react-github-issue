import React, {ChangeEvent, MouseEventHandler, TextareaHTMLAttributes, useState} from 'react';
import styled from 'styled-components';
import { GithubProfile } from "../github-profile";
import { GithubIssueCommentProps } from "./GithubIssueComment.type";
import {MediaDesktopOnly} from "../../lib/component/MediaDesktopOnly";
import {MediaMobileOnly} from "../../lib/component/MediaMobileOnly";

const Container = styled.div`
  display: flex;
  width: 100%
`;
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
`;
const CommentEditorContainer = styled.div`
  border: 1px solid #d1d5da;
  border-radius: 6px;
  width: 100%
`;

const Tabs = styled.div`
  //display: flex;
`;

const Tab = styled.button`
  //flex: 1;
  padding: 10px;
  font-weight: bold;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &:hover, &.active {
    border-bottom: 2px solid #0366d6;
  }
`;

const CommentBox = styled.textarea<TextareaHTMLAttributes<HTMLTextAreaElement>>`
  width: 100%;
  height: 100px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
`;
const PreviewBox = styled.div`
  width: 100%;
  min-height: 100px;
  height: auto;
  border: none;
  padding: 10px;
  box-sizing: border-box;
`;

const MarkdownSupport = styled.div`
  padding: 10px;
  font-size: 12px;
  color: #586069;
  background: #f6f8fa;
  border-top: 1px solid #d1d5da;
`;

const CommentButton = styled.button`
  float: right;
  margin: 10px;
  padding: 6px 12px;
  background-color: #2c974b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #279443;
  }
`;


const HeaderTitle = styled.strong`
    margin-left: 10px;
`;

/**
 * A React component that serves as a GitHub issue comment interface with responsive behavior.
 * This component includes a GitHub profile display, a comment input area with "Write" and "Preview" tabs,
 * and a button to submit the comment. It uses styled-components for CSS styling and has responsive
 * features that hide the profile display on screens narrower than 700px.
 *
 * Props:
 * @param {GithubIssueCommentProps} props - The properties passed to the component.
 * @param {string} props.gitPersonalAccessToken - GitHub personal access token used for the GitHub API.
 * @param {string} [props.title='Add a comment'] - Optional title for the comment section; defaults to "Add a comment".
 * @param {'write' | 'preview'} [props.activeTab='write'] - Initial active tab state; defaults to 'write'.
 * @param {Function} [props.onChange] - Optional callback function that is called when the comment text changes.
 * @param {Function} [props.onSubmit] - Optional callback function that is called when the comment is submitted.
 * @param {string} [props.placeHolder='Add your comment here...'] - Placeholder text for the comment box; defaults to "Add your comment here...".
 * @param {string} [props.submitText='Comment'] - Text for the submit button; defaults to "Comment".
 * @param {boolean} [props.hidden = false] - Hide the preview tab so it is not visible; defaults to false
 * @param {ReactNode} [props.previewBox = undefined] - The element that will be display when the preview tab is activated
 *
 * State:
 * @param {string} comment - The current text entered in the comment box.
 * @param {'write' | 'preview'} activeTab - The currently active tab, which can be either 'write' or 'preview'.
 *
 * Functions:
 * @function handleCommentChange - Handles changes to the textarea, updating the `comment` state, and invokes the onChange prop callback if provided.
 * @function handleCommentSubmit - Invokes the onSubmit prop callback when the comment is submitted, passing the current comment state.
 *
 * Usage:
 * <GithubIssueComment
 *   gitPersonalAccessToken="your_token_here"
 *   title="Optional custom title"
 *   activeTab="write"
 *   onChange={(text, event) => console.log(text)}
 *   onSubmit={(text, event) => console.log('Submitted:', text)}
 *   placeHolder="Type your comment here"
 *   submitText="Post Comment"
 * />
 */
const GithubIssueComment = (props: GithubIssueCommentProps) => {
    const { gitPersonalAccessToken, title, activeTab: activeTabProps, onChange, placeHolder, onSubmit, submitText, hiddenPreview,previewBox } = props;
    const [comment, setComment] = useState('');
    const [activeTab, setActiveTab] = useState(activeTabProps === 'write' ? 'write' : 'preview');

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        onChange && onChange(e.target.value);
    };
    const handleCommentSubmit = () => {
        onSubmit && onSubmit(comment);
    }

    return (
        <Container>
            <MediaDesktopOnly>
                <GithubProfile
                    gitPersonalAccessToken={gitPersonalAccessToken}
                    profileHidden={{
                        name: true,
                        bio: true,
                        location: true,
                        email: true,
                        html_url: true,
                        blog: true
                    }}
                />
            </MediaDesktopOnly>
            <ColumnContainer>
                <header>
                    <Container>
                        <MediaMobileOnly>
                            <GithubProfile
                                gitPersonalAccessToken={gitPersonalAccessToken}
                                profileHidden={{
                                    name: true,
                                    bio: true,
                                    location: true,
                                    email: true,
                                    html_url: true,
                                    blog: true
                                }}
                            />
                        </MediaMobileOnly>
                        <HeaderTitle>{title ?? 'Add a comment'}</HeaderTitle>
                    </Container>
                </header>
                <CommentEditorContainer>
                            <Tabs>
                                <Tab className={activeTab === 'write' ? 'active' : ''} onClick={() => setActiveTab('write')}>
                                    Write
                                </Tab>
                                {hiddenPreview
                                ? null
                                : <Tab className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>
                                        Preview
                                    </Tab>}

                            </Tabs>
                            {activeTab === 'write'
                            ? <CommentBox
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder={placeHolder ?? "Add your comment here..."}
                                />
                                : <PreviewBox>
                                    {previewBox}
                                </PreviewBox>}

                            <MarkdownSupport>
                                {/*Markdown is supported*/}
                            </MarkdownSupport>
                </CommentEditorContainer>
                <CommentButton
                    onClick={handleCommentSubmit}
                >
                    {submitText ?? 'Comment'}
                </CommentButton>
            </ColumnContainer>
        </Container>
    );
};

export default GithubIssueComment;