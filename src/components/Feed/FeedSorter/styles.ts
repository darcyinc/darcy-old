import { styled } from 'solid-styled-components';

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  background-color: #3a4256;
  padding: 10px;

  width: 100%;

  > svg:hover {
    color: #ccc;
    cursor: pointer;
  }
`;

export const SortOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 5px;

    margin-top: 5px;
    font-weight: bold;
  }

  select {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;

    background-color: #191b22;

    &:hover {
      background-color: #2f364a;
      cursor: pointer;
    }

    option {
      background-color: #191b22;
    }
  }

  width: 100%;
`;
