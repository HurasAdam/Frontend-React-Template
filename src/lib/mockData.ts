export type Role = "owner" | "admin" | "editor" | "viewer";

export type Workspace = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type Folder = {
  id: string;
  name: string;
  icon: string;
  articleCount: number;
  color: string;
};

export type ArticleVersion = {
  id: string;
  number: number;
  content: string;
  author: string;
  authorInitials: string;
  updatedAt: string;
  isLatest: boolean;
};

export type Article = {
  id: string;
  folderId: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
  readTime: number;
  tags: string[];
  customerReplyVersions?: ArticleVersion[];
  employeeNote?: string;
  employeeNoteAuthor?: string;
  employeeNoteInitials?: string;
  employeeNoteDate?: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  avatar?: string;
  status: "active" | "invited";
  lastActive: string;
};

export type UsefulLink = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  addedBy: string;
  createdAt: string;
};

export const workspace: Workspace = {
  id: "ws-1",
  name: "SoftBase Knowledge",
  description:
    "Helpdesk knowledge base — artykuły, poradniki i FAQ dla zespołu wsparcia.",
  icon: "BookOpen",
  color: "blue",
};

export const folders: Folder[] = [
  {
    id: "f-1",
    name: "Onboarding",
    icon: "Rocket",
    articleCount: 12,
    color: "blue",
  },
  {
    id: "f-2",
    name: "FAQ",
    icon: "HelpCircle",
    articleCount: 34,
    color: "amber",
  },
  {
    id: "f-3",
    name: "Poradniki",
    icon: "GraduationCap",
    articleCount: 8,
    color: "emerald",
  },
  {
    id: "f-4",
    name: "Integracje",
    icon: "Plug",
    articleCount: 5,
    color: "violet",
  },
  {
    id: "f-5",
    name: "Procedury",
    icon: "ClipboardList",
    articleCount: 17,
    color: "rose",
  },
  {
    id: "f-6",
    name: "API Docs",
    icon: "Code2",
    articleCount: 23,
    color: "sky",
  },
];

export const articles: Article[] = [
  {
    id: "a-1",
    folderId: "f-1",
    title: "Jak rozpocząć pracę z SoftBase",
    excerpt:
      "Kompletny przewodnik po pierwszych krokach — od rejestracji po utworzenie pierwszej kolekcji.",
    author: "Anna Kowalska",
    authorInitials: "AK",
    status: "published",
    updatedAt: "2 godz. temu",
    readTime: 6,
    tags: ["początki", "konto"],
    customerReplyVersions: [
      {
        id: "a-1-v2",
        number: 2,
        content:
          "Aby rozpocząć pracę z SoftBase, załóż konto, potwierdź adres e-mail i utwórz pierwszą kolekcję. Następnie możesz zaprosić zespół oraz dodać pierwszy artykuł do bazy wiedzy.",
        author: "Anna Kowalska",
        authorInitials: "AK",
        updatedAt: "2 godz. temu",
        isLatest: true,
      },
      {
        id: "a-1-v1",
        number: 1,
        content:
          "Po rejestracji przejdź do ustawień konta i utwórz swoją pierwszą kolekcję.",
        author: "Piotr Nowak",
        authorInitials: "PN",
        updatedAt: "wczoraj",
        isLatest: false,
      },
    ],
    employeeNote:
      "Warto zapytać nowego klienta, czy chce od razu zaprosić pozostałych członków zespołu.",
    employeeNoteAuthor: "Anna Kowalska",
    employeeNoteInitials: "AK",
    employeeNoteDate: "dzisiaj, 09:42",
  },
  {
    id: "a-2",
    folderId: "f-1",
    title: "Konfiguracja profilu użytkownika",
    excerpt:
      "Ustawienia konta, awatar, powiadomienia e-mail oraz preferencje językowe.",
    author: "Piotr Nowak",
    authorInitials: "PN",
    status: "draft",
    updatedAt: "5 godz. temu",
    readTime: 4,
    tags: ["profil", "ustawienia"],
  },
  {
    id: "a-3",
    folderId: "f-2",
    title: "Jak zresetować hasło",
    excerpt:
      "Najczęstsze pytanie od użytkowników — instrukcja resetowania hasła krok po kroku.",
    author: "Anna Kowalska",
    authorInitials: "AK",
    status: "published",
    updatedAt: "1 dzień temu",
    readTime: 3,
    tags: ["hasło", "logowanie"],
  },
  {
    id: "a-4",
    folderId: "f-2",
    title: "Eksport danych do CSV",
    excerpt:
      "Proces eksportu rekordów z dowolnej kolekcji do pliku CSV z zachowaniem relacji.",
    author: "Marek Wiśniewski",
    authorInitials: "MW",
    status: "review",
    updatedAt: "3 dni temu",
    readTime: 8,
    tags: ["eksport", "csv"],
  },
  {
    id: "a-5",
    folderId: "f-3",
    title: "Tworzenie reguł automatyzacji",
    excerpt:
      "Przewodnik po budowaniu reguł automatyzacji bez kodu — wyzwalacze, warunki i akcje.",
    author: "Piotr Nowak",
    authorInitials: "PN",
    status: "published",
    updatedAt: "4 dni temu",
    readTime: 12,
    tags: ["automatyzacja", "reguły"],
  },
  {
    id: "a-6",
    folderId: "f-4",
    title: "Integracja z Slack",
    excerpt:
      "Połącz SoftBase z Slackiem, aby otrzymywać powiadomienia o nowych zgłoszeniach.",
    author: "Anna Kowalska",
    authorInitials: "AK",
    status: "published",
    updatedAt: "1 tyg. temu",
    readTime: 5,
    tags: ["slack", "integracje"],
  },
  {
    id: "a-7",
    folderId: "f-5",
    title: "Procedura eskalacji zgłoszeń",
    excerpt:
      "Standardowa procedura przekazywania zgłoszeń na wyższe poziomy wsparcia.",
    author: "Marek Wiśniewski",
    authorInitials: "MW",
    status: "published",
    updatedAt: "2 tyg. temu",
    readTime: 7,
    tags: ["eskalacja", "procedury"],
  },
  {
    id: "a-8",
    folderId: "f-6",
    title: "REST API — uwierzytelnianie",
    excerpt:
      "Jak uzyskać token API i używać go do uwierzytelniania żądań do REST API SoftBase.",
    author: "Piotr Nowak",
    authorInitials: "PN",
    status: "draft",
    updatedAt: "3 tyg. temu",
    readTime: 10,
    tags: ["api", "autoryzacja"],
  },
];

export const members: Member[] = [
  {
    id: "m-1",
    name: "Anna Kowalska",
    email: "anna.kowalska@softbase.io",
    initials: "AK",
    role: "owner",
    status: "active",
    lastActive: "Teraz",
  },
  {
    id: "m-2",
    name: "Piotr Nowak",
    email: "piotr.nowak@softbase.io",
    initials: "PN",
    role: "admin",
    status: "active",
    lastActive: "12 min temu",
  },
  {
    id: "m-3",
    name: "Marek Wiśniewski",
    email: "marek.wisniewski@softbase.io",
    initials: "MW",
    role: "editor",
    status: "active",
    lastActive: "2 godz. temu",
  },
  {
    id: "m-4",
    name: "Katarzyna Zielińska",
    email: "katarzyna.zielinska@softbase.io",
    initials: "KZ",
    role: "editor",
    status: "active",
    lastActive: "wczoraj",
  },
  {
    id: "m-5",
    name: "Tomasz Lewandowski",
    email: "tomasz.lewandowski@softbase.io",
    initials: "TL",
    role: "viewer",
    status: "invited",
    lastActive: "—",
  },
];

export const currentUser = {
  name: "Anna Kowalska",
  initials: "AK",
  role: "Owner",
  email: "anna.kowalska@softbase.io",
};

export const labelColors: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  violet: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  sky: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
};

export const statusConfig: Record<
  Article["status"],
  { label: string; bg: string; text: string; dot: string }
> = {
  published: {
    label: "Opublikowany",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  draft: {
    label: "Wersja robocza",
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
  review: {
    label: "W recenzji",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
};

export const roleConfig: Record<
  Role,
  { label: string; bg: string; text: string }
> = {
  owner: { label: "Właściciel", bg: "bg-blue-50", text: "text-blue-700" },
  admin: {
    label: "Administrator",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  editor: { label: "Edytor", bg: "bg-emerald-50", text: "text-emerald-700" },
  viewer: { label: "Obserwator", bg: "bg-gray-100", text: "text-gray-600" },
};

export const usefulLinks: UsefulLink[] = [
  {
    id: "l1",
    title: "Dokumentacja API SoftBase",
    url: "https://docs.softbase.pl/api",
    description:
      "Pełna dokumentacja API REST i GraphQL wszystkich produktów SoftBase.",
    category: "Dokumentacja",
    addedBy: "Tomasz Zieliński",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "l1",
    title: "Dokumentacja API Synergia",
    url: "https://docs.softbase.pl/api",
    description:
      "Pełna dokumentacja API REST i GraphQL wszystkich produktów SoftBase.",
    category: "Procedury",
    addedBy: "Tomasz Zieliński",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "l1",
    title: "Dokumentacja DZD",
    url: "https://docs.softbase.pl/api",
    description:
      "Pełna dokumentacja API REST i GraphQL wszystkich produktów SoftBase.",
    category: "Pomoc",
    addedBy: "Tomasz Zieliński",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "l2",
    title: "Status systemu SoftBase Cloud",
    url: "https://status.softbase.pl",
    description:
      "Aktualny status wszystkich usług SoftBase Cloud, historia incydentów i zaplanowane prace konserwacyjne.",
    category: "Infrastruktura",
    addedBy: "Marek Wiśniewski",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "l3",
    title: "Baza wiedzy KSeF (Ministerstwo Finansów)",
    url: "https://ksef.mf.gov.pl",
    description:
      "Oficjalna baza wiedzy Krajowego Systemu e-Faktur — przepisy, FAQ, narzędzia.",
    category: "Zewnętrzne zasoby",
    addedBy: "Piotr Lewandowski",
    createdAt: "2024-02-01T12:00:00Z",
  },
  {
    id: "l4",
    title: "Forum społeczności SoftBase",
    url: "https://community.softbase.pl",
    description:
      "Forum użytkowników i partnerów SoftBase — pytania, odpowiedzi, wymiana doświadczeń.",
    category: "Społeczność",
    addedBy: "Anna Kowalczyk",
    createdAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "l5",
    title: "Narzędzia diagnostyczne SoftBase",
    url: "https://tools.softbase.pl/diagnostic",
    description:
      "Zestaw narzędzi diagnostycznych: log analyzer, connection tester, performance profiler.",
    category: "Narzędzia",
    addedBy: "Katarzyna Nowak",
    createdAt: "2024-03-01T11:00:00Z",
  },
  {
    id: "l6",
    title: "Harmonogram wydań i changelog",
    url: "https://changelog.softbase.pl",
    description:
      "Harmonogram wydań nowych wersji, lista zmian, poprawek i nowych funkcji.",
    category: "Aktualizacje",
    addedBy: "Tomasz Zieliński",
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "l7",
    title: "Centrum szkoleniowe SoftBase Academy",
    url: "https://academy.softbase.pl",
    description:
      "Kursy online, certyfikacje, materiały szkoleniowe dla partnerów i klientów.",
    category: "Szkolenia",
    addedBy: "Joanna Kamińska",
    createdAt: "2024-01-25T13:00:00Z",
  },
  {
    id: "l8",
    title: "Polityki bezpieczeństwa i RODO",
    url: "https://security.softbase.pl/rodo",
    description:
      "Dokumenty polityk bezpieczeństwa, zgodność z RODO, procedury obsługi danych.",
    category: "Bezpieczeństwo",
    addedBy: "Katarzyna Nowak",
    createdAt: "2024-03-10T09:00:00Z",
  },
];
