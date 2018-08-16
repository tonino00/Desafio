import React, { Component } from 'react';
import {Text , View, StyleSheet, Platform, Alert, AsyncStorage} from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';


class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems:[]
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("CART", (err, res)=> {
      if(!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    })
  }

	render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Header>
          <Left style={{flex: 1}}>
          <Button transparent transparent>
            <Icon name='arrow-back'  onPress={() => this.props.navigation.goBack()} />
          </Button>
          </Left>
          <Body style={styles.body}>
            <Title>Carrinho</Title>
          </Body>
          <Right style={{flex: 1}}/>
        </Header>
          {this.state.cartItems.length <=0 ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
              <Text style={{color: '#95a5a6'}}>Seu carrinho está vazio</Text>
            </View>
            :
            <Content style={{paddingRight: 10}}>
              <List>
                  {this.renderItems()}
              </List>
              <Grid style={{marginTop: 20, marginBottom: 10}}>
                <Col style={{paddingLeft: 10,paddingRight: 5}}>
                  <Button onPress={() => this.checkout()}  block iconLeft>
                    <Text style={{color: '#fdfdfd'}}>Pagar</Text>
                  </Button>
                </Col>
                <Col style={{paddingLeft: 5, paddingRight: 10}}>
                  <Button onPress={() => this.removeAllPressed()} style={{borderWidth: 1, borderColor:'#333'}} block iconRight transparent>
                    <Text style={{color: '#333'}}>Cancelar</Text>
                  </Button>
                </Col>
              </Grid>
            </Content>
          }
      </Container>
    );
  }

  renderItems() {
    
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i+1}
        >
          <Thumbnail square style={{width: 40, height: 35}} source={{ uri: item.image }} />
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.title}
            </Text>
            <Text style={{fontSize: 16 ,fontStyle: 'italic'}}>Adicionais: {item.additional.join(', ')}</Text>
          </Body>
          <Right>
            <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItemPressed(item)}>
              <Icon size={30} style={{fontSize: 30, color: '#95a5a6'}} name='ios-remove-circle-outline' />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remover '+item.title,
      'Tem certeza que quer este item do seu carrinho ?',
      [
        {text: 'Não', onPress: () => console.log('Não pressionado'), style: 'cancelar'},
        {text: 'Sim', onPress: () => this.removeItem(item)},
      ]
    )
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.cartItems.map((item) => {
      if(JSON.stringify(item) !== JSON.stringify(itemToRemove) )
        items.push(item);
    });
    this.setState({cartItems: items});
    AsyncStorage.setItem("CART",JSON.stringify(items));
  }

  removeAllPressed() {
    Alert.alert(
      'Alerta',
      'Tem certeza de que deseja esvaziar seu carrinho?',
      [
        {text: 'Não', onPress: () => console.log('Não pressionado'), style: 'cancelar'},
        {text: 'Sim', onPress: () => this.removeAll()}
      ]
    )
  }

  removeAll() {
    this.setState({cartItems: []})
    AsyncStorage.setItem("CART",JSON.stringify([]));
  }

  checkout() {
    Alert.alert(
      'Obrigado, pela sua preferência',
      'Pagamento efetuado com sucesso!',
    )
  }

}

export default ShoppingCart;

const styles = StyleSheet.create({

  });