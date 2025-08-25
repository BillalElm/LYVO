import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Auth/Welcome';
import SignIn from '../screens/Auth/SignIn';
import Home from '../screens/Client/Home';
import ServiceForm from '../screens/Client/ServiceForm';
import Checkout from '../screens/Client/Checkout';
import BookingView from '../screens/Client/BookingView';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Home: undefined;
  ServiceForm: { serviceId: string };
  Checkout: { bookingId: string };
  BookingView: { bookingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ServiceForm" component={ServiceForm} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="BookingView" component={BookingView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
