/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, { useEffect, useState } from 'react';
import { Button, View, Text,FlatList,Image, TouchableOpacity ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Post from './src/post';
import Comment from './src/comment';

const Stack = createStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Post"
          component={PostScreen}
        />
        <Stack.Screen name="Comment" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function PostScreen({navigation}){
  return <Post navigation={navigation}></Post>
}

function CommentScreen({route,navigation}){
  console.log(route.params.itemId)
  return (
    <Comment id={route.params.itemId} navigation={navigation}></Comment>
  )
}

export default App;
