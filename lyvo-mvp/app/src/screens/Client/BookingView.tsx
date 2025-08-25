import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { colors, spacing } from '../../theme';
import api from '../../services/api';
import { useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

interface BookingDetail {
  id: string;
  service: { label: string };
  client: { name: string };
  pro: { name: string } | null;
  datetime: string;
  address: string;
  status: string;
  amount: number;
}

export default function BookingView() {
  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'BookingView'>['route']>();
  const { bookingId } = route.params;

  const [booking, setBooking] = useState<BookingDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/bookings/${bookingId}`);
        setBooking(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [bookingId]);

  if (!booking) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2) }}>
      <Text
        style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: spacing(1) }}
      >
        Réservation
      </Text>
      <Text style={{ color: colors.text }}>Service : {booking.service.label}</Text>
      <Text style={{ color: colors.text }}>Prestataire : {booking.pro?.name ?? 'En recherche'}</Text>
      <Text style={{ color: colors.text }}>Date/heure : {booking.datetime}</Text>
      <Text style={{ color: colors.text }}>Adresse : {booking.address}</Text>
      <Text style={{ color: colors.text }}>Statut : {booking.status}</Text>
      <Text style={{ color: colors.text }}>Prix : {booking.amount} €</Text>
    </View>
  );
}
