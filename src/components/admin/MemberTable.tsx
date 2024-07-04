import styled from "styled-components";
import { HiCog } from "react-icons/hi";
import ReactIcon from "../common/ReactIcon";
import { COLOR } from "@/styles/global-color";

export type Member = {
  id: number;
  nickName: string;
  email: string;
  role: string;
};

export interface MemberList {
  members: Member[];
  openModal: (member: Member) => void;
}

const MemberTable = ({ members, openModal }: MemberList) => {
  return (
    <table>
      <colgroup>
        <col className="nickname" />
        <col className="email" />
        <col className="role" />
        <col className="button" />
      </colgroup>
      <thead>
        <tr>
          <td>Nickname</td>
          <td>Email</td>
          <td>Role</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {members.map((member, i) => (
          <tr key={i}>
            <td className="nickname">
              <S.TdText>
                <span title={member.nickName}>{member.nickName}</span>
              </S.TdText>
            </td>
            <td className="email">
              <S.TdText>
                <span title={member.email}>{member.email}</span>
              </S.TdText>
            </td>
            <td className="role">
              <S.Tag className={member.role.toLowerCase()}>{member.role}</S.Tag>
            </td>
            <td>
              <ReactIcon clickable={true}>
                <HiCog
                  size="1.3rem"
                  color={COLOR.BACKGROUND_DARK}
                  onClick={() => openModal(member)}
                />
              </ReactIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const S = {
  TdText: styled.div`
    width: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      position: relative;
      cursor: default;
    }
  `,
  Tag: styled.div`
    border-radius: 50px;
    padding: 0.2rem 0.5rem;
    font-size: 0.85rem;
    max-width: 55px;
    text-align: center;
    user-select: none;
    &.admin {
      border: 1px solid rgb(184, 95, 177);
      background: rgb(247, 214, 229);
      color: rgb(184, 95, 177);
    }
    &.manager {
      border: 1px solid rgb(95, 116, 151);
      background: rgb(211, 224, 245);
      color: rgb(95, 116, 151);
    }
    &.user {
      border: 1px solid rgb(73, 161, 73);
      background: rgb(207, 242, 203);
      color: rgb(73, 161, 73);
    }
  `,
};

export default MemberTable;
