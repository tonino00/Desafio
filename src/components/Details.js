import React, { Component } from 'react';
import {Text , View, StyleSheet, Platform, Image, AsyncStorage, Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Title, Grid, Col, List, ListItem } from 'native-base';



export default class Details extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  render() {
    const { image, title, size, sugar, additional} = this.props.navigation.state.params;

    return (

      <Container>
        <Header>
          <Left style={{flex: 1}}>
          <Button transparent transparent>
            <Icon name='arrow-back'  onPress={() => this.props.navigation.navigate('Home')} />
          </Button>
          </Left>
          <Body style={styles.body}>
            <Title>Detalhes</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button transparent transparent>
                <Icon name='cart'  onPress={() => this.props.navigation.navigate('ShoppingCart')} />
             </Button>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={{uri:'https://amenteemaravilhosa.com.br/wp-content/uploads/2016/06/Cafe%CC%811-1024x768-1024x768.jpg'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <ListItem>
              <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>200 ML</Text>
              </View>
            </ListItem>
            <ListItem>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text>Tamanho :</Text>
                <Text style={{marginLeft:10}}>{size}</Text>
              </View>
            </ListItem>
            <ListItem>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text>Açucar</Text>
                <Image square style={{width:26, height:24, marginLeft:4}}  source={{ uri: sugar }}/>
              </View>
            </ListItem>
            <ListItem>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text>Adicionais :</Text>
                <Text style={{marginLeft:10}}>{additional.join(', ')}</Text>
              </View>
            </ListItem>
            <ListItem>
              <Grid>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Quantidade :</Text>
                </View>
              </Col>
              <Col >
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Button icon light onPress={() => this.setState({quantity: this.state.quantity>1 ? this.state.quantity-1 : 1})} >
                    <Icon name='ios-remove-outline' />
                  </Button>
                  <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 0, paddingRight: 0}}>
                    <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                  </View>
                  <Button icon light onPress={() => this.setState({quantity: this.state.quantity+1})}>
                    <Icon name='ios-add' />
                  </Button>
                </View>
              </Col>
              </Grid>
            </ListItem>
            <Button block onPress={this.addToCart.bind(this)} style={{margin:10,marginTop:10}}>
                  <Text style={{color: "#fdfdfd", marginLeft: 5}}>Colocar no carrinho</Text>
            </Button>
          </Card>
        </Content>
      </Container>

    );
  }
  
  addToCart() {
    var products = this.props.navigation.state.params;
    products['quantity'] = this.state.quantity;
    AsyncStorage.getItem("CART", (err, res) => {
      if(!res) AsyncStorage.setItem("CART",JSON.stringify([products]));
      else {
        var items = JSON.parse(res);
        items.push(products);
        AsyncStorage.setItem("CART",JSON.stringify(items));
      }
      Alert.alert(
        'Pronto! ',
        'Seu produto foi adicionado no carrinho',
      );

    });
  }

}





const styles = StyleSheet.create({
  body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '400',
    },
    subTitle: {
      fontSize:16
    }
});