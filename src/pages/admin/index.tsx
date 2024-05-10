import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import AdminLayout from "@/components/admin/AdminLayout";
import { ErrorFallback } from "@/components/common/ErrorFallback";
import Overview from "@/components/admin/Overview";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import GymList from "@/components/admin/GymList";

type GymListItem = {
  name: string;
  id: string;
};

const AdminHome = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gymList, setGymList] = useState<GymListItem[] | null>(null);

  // console.log(isError);

  useEffect(() => {
    // if (!session) router.push({ pathname: "/login" });

    const handleSuccess = (data: GymListItem[]) => {
      setGymList(data);
      setIsLoading(false);
    };

    const handleError = (e: Error) => {
      // console.log(e);
      setIsLoading(false);
      setIsError(true);
    };

    fetch("http://localhost:8000/gymids?user=hop")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length < 1) return handleSuccess([]);
        handleSuccess(data[0].gyms);
      })
      .catch((e) => handleError(e));

    // requestData({
    //   option: "GET",
    //   url: `/${session?.user.email}`,
    //   // token: session.jwt.accessToken,
    //   onSuccess: handleSuccess,
    //   onError: handleError,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return null;
  if (isError)
    return (
      <AdminLayout>
        <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <h1>내 암장 관리하기</h1>
      {gymList && gymList.length >= 1 ? (
        <>{gymList?.map((gym) => <GymList key={gym.id} id={gym.id} name={gym.name} />)}</>
      ) : (
        <>
          <Text>현재 관리하고 있는 암장이 없습니다.</Text>
          <Link href={"/admin/register"}>
            <Btn>암장 등록하기</Btn>
          </Link>
        </>
      )}
    </AdminLayout>
  );
};

const Text = styled.div`
  text-align: center;
`;

const Btn = styled.div`
  background: ${COLOR.MAIN};
  color: white;
  padding: 24px;
  border-radius: 12px;
  display: grid;
  width: 160px;
  place-content: center center;
  margin-left: auto;
  margin-right: auto;
`;

export default AdminHome;
