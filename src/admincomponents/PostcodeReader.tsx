import styled from 'styled-components';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { IoIosCloseCircle } from 'react-icons/io';

interface PostcodeReaderProps {
  handleClose: Function;
  handleComplete: Function;
}

const PostcodeReader = ({
  handleClose,
  handleComplete,
}: PostcodeReaderProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Foreground>
        <Styled.EmbedContainer>
          <IoIosCloseCircle
            className="btn__close"
            onClick={() => handleClose()}
          />
          <DaumPostcodeEmbed onComplete={(data) => handleComplete(data)} />
        </Styled.EmbedContainer>
      </Styled.Foreground>
      <Styled.Background />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  `,
  Foreground: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Background: styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  `,
  EmbedContainer: styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;

    .btn__close {
      font-size: 24pt;
      color: white;
      cursor: pointer;
    }
  `,
};

export default PostcodeReader;
