import React, { Component } from 'react';
import {Text , StyleSheet, ActivityIndicator, View, FlatList, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Thumbnail } from 'native-base';



export default class Home extends Component {

    onLearnMore = (item) => {
        this.props.navigation.navigate('Details', {...item});
    }

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }

    componentDidMount(){
        return fetch('https://api.myjson.com/bins/fosqo')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.products,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }


	render() {

        if(this.state.isLoading){
            return(
            <View style={{flex:1, alignItems:'center',justifyContent:'center', height:100}}>
                <ActivityIndicator />
            </View>
            )
        }

		return (

        <Container>
            <Header>
              <Left style={{flex: 1}}/>
              <Body style={styles.body}>
                <Title>Menu</Title>
              </Body>
              <Right style={{flex: 1}}>
            <Button transparent transparent>
                <Icon name='cart'  onPress={() => this.props.navigation.navigate('ShoppingCart')} />
             </Button>
              </Right>
            </Header>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
            <Content>
            <ListItem 
            onPress={()=> this.onLearnMore(item)}>
            <Left>
              <Thumbnail square style={{width:40, height:35}}  source={{ uri: item.image }}/>
            </Left>
            <Body>
              <Text>{item.title}</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
            </Content>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                  />
          </Container>
		);
	}
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });