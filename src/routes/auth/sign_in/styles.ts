import { styled } from 'solid-styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #191b22;

  height: 100vh;
  width: 100vw;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  background-color: #282c37;
  border-radius: 10px;
  padding: 94px;

  height: 500px;
  width: 600px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 72px;
    width: 80px;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
    user-select: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;

  .label {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    width: 100%;

    label {
      font-weight: bold;
      white-space: nowrap;

      &.error {
        color: #ff0000;
        font-weight: normal;
        font-size: 1rem;
        white-space: normal;
        text-align: right;
      }
    }
  }

  input {
    border: none;
    border-radius: 10px;

    background-color: #131419;
    margin-top: 3px;
    padding: 10px;

    font-size: 1rem;

    width: 100%;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  button {
    display: flex;
    justify-content: center;

    background-color: #6a17f1;
    color: #fff;

    border: none;
    border-radius: 10px;
    padding: 10px;

    font-size: 1.1rem;
    font-weight: bold;

    text-transform: uppercase;

    transition: 0.5s;

    width: 100%;

    &:hover {
      background-color: #640df0;
      cursor: pointer;
    }

    &[disabled] {
      background-color: #616161;
      cursor: not-allowed;
    }
  }

  span {
    color: #7a7b81;
    user-select: none;

    a {
      color: #7a7b81;
      text-decoration: none;

      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
`;