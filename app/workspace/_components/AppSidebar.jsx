"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../@/components/ui/sidebar.jsx";
import Image from "next/image";
import { Button } from "../../../@/components/ui/button.jsx";
import {
  Book,
  Compass,
  LayoutDashboardIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";
import AddNewCourseDialog from "../_components/AddNewCourseDialog.jsx";

const SidebarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-learning",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

function AppSidebar() {
  const path = usePathname();

  const isActive = (itemPath) => {
    if (itemPath === "/workspace") {
      return path === itemPath;
    }
    return path.startsWith(itemPath);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="text-xl font-bold text-gray-800">SkillPilot</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className="w-full">Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item, index) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild className="p-1">
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[16px] transition-all
                          ${active
                            ? "bg-purple-100 text-primary font-semibold"
                            : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        <item.icon
                          className={`h-6 w-6 ${active ? "text-primary" : "text-gray-500"}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
