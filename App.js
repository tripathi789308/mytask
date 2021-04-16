/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, { useEffect, useState } from 'react';
import { Button, View, Text,FlatList, TouchableOpacity ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post" >
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
  const [data,setData]=useState([]);
  const [isLoading,setLoading]=useState(true);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
      .then((json) => setData(json) )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); 
  },[]);
  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? <Text>Loading...</Text> : 
      <ScrollView style={{flexDirection:"column"}}>
        {data.map((item)=>{
          return(<TouchableOpacity style={{flex:3,backgroundColor:"gray",
          padding:30,borderColor:"black",borderWidth:1}}
          onPress={()=>{
            navigation.navigate("Comment",{
              itemId:item["id"]
            })
          }}>
            <Text style={{color:"white",fontFamily:"verdana"}}>{item["title"]}</Text>
          </TouchableOpacity>)
        })}
      </ScrollView>
        
      }
          
    </View>
  )
}

function CommentScreen({route,navigation}){
  const id=route.params.itemId;
  const url1="https://jsonplaceholder.typicode.com/posts/"+id;
  const url2="https://jsonplaceholder.typicode.com/comments?postId="+id;
  const [post,setPost]=useState([]);
  useEffect(()=>{
      fetch(url1)
      .then((response)=>response.json())
      .then((json)=>setPost(json))
      .catch((error)=>console.log(error))
  },[]);
  const [comments,setComments]=useState([]);
  useEffect(()=>{
      fetch(url2)
      .then((response)=>response.json())
      .then((json)=>setComments(json))
      .catch((error)=>console.log(error))
  },[]); 
  return (
    <ScrollView
      style={{ flex: 1,flexDirection:"column" }}>
        <Text style={{backgroundColor:"black",color:"white",
        fontSize:20}}>Post Details:</Text>
        <Text style={{justifyContent:"center",fontFamily:"verdana",
      backgroundColor:"gray",fontSize:25,paddingTop:10}}>{post["title"]}</Text>
        <Text style={{justifyContent:"center",fontFamily:"verdana",
      backgroundColor:"white",fontSize:15,paddingTop:10}}>{post["body"]}</Text>
        <Text style={{justifyContent:"center",fontFamily:"verdana"
        ,fontSize:30,paddingTop:30}}>Comment Section</Text>
          {comments.map((item)=>{
            return(
              <View>
                <Text style={{paddingTop:10,backgroundColor:"blue",fontFamily:"verdana",
              fontSize:15,color:"white"}}>{item["email"]} </Text>
                <Text style={{fontFamily:"verdana",
              fontSize:20}}>{item["name"]}</Text>
                <Text>{item["body"]} </Text>
              </View>
            )
          })}

    </ScrollView>)
}

export default App;
