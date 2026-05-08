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
  Box,
  ChartNoAxesCombined,
  CircleQuestionMark,
  Cog,
  CogIcon,
  Heart,
  LandPlot,
  Layers2,
  Link,
  MailQuestionMark,
  Network,
  Newspaper,
  NotebookTabs,
  NotepadText,
  PieChartIcon,
  Plus,
  School,
  Settings,
  ShieldCog,
  Smile,
  TerminalIcon,
  Users,
} from "lucide-react";
import { AdminNavMain } from "./AdminNavMain";
import { AdminNavProjects } from "./AdminNavProjects";

// --- DATA ---
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    { name: "Baza wiedzy", logo: <Cog />, plan: "Panel administratora" },
    { name: "Acme Corp.", logo: <AudioLinesIcon />, plan: "Startup" },
    { name: "Evil Corp.", logo: <TerminalIcon />, plan: "Free" },
  ],

  actions: [
    { title: "Dodaj produkt", url: "/articles/new", icon: <Plus /> },
    { title: "Dodaj kategorie", url: "/categories/new", icon: <Layers2 /> },
    { title: "Dodaj tag", url: "/links/new", icon: <Link /> },
    { title: "Dodaj użytkownika", url: "/import", icon: <Network /> },
    { title: "Dodaj temat", url: "/feedback/new", icon: <MailQuestionMark /> },
  ],

  navMain: [
    { title: "Użytkownicy", url: "admin/users", icon: <Users /> },
    { title: "Administratorzy", url: "admin/admins", icon: <ShieldCog /> },
    { title: "Role i uprawnienia", url: "admin/roles", icon: <CogIcon /> },
    { title: "Produkty", url: "admin/products", icon: <Box /> },
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

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
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

          <AdminNavMain items={data.navMain} />
          <AdminNavProjects projects={data.projects} />
          <NavOthers others={data.others} />
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="p-2 border-t">
          <NavUser user={data.user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}
