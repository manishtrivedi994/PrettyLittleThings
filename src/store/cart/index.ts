import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products';

export interface CartItem {
  product: Product;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product } = action.payload;
      const existingItem = state?.items?.find(
        (item: CartItem) => item?.product.id === product?.id,
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      } else {
        state?.items?.push({ ...action.payload, quantity: 1 });
      }
    },

    decrementCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: number }>,
    ) => {
      const { productId } = action.payload;
      const cartItem = state?.items?.find(
        (item: CartItem) => item?.product?.id === productId,
      );
      if (cartItem?.quantity === 1) {
        state.items = state?.items?.filter(
          (item: CartItem) => item.product.id !== cartItem.product.id,
        );
      } else if (cartItem) {
        cartItem.quantity = (cartItem.quantity ?? 0) - 1;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, decrementCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
