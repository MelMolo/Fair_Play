import Navbar from "@/components/templates/admin/navbar";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="relative pt-[44px] md:pt-[60px] bg-gray-50">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
