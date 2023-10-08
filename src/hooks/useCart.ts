import { AppRootState } from '@/store/types';
import { useSelector } from 'react-redux';

export const useCart = () => {
  const cartData = useSelector((state: AppRootState) => state.cartSlice);
  return { cartData };
};
