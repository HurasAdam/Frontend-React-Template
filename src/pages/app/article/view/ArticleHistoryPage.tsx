/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  GitCompareArrows,
  History,
  Layers3,
  Pencil,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type HistoryCategory =
  | "CREATED"
  | "CONTENT"
  | "VARIANT"
  | "STATUS"
  | "CLASSIFICATION"
  | "VERIFICATION"
  | "PUBLICATION";

type HistoryEntry = {
  id: string;
  category: HistoryCategory;
  title: string;
  description: string;
  actor: {
    name: string;
    initials: string;
    role: string;
  };
  timestamp: string;
  dateLabel: string;
  details?: {
    label: string;
    before?: string;
    after?: string;
  }[];
};

const article = {
  id: "KB-0248",
  title: "Jak zmienić hasło ucznia w systemie Librus Synergia?",
  product: "Librus Synergia",
  category: "Panel dyrektora",
  reviewStatus: "APPROVED",
  publicationStatus: "PUBLISHED",
};

const historyEntries: HistoryEntry[] = [
  // 26 października – zmiana nazwy i treści jednego wariantu
  {
    id: "event-1",
    category: "VARIANT",
    title: "Zaktualizowano wariant odpowiedzi",
    description:
      "Zmieniono nazwę wariantu oraz rozbudowano jego treść o dokładniejszą instrukcję, wymagane uprawnienia i dodatkowe informacje dla użytkownika.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "14:32",
    dateLabel: "26 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Standardowa odpowiedź",
        after: "Zmiana hasła ucznia – instrukcja dla dyrektora",
      },
      {
        label: "Wprowadzenie",
        before:
          "Aby zmienić hasło ucznia, zaloguj się do systemu Librus Synergia i przejdź do panelu dyrektora.",
        after:
          "Jeżeli uczeń nie może zalogować się do systemu Librus Synergia, administrator lub pracownik posiadający odpowiednie uprawnienia może ustawić nowe hasło z poziomu panelu dyrektora. Przed wykonaniem operacji upewnij się, że wybrano właściwe konto ucznia.",
      },
      {
        label: "Krok 1 – logowanie",
        before: "Zaloguj się do systemu Librus Synergia.",
        after:
          "Otwórz stronę logowania do Librus Synergia i zaloguj się na konto posiadające uprawnienia do zarządzania kontami uczniów. Zwykłe konto nauczyciela może nie udostępniać wszystkich opisanych niżej funkcji.",
      },
      {
        label: "Krok 2 – odnalezienie ucznia",
        before: "Przejdź do listy uczniów i wybierz odpowiednie konto.",
        after:
          "W menu głównym otwórz Panel dyrektora, a następnie przejdź do sekcji zawierającej listę uczniów. Wyszukaj konto po imieniu, nazwisku lub identyfikatorze ucznia. Przed przejściem dalej sprawdź, czy dane wybranego ucznia są poprawne.",
      },
      {
        label: "Krok 3 – szczegóły konta",
        before: "Otwórz szczegóły wybranego ucznia.",
        after:
          "Kliknij wybranego ucznia, aby otworzyć szczegóły jego konta. W zależności od dostępnej konfiguracji systemu przejdź do sekcji związanej z danymi logowania lub bezpieczeństwem konta.",
      },
      {
        label: "Krok 4 – ustawienie nowego hasła",
        before: "Kliknij opcję zmiany hasła i wpisz nowe hasło.",
        after:
          "Wybierz opcję zmiany lub resetowania hasła. Wprowadź nowe hasło zgodne z wymaganiami bezpieczeństwa obowiązującymi w danej konfiguracji systemu. Jeżeli system wymaga dwukrotnego podania hasła, uzupełnij oba pola i sprawdź, czy wartości są identyczne.",
      },
      {
        label: "Krok 5 – zapisanie zmian",
        before: "Zapisz nowe hasło.",
        after:
          "Zatwierdź operację przyciskiem zapisu. Poczekaj na potwierdzenie wykonania operacji i nie zamykaj strony przed zakończeniem przetwarzania żądania. W przypadku pojawienia się komunikatu o błędzie sprawdź uprawnienia oraz poprawność wprowadzonych danych.",
      },
      {
        label: "Informacja dla ucznia",
        before: "Przekaż uczniowi nowe hasło.",
        after:
          "Przekaż uczniowi informację o zmianie hasła w bezpieczny sposób. Nie przesyłaj danych logowania w ogólnodostępnych kanałach komunikacji. Jeżeli organizacja stosuje procedurę wymuszenia zmiany hasła przy następnym logowaniu, poinformuj o tym ucznia.",
      },
      {
        label: "Wymagane uprawnienia",
        before: "Brak dodatkowych informacji.",
        after:
          "Do wykonania operacji wymagane jest konto z uprawnieniami umożliwiającymi zarządzanie danymi logowania uczniów. Jeżeli odpowiednia opcja nie jest widoczna, skontaktuj się z administratorem systemu lub osobą odpowiedzialną za nadawanie uprawnień.",
      },
      {
        label: "Uwagi i ograniczenia",
        before: "Brak.",
        after:
          "Dostępność poszczególnych funkcji może zależeć od konfiguracji systemu oraz przypisanej roli użytkownika. Jeżeli opisane opcje nie są dostępne, nie należy próbować wykonywać operacji z poziomu konta bez wymaganych uprawnień.",
      },
    ],
  },

  // 26 października – zmiana samej nazwy
  {
    id: "event-2",
    category: "VARIANT",
    title: "Zmieniono nazwę wariantu odpowiedzi",
    description:
      "Ujednolicono nazewnictwo wariantów odpowiedzi, aby ich przeznaczenie było bardziej czytelne dla pracowników Helpdesk. Treść wariantu pozostała bez zmian.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "12:18",
    dateLabel: "26 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Dla sekretariatu",
        after: "Instrukcja dla sekretariatu",
      },
    ],
  },

  {
    id: "event-3",
    category: "VERIFICATION",
    title: "Artykuł został zweryfikowany",
    description:
      "Potwierdzono poprawność instrukcji oraz aktualność informacji zawartych w wariantach odpowiedzi.",
    actor: {
      name: "Michał Kowalski",
      initials: "MK",
      role: "Lider helpdesku",
    },
    timestamp: "11:46",
    dateLabel: "26 października 2026",
    details: [
      {
        label: "Status weryfikacji",
        before: "Oczekuje na weryfikację",
        after: "Zweryfikowany",
      },
      {
        label: "Osoba weryfikująca",
        before: "Brak przypisanej osoby",
        after: "Michał Kowalski",
      },
    ],
  },

  {
    id: "event-4",
    category: "STATUS",
    title: "Przesłano artykuł do weryfikacji",
    description:
      "Autor przekazał zaktualizowany artykuł wraz z wariantami odpowiedzi do sprawdzenia przez lidera.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "10:58",
    dateLabel: "26 października 2026",
    details: [
      {
        label: "Status weryfikacji",
        before: "Wymaga ponownej weryfikacji",
        after: "Oczekuje na weryfikację",
      },
    ],
  },

  // 24 października – zmiana wyłącznie treści
  {
    id: "event-5",
    category: "VARIANT",
    title: "Zmieniono treść wariantu odpowiedzi",
    description:
      "Doprecyzowano instrukcję wykorzystywaną podczas obsługi zgłoszeń telefonicznych. Nazwa wariantu pozostała bez zmian.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "15:24",
    dateLabel: "24 października 2026",
    details: [
      {
        label: "Treść odpowiedzi",
        before:
          "Proszę skontaktować się z administratorem szkoły w celu zmiany hasła.",
        after:
          "W celu odzyskania dostępu do konta proszę skontaktować się z administratorem szkoły lub osobą odpowiedzialną za zarządzanie kontami uczniów. Osoba ta zweryfikuje dane i sprawdzi możliwość zresetowania hasła.\n\nJeżeli problem dotyczy wyłącznie logowania do aplikacji mobilnej, proszę również sprawdzić, czy logowanie przez przeglądarkę internetową jest możliwe.\n\nPracownik Helpdesk nie powinien prosić o przekazanie aktualnego hasła użytkownika.",
      },
    ],
  },

  // 24 października – zmiana nazwy i treści
  {
    id: "event-6",
    category: "VARIANT",
    title: "Zaktualizowano wariant odpowiedzi",
    description:
      "Zmieniono nazwę wariantu oraz dostosowano instrukcję do sposobu obsługi zgłoszeń dotyczących kont uczniów.",
    actor: {
      name: "Anna Kowalska",
      initials: "AK",
      role: "Pracownik Helpdesk",
    },
    timestamp: "13:10",
    dateLabel: "24 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Odpowiedź dla rodzica",
        after: "Instrukcja dla rodzica – problem z dostępem",
      },
      {
        label: "Treść odpowiedzi",
        before:
          "Rodzic powinien skontaktować się ze szkołą, aby uzyskać pomoc z dostępem do konta ucznia.",
        after:
          "Jeżeli rodzic zgłasza problem z dostępem do konta ucznia, należy najpierw ustalić, czy problem dotyczy konta rodzica, czy konta ucznia.\n\nW przypadku konta ucznia:\n1. Rodzic powinien skontaktować się z sekretariatem szkoły lub wychowawcą.\n2. Pracownik szkoły powinien zweryfikować dane ucznia.\n3. Reset hasła należy przeprowadzić zgodnie z uprawnieniami przypisanymi do konta pracownika.\n\nHelpdesk nie powinien prosić rodzica o przesyłanie hasła ani innych poufnych danych.",
      },
    ],
  },

  // 23 października – zmiana samej nazwy
  {
    id: "event-7",
    category: "VARIANT",
    title: "Zmieniono nazwę wariantu odpowiedzi",
    description:
      "Doprecyzowano nazwę wariantu, aby wskazywała jego zastosowanie w obsłudze zgłoszeń od administratorów szkoły. Treść nie została zmieniona.",
    actor: {
      name: "Michał Kowalski",
      initials: "MK",
      role: "Lider helpdesku",
    },
    timestamp: "16:42",
    dateLabel: "23 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Dla administratora",
        after: "Instrukcja dla administratora szkoły",
      },
    ],
  },

  // 23 października – zmiana wyłącznie treści
  {
    id: "event-8",
    category: "VARIANT",
    title: "Zmieniono treść wariantu odpowiedzi",
    description:
      "Uzupełniono instrukcję dla administratora o dodatkowe kroki diagnostyczne oraz sposób postępowania w przypadku braku uprawnień.",
    actor: {
      name: "Michał Kowalski",
      initials: "MK",
      role: "Lider helpdesku",
    },
    timestamp: "14:05",
    dateLabel: "23 października 2026",
    details: [
      {
        label: "Treść odpowiedzi",
        before:
          "Zmiany hasła należy dokonać z poziomu panelu administracyjnego. Wybierz ucznia i ustaw nowe hasło.",
        after:
          "Resetowanie hasła ucznia należy wykonać z konta pracownika posiadającego odpowiednie uprawnienia administracyjne.\n\nPrzed rozpoczęciem:\n- upewnij się, że wybrano właściwą jednostkę,\n- zweryfikuj dane ucznia,\n- sprawdź, czy konto pracownika posiada uprawnienia do zarządzania kontami.\n\nNastępnie:\n1. Przejdź do modułu Uczniowie.\n2. Wyszukaj właściwego ucznia.\n3. Otwórz szczegóły jego konta.\n4. Wybierz funkcję resetowania hasła.\n5. Zatwierdź zmianę.\n\nJeśli funkcja jest niedostępna, sprawdź konfigurację uprawnień administratora. W przypadku błędu podczas zapisywania zmian zanotuj komunikat i przekaż go do dalszej analizy.",
      },
    ],
  },

  // 22 października – zmiana nazwy i treści
  {
    id: "event-9",
    category: "VARIANT",
    title: "Zaktualizowano wariant odpowiedzi",
    description:
      "Zmieniono nazwę krótkiej odpowiedzi oraz rozszerzono jej treść o informacje przydatne podczas pierwszego kontaktu z użytkownikiem.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "10:36",
    dateLabel: "22 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Krótka odpowiedź",
        after: "Szybka odpowiedź dla pracownika",
      },
      {
        label: "Treść odpowiedzi",
        before:
          "Hasło ucznia można zmienić w jego karcie w module Uczniowie. Wybierz konto, zmień hasło i zapisz zmiany.",
        after:
          "Hasło ucznia możesz zresetować z poziomu modułu Uczniowie:\n\n1. Wyszukaj ucznia.\n2. Otwórz jego kartę.\n3. Przejdź do ustawień konta.\n4. Wybierz resetowanie hasła i zatwierdź zmianę.\n\nJeśli nie widzisz tej opcji, sprawdź uprawnienia swojego konta lub skontaktuj się z administratorem szkoły.\n\nPamiętaj, aby nowe dane logowania przekazać użytkownikowi w bezpieczny sposób.",
      },
    ],
  },

  // 21 października – zmiana wyłącznie treści
  {
    id: "event-10",
    category: "VARIANT",
    title: "Zmieniono treść wariantu odpowiedzi",
    description:
      "Rozbudowano instrukcję dotyczącą aplikacji mobilnej o weryfikację wersji aplikacji, połączenia internetowego i możliwość logowania przez przeglądarkę.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "16:21",
    dateLabel: "21 października 2026",
    details: [
      {
        label: "Treść odpowiedzi",
        before:
          "W przypadku problemów z logowaniem do aplikacji mobilnej należy sprawdzić poprawność danych logowania. Jeśli problem nadal występuje, spróbuj ponownie uruchomić aplikację.",
        after:
          "W przypadku problemów z logowaniem do aplikacji mobilnej Librus:\n\n1. Sprawdź, czy użytkownik korzysta z właściwych danych logowania.\n2. Upewnij się, że urządzenie ma aktywne połączenie z internetem.\n3. Sprawdź, czy użytkownik może zalogować się przez przeglądarkę.\n4. Zamknij aplikację i uruchom ją ponownie.\n5. Sprawdź, czy dostępna jest aktualizacja aplikacji.\n6. W razie potrzeby wyczyść pamięć podręczną aplikacji.\n\nJeżeli logowanie przez przeglądarkę działa poprawnie, a aplikacja nadal zgłasza błąd, poproś użytkownika o przesłanie:\n- modelu urządzenia,\n- wersji systemu operacyjnego,\n- wersji aplikacji,\n- dokładnej treści komunikatu błędu.",
      },
    ],
  },

  // 20 października – zmiana samej nazwy
  {
    id: "event-11",
    category: "VARIANT",
    title: "Zmieniono nazwę wariantu odpowiedzi",
    description:
      "Ujednolicono nazewnictwo wariantu przeznaczonego do obsługi zgłoszeń dotyczących aplikacji mobilnej. Treść odpowiedzi pozostała bez zmian.",
    actor: {
      name: "Anna Kowalska",
      initials: "AK",
      role: "Pracownik Helpdesk",
    },
    timestamp: "12:48",
    dateLabel: "20 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Wariant mobilny",
        after: "Instrukcja dla aplikacji mobilnej",
      },
    ],
  },

  // 20 października – zmiana nazwy i treści
  {
    id: "event-12",
    category: "VARIANT",
    title: "Zaktualizowano wariant odpowiedzi",
    description:
      "Zmieniono nazwę wariantu oraz uproszczono instrukcję dla użytkowników, którzy nie mogą zalogować się do systemu.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "09:14",
    dateLabel: "20 października 2026",
    details: [
      {
        label: "Nazwa wariantu",
        before: "Instrukcja ogólna",
        after: "Podstawowa instrukcja dla użytkownika",
      },
      {
        label: "Treść odpowiedzi",
        before:
          "Wybierz ucznia z listy, przejdź do jego karty i zmień hasło. Następnie zapisz zmiany.",
        after:
          "Aby zmienić hasło ucznia, przejdź do modułu Uczniowie i otwórz kartę wybranego ucznia.\n\nW ustawieniach konta wybierz opcję resetowania hasła, wprowadź nowe hasło i zatwierdź operację.\n\nJeżeli nie widzisz funkcji resetowania hasła, oznacza to, że Twoje konto może nie posiadać wymaganych uprawnień. W takiej sytuacji skontaktuj się z administratorem szkoły.\n\nPamiętaj, aby przekazać nowe hasło użytkownikowi w bezpieczny sposób.",
      },
    ],
  },

  {
    id: "event-13",
    category: "VERIFICATION",
    title: "Artykuł został zweryfikowany",
    description:
      "Lider zespołu potwierdził aktualność instrukcji i poprawność informacji.",
    actor: {
      name: "Michał Kowalski",
      initials: "MK",
      role: "Lider helpdesku",
    },
    timestamp: "11:30",
    dateLabel: "18 października 2026",
    details: [
      {
        label: "Status weryfikacji",
        before: "Wymaga weryfikacji",
        after: "Zweryfikowany",
      },
      {
        label: "Notatka",
        before: "Brak",
        after:
          "Instrukcja sprawdzona. Opis odpowiada aktualnemu sposobowi obsługi kont uczniów.",
      },
    ],
  },

  {
    id: "event-14",
    category: "CONTENT",
    title: "Zaktualizowano treść artykułu",
    description:
      "Doprecyzowano opis dostępnych uprawnień oraz dodano informację o typowych przyczynach problemów.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "09:42",
    dateLabel: "16 października 2026",
    details: [
      {
        label: "Opis artykułu",
        before:
          "Artykuł opisuje sposób zmiany hasła ucznia w systemie Librus Synergia.",
        after:
          "Artykuł opisuje sposób resetowania hasła ucznia w systemie Librus Synergia, wymagane uprawnienia oraz podstawowe czynności diagnostyczne w przypadku problemów z dostępem do konta.",
      },
      {
        label: "Dodatkowa sekcja",
        before: "Brak",
        after:
          "Dodano sekcję „Najczęstsze problemy”, zawierającą informacje o braku uprawnień, nieaktywnym koncie oraz błędach podczas zapisywania zmian.",
      },
    ],
  },

  {
    id: "event-15",
    category: "CLASSIFICATION",
    title: "Zmieniono klasyfikację artykułu",
    description:
      "Zaktualizowano kategorię, aby ułatwić odnajdywanie instrukcji.",
    actor: {
      name: "Anna Kowalska",
      initials: "AK",
      role: "Pracownik Helpdesk",
    },
    timestamp: "13:15",
    dateLabel: "14 października 2026",
    details: [
      {
        label: "Kategoria",
        before: "Konta użytkowników",
        after: "Panel dyrektora",
      },
      {
        label: "Tagi",
        before: "uczeń, konto",
        after: "hasło, uczniowie, konto, bezpieczeństwo",
      },
    ],
  },

  {
    id: "event-16",
    category: "PUBLICATION",
    title: "Opublikowano artykuł",
    description:
      "Artykuł stał się dostępny dla pracowników korzystających z bazy wiedzy.",
    actor: {
      name: "Michał Kowalski",
      initials: "MK",
      role: "Lider helpdesku",
    },
    timestamp: "09:25",
    dateLabel: "12 października 2026",
    details: [
      {
        label: "Status publikacji",
        before: "Nieopublikowany",
        after: "Opublikowany",
      },
    ],
  },

  {
    id: "event-17",
    category: "CREATED",
    title: "Utworzono artykuł",
    description:
      "Dodano nowy artykuł wraz z podstawowymi informacjami i pierwszym wariantem odpowiedzi.",
    actor: {
      name: "Adam Huras",
      initials: "AH",
      role: "Autor artykułu",
    },
    timestamp: "16:08",
    dateLabel: "10 października 2026",
  },
];

const filters = [
  { value: "ALL", label: "Wszystkie" },
  { value: "CONTENT", label: "Treść" },
  { value: "VARIANT", label: "Warianty odpowiedzi" },
  { value: "STATUS", label: "Status" },
  { value: "CLASSIFICATION", label: "Klasyfikacja" },
  { value: "VERIFICATION", label: "Weryfikacja" },
  { value: "PUBLICATION", label: "Publikacja" },
  { value: "CREATED", label: "Utworzenie" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

const categoryConfig: Record<
  HistoryCategory,
  {
    label: string;
    icon: typeof History;
    iconClass: string;
    backgroundClass: string;
  }
> = {
  CREATED: {
    label: "Utworzenie",
    icon: Plus,
    iconClass: "text-sky-600 dark:text-sky-400",
    backgroundClass: "bg-sky-500/10",
  },
  CONTENT: {
    label: "Treść",
    icon: Pencil,
    iconClass: "text-violet-600 dark:text-violet-400",
    backgroundClass: "bg-violet-500/10",
  },
  VARIANT: {
    label: "Wariant odpowiedzi",
    icon: Layers3,
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
    backgroundClass: "bg-fuchsia-500/10",
  },
  STATUS: {
    label: "Status",
    icon: History,
    iconClass: "text-amber-600 dark:text-amber-400",
    backgroundClass: "bg-amber-500/10",
  },
  CLASSIFICATION: {
    label: "Klasyfikacja",
    icon: Tag,
    iconClass: "text-indigo-600 dark:text-indigo-400",
    backgroundClass: "bg-indigo-500/10",
  },
  VERIFICATION: {
    label: "Weryfikacja",
    icon: ShieldCheck,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    backgroundClass: "bg-emerald-500/10",
  },
  PUBLICATION: {
    label: "Publikacja",
    icon: Send,
    iconClass: "text-teal-600 dark:text-teal-400",
    backgroundClass: "bg-teal-500/10",
  },
};

function HistoryEventIcon({ category }: { category: HistoryCategory }) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div
      className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 ${config.backgroundClass}`}
    >
      <Icon className={`size-[18px] ${config.iconClass}`} />
    </div>
  );
}

function HistoryChangeDetails({
  details,
}: {
  details: NonNullable<HistoryEntry["details"]>;
}) {
  return (
    <div className="space-y-5">
      {details.map((detail, index) => (
        <div key={`${detail.label}-${index}`} className="space-y-2.5">
          <h4 className="text-sm font-semibold">{detail.label}</h4>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2.5">
                <ArrowDownRight className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Przed zmianą
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto p-3">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                  {detail.before ?? "Brak wcześniejszej wartości"}
                </p>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/[0.035]">
              <div className="flex items-center gap-2 border-b border-emerald-500/15 px-3 py-2.5">
                <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Po zmianie
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto p-3">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {detail.after ?? "Brak nowej wartości"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryDetailsDialog({
  entry,
  onOpenChange,
}: {
  entry: HistoryEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={Boolean(entry)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-3xl">
        {entry && (
          <>
            <DialogHeader className="border-b border-border px-6 py-5 pr-12">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                >
                  {categoryConfig[entry.category].label}
                </Badge>

                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  {entry.dateLabel}, {entry.timestamp}
                </span>
              </div>

              <DialogTitle className="text-lg font-semibold tracking-tight">
                {entry.title}
              </DialogTitle>

              <DialogDescription className="text-sm leading-relaxed">
                {entry.description}
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[calc(90vh-170px)] overflow-y-auto px-6 py-5">
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  {entry.actor.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">{entry.actor.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {entry.actor.role}
                  </p>
                </div>

                <div className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <UserRound className="size-3.5" />
                  Wykonawca
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold">Szczegóły zmian</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Porównanie wartości przed i po wykonaniu operacji.
                </p>
              </div>

              <HistoryChangeDetails details={entry.details ?? []} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function HistoryEventCard({
  entry,
  onShowDetails,
}: {
  entry: HistoryEntry;
  onShowDetails: (entry: HistoryEntry) => void;
}) {
  const config = categoryConfig[entry.category];

  return (
    <article className="relative flex gap-4">
      <HistoryEventIcon category={entry.category} />

      <div className="min-w-0 flex-1 pb-7">
        <div className="rounded-2xl border border-border/80 bg-card shadow-sm shadow-black/[0.02] transition-colors hover:border-border">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                  >
                    {config.label}
                  </Badge>

                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    {entry.timestamp}
                  </span>
                </div>

                <h3 className="text-sm font-semibold tracking-tight sm:text-[15px]">
                  {entry.title}
                </h3>

                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>

              {entry.details?.length ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 shrink-0 gap-1.5 self-start rounded-lg px-2.5 text-xs"
                  onClick={() => onShowDetails(entry)}
                >
                  <GitCompareArrows className="size-3.5" />
                  Szczegóły zmian
                </Button>
              ) : null}
            </div>

            <div className="mt-4 flex items-center gap-2.5 border-t border-border/70 pt-3.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-semibold text-foreground">
                {entry.actor.initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">
                  {entry.actor.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {entry.actor.role}
                </p>
              </div>

              <div className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
                <UserRound className="size-3.5" />
                Wykonawca zmiany
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ArticleHistoryPage() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<FilterValue>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("pl");

    return historyEntries.filter((entry) => {
      const matchesFilter =
        activeFilter === "ALL" || entry.category === activeFilter;

      const searchableText = [
        entry.title,
        entry.description,
        entry.actor.name,
        entry.actor.role,
        categoryConfig[entry.category].label,
        ...(entry.details ?? []).flatMap((detail) => [
          detail.label,
          detail.before ?? "",
          detail.after ?? "",
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase("pl");

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [activeFilter, searchQuery]);

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, HistoryEntry[]>();

    for (const entry of filteredEntries) {
      const existing = groups.get(entry.dateLabel) ?? [];
      existing.push(entry);
      groups.set(entry.dateLabel, existing);
    }

    return Array.from(groups.entries());
  }, [filteredEntries]);

  return (
    <main className="min-h-screen w-full min-w-0 text-foreground">
      <div className="w-full min-w-0">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 rounded-lg"
              aria-label="Wróć do poprzedniej strony"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-4" />
              Powrót
            </Button>

            <nav
              aria-label="Okruszki"
              className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span>Baza wiedzy</span>
              <span aria-hidden="true">/</span>
              <span>{article.product}</span>
              <span aria-hidden="true">/</span>
              <span className="max-w-[260px] truncate font-medium text-foreground">
                {article.title}
              </span>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-foreground">
                Historia zmian
              </span>
            </nav>
          </div>

          <Badge
            variant="outline"
            className="w-fit shrink-0 gap-1.5 rounded-lg px-2.5 py-1 font-normal"
          >
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            Aktualnie opublikowany
          </Badge>
        </header>

        {/* Page title */}
        <section className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Historia zmian
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Historia aktywności i modyfikacji artykułu.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-7">
          <div className="flex flex-col gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Szukaj zdarzeń, osób lub zmian..."
                aria-label="Szukaj w historii zmian"
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <Button
                    key={filter.value}
                    type="button"
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "h-8 rounded-lg border border-border px-3 font-medium"
                        : "h-8 rounded-lg px-3 font-normal text-muted-foreground"
                    }
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                    {filter.value === "ALL" && (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        {historyEntries.length}
                      </span>
                    )}
                  </Button>
                );
              })}

              <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1 ? "zdarzenie" : "zdarzeń"}
              </span>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section aria-label="Oś czasu zmian" className="max-w-5xl">
          {groupedEntries.length > 0 ? (
            groupedEntries.map(([dateLabel, entries]) => (
              <div key={dateLabel} className="mb-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40">
                    <Clock3 className="size-4 text-muted-foreground" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">{dateLabel}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {entries.length}{" "}
                      {entries.length === 1 ? "zdarzenie" : "zdarzenia"}
                    </p>
                  </div>

                  <div className="h-px flex-1 bg-border/70" />
                </div>

                <div className="relative pl-1">
                  <div className="absolute bottom-8 left-5 top-0 w-px bg-border/80" />

                  <div className="space-y-1">
                    {entries.map((entry) => (
                      <HistoryEventCard
                        key={entry.id}
                        entry={entry}
                        onShowDetails={setSelectedEntry}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
                <Search className="size-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                Nie znaleziono zdarzeń
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                Zmień wyszukiwaną frazę lub wybierz inny rodzaj zdarzeń.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("ALL");
                }}
              >
                Wyczyść filtry
              </Button>
            </div>
          )}
        </section>
      </div>

      <HistoryDetailsDialog
        entry={selectedEntry}
        onOpenChange={(open) => {
          if (!open) setSelectedEntry(null);
        }}
      />
    </main>
  );
}
