import { GetProps, PostProps, RequestProps } from "@/constants/service/type";

export const requestData = async ({
  option,
  url,
  sessionId,
  data,
  onSuccess, // 성공 후 처리
}: RequestProps) => {
  switch (option) {
    case "GET":
      return () => getData({ url, sessionId, onSuccess });
    case "POST":
      return () => postData({ url, data, sessionId, onSuccess });
    // POST로 DELETE를 대체가능
    // case "DELETE":
    //   break;
    default:
      console.log("잘못된 옵션 설정");
  }
};

const getData = ({ url, sessionId, onSuccess }: GetProps) => {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionId}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러 발생`);
      }
      // 실제 데이터 반환
      return response.json;
    })
    .then((result) => {
      if (onSuccess) {
        return onSuccess(result);
      }
      return result;
    })
    .catch((error) => console.log(error.message));
};

const postData = ({ url, data, sessionId, onSuccess }: PostProps) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionId}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        // 404, 500...등의 에러
        throw new Error(`${response.status} 에러 발생`);
      }
      return response.json;
    })
    .then((result) => {
      if (onSuccess) {
        return onSuccess(result);
      }
      return result;
    })
    .catch((error) => console.log(error.message));
};
