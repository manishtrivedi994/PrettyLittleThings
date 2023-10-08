import { Layout } from '@/theme';
import { debounce } from '@/utilities/codeUtils';
import React, { useCallback } from 'react';
import { Pressable, ViewStyle } from 'react-native';

const BTN_DEBOUNCE = 250;

type Props = {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};
const CButton = ({ style, children, onClick, disabled }: Props) => {
  const onButtonPress = useCallback(
    debounce(
      () => {
        onClick?.();
      },
      BTN_DEBOUNCE,
      true,
    ),
    [onClick],
  );

  return (
    <Pressable disabled={disabled} style={[style]} onPress={onButtonPress}>
      {children}
    </Pressable>
  );
};

CButton.defaultProps = {
  style: Layout({}).CTA,
  disabled: false,
  onClick: () => {},
};

export default React.memo(CButton);
