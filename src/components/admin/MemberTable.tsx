import styled from "styled-components";

export type Member = {
  nickname: string;
  email: string;
  role: string;
};

export interface MemberList {
  members: Member[];
  openModal: (member: Member) => void;
}

export default function MemberTable({ members, openModal }: MemberList) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Nickname</td>
            <td>Email</td>
            <td>Role</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => (
            <tr key={i}>
              <td>{member.nickname}</td>
              <td>{member.email}</td>
              <td>
                <Tag className={member.role}>{member.role}</Tag>
              </td>
              <td>
                <button onClick={() => openModal(member)}>권한 변경</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Tag = styled.div`
  border-radius: 50px;
  padding: 0.2rem 0.6rem;
  text-align: center;
  user-select: none;
  &.admin {
    border: 1px solid rgb(130, 75, 125);
    background: rgb(247, 214, 229);
    color: rgb(130, 75, 125);
  }
  &.manager {
    border: 1px solid rgb(95, 116, 151);
    background: rgb(211, 224, 245);
    color: rgb(95, 116, 151);
  }
  &.user {
    border: 1px solid rgb(51, 107, 51);
    background: rgb(197, 231, 193);
    color: rgb(51, 107, 51);
  }
`;
