import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <>
      <form>
        <input type="id" name="id" placeholder="Id" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <LoginButton />
    </>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default Login;
