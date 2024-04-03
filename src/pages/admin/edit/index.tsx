import { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import EditPage1 from "@/components/admin/EditPage1";
import EditPage2 from "@/components/admin/EditPage2";
import { ErrorFallback } from "@/components/common/ErrorFallback";
import Layout from "@/components/Layout";
import type { NextPageWithLayout } from "@/pages/_app";

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = router.query;
  if (page === "2") return <EditPage2 />;
  else return <EditPage1 />;
};

EditPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AdminLayout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{page}</ErrorBoundary>
      </AdminLayout>
    </Layout>
  );
};

export default EditPage;
