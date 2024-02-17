import { styled } from "styled-components";

interface InputProps {
  name: string;
  title: string;
  type?: string;
  checkValidity?: boolean;
}

export const InputWithTitle = ({
  name,
  title,
  type = "text",
  checkValidity = false,
}: InputProps) => {
  const handleChange = async (event: { target: { name: string } }) => {
    if (!checkValidity) return;
    const res = await fetch(`http://localhost:3000/members/${name}Check`);
    const data = await res.json();
    if (data) {
      // 가입가능
    } else {
      //가입 불가
    }
  };
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Input name={name} type={type} onChange={handleChange} />
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
};

export default InputWithTitle;
