import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Input} from '@components/index';
import {useNavigation} from '@react-navigation/native';

const LIMIT = 10;

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const url = `https://api.escuelajs.co/api/v1/products/?title=${query}`;
      const res = await axios.get(url);

      const unique = Array.from(
        new Map(res.data.map(item => [item.id, item])).values(),
      ).reverse();

      setAllProducts(unique);
      setDisplayedProducts(unique.slice(0, LIMIT));
      setPage(1);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && !loadingMore) {
      const start = page * LIMIT;
      const end = start + LIMIT;
      const nextProducts = allProducts.slice(start, end);

      if (nextProducts.length > 0) {
        setLoadingMore(true);
        setTimeout(() => {
          setDisplayedProducts(prev => [...prev, ...nextProducts]);
          setPage(prev => prev + 1);
          setLoadingMore(false);
        }, 600);
      }
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts(searchQuery).then(() => setRefreshing(false));
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 5000);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="orange" />
      </View>
    ) : null;
    const test = "l.nkjzxc zxczxc zxcszsnkdjfdf sdfskdflksdflsdf sdfsdfksdf sdfsdlkflksdf sdf"
  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Input
          style={styles.inputTxt}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="orange" />
          <Text style={styles.refresh}>Refreshing</Text>
        </View>
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <View style={styles.productList}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {id: item.id})
                }>
                <Image
                  style={styles.productimg}
                  source={{uri: item.images[0]}}
                />
              </TouchableOpacity>
              <View style={styles.gaps}>
                <Text numberOfLines={1} style={{flex: 1}}>
                  {test}
                </Text>
                <Text style={{flex: 1}}>Price $ {item.price}</Text>
              </View>
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
  },
  productList: {
    marginTop: 10,
    flexDirection: 'row',
  },
  productimg: {
    height: 100,
    width: 100,
    borderRadius: 6,
  },
  inputTxt: {
    alignSelf: 'center',
    width: '95%',
    paddingTop: 9,
    paddingBottom: 9,
  },
  gaps: {
    gap: 3,
    paddingLeft: 10,
    flex: 1,
  },
  oneLine: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  emptyContainer: {
    marginTop: 90,
    textAlign: 'center',
    marginLeft: 110,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 200,
    marginLeft: 5,
  },
  refresh: {
    color: 'orange',
    textAlign: 'center',
    marginTop: 10,
  },
});
