import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 18.5px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;

  .textfieldButton {
    margin-top: 1rem;
    width: 100%;
  }
`;

export const ImageLinkSet = styled.div`
  padding: 9.25px 7px 9.25px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
`;

export const ImageLink = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);

  h1 {
    font-size: 1rem;
    text-align: left;
    width: calc(100% - 1rem - 48px);
    margin-right: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.15;
  }

  :first-child {
    padding-top: 0;
  }

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const EmptyMessage = styled.h1`
  font-size: 1rem;
  line-height: 1.5;
  padding: 9.25px 7px 9.25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-style: italic;
`;
