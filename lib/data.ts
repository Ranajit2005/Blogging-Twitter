import { Bell, Home, Telescope, User } from "lucide-react";
// import { circle-user-round } from "lucide-react";

export const sidebarItemsFunc = (user: any) => {
  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications/${user?._id}`,
      icon: Bell,
      notification: user?.hasNewNotifications,
    },
    {
      label: "Profile",
      path: `/profile/${user?._id}`,
      icon: User,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: Telescope,
    },
  ];

  return sidebarItems;
};