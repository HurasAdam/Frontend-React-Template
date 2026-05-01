import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
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
  School,
  Settings,
  Smile,
  TerminalIcon,
} from "lucide-react";

// --- DATA ---
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Baza wiedzy",
      logo: <Origami />,
      plan: "Librus",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    { title: "Start", url: "/dashboard", icon: <House /> },
    { title: "Baza artykułów", url: "/articles", icon: <BookSearch /> },
    { title: "Przydatne linki", url: "/important-links", icon: <Link /> },
    { title: "Rejestr tematów", url: "/topics", icon: <NotepadText /> },
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

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r bg-sidebar/80 backdrop-blur *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/*  LEWY SIDEBAR (IKONY) */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader />

        <SidebarContent className="py-2">
          <SidebarMenu className="gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: item.title }}
                  className="h-9 w-9 rounded-xl mx-auto hover:bg-sidebar-accent/70 transition"
                >
                  <a href={item.url}>{item.icon}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/*  PRAWY SIDEBAR */}
      <Sidebar collapsible="none" className="flex-1">
        <SidebarHeader className="px-4 py-3">
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        <SidebarContent className="px-2 py-3 space-y-5">
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavOthers others={data.others} />
        </SidebarContent>

        <SidebarFooter className="p-2 border-t">
          <NavUser user={data.user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}
