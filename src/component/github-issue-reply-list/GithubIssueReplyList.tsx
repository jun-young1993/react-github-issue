import {useEffect, useState} from "react";
import {GithubIssueProps} from "./GithubIssueReplyLIst.type";
import React from 'react';
import styled from 'styled-components';
import {GithubIssueReply} from "../github-issue-reply";
import {GithubIssueResponse} from "../github-issue-reply/GithubIssueReply.type";

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const GithubIssueReplyList = (props: GithubIssueProps) => {
    const {gitPersonalAccessToken, gitIssueNumber, gitOwner, gitRepo ,...GithubIssueProps} = props;
    const [replyList, setReplyList] = useState<GithubIssueResponse[] | []>([]);
    useEffect(() => {
        fetch(`https://api.github.com/repos/${gitOwner}/${gitRepo}/issues/${gitIssueNumber}/comments`, {
            method: 'GET',
            headers: {
                'Accept' : "application/vnd.github+json",
                'X-GitHub-Api-Version': "2022-11-28",
                'Authorization': `Bearer ${gitPersonalAccessToken}`
            },
        })
            .then(response => {
                if(response.status !== 200){
                    throw new Error(`[Github API Exception] ${response.status} ${response.statusText}`)
                }
                return response.json();
            })
            .then((result: GithubIssueResponse[] | []) => {
                console.log("=>(GithubIssueReplyList.tsx:34) result", result);
                setReplyList(result);
            })
            .catch(error => {
                throw new Error(error.toString());
            });
    },[])
    return (
        <ColumnContainer>
            {replyList && replyList.map((reply,index) => {
                return (
                    <GithubIssueReply
                        key={index}
                        {...reply}
                    />
                )
            })}
        </ColumnContainer>
    )
};

export default GithubIssueReplyList;