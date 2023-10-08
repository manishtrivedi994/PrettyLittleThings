import React from 'react';
import { StyleSheet, View } from 'react-native';

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

export default React.memo(ItemSeparator);

const styles = StyleSheet.create({
  itemSeparator: { height: 20, width: 20 },
});
