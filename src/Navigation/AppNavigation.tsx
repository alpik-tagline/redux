import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootState} from '../store/';
import {useSelector} from 'react-redux';
import Login from '../Screens/Login';
import Welcome from '../Screens/Welcome';
import AddProduct from '../Components/AddProduct';
import ProductDetails from '../Screens/ProductDetails';
import ProductList from '../Components/ProductList';

const Stack = createStackNavigator();

const AppNavigation = () => {
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
};

export default AppNavigation;
