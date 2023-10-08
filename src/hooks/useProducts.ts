import { useSelector } from 'react-redux';
import { AppRootState } from 'src/store/types';

export const useProducts = () => {
  const products = useSelector((state: AppRootState) => state.productSlice);
  return { products: products?.data ?? [], isLoading: products.isLoading };
};
