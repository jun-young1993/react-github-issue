import styled from "styled-components";
export const MediaDesktopOnlyStyle = (style: string) => `    
    @media (max-width: 700px) {
        ${style}
    }
`
export const MediaDesktopOnly = styled.div`
	display: block;
    ${MediaDesktopOnlyStyle(
        "display: none;"
    )}
`;