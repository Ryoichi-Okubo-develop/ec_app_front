import { ProductWithDetails } from "@/types";

export function ProductList({
    products,
}: {
    products: ProductWithDetails[];
}): JSX.Element {
    return (
        <ul className="flex flex-col gap-4" data-test="product-list">
            {products.map(product => (
                <ProductListItem product={product} key={product.id} />
            ))}
        </ul>
    );
}

function ProductListItem({
    product,
  }: {
    product: ProductWithDetails;
  }): JSX.Element {
    const lastOrderedAt = product.lastOrderedAt
      ? new Date(product.lastOrderedAt)
      : undefined;
  
    return (
      <li
        className="flex flex-row justify-between gap-8 border p-4"
        data-test={`product-item-${product.id}`}
      >
        <div className="flex flex-row items-center gap-8">
          <img
            src={`/image/${product.imageName}`}
            className="h-32"
            data-test="product-image"
          />
          <div>
            {lastOrderedAt && (
              <div data-test="product-last-ordered-at">
                last order: {lastOrderedAt.getFullYear()}/
                {lastOrderedAt.getMonth() + 1}/{lastOrderedAt.getDate()}
              </div>
            )}
            <div className="text-xl" data-test="product-name">
              {product.name}
            </div>
            <div className="font-bold" data-test="product-price">
              {product.price} coins
            </div>
          </div>
        </div>
      </li>
    );
  }