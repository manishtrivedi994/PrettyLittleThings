import { useTheme } from '@/hooks';
import React from 'react';
import { View } from 'react-native';

type Props = {
  height: number;
  color?: string;
  style?: object;
};
export const Separator = ({ height, color, style }: Props) => {
  const { Colors } = useTheme();
  return (
    <View
      style={[{ height, backgroundColor: color ?? Colors.transparent }, style]}
    />
  );
};

Separator.defaultProps = {
  style: {},
  color: '',
};
