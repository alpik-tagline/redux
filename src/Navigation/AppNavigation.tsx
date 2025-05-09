import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootState} from '@store';
import {useSelector} from 'react-redux';
import {Welcome, Login, ProductDetails} from '@screens/index';
import {AddProduct, ProductList} from '@components/index';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="ProductList" component={ProductList} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
