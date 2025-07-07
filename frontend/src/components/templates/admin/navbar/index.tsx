"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { useEffect } from "react";

const navItems = [
  {
    label: "Home",
    path: "/admin",
    icon: <HiOutlineHome />,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <FiSettings />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.email;

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 py-2 border-b flex items-center justify-between border-gray-100  px-3 md:px-10 shadow-sm bg-white/90 backdrop-blur-md">
      <div className="md:text-xl font-bold  font-poppins  flex-1 ">
        {userName}
      </div>
      <div className="flex items-center justify-end gap-2 md:gap-3 ">
        {navItems.map(({ label, path, icon }) => {
          const isActive = pathname === path;
          return (
            <Link key={path} href={path} passHref>
              <button
                title={label}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 md:text-xl font-medium rounded-md transition-colors duration-200",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {icon} <span className="hidden md:inline">{label}</span>
              </button>
            </Link>
          );
        })}
        {/* <Button
          className="cursor-pointer "
          title="Logout"
          onClick={() => signOut({ redirect: true, redirectTo: "/login" })}
          variant="ghost"
        >
          <FiLogOut />
        </Button> */}
        <button
          title="Logout"
          onClick={() => signOut({ redirect: true, redirectTo: "/login" })}
          className={clsx(
            "flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 gap-2 px-3 py-1.5 md:text-xl font-medium rounded-md transition-colors duration-200"
          )}
        >
          <FiLogOut />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
