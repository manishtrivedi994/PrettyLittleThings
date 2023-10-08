import { addToCart, decrementCartItemQuantity } from '@/store/cart';
import { Product } from '@/store/products';
import { useDispatch } from 'react-redux';

export const useHomeLogic = () => {
  const dispatch = useDispatch();
  const onAddToCart = ({ item }: { item: Product }) => {
    dispatch(addToCart({ product: item }));
  };

  const onPressPlus = ({ item }: { item: Product }) => {
    dispatch(addToCart({ product: item }));
  };

  const onPressMinus = ({ item }: { item: Product }) => {
    dispatch(decrementCartItemQuantity({ productId: item?.id }));
  };
  return { onAddToCart, onPressPlus, onPressMinus };
};
