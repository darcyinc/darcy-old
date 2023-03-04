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

  @media (max-width: 600px) {
    // Small screens have a bottom navbar, so we need to add some padding
    padding-bottom: 90px;
    width: 97%;
  }
`;

export const loadMore = css`
  color: #fff;
  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;
