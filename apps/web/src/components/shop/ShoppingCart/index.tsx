import { useAppSelector } from "../../../store";
import { CartProductCard } from "../CartCard";

export default function ShoppingCart() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <>
      {cart?.items?.map((product, i) => (
        <CartProductCard product={product} key={i} />
      ))}
    </>
  );
}
