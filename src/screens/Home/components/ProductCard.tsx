import React, { useCallback, useMemo } from 'react';
import { Product } from '@/store/products';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CARD_WIDTH } from '../contants';
import { useTheme } from '@/hooks';
import { Separator } from '@/components/Separator/Separator';
import Button from '@/components/Button/Button';
import { Colors } from '@/theme/Variables';
import { useCart } from '@/hooks/useCart';
import Icon from 'react-native-vector-icons/AntDesign';
import { ensureHttpsForImageUri } from '../helper';

type Props = {
  product: Product;
  onAddToCart: ({ item }: { item: Product }) => void;
  onPressPlus: ({ item }: { item: Product }) => void;
  onPressMinus: ({ item }: { item: Product }) => void;
  testID?: string;
};
const ProductCard = ({
  product,
  onAddToCart,
  onPressMinus,
  onPressPlus,
  testID,
}: Props) => {
  const { Fonts } = useTheme();
  const { cartData } = useCart();
  const imageUrl = useMemo(() => {
    return ensureHttpsForImageUri(product?.img);
  }, [product?.img]);
  const _onAddToCart = useCallback(() => {
    onAddToCart?.({ item: product });
  }, [onAddToCart]);

  const _onPressPlus = useCallback(() => {
    onPressPlus?.({ item: product });
  }, [onPressPlus]);

  const _onPressMinus = useCallback(() => {
    onPressMinus?.({ item: product });
  }, [onPressMinus]);

  const productInCart = cartData?.items.find(
    (item: { product: Product }) => item?.product?.id === product?.id,
  );

  return (
    <View style={styles.container} testID={testID}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <Separator height={8} />
      <View style={styles.detailsContainer}>
        <View style={styles.price}>
          <Text style={Fonts.textSmall}>{`£${product?.price ?? ''}`}</Text>
        </View>
        <Separator height={2} />
        <Text style={Fonts.titleSmall}>{product?.name ?? ''}</Text>
        <Separator height={2} />
        <Text style={Fonts.textSmall}>{product?.colour ?? ''}</Text>
        <Separator height={4} />
      </View>
      {!productInCart ? (
        <Button style={styles.button} onClick={_onAddToCart}>
          <Text>Add to Cart</Text>
        </Button>
      ) : (
        <View style={styles.quantityContainer}>
          <Button onClick={_onPressMinus}>
            <Icon name="minuscircleo" size={20} />
          </Button>
          <Text>{productInCart?.quantity ?? ''}</Text>
          <Button onClick={_onPressPlus}>
            <Icon name="pluscircleo" size={20} />
          </Button>
        </View>
      )}
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: 8,
  },
  image: {
    width: CARD_WIDTH,
    aspectRatio: 0.7,
  },
  price: {
    backgroundColor: Colors.pink,
    padding: 3,
    borderRadius: 8,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    flexGrow: 1,
  },
  button: {
    backgroundColor: Colors.success,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 4,
  },
});
