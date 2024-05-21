import React, {ChangeEvent, TextareaHTMLAttributes, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import { GithubProfile } from "../github-profile";
import { GithubIssueCommentProps } from "./GithubIssueComment.type";
import {MediaDesktopOnly} from "../../lib/component/MediaDesktopOnly";
import {MediaMobileOnly, MediaMobileOnlyStyle} from "../../lib/component/MediaMobileOnly";
import Github from "../../lib/images/github";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinerWrapper = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  &:after {
    content: " ";
    display: block;
    width: 30px;
    height: 30px;
    //margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 5px;
  
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
  width: 100%;
  background-color: #ffffff;
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
  border: 1px solid #d1d5da;
  border-radius: 5px;
  margin: 3px;
  
  ${MediaMobileOnlyStyle(`
    height: 35px;
  `)}
`;
const PreviewBox = styled.div`
  width: 100%;
  min-height: 100px;
  height: auto;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
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

const LoginButton = styled.a`
  float: right;
  margin: 10px;
  padding: 6px 12px;
  background-color: #eeebeb;
  //color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #dedcdc;
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
 *   gitOwner="git owner"
 *   gitRepo="git repo"
 *   gitIssueNumber="gitIssueNumber"
 *   title="Optional custom title"
 *   activeTab="write"
 *   onChange={(text, event) => console.log(text)}
 *   onSubmit={(text, event) => console.log('Submitted:', text)}
 *   placeHolder="Type your comment here"
 *   submitText="Post Comment"
 *      
 * />
 */
const GithubIssueComment = (props: GithubIssueCommentProps) => {
    
    const { gitPersonalAccessToken, title, activeTab: activeTabProps, onChange, placeHolder, onSubmit, submitText, hiddenPreview,previewBox, gitOAuthClientId, gitOAuthScope,
        onAutoComment,
        autoComment = true,
        gitOwner,
        gitRepo,
        gitIssueNumber
     } = props;
    const githubLoginUrl = "https://github.com/login/oauth/authorize"
    const githubLoginUrlQueryString = new URLSearchParams({
        client_id: gitOAuthClientId,
        scope: gitOAuthScope ?? 'read:user profile:read issues:write pull_requests:write repo'
    }).toString();
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState(activeTabProps === 'preview' ? 'preview' : 'write');

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        onChange && onChange(e.target.value);
    };
    const handleCommentSubmit = () => {

        if(gitOwner && gitRepo && gitIssueNumber && gitPersonalAccessToken && autoComment){

            if(comment && !isLoading){
                setIsLoading(true);

                fetch(`https://api.github.com/repos/${gitOwner}/${gitRepo}/issues/${gitIssueNumber}/comments`,{
                    method: "POST",
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "Authorization": `Bearer ${gitPersonalAccessToken}`,
                        "X-GitHub-Api-Version": "2022-11-28"
                    },
                    body: JSON.stringify({
                        body: comment
                    })
                })
                .then((result) => {
                    setIsLoading(false);
                    setComment('');
                    onAutoComment && onAutoComment(result);
                })
                .catch(() => {
                    setIsLoading(false);
                });
            }else{
                setIsLoading(false);
                onSubmit && onSubmit(comment);
            }
            
        }else{
            onSubmit && onSubmit(comment);
        }
        
        
        
        
    }

    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        if(props.gitPersonalAccessToken && isLogin === false){
            setIsLogin(true);
        }
    },[]);


    return (
        <Container>
            <MediaDesktopOnly>
                {gitPersonalAccessToken &&
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
                }
            </MediaDesktopOnly>
            <ColumnContainer>
                <header>
                    <Container>
                        <MediaMobileOnly>
                            {gitPersonalAccessToken &&
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
                            }
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
                                    {previewBox ?? 'Nothing to preview'}
                                </PreviewBox>}

                            <MarkdownSupport>
                                {/*Markdown is supported*/}
                            </MarkdownSupport>
                </CommentEditorContainer>
                {isLogin
                ? <CommentButton
                        onClick={handleCommentSubmit}
                    >
                        {isLoading
                            ? <SpinerWrapper />
                            : submitText ?? 'Comment'}
                    </CommentButton>
                    : <Container>
                        <div style={{width: "25px", height: "25px", margin: "10px"}}>
                            <Github />
                        </div>
                        <LoginButton
                            href={`${githubLoginUrl}?${githubLoginUrlQueryString}`}
                        >
                                Sign in width Github
                        </LoginButton>
                    </Container>}
            </ColumnContainer>
        </Container>
    );
};

export default GithubIssueComment;