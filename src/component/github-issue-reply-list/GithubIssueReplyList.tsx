import {useEffect, useState} from "react";
import {GithubIssueProps} from "./GithubIssueReplyLIst.type";
import styled from 'styled-components';
import {GithubIssueReply} from "../github-issue-reply";
import {GithubIssueResponse} from "../github-issue-reply/GithubIssueReply.type";

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const GithubIssueReplyList = ({data}: GithubIssueProps) => {
    
    return (
        <ColumnContainer>
            {data && data.map((reply,index) => {
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