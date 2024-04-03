import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import BasicInfoEditor from "@/components/admin/BasicInfoEditor";
import DescriptionEditor from "@/components/admin/DescriptionEditor";
import ImageEditor from "@/components/admin/ImageEditor";
import { requestData } from "@/service/api";
import { SERVER_ADDRESS } from "@/constants/constants";
import type { GymData } from "@/constants/gyms/types";

const EditPage1 = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentData, setCurrentData] = useState<GymData>(INITIAL_DATA);
  const [loadedData, setLoadedData] = useState<GymData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  // const tokenRef = useRef(session?.jwt);
  console.log("세션 상태:");
  console.log(session);
  console.log(status);
  console.log(loadedData);

  // 서버로부터 암장정보 fetch
  useEffect(() => {
    // fetchData();
    requestData({
      option: "GET",
      url: "/gyms/2",
      onSuccess: (data) => {
        console.log("Fetch successful");
        setLoadedData(JSON.parse(JSON.stringify(data)));
        setCurrentData(JSON.parse(JSON.stringify(data)));
      },
    });
    setIsLoading(false);
    router.events.on("routeChangeStart", handlePageLeave);

    return () => router.events.off("routeChangeStart", handlePageLeave);
  }, [router]);

  // 관리자가 암장 정보를 수정했는지 확인
  useEffect(() => {
    tracker.current = isEdited(loadedData, currentData) ? "edited" : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  useBeforeunload((e) => {
    if (tracker.current === "edited") {
      return e.preventDefault();
    } else return undefined;
  });

  const isEdited = (oldData: any, newData: any) => {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  };

  const handlePageLeave = () => {
    const dataChanged = tracker.current === "edited" ? true : false;
    if (!dataChanged) return;
    const response = confirm("수정 중인 데이터가 있습니다. 이동할까요?");
    if (!response) {
      throw "Routing reborted in response to the user's request. Please ignore this error message.";
    }
  };

  // const fetchData = () => {
  //   /*
  //   // 전역상태에 저장된 관리자계정 정보로 fetch 요청
  //   const id = '전역상태에서 가져온 값';
  //   fetch(`${GYM_API}${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoadedData(JSON.parse(JSON.stringify(data)));
  //       setCurrentData(JSON.parse(JSON.stringify(data)));
  //     })
  //     .catch((error) => {
  //       //에러 핸들링
  //     });
  //   */

  //   // 관리자계정 정보/API가 준비되기 전에 사용할 임의값
  //   fetch(`${testUrl}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoadedData(JSON.parse(JSON.stringify(data)));
  //       setCurrentData(JSON.parse(JSON.stringify(data)));
  //     })
  //     .catch((error) => {
  //       // 테스트를 위한 임시방편 (추후 에러 핸들링 코드로 교체 필요)
  //       console.log("서버가 오프라인입니다. 암장 정보를 샘플값으로 대체합니다.");
  //       setLoadedData(JSON.parse(JSON.stringify(sampleData)));
  //       setCurrentData(JSON.parse(JSON.stringify(sampleData)));
  //     });
  // };

  const updateData = async (data: string) => {
    try {
      await fetch(`${SERVER_ADDRESS}/gyms/2`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: tokenRef.current,
        },
        body: data,
      });
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (tracker.current !== "edited") return;
    setIsUpdating(true);
    const isSuccess = await updateData(JSON.stringify(currentData));
    if (!isSuccess) {
      // 에러 핸들링
      setIsUpdating(false);
      return alert("서버가 응답하지 않습니다. 잠시 후 다시 시도해보세요.");
    }
    setLoadedData(JSON.parse(JSON.stringify(currentData)));
    tracker.current = null;
    setIsUpdating(false);
  };

  return isLoading ? (
    <div>데이터 로딩 중</div>
  ) : (
    <>
      <ImageEditor
        loadedImages={loadedData.images}
        thumbnails={currentData.imageThumbnails}
        defaultImage={currentData.defaultImage}
        setCurrentData={setCurrentData}
        setLoadedData={setLoadedData}
        updateData={updateData}
      />
      <BasicInfoEditor
        name={currentData.name}
        address={currentData.address}
        contact={currentData.contact}
        snsList={currentData.sns}
        homepage={currentData.homepage}
        setCurrentData={setCurrentData}
      />
      <DescriptionEditor description={currentData.description} setCurrentData={setCurrentData} />
      <S.Button>
        <button className="btn-primary" onClick={handleSave} disabled={isUpdating ? true : false}>
          {isUpdating ? "저장중..." : "저장하기"}
        </button>
      </S.Button>
    </>
  );
};

const S = {
  Button: styled.div`
    margin-left: auto;
  `,
};

const INITIAL_DATA = {
  name: "",
  address: {
    jibunAddress: "",
    roadAddress: "",
    unitAddress: "",
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  contact: "",
};

export default EditPage1;
