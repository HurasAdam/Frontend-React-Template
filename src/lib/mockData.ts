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

export type LabelColorKey =
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "teal"
  | "orange"
  | "slate"
  | "cyan";

export const labelColorz: Record<
  LabelColorKey,
  { bg: string; text: string; dot: string }
> = {
  blue: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  green: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  amber: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
  teal: { bg: "bg-teal-100", text: "text-teal-700", dot: "bg-teal-500" },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  slate: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-700", dot: "bg-cyan-500" },
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

export type Label = {
  id: string;
  name: string;
  color: LabelColorKey;
  articleCount: number;
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

export const conversationTopics: ConversationTopic[] = [
  {
    id: "t1",
    title: "Błąd synchronizacji kontaktów z Microsoft 365",
    client: "Firma Kowalski Sp. z o.o.",
    agent: "Katarzyna Nowak",
    product: "SoftBase CRM",
    category: "Integracje",
    status: "resolved",
    priority: "high",
    channel: "ticket",
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-09-02T14:30:00Z",
    summary:
      "Klient zgłaszał błąd synchronizacji kontaktów między CRM a Microsoft 365. Problem rozwiązany przez rekonfigurację uprawnień aplikacji Azure AD.",
    linkedArticleId: "a1",
  },
  {
    id: "t2",
    title: "Problem z logowaniem — błąd 403 Forbidden",
    client: "TechCorp Poland",
    agent: "Marek Wiśniewski",
    product: "SoftBase CRM",
    category: "Rozwiązywanie problemów",
    status: "open",
    priority: "urgent",
    channel: "chat",
    createdAt: "2024-09-04T08:15:00Z",
    updatedAt: "2024-09-04T11:00:00Z",
    summary:
      "Użytkownik otrzymuje błąd 403 przy próbie logowania. Prawdopodobnie wygasła sesja lub token autoryzacyjny. Wymaga eskalacji do zespołu infrastruktury.",
    linkedArticleId: "a2",
  },
  {
    id: "t3",
    title: "Konfiguracja modułu księgowego — JPK",
    client: "Biuro Rachunkowe Plus",
    agent: "Piotr Lewandowski",
    product: "SoftBase ERP",
    category: "Księgowość",
    status: "resolved",
    priority: "medium",
    channel: "phone",
    createdAt: "2024-08-28T09:00:00Z",
    updatedAt: "2024-08-29T16:00:00Z",
    summary:
      "Klient potrzebował pomocy z konfiguracją eksportu JPK_V7. Przeprowadzono przez telefon, wysłano dodatkową dokumentację.",
    linkedArticleId: "a5",
  },
  {
    id: "t4",
    title: "Migracja danych z systemu Sage do SoftBase ERP",
    client: "Produkcja-Export Sp. j.",
    agent: "Anna Kowalczyk",
    product: "SoftBase ERP",
    category: "Migracja",
    status: "escalated",
    priority: "high",
    channel: "ticket",
    createdAt: "2024-08-20T14:00:00Z",
    updatedAt: "2024-09-03T10:00:00Z",
    summary:
      "Migracja danych z Sage 50 do SoftBase ERP. Wymaga niestandardowego mapowania pól. Eskalowane do zespołu wdrożeniowego.",
    linkedArticleId: "a6",
  },
  {
    id: "t5",
    title: "Dashboard BI nie odświeża danych w czasie rzeczywistym",
    client: "Logistyka24",
    agent: "Marek Wiśniewski",
    product: "SoftBase BI",
    category: "Dashboardy",
    status: "pending",
    priority: "medium",
    channel: "email",
    createdAt: "2024-09-03T11:30:00Z",
    updatedAt: "2024-09-03T15:00:00Z",
    summary:
      "Klient zgłasza, że dashboard nie odświeża się automatycznie. Prawdopodobnie problem z harmonogramem odświeżania źródła danych.",
    linkedArticleId: "a7",
  },
  {
    id: "t6",
    title: "Konfiguracja MFA dla wszystkich użytkowników",
    client: "SecureBank S.A.",
    agent: "Katarzyna Nowak",
    product: "SoftBase Cloud",
    category: "Bezpieczeństwo",
    status: "resolved",
    priority: "urgent",
    channel: "phone",
    createdAt: "2024-08-25T10:00:00Z",
    updatedAt: "2024-08-26T12:00:00Z",
    summary:
      "Bank wymusił MFA dla wszystkich 500 użytkowników. Skonfigurowano politykę bezpieczeństwa i przeprowadzono szkolenie.",
    linkedArticleId: "a9",
  },
  {
    id: "t7",
    title: "Aplikacja mobilna nie synchronizuje danych offline",
    client: "Handlowcy Polska",
    agent: "Anna Kowalczyk",
    product: "SoftBase Mobile",
    category: "Synchronizacja",
    status: "resolved",
    priority: "high",
    channel: "ticket",
    createdAt: "2024-08-30T09:00:00Z",
    updatedAt: "2024-08-31T14:00:00Z",
    summary:
      "Zespół handlowców pracujący w terenie zgłaszał brak synchronizacji offline. Problem rozwiązany przez wyczyszczenie cache i aktualizację aplikacji.",
    linkedArticleId: "a11",
  },
  {
    id: "t8",
    title: "Zapytanie o możliwości integracji API z systemem zewnętrznym",
    client: "InnovTech Sp. z o.o.",
    agent: "Piotr Lewandowski",
    product: "SoftBase CRM",
    category: "Integracje",
    status: "open",
    priority: "low",
    channel: "email",
    createdAt: "2024-09-04T13:00:00Z",
    updatedAt: "2024-09-04T13:00:00Z",
    summary:
      "Klient pyta o możliwości integracji API CRM z ich systemem ERP. Wysłano dokumentację API i zaplanowano call techniczny.",
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export type ArticleVariant = {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  marker: string | null;
  folder: { id: string; name: string };
  workspace: { id: string; name: string; labelColor: string; iconKey: string };
  author: { name: string; initials: string; role: string };
  variants: ArticleVariant[];
  createdAt: string;
  updatedAt: string;
};

export const labels: Label[] = [
  { id: "important", name: "Ważne", color: "rose", articleCount: 9 },
  { id: "draft", name: "Wersja robocza", color: "slate", articleCount: 4 },
  { id: "reviewed", name: "Zweryfikowane", color: "green", articleCount: 27 },
  { id: "internal", name: "Wewnętrzne", color: "amber", articleCount: 11 },
  { id: "public", name: "Publiczne", color: "blue", articleCount: 18 },
  { id: "legal", name: "Prawne", color: "cyan", articleCount: 6 },
];

export const mockArticle: KnowledgeArticle = {
  id: "6a7b882fa252e417c5fd76ac",
  title:
    "Nie pamiętam hasła — procedura odzyskiwania dostępu do konta w module logowania",
  marker: null,
  folder: { id: "6a7a3f5160feff82a6b415bd", name: "Mobilne dodatki" },
  workspace: {
    id: "6a665947cac399066953f103",
    name: "Logowanie",
    labelColor: "#EF4444",
    iconKey: "Rocket",
  },
  author: {
    name: "Anna Kowalska",
    initials: "AK",
    role: "Specjalista pomocy technicznej",
  },
  createdAt: "2026-08-11T20:38:07.450Z",
  updatedAt: "2026-08-19T09:12:44.000Z",
  variants: [
    {
      id: "6a7b882fa252e417c5fd76ae",
      variantName: "Wersja 1",
      order: 0,
      variantContent: `Szanowna Pani,

dziękuję za przesłanie wiadomości.

W nawiązaniu do przesłanej wiadomości pozwoliłem sobie przetestować opisaną sytuację w środowisku testowym jednakże nie zauważyłem podobnej nieprawidłowości - Usunięcie wpisów z planu lekcji w module ZŚK jest możliwe, natomiast wpisy usunięciu nie są już widoczne w planie zajęć.

W tym przypadku prawdopodobnie problem występuje po stronie Pani przeglądarki internetowej. W tej sytuacji proszę o wyczyszczenie plików cookies oraz pamięci podręcznej przeglądarki (w przypadku przeglądarki Firefox i Google Chrome można to zrobić wybierając kombinację klawiszy Ctrl + Shift + Delete).

Jeżeli wykonanie tej czynności nie przyniosłoby efektu, proszę spróbować zmienić przeglądarkę na inną niż aktualnie używana np. jedną z wcześniej wymienionych oraz zalogować się do aplikacji w nowym oknie w trybie prywatnym (w przypadku przeglądarki Firefox można je otworzyć wybierając kombinację klawiszy Ctrl + Shift + P).

Dodatkowo w poniżej w linku zamieszczam instrukcję dotyczącą czyszczenia danych tymczasowych dla przeglądarki:

Google Chrome - https://support.google.com/accounts/answer/32050?hl=pl&co=GENIE.Platform%3DDesktop
Firefox - https://help.webex.com/pl-pl/article/WBX38898/Wyczy%C5%9B%C4%87-pami%C4%99%C4%87-podr%C4%99czn%C4%85-i-pliki-cookie-w-przegl%C4%85darce-Mozilla-Firefox
Opera - https://help.opera.com/pl/latest/security-and-privacy/

Proszę również upewnić się, że korzystają Państwo z najnowszej wersji przeglądarki.

W przypadku dodatkowych pytań pozostaję do dyspozycji.`,
    },
    {
      id: "6a7b882fa252e417c5fd76af",
      variantName: "Wersja 2 — skrócona",
      order: 1,
      variantContent: `Dzień dobry,

dziękuję za zgłoszenie.

Aby odzyskać dostęp do konta, proszę skorzystać z opcji „Nie pamiętam hasła" dostępnej na ekranie logowania. Na adres e-mail przypisany do konta zostanie wysłana wiadomość z linkiem do ustawienia nowego hasła (link jest aktywny przez 30 minut).

Jeżeli wiadomość nie dotarła, proszę sprawdzić folder SPAM oraz upewnić się, że adres e-mail jest poprawnie przypisany do konta.

W przypadku dodatkowych pytań pozostaję do dyspozycji.`,
    },
    {
      id: "6a7b882fa252e417c5fd76b0",
      variantName: "Wersja 3 — eskalacja",
      order: 2,
      variantContent: `Dzień dobry,

potwierdzam przyjęcie zgłoszenia dotyczącego problemu z logowaniem.

Zgłoszenie zostało przekazane do zespołu technicznego w celu weryfikacji konfiguracji konta. O wyniku analizy poinformuję Państwa niezwłocznie po otrzymaniu informacji zwrotnej, nie później niż w ciągu 2 dni roboczych.

Przepraszam za utrudnienia i dziękuję za cierpliwość.`,
    },
  ],
};
