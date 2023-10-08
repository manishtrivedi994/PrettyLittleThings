import Button from '@/components/Button/Button';
import { Separator } from '@/components/Separator/Separator';
import { CartItem } from '@/store/cart';
import { Product } from '@/store/products';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  item: CartItem;
  onPressPlus: ({ item }: { item: Product }) => void;
  onPressMinus: ({ item }: { item: Product }) => void;
};

const CartCard = ({ item, onPressMinus, onPressPlus }: Props) => {
  const { product } = item ?? {};

  const _onPressPlus = useCallback(() => {
    onPressPlus?.({ item: product });
  }, [onPressPlus]);

  const _onPressMinus = useCallback(() => {
    onPressMinus?.({ item: product });
  }, [onPressMinus]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product?.img }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={[styles.mr4, styles.w60]}>
        <Text>{product?.name ?? ''}</Text>
        <Text>{`£${product?.price ?? ''}`}</Text>
        <Text>{product?.colour ?? ''}</Text>
      </View>
      <View style={styles.centerAlign}>
        <Button onClick={_onPressPlus}>
          <Icon name="pluscircleo" size={20} />
        </Button>
        <Separator height={4} />
        <Text>{item?.quantity ?? ''}</Text>
        <Separator height={4} />
        <Button onClick={_onPressMinus}>
          <Icon name="minuscircleo" size={20} />
        </Button>
      </View>
    </View>
  );
};

export default React.memo(CartCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 100,
    aspectRatio: 1,
  },
  mr4: { marginRight: 4 },
  w60: { width: '60%' },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
