import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { colors, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

// Hardcoded services for the MVP; in a real implementation you'd fetch this from the API
const SERVICES = [
  { id: 'cleaning', label: 'Ménage', basePrice: 29 },
  { id: 'plumbing', label: 'Plomberie', basePrice: 49 },
  { id: 'electricity', label: 'Électricité', basePrice: 59 },
];

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2) }}>
      <Text
        style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: spacing(2) }}
      >
        Choisissez un service
      </Text>
      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ServiceForm', { serviceId: item.id })}
            style={{
              backgroundColor: '#fff',
              padding: spacing(2),
              borderRadius: 16,
              marginBottom: spacing(1),
            }}
          >
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>{item.label}</Text>
            <Text style={{ color: colors.link, marginTop: 4 }}>Dès {item.basePrice}€</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
