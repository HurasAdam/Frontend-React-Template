"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
import { NavOthers } from "./ui/nav-others";

// This is sample data.
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
    {
      title: "Start",
      url: "dashboard",
      icon: <House />,
    },
    {
      title: "Baza artykułów",
      url: "articles",
      icon: <BookSearch />,
    },
    {
      title: "Przydate linki",
      url: "important-links",
      icon: <Link />,
    },
    {
      title: "Rejestr tematów",
      url: "settings",
      icon: <NotepadText />,
    },
    {
      title: "FAQ",
      url: "#",
      icon: <BookOpen />,
    },
    {
      title: "Statystyki",
      url: "#",
      icon: <ChartNoAxesCombined />,
    },
    {
      title: "Narzędzia sieciowe",
      url: "#",
      icon: <Network />,
    },
    {
      title: "Szkoły projektowe",
      url: "#",
      icon: <School />,
    },
    {
      title: "Działy i kontakty",
      url: "#",
      icon: <NotebookTabs />,
    },
    {
      title: "Zabawne wiad.",
      url: "#",
      icon: <Smile />,
    },
    {
      title: "Oczekujące weryfikacji",
      url: "#",
      icon: <PieChartIcon />,
    },
  ],
  projects: [
    {
      name: "Ulubione artykuły",
      url: "#",
      icon: <Heart />,
    },
    {
      name: "Kolekcje",
      url: "#",
      icon: <Layers2 />,
    },
    {
      name: "Wpisy",
      url: "#",
      icon: <Newspaper />,
    },
    {
      name: "Etykiety",
      url: "#",
      icon: <LandPlot />,
    },
  ],

  others: [
    {
      name: "Ustawienia",
      url: "settings",
      icon: <Settings />,
    },
    {
      name: "Zgłoszenia i sugestie",
      url: "#",
      icon: <MailQuestionMark />,
    },
    {
      name: "Lista zmian",
      url: "#",
      icon: <CircleQuestionMark />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavOthers others={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
