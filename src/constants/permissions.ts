// permissions.ts
export const PERMISSIONS = [
  {
    key: "ADD_ARTICLE",
    label: "Dodawanie artykułów",
    description: "Umożliwia tworzenie artykułów",
    category: "Artykuły",
  },
  {
    key: "EDIT_ARTICLE",
    label: "Edycja artykułów",
    description: "Umożliwia edycję artykułów",
    category: "Artykuły",
  },
  {
    key: "DELETE_ARTICLE",
    label: "Usuwanie artykułów",
    description: "Umożliwia usuwanie artykułów",
    category: "Artykuły",
  },

  {
    key: "ADD_PRODUCT",
    label: "Dodawanie produktów",
    description: "Umożliwia dodawanie produktów",
    category: "Produkty",
  },
  {
    key: "EDIT_PRODUCT",
    label: "Edycja produktów",
    description: "Umożliwia edycję produktów",
    category: "Produkty",
  },
  {
    key: "DELETE_PRODUCT",
    label: "Usuwanie produktów",
    description: "Umożliwia usuwanie produktów",
    category: "Produkty",
  },

  {
    key: "ACCESS_ADMIN_PANEL",
    label: "Dostęp do panelu admina",
    description: "Wejście do panelu administracyjnego",
    category: "Administracja",
  },
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number]["key"];
