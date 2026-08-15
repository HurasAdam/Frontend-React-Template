import type { TopicProduct } from "../view/RegisterActivityPage";

export function ProductBadge({ product }: { product: TopicProduct }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium"
      style={{
        borderColor: `${product.labelColor}30`,
        backgroundColor: `${product.labelColor}0D`,
        color: product.labelColor,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: product.labelColor,
        }}
      />

      {product.name}
    </div>
  );
}
