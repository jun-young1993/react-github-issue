import {useEffect, useState} from "react";
import {GithubIssueProps} from "./GithubIssueReply.type";
import React from 'react';
import styled from 'styled-components';
import {Profile} from "juny-react-style";
import {MediaDesktopOnly} from "../../lib/component/MediaDesktopOnly";
import { MediaMobileOnlyStyle} from "../../lib/component/MediaMobileOnly";

const CommentContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
`;

const Header = styled.div`
  position: relative;
  background: #e6f7ff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;

  &:before {
    content: '';
    position: absolute;
    top: 10px; /* Adjust this value to control the vertical position of the arrow */
    left: -10px; /* Adjust this value to control the horizontal position of the arrow */
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #e6f7ff; /* Match the arrow color with the header background */
  }
  ${MediaMobileOnlyStyle(`
       &:before {
          left: 0px;
        }
  `)}
`;

const CommentBody = styled.div`
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const OwnerBadge = styled.span`
  background: #f1f1f1;
  border-radius: 12px;
  padding: 2px 6px;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%
`;
interface GithubIssueResponse {
    updated_at: Date
    body: string
    user: {
        login: string,
        site_admin: boolean,
        avatar_url: string
    }
}
const GithubIssueReply = (issue: GithubIssueResponse) => (
    <ProfileContainer>
        <MediaDesktopOnly>
        <Profile src={issue.user.avatar_url} style={{
            marginTop: "10px",
            marginLeft: "5px"
        }}/>
        </MediaDesktopOnly>
        <CommentContainer>
                <Header>
                        <div><strong>{issue.user.login}</strong><span>  {issue.updated_at.toString()}</span></div>
                    {issue.user.site_admin && <OwnerBadge>Owner</OwnerBadge>}
                </Header>
            <CommentBody>{issue.body}</CommentBody>
        </CommentContainer>
    </ProfileContainer>
);


export default GithubIssueReply;