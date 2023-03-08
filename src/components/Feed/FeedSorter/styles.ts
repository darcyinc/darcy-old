import { styled } from 'solid-styled-components';

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  background-color: #3a4256;
  padding: 10px;

  width: 100%;

  svg:hover {
    color: #ccc;
    cursor: pointer;
  }
`;

export const SortOptions = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  label {
    margin-top: 5px;
    font-weight: bold;
  }

  select {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;

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

export const SortButton = styled.button`
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    font-size: 1.1rem;
  }
`;
