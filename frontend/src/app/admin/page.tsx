import { auth } from "@/auth";
import { ReportsProvider } from "@/components/templates/admin/context";
import ReportsTemplate from "@/components/templates/admin/reports";

export default async function AdminPage() {
  const session = await auth();

  if (!session)
    return (
      <div className="font-poppins text-">
        You are not authorized to view this page
      </div>
    );

  return (
    <ReportsProvider>
      <ReportsTemplate />
    </ReportsProvider>
  );
}
