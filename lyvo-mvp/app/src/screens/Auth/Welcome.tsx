import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

export default function Welcome() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing(3) }}>
      <Text style={{ color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: spacing(4) }}>
        Bienvenue sur LYVO
      </Text>
      <Pressable
        onPress={() => nav.navigate('SignIn')}
        style={{ backgroundColor: colors.accent, paddingVertical: spacing(2), paddingHorizontal: spacing(4), borderRadius: 16 }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>Commencer</Text>
      </Pressable>
    </View>
  );
}
