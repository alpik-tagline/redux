import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Second = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchData = page => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => {
          setData(prevData => [...prevData, ...response.data.results]);
          setTotalPages(response.data.info.pages);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, 1000);
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
    setRefresh(false);
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text>{item.name}</Text>}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="orange" /> : null
        }
        refreshing={refresh}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({});
