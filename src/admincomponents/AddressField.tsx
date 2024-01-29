import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostcodeReader from './PostcodeReader';

const AddressField = () => {
  const [isShowing, setIsShowing] = useState(false);

  const handleOverlay = () => {
    if (isShowing) setIsShowing(false);
    else setIsShowing(true);
  };

  const getCoords = (queryString: string) => {
    naver.maps.Service.geocode({ query: queryString }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR)
        console.log('error occurred'); // 추후에 예외 처리

      const [result] = response.v2.addresses;
      (document.querySelector('.field__latitude') as HTMLInputElement).value =
        result.y;
      (document.querySelector('.field__longitude') as HTMLInputElement).value =
        result.x;
    });
  };

  const handleComplete = (data: Address) => {
    const { zonecode, roadAddress, jibunAddress, userSelectedType } = data;
    let displayAddress;

    // 유저가 선택한 주소 형식(도로명 또는 지번)을 감지하고 해당 형식을 input 필드에 반영
    if (userSelectedType === 'R') {
      displayAddress = roadAddress;
    } else {
      displayAddress = jibunAddress;
    }

    (
      document.querySelector('.field__display-address') as HTMLInputElement
    ).value = `(${zonecode}) ${displayAddress}`;
    (
      document.querySelector('.field__street-address') as HTMLInputElement
    ).value = `${roadAddress}`;

    getCoords(roadAddress);
    setIsShowing(false);
    (
      document.querySelector('.field__building-address') as HTMLInputElement
    ).focus();
  };

  return (
    <div>
      <input className="field__display-address" disabled />
      <input
        className="field__building-address"
        name="building-address"
        placeholder="상세 주소"
      />
      <input type="button" onClick={handleOverlay} value="우편번호 찾기" />
      <input
        type="hidden"
        className="field__street-address"
        name="street-address"
      />
      <input type="hidden" className="field__latitude" name="latitude" />
      <input type="hidden" className="field__longitude" name="longitude" />
      {isShowing ? (
        <PostcodeReader
          handleClose={handleOverlay}
          handleComplete={handleComplete}
        />
      ) : null}
    </div>
  );
};

export default AddressField;
