import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/store/cart';
import { useMemo } from 'react';

export const useCartTotal = () => {
  const { cartData } = useCart();
  const total = useMemo(() => {
    return cartData?.items
      ?.reduce((acc: number, item: CartItem) => {
        return acc + item.product.price * (item.quantity ?? 1);
      }, 0)
      ?.toFixed(2);
  }, [cartData]);
  return { total };
};
