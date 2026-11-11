import { Link as RouterLink, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface ReviewItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface Props {
  items: ReviewItem[];
}

export function NavReview({ items }: Props) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Weryfikacja</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <RouterLink to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
