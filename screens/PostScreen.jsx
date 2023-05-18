import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import {Loading} from './Loading';

const PostImage = styled.Image`
  width: 100%;
  height: 500px;
  border-radius: 30px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const PostText = styled.Text`
  font-size: 20px;
  line-height: 24px;
`;

export const PostScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState();
  const [postData, setPostData] = useState({});
  const {id, title} = route.params;

  console.log(route);
  console.log(navigation);

  const postsRequest = () => {
    setLoading(true);
    axios
      .get('https://642046ca25cb65721045ec32.mockapi.io/Favorites/' + id)
      .then(({data: post}) => {
        setPostData(post);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ошибка загрузки статьи');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    postsRequest();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView style={{padding: 20}}>
      <PostImage
        source={{
          uri: postData?.imageUrl,
        }}
      />
      <PostText>{postData?.text}</PostText>
    </ScrollView>
  );
};
