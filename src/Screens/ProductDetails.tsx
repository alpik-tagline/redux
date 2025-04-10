import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Button} from '@components/index';

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text style={styles.loadingText}>Loading Product Details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found.</Text>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.goBtn}>Bacck</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.proTxt}>Product Details</Text>
      <Image source={{uri: product.images[0]}} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>$ {product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button text="Back" onpress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  proTxt: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },
  productImage: {
    width: 180,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 20,
  },
  goButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goBtn: {
    height: 30,
    width: 100,
    textAlign: 'center',
    backgroundColor: '#22C7A9',
    color: 'white',
    lineHeight: 30,
    borderRadius: 6,
  },
  description: {
    margin: 10,
    height: 150,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'red',
    marginBottom: 20,
  },
});
