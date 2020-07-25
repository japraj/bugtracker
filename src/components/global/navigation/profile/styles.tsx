import styled from "styled-components";

export const Profile = styled.div`
  ${(props: { collapsed: boolean }) =>
    props.collapsed
      ? `margin: 1rem 1rem 0.5rem;`
      : `  
        margin: 1.5rem 1rem 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      `}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);

  h1 {
    margin-top: 0.5rem;
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.4rem;
  }
`;

export const ProfileWidgetWrapper = styled.div`
  margin: 1rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  a {
    text-decorations: none;
  }

  .badge:hover {
    cursor: pointer;
  }

  .icon {
    color: var(--text-color);

    :hover {
      cursor: pointer;
      color: var(--highlight);
    }
  }

  .settings {
    margin-right: 1rem;
  }
`;
