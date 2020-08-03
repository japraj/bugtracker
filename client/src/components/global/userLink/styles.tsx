import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  width: auto;

  :hover {
    cursor: pointer;
  }
`;

interface TagProps {
  showTag: boolean;
  fontSize: string;
  color: string;
  marginLeft: string;
}

export const ProfileTag = styled.h3`
  display: ${(props: TagProps) => (props.showTag ? "block" : "none")};
  font-size: ${(props: TagProps) => props.fontSize};
  color: ${(props: TagProps) => props.color};
  margin: 0 0 0 ${(props: TagProps) => props.marginLeft};
  white-space: nowrap;
`;

export const PopperContent = styled.div`
  max-width: 80vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  a {
    margin-top: 0.8rem;
  }
`;

export const PopperTag = styled.h1`
  margin: 0.8rem 0;
  color: var(--text-color);
  white-space: nowrap;
`;
