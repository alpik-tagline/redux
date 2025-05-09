// cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find(
        item => item.id === action.payload.id,
      );
      if (!itemExists) {
        state.items.push({...action.payload, quantity: 1});
      } else {
        itemExists.quantity += 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {addItem, removeItem, increaseQuantity, decreaseQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;

// store.js
import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

// ProductList.js
import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem} from './cartSlice';

const products = [
  {id: 1, name: 'Product A', price: 20},
  {id: 2, name: 'Product B', price: 30},
  {id: 3, name: 'Product C', price: 40},
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = product => {
    dispatch(addItem(product));
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View>
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
          <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
        </View>
      )}
    />
  );
};

export default ProductList;

// Cart.js
import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem, increaseQuantity, decreaseQuantity} from './cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = itemId => {
    dispatch(removeItem(itemId));
  };

  const handleIncreaseQuantity = itemId => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = itemId => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <FlatList
      data={cartItems}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View>
          <Text>{item.name}</Text>
          <Text>Price: ${item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Button title="+" onPress={() => handleIncreaseQuantity(item.id)} />
          <Button title="-" onPress={() => handleDecreaseQuantity(item.id)} />
          <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
        </View>
      )}
    />
  );
};

export default Cart;
