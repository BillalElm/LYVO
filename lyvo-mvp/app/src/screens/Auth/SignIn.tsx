import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { colors, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

export default function SignIn() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const onContinue = () => {
    // In a real app you'd call Firebase Auth here
    nav.navigate('Home');
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(3), justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: spacing(4) }}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ backgroundColor: '#fff', padding: spacing(2), borderRadius: 16, marginBottom: spacing(2) }}
      />
      <Pressable
        onPress={onContinue}
        style={{ backgroundColor: colors.accent, padding: spacing(2), borderRadius: 16 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Se connecter</Text>
      </Pressable>
    </View>
  );
}