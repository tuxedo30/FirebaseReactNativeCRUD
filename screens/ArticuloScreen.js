
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
//import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class ArticuloScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('articulo');
    this.state = {
      isLoading: true,
      articuloArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const articuloArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, precio, referencia } = res.data();
      articuloArr.push({
        key: res.id,
        res,
        nombre,
        precio,
        referencia,
      });
    });
    this.setState({
      articuloArr,
      isLoading: false,
   });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
          {
            this.state.articuloArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.nombre}
                  subtitle={item.precio}
                  onPress={() => {
                    this.props.navigation.navigate('ArticuloDetalleScreen', {
                      articulokey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ArticuloScreen;