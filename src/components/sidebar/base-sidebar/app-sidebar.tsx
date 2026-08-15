import { NavMain } from "@/components/sidebar/base-sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/base-sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/base-sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/base-sidebar/team-switcher";
import { NavOthers } from "@/components/ui/nav-others";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  AudioLinesIcon,
  BookOpen,
  BookSearch,
  ChartNoAxesCombined,
  CircleQuestionMark,
  Heart,
  House,
  LandPlot,
  Layers2,
  Link,
  MailQuestionMark,
  Network,
  Newspaper,
  NotebookTabs,
  NotepadText,
  Origami,
  PieChartIcon,
  Plus,
  School,
  Settings,
  Smile,
  TerminalIcon,
} from "lucide-react";
import type { AuthUserData } from "../../../services/auth/auth.types";

// --- DATA ---
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    { name: "Baza wiedzy", logo: <Origami />, plan: "Librus" },
    { name: "Acme Corp.", logo: <AudioLinesIcon />, plan: "Startup" },
    { name: "Evil Corp.", logo: <TerminalIcon />, plan: "Free" },
  ],

  actions: [
    { title: "Nowy artykuł", url: "/articles/new", icon: <Plus /> },
    { title: "Odnotuj temat", url: "/categories/new", icon: <Layers2 /> },
  ],

  navMain: [
    { title: "Start", url: "/dashboard", icon: <House /> },
    { title: "Baza artykułów", url: "/articles", icon: <BookSearch /> },
    { title: "Przydatne linki", url: "/important-links", icon: <Link /> },
    {
      title: "Rejestr tematów",
      url: "/register-activity",
      icon: <NotepadText />,
    },
    { title: "FAQ", url: "/faq", icon: <BookOpen /> },
    { title: "Statystyki", url: "/stats", icon: <ChartNoAxesCombined /> },
    { title: "Narzędzia sieciowe", url: "/network-tools", icon: <Network /> },
    { title: "Szkoły projektowe", url: "/schools", icon: <School /> },
    { title: "Działy i kontakty", url: "/departments", icon: <NotebookTabs /> },
    { title: "Zabawne wiad.", url: "/fun", icon: <Smile /> },
    { title: "Oczekujące", url: "/pending", icon: <PieChartIcon /> },
  ],

  projects: [
    { name: "Ulubione artykuły", url: "#", icon: <Heart /> },
    { name: "Kolekcje", url: "#", icon: <Layers2 /> },
    { name: "Wpisy", url: "#", icon: <Newspaper /> },
    { name: "Etykiety", url: "#", icon: <LandPlot /> },
  ],

  others: [
    { name: "Ustawienia", url: "/settings", icon: <Settings /> },
    { name: "Zgłoszenia", url: "/feedback", icon: <MailQuestionMark /> },
    { name: "Lista zmian", url: "/changelog", icon: <CircleQuestionMark /> },
  ],
};

interface IProps extends React.ComponentProps<typeof Sidebar> {
  user: AuthUserData;
}

export function AppSidebar({ user, ...props }: IProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r bg-sidebar/80 backdrop-blur"
      {...props}
    >
      {/* SIDEBAR CONTENT */}
      <Sidebar collapsible="none" className="flex-1">
        {/* HEADER */}
        <SidebarHeader className="px-4 py-3">
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className="px-2 py-3 space-y-6">
          {/* QUICK ACTIONS */}
          <div className="space-y-1">
            <p className="px-3 text-xs text-muted-foreground">Szybkie akcje</p>

            <SidebarMenu>
              {data.actions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-9">
                    <a href={item.url} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>

          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavOthers others={data.others} />
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="p-2 border-t">
          <NavUser user={user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}
