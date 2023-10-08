import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/products'; // Import your async action

export const useFetchProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);
};
