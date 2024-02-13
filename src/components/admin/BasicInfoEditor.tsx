import styled from 'styled-components';

interface BasicInfoProps {
  name: string | undefined;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string }|undefined;
  contactList: Array<{ platform: string; info: string }>|undefined;
}

const BasicInfoEditor = ({ name, address, contactList }: BasicInfoProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Header>기본 정보</Styled.Header>
      <Styled.Content $direction="row">
        <div>
          <h4>암장 이름</h4>
          <Styled.TextField>
            <input value={name} />
          </Styled.TextField>
        </div>
        <div>
          <h4>주소</h4>
          <Styled.TextField>
            <input value={`${address?.roadAddress} ${address?.unitAddress}`} />
          </Styled.TextField>
        </div>
        <div>
          <h4>연락처</h4>
          <Styled.TextField>
            <input value={contactList?.[0].info} />
          </Styled.TextField>
        </div>
        <div>
          <h4>SNS</h4>
          <Styled.TextField>
            <input value={contactList?.[1] ? contactList[1].info : 'null'} />
          </Styled.TextField>
        </div>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
  `,
  TextField: styled.div`
    box-sizing: border-box;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 350px;

    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
    }
  `,
};

export default BasicInfoEditor;
