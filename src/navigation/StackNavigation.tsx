import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home/Home';
import SignScreen from '../screens/Auth/SignScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import Register from '../screens/Auth/Register';
import TrackPlayer from '../screens/TrackPlayer';

function StackNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="TrackPlayer"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignScreen"
        component={SignScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TrackPlayer"
        component={TrackPlayer}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
