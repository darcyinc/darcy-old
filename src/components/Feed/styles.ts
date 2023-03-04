import { css, styled } from 'solid-styled-components';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-left: auto;
  margin-right: auto;

  padding-bottom: 40px;

  width: 600px;
`;

export const LoadMore = css`
  color: #fff;
  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;
