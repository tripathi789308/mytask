import React from 'react';
import {View,ScrollView,TouchableOpacity,Image,Text,StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';


function Post(props){
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
        <View style={style.container}>
          {isLoading ? <Image style={style.img} source={{uri:'https://miro.medium.com/max/2560/1*MyAk_JfQZqzCF8qIIoWF5A.png'}}></Image> : 
          <ScrollView style={style.scrll}>
            {data.map((item)=>{
              return(<TouchableOpacity key={item["id"]} style={style.card}
              onPress={()=>{
                 props.navigation.navigate("Comment",{
                  itemId:item["id"]
                })
              }}>
                <Text key={item["id"]} style={style.text}>{item["title"]}</Text>
              </TouchableOpacity>)
            })}
          </ScrollView>
            
          }
              
        </View>
      )
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 0,
        justifyContent:"center",
        alignItems:"center"
    },
    img:{
        height:50,width:50,
        justifyContent:"center"
    },
    scrll:{
        flexDirection:"column",
        backgroundColor:'#ecf0f1',
        padding:0
    },
    card:{
        width:"100%",height:90,backgroundColor:"white",
        padding:10,borderRadius:8,elevation:10,margin:3},
    text:{
        color:"black",fontFamily:"verdana",fontWeight:"bold",fontSize:17
    }
})
export default Post;