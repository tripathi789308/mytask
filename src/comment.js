import React from 'react';
import {View,ScrollView,TouchableOpacity,Image,StyleSheet} from 'react-native';
import { Container, Header,H3, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { useEffect, useState } from 'react';
import apis from '../api/apis';
function Comment(props){
    const [post,setPost]=useState([]);
  useEffect(()=>{
      fetch(apis.urlpost+props.id)
      .then((response)=>response.json())
      .then((json)=>setPost(json))
      .catch((error)=>console.log(error))
  },[]);
  const [comments,setComments]=useState([]);
  useEffect(()=>{
      fetch(apis.urlcomment+props.id)
      .then((response)=>response.json())
      .then((json)=>setComments(json))
      .catch((error)=>console.log(error))
  },[]); 
  return (
    <Container style={{backgroundColor:"#b9bbb6"}}>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                    <Text>Post Details:</Text>
                    <H3>{post["title"]}</H3>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {post["body"]}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Button transparent >
                      <Icon active name="chatbubbles" />
                      <Text>Comments</Text>
          </Button>
          {comments.map((item,idx)=>{
            return(
              <Card style={style.card2}>
            <CardItem>
                <Body>
                <Text style={style.email}>{item["email"]} </Text>
                <Text style={style.name}>{item["name"]}</Text>
                <Text style={style.body}>{item["body"]} </Text>
              </Body>
            </CardItem>
          </Card>
            )
          })}
        </Content>
      </Container>)
}
const style=StyleSheet.create({
  card:{
    width:"100%",height:"auto",backgroundColor:"white",
    padding:10,borderRadius:8,elevation:10,margin:3},
  card2:{
    width:"100%",height:"auto",backgroundColor:"white",
    padding:0,borderRadius:8,elevation:10,margin:8
  },
  body:{
    fontSize:11
  },
  email:{
    fontWeight:"bold",
    color:"blue"
  }

})

export default Comment;