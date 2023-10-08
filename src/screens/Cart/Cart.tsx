import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/store/cart';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CartCard from './components/CartCard';
import { useHomeLogic } from '../../hooks/useHomeLogic';
import { useCartTotal } from './hooks/useCartTotal';
import { Colors } from '@/theme/Variables';
import Button from '@/components/Button/Button';
import { Separator } from '@/components/Separator/Separator';

const _keyExtractor = (item: CartItem, index: number) =>
  `${item?.product?.id}${index}`;

const Cart = () => {
  const { cartData } = useCart();
  const { total } = useCartTotal();
  const { onPressPlus, onPressMinus } = useHomeLogic();

  const _renderItem = ({ item }: { item: CartItem }) => {
    return (
      <CartCard
        item={item}
        onPressPlus={onPressPlus}
        onPressMinus={onPressMinus}
      />
    );
  };

  if (!cartData?.items?.length) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData?.items ?? []}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        contentContainerStyle={styles.flatlistContainer}
      />
      <View style={styles.checkout}>
        <View style={styles.rowDirection}>
          <Text>Subtotal</Text>
          <Text>{total ?? ''}</Text>
        </View>
        <Separator height={10} />
        <Button style={styles.button} onClick={() => {}}>
          <Text style={styles.buttonText}>CHECKOUT</Text>
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  checkout: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.textGray200,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.success,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
  },
});
