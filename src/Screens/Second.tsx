import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LoadingIndicator from './Loading/LoadingIndicator';

const Second = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchData = page => {
    setLoading(true);

    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => {
        console.log('DATA===> ', response);
        const newData = response.data.results.slice(0, 10);
        setData(prevData => {
          const updatedData = [...prevData];
          newData.forEach(item => {
            if (
              !updatedData.some(existingItem => existingItem.id === item.id)
            ) {
              updatedData.push(item);
            }
          });
          return updatedData;
        });

        setTotalPages(response.data.info.pages);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleEndReached = () => {
    if (!loading && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    setData([]);
  };

  useEffect(() => {
    if (refresh) {
      fetchData(currentPage);
      setRefresh(false);
    }
  }, [refresh, currentPage]);

  if (loading && data.length === 0) {
    return <LoadingIndicator size="large" color="orange" />;
  }

  return (
    <View style={styles.card}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && data.length > 0 ? (
            <ActivityIndicator size="large" color="orange" />
          ) : null
        }
        refreshing={refresh}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
});
