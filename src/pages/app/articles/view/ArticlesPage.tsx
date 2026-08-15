"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import {
  Clock,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Ticket,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { conversationTopics, getArticleById } from "../../../../lib/mockData";

const statusColors: Record<string, string> = {
  open: "bg-primary/10 text-primary border-primary/20",
  resolved: "bg-success/10 text-success border-success/20",
  escalated: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-warning/10 text-warning border-warning/20",
};
const statusLabels: Record<string, string> = {
  open: "Otwarty",
  resolved: "Rozwiązany",
  escalated: "Eskalowany",
  pending: "Oczekujący",
};
const priorityColors: Record<string, string> = {
  low: "text-muted-foreground",
  medium: "text-chart-3",
  high: "text-primary",
  urgent: "text-destructive",
};
const priorityLabels: Record<string, string> = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
  urgent: "Pilny",
};

const channelIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  email: Mail,
  chat: MessageSquare,
  phone: Phone,
  ticket: Ticket,
};
const channelLabels: Record<string, string> = {
  email: "E-mail",
  chat: "Czat",
  phone: "Telefon",
  ticket: "Ticket",
};

export function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filtered = useMemo(() => {
    let result = [...conversationTopics];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.client.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "all")
      result = result.filter((t) => t.status === statusFilter);
    if (priorityFilter !== "all")
      result = result.filter((t) => t.priority === priorityFilter);
    result.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    return result;
  }, [search, statusFilter, priorityFilter]);

  const stats = {
    total: conversationTopics.length,
    open: conversationTopics.filter((t) => t.status === "open").length,
    resolved: conversationTopics.filter((t) => t.status === "resolved").length,
    escalated: conversationTopics.filter((t) => t.status === "escalated")
      .length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Baza szablonów</h1>
          <p className="text-sm text-muted-foreground"></p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Dodaj wpis
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Szukaj po tytule, kliencie, treści..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie statusy</SelectItem>
                <SelectItem value="open">Otwarte</SelectItem>
                <SelectItem value="resolved">Rozwiązane</SelectItem>
                <SelectItem value="escalated">Eskalowane</SelectItem>
                <SelectItem value="pending">Oczekujące</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Priorytet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie priorytety</SelectItem>
                <SelectItem value="urgent">Pilny</SelectItem>
                <SelectItem value="high">Wysoki</SelectItem>
                <SelectItem value="medium">Średni</SelectItem>
                <SelectItem value="low">Niski</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              wpisów
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((conv) => {
          const ChannelIcon = channelIcons[conv.channel] || Ticket;
          const linkedArticle = conv.linkedArticleId
            ? getArticleById(conv.linkedArticleId)
            : null;
          return (
            <Card
              key={conv.id}
              className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <ChannelIcon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {conv.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {conv.client}
                          </span>
                          <span className="text-border">·</span>
                          <span className="text-xs text-muted-foreground">
                            {conv.product}
                          </span>
                          <span className="text-border">·</span>
                          <span className="text-xs text-muted-foreground">
                            {conv.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            priorityColors[conv.priority],
                          )}
                        >
                          {priorityLabels[conv.priority]}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "h-5 text-[10px]",
                            statusColors[conv.status],
                          )}
                        >
                          {statusLabels[conv.status]}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {conv.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {conv.agent}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="rounded bg-muted px-1.5 py-0.5">
                          {channelLabels[conv.channel]}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(conv.updatedAt).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {linkedArticle && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <LinkIcon className="h-3 w-3" />
                          {linkedArticle.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
