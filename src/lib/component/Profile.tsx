import styled from "styled-components";
import {DetailedHTMLProps, ImgHTMLAttributes} from "react";
const profileDefaultSize = "30px";
export const ProfileWrapStyled = styled.div`
	text-align: center;
	display:table;
	height: ${profileDefaultSize};
	width: ${profileDefaultSize};
	border-radius: 50%;
`;

const ProfileCellStyled = styled.div`
  display: table-cell;
  vertical-align:middle;
`;

const ProfileImgStyled = styled.img`
	height: ${profileDefaultSize};
	width: ${profileDefaultSize};
	border-radius: 50%;
`;

export const Profile = (props:DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>,HTMLImageElement>) => {
    return (
        <ProfileWrapStyled>
            <ProfileCellStyled>
                <ProfileImgStyled {...props}/>
            </ProfileCellStyled>
        </ProfileWrapStyled>
    );
}

export default Profile;