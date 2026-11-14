/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export function ArticlesPageBreadcrumbs() {
  return (
    <nav
      aria-label="Okruszki"
      className="flex items-center gap-2 text-xs text-muted-foreground"
    >
      <span className="font-medium text-foreground">Tablica</span>

      <span aria-hidden="true">/</span>

      <span>Artykuły</span>
    </nav>
  );
}
