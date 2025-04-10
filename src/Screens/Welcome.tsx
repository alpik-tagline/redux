import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {logout, RootState} from '@store';
import {ProductList} from '@components';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionsPress = () => {
    setModalVisible(true);
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
    setModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Text style={styles.title}>Welcome, {user?.name || 'User'}!</Text>
        <TouchableOpacity onPress={handleOptionsPress}>
          <Text>Options</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Welcome to Fetching App</Text>
                <TouchableOpacity onPress={handleAddProduct}>
                  <Text style={styles.modalButton}>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.modalButton}>Logout</Text>
                </TouchableOpacity>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 40},
  oneLine: {
    flexDirection: 'row',
    gap: 190,
    alignItems: 'center',
  },
  title: {
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    marginVertical: 10,
    color: 'blue',
  },
});
