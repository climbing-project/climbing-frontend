import { useState } from "react";
import MemberTable from "@/components/admin/MemberTable";
import Modal from "@/components/admin/Modal";
import type { Member } from "@/components/admin/MemberTable";

const AdminPage = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // fetch 로직 추가

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <MemberTable members={testData} openModal={openModal} />
      {isOpen && (
        <Modal closeModal={closeModal}>
          <h3>멤버 권한 변경</h3>
          {selectedMember && (
            <>
              {selectedMember.nickname}
              <br />
              <select defaultValue={selectedMember.role}>
                <option>admin</option>
                <option>manager</option>
                <option>user</option>
              </select>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

const testData = [
  { nickname: "스피커", role: "admin", email: "sdfklj@gmail.com" },
  { nickname: "모니터", role: "manager", email: "635s4ef@gmail.com" },
  { nickname: "마우스", role: "manager", email: "383__dflskdj@gmail.com" },
  { nickname: "키보드", role: "user", email: "dfe5fe82@gmail.com" },
  { nickname: "데스크탑", role: "user", email: "sd6f8eg__@gmail.com" },
  { nickname: "케이블", role: "user", email: "fsle_ef5@gmail.com" },
];

export default AdminPage;
