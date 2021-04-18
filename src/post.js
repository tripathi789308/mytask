import React from 'react';
import {Image,StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { Container, Header, Content, Card, CardItem,Text, Button, Icon, Body, Right } from 'native-base';
import apis from '../api/apis';


function Post(props){
    const [data,setData]=useState([]);
    const [isLoading,setLoading]=useState(true);
    useEffect(()=>{
    fetch(apis.url)
    .then((response) => response.json())
      .then((json) => setData(json) )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); 
    },[]);
    return (
        <Container style={{backgroundColor:"#00CE9F"}}>
          {isLoading ? <Image style={style.img} source={{uri:apis.image}}></Image> : 
          <Content >
            <Header /> 
            {data.map((item)=>{
              return(
              <Card style={style.card}>
                <CardItem button onPress={()=>{
                     props.navigation.navigate("Comment",{
                      itemId:item["id"]
                    }) 
                  }}>
                <Body>
                  <Text>{item["title"]}</Text>
                  </Body>
                  <Right>
                      <Button transparent >
                      <Icon active name="chatbubbles" />
                      <Text>Comments</Text>
                      </Button>
                    </Right>
                </CardItem>
              </Card>)
            })}
          </Content> 
          }     
        </Container>
      )
}
const style = StyleSheet.create({
    img:{
        height:50,width:50,
        justifyContent:"center",
        alignSelf:"center"
    },
    card:{
        width:"100%",height:"auto",backgroundColor:"white",
        padding:10,borderRadius:8,elevation:10,margin:3},
})
export default Post;