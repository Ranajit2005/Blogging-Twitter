// "use client"

import Auth from "@/components/common/Auth";
import Sidebar from "@/components/common/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getAuthOptions } from "@/lib/authOptions";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import FollowUser from "@/components/FollowUser";
import { getUsers } from "@/actions/user.action";
// import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Homelayout = async ({ children }: Props) => {
  const session: any = await getAuthOptions();
  const users = await getUsers(5);
  // const pathname = usePathname();
  // const route = useRouter();

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  // console.log("users : ",session)

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl">
      <div className="flex">
        <Sidebar user={JSON?.parse(JSON.stringify(session))} />
        <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
          <div className="w-full ">
            {/* For shoeing uploading we use react hot toast */}

            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />

            {children}
            <Toaster />
          </div>
        </div>
        <FollowUser users={users} />
      </div>
    </div>
  );
};

export default Homelayout;
