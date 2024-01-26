import styled from "styled-components";

const Login = () => {
  return (
    <form>
      <input type="id" name="id" placeholder="Id" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default Login;
