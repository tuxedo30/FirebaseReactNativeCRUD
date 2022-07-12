import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddArticuloScreen from './screens/AddArticuloScreen';
import ArticuloScreen from './screens/ArticuloScreen';
import ArticuloDetalleScreen from './screens/ArticuloDetalleScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
      <Stack.Screen 
        name="ArticuloScreen" 
        component={ArticuloScreen} 
        options={{ title: 'Lista de Articulos' }}
      />
      <Stack.Screen 
        name="AddArticuloScreen" 
        component={AddArticuloScreen} 
        options={{ title: 'Agregar Articulo' }}
      />
      <Stack.Screen 
       name="ArticuloDetalleScreen" 
       component={ArticuloDetalleScreen} 
       options={{ title: 'Detalle de Articulo' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}