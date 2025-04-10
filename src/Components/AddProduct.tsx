import React, {useState} from 'react';
import {Alert, StyleSheet, Text, Image, ScrollView, View} from 'react-native';
import {Input, Button} from '@components/index';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: null,
    image: 'https://i.imgur.com/R2PN9Wq.jpeg',
  });

  const categories = [
    {label: 'Clothes', value: 1},
    {label: 'Electronics', value: 2},
    {label: 'Furniture', value: 3},
    {label: 'Shoes', value: 4},
    {label: 'Miscellaneous', value: 5},
  ];

  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      title: form.title,
      price: Number(form.price),
      description: form.description,
      categoryId: form.category,
      images: [form.image],
    };

    axios
      .post('https://api.escuelajs.co/api/v1/products/', payload)
      .then(response => {
        console.log('Product added:', response.data);
        Alert.alert('Product created successfully!');
        setForm({
          title: '',
          price: '',
          description: '',
          category: null,
          image: '',
        });
      })
      .catch(error => {
        console.log(
          'Error adding product:',
          error.response?.data || error.message,
        );
        Alert.alert('Error', 'Something went wrong!');
      })
      .finally(() => navigation.navigate('Welcome'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.productTxt}>Add Product</Text>

      <Input
        placeholder="Product Title"
        value={form.title}
        onChangeText={value => handleChange('title', value)}
      />
      <Input
        placeholder="Price"
        value={form.price}
        onChangeText={value => handleChange('price', value)}
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChangeText={value => handleChange('description', value)}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        value={form.category}
        onChange={item => handleChange('category', item.value)}
      />

      <Input
        placeholder="Paste image URL"
        value={form.image}
        onChangeText={value => handleChange('image', value)}
        keyboardType="url"
        textContentType="URL"
      />

      {form.image ? (
        <Image source={{uri: form.image}} style={styles.preview} />
      ) : null}
      <View style={styles.btns}>
        <Button text="Submit" onpress={handleSubmit} />
        <Button text="Back" onpress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  productTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: 235,
    marginLeft: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  submitBtn: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#22C7A9',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitBtnTxt: {
    color: '#fff',
    fontSize: 16,
  },
  btns: {
    marginLeft: 70,
  },
});
