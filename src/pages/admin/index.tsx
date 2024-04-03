import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/admin/AdminLayout";
import Overview from "@/components/admin/Overview";

const AdminHome = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <AdminLayout>
      <Overview />
    </AdminLayout>
  );

  // 테스트 후 복원
  // useEffect(() => {
  //   if (!session) router.push({ pathname: "/login" });
  // }, []);

  // return !session ? null : (
  //   <>
  //     <AdminLayout>default page</AdminLayout>
  //   </>
  // );
};

export default AdminHome;
