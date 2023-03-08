import { css, styled } from 'solid-styled-components';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: #282c37;

  margin-left: auto;
  margin-right: auto;

  border-radius: 10px;

  height: 100%;
  width: 600px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const FeedDivider = styled.div`
  border-bottom: 1px solid #d9d9d9;
  height: 1px;
  width: 100%;
`;

export const loadMore = css`
  color: #fff;
  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;
