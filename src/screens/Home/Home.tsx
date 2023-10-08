import { useProducts } from '@/hooks/useProducts';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useFetchProducts } from './hooks/useFetchProducts';
import { Product } from '@/store/products';
import ProductCard from './components/ProductCard';
import ItemSeparator from './components/ItemSeparator';
import { useHomeLogic } from '../../hooks/useHomeLogic';

const _keyExtractor = (item: Product, index: number) => `${item?.id}${index}`;
const Home = () => {
  const { products, isLoading } = useProducts();
  useFetchProducts();

  const { onAddToCart, onPressPlus, onPressMinus } = useHomeLogic();

  const _renderItem = ({ item }: { item: Product }) => {
    return (
      <ProductCard
        product={item}
        onAddToCart={onAddToCart}
        onPressPlus={onPressPlus}
        onPressMinus={onPressMinus}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        maxToRenderPerBatch={10}
        numColumns={2}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.flatlistContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
