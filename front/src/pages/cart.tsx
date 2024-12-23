import {Suspense, useContext} from 'react';
import {useSuspenseQuery} from "@tanstack/react-query"
import {CartContext} from '@/providers/cart';
import { Cart } from '@/types';
import { getProducts } from '@/api/products';
import { Loading } from '@/components/loading';
import { ProductList } from '@/components/product_list';

export function CartPage(): JSX.Element {
  const {cart} = useContext(CartContext);

  if (Object.keys(cart).length === 0) {
    return <div data-test="cart-empty-message">cart is empty</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <CartPanel cart={cart} />
    </Suspense>
  );
}

function CartPanel({cart}: {cart: Cart}): JSX.Element {
  const productIds = Object.keys(cart).map(Number);

  const {data: products} = useSuspenseQuery({
    queryKey: ["products", {ids: productIds}],
    queryFn: () => getProducts(productIds),
  });

  const totalQuantity = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = products.reduce(
    (sum, product) => sum + (cart[product.id] || 0) * product.price,
    0,
  );

  return (
    <div className="flex flex-col gap-8">
      <ul className="border p-4" data-test="cart-summary">
        <li data-test="total-price">Total price: {totalPrice} coins</li>
        <li data-test="total-quantity">Total quantity: {totalQuantity}</li>
      </ul>
      <ProductList products={products} />
    </div>
  );
}