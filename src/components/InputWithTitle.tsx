import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

interface InputProps {
  name: string;
  title: string;
  type?: string;
  setValidity?: Dispatch<SetStateAction<boolean>>;
  validity?: boolean;
}

export const InputWithTitle = ({
  name,
  title,
  type = "text",
  setValidity,
  validity,
}: InputProps) => {
  const handleChange = async (event: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    if (!setValidity) return;
    // const res = await fetch(`http://localhost:3000/members/${name}Check`);
    // const data = await res.json();

    // 서버 없어서 임시 로직 적용(5자 이상일시 valid)
    if (event.target.value.length >= 5) {
      // 중복이 없을때 사용가능
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const handleWarningText = () => {
    return setValidity && !validity ? `중복된 ${name}이 존재합니다` : "";
    // return <Styled.Warning>text</Styled.Warning>;
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Input name={name} type={type} onChange={handleChange} />
      <Styled.Warning>{handleWarningText()}</Styled.Warning>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  `,
  Title: styled.div``,
  Input: styled.input`
    height: 30px;
  `,
  Warning: styled.div`
    height: 10px;
    font-size: 12px;
    color: red;
  `,
};

export default InputWithTitle;
