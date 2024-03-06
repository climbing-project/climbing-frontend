import { useSession } from "next-auth/react";

const Mypage = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>아이디(이메일)</td>
          <td>session.user!.email!</td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td>
            <input></input>
          </td>
        </tr>
        <tr>
          <td>비밀번호 재확인</td>
          <td>
            <input></input>
          </td>
        </tr>
        <tr>
          <td>닉네임</td>
          <td>
            <input></input>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Mypage;
