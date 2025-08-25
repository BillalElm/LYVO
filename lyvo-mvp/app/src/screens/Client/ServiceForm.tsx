import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { colors, spacing } from '../../theme';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

export default function ServiceForm() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'ServiceForm'>['route']>();
  const { serviceId } = route.params;

  const [address, setAddress] = useState('');
  const [datetime, setDatetime] = useState('');
  const [notes, setNotes] = useState('');

  const createBooking = async () => {
    try {
      const response = await api.post('/bookings', {
        serviceId,
        address,
        datetime,
        notes,
      });
      const booking = response.data;
      navigation.navigate('Checkout', { bookingId: booking.id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2) }}>
      <Text
        style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: spacing(2) }}
      >
        Détails de la demande
      </Text>
      <TextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
        style={{
          backgroundColor: '#fff',
          padding: spacing(2),
          borderRadius: 16,
          marginBottom: spacing(1),
        }}
      />
      <TextInput
        placeholder="Date & heure (ISO)"
        value={datetime}
        onChangeText={setDatetime}
        style={{
          backgroundColor: '#fff',
          padding: spacing(2),
          borderRadius: 16,
          marginBottom: spacing(1),
        }}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={{
          backgroundColor: '#fff',
          padding: spacing(2),
          borderRadius: 16,
          marginBottom: spacing(2),
        }}
      />
      <Pressable
        onPress={createBooking}
        style={{ backgroundColor: colors.accent, padding: spacing(2), borderRadius: 16 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Continuer</Text>
      </Pressable>
    </View>
  );
}
