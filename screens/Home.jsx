import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Post} from '../components/Post';
import axios from 'axios';

export const Home = ({navigation}) => {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const textTruncate = str => {
    if (str.length >= 50) {
      return str.substring(0, 50) + '...';
    }

    return str;
  };

  const postsRequest = () => {
    setLoading(true);
    axios
      .get('https://642046ca25cb65721045ec32.mockapi.io/Favorites')
      .then(({data}) => {
        setItems(data);
      })
      .catch(err => {
        console.log(err);
        alert('ошибка загрузки данных');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    postsRequest();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 15}}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={postsRequest} />
        }
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostScreen', {
                id: item.id,
                title: item.title,
              })
            }>
            <Post
              title={textTruncate(item.title)}
              imageUrl={item.imageUrl}
              postTime={new Date(item.createdAt).toLocaleDateString()}
            />
          </TouchableOpacity>
        )}
      />
    </View>

    // {[...items, ...items].map(obj => (
    //   <Post title={obj.title} imgUrl={obj.imgUrl} postTime={obj.postTime} />
    // ))}
    // <StatusBar theme="auto" />
  );
};
