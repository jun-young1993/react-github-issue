import styled from "styled-components";
export const MediaMobileOnlyStyle = (style: string) => `    
    @media (max-width: 700px) {
        ${style}
    }
`
export const MediaMobileOnly = styled.div`
	display: none;
      ${MediaMobileOnlyStyle(
          "display: block;"
      )}
`


