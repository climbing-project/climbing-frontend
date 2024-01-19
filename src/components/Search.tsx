import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import DropDown, { DropItem } from "./DropDown";

interface AddressListProps {
  addressList: Array<DropItem>;
}

export const Search = ({ addressList }: AddressListProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Form>
        <Styled.Input
          type="text"
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
        />
        <IoSearch />
      </Styled.Form>
      <DropDown
        prefixIcon={<IoSearch />}
        dropItems={addressList}
        width="365px"
      />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Form: styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 5px;
    margin-bottom: 5px;
    width: 380px;
  `,
  Input: styled.input`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 350px;
  `,
};

export default Search;
