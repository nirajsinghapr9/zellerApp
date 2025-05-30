import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type AvatarProps = {
  name?: string;
  size?: number;
  backgroundColor?: string;
};

export default function Avatar({
  name,
  size = 40,
  backgroundColor = '#e6f7ff',
}: AvatarProps) {
  const initial = name?.[0]?.toUpperCase() || '?';

  return (
    <View
      style={[
        styles.avatarSquare,
        {
          width: size,
          height: size,
          backgroundColor,
        },
      ]}>
      <Text style={[styles.avatarText, {fontSize: size / 2}]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  avatarText: {
    color: '#0099e6',
    fontWeight: 'bold',
  },
});
