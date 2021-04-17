import React from 'react';
import {View,ScrollView,TouchableOpacity,Image,Text,StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';

function Comment(props){
    const [post,setPost]=useState([]);
  useEffect(()=>{
      fetch(props.urla)
      .then((response)=>response.json())
      .then((json)=>setPost(json))
      .catch((error)=>console.log(error))
  },[]);
  const [comments,setComments]=useState([]);
  useEffect(()=>{
      fetch(props.urlb)
      .then((response)=>response.json())
      .then((json)=>setComments(json))
      .catch((error)=>console.log(error))
  },[]); 
  return (
    <ScrollView
      style={style.container}>
        <Text style={style.title}>Post Details:</Text>
        <Text style={style.post_title}>{post["title"]}</Text>
        <Text style={style.post_body}>{post["body"]}</Text>
        <Text style={style.comment}>Comment Section</Text>
          {comments.map((item,idx)=>{
            return(
              <View>
                <Text style={style.email}>{item["email"]} </Text>
                <Text style={style.name}>{item["name"]}</Text>
                <Text style={style.body}>{item["body"]} </Text>
              </View>
            )
          })}

    </ScrollView>)
}
const style=StyleSheet.create({
    container:{
        flex: 1,flexDirection:"column"
    },
    title:{
        backgroundColor:"black",color:"white",
        fontSize:20,fontWeight:"bold",borderRadius:5,elevation:8,
        margin:8
    },
    post_title:{
        justifyContent:"center",fontWeight:"bold",fontFamily:"verdana",
      backgroundColor:"#cdcdcd",fontSize:25,padding:10,elevation:8,
      borderRadius:8
    },
    post_body : {
        justifyContent:"center",borderRadius:8,fontFamily:"verdana",
      backgroundColor:"white",fontSize:15,marginTop:10,paddingLeft:10
    },
    comment:{
        justifyContent:"center",fontFamily:"verdana"
        ,fontSize:30,paddingTop:20
    },
    email:{
        paddingTop:10,paddingLeft:5,fontFamily:"verdana",
              fontSize:15,color:"blue",fontWeight:"bold"
    },
    name:{
        fontFamily:"verdana",
              fontSize:20,paddingLeft:20
    },
    body:{
        fontSize:13,paddingLeft:20,backgroundColor:"white",borderRadius:30
    }

})

export default Comment;