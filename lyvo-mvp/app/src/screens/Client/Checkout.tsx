import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing } from '../../theme';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

export default function Checkout() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'Checkout'>['route']>();
  const { bookingId } = route.params;

  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/bookings/${bookingId}`);
        setAmount(data.amount);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [bookingId]);

  const handlePay = async () => {
    try {
      // Create payment intent on the back‑end
      const { data } = await api.post('/payments/intent', { bookingId });
      // For this MVP we skip Stripe confirmation and directly mark the booking as done
      await api.post(`/bookings/${bookingId}/confirm`);
      navigation.navigate('BookingView', { bookingId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2) }}>
      <Text
        style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: spacing(2) }}
      >
        Paiement
      </Text>
      <Text style={{ color: colors.text, fontSize: 18, marginBottom: spacing(2) }}>
        Montant : {amount !== null ? `${amount} €` : '...'}
      </Text>
      <Pressable
        onPress={handlePay}
        style={{ backgroundColor: colors.accent, padding: spacing(2), borderRadius: 16 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Payer</Text>
      </Pressable>
    </View>
  );
}
