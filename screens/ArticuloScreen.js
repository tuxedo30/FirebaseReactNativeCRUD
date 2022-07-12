
import React, { Component } from 'react';
import { Button,StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements'
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import db from "../database/firebaseDb"


class ArticuloScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = collection(db,'articulo');
    this.state = {
      isLoading: true,
      articuloArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = onSnapshot(this.firestoreRef, this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const articuloArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, precio, referencia } = res.data();
      articuloArr.push({key: res.id, nombre, precio, referencia});
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
        <Button
          color='#AAFF00'
                  title= 'Agregar Artículo'
                  onPress={() => {
                    this.props.navigation.navigate('AddArticuloScreen'
                    );
                  }}
                ></Button>
        <Text>{'\n'}</Text><Text>{'\n'}</Text>
          {
            this.state.articuloArr.map((item, i) => {
              return (
                <View>
                
                <Button
                  title={item.nombre}
                  onPress={() => {
                    this.props.navigation.navigate('ArticuloDetalleScreen', {
                      key: item.key
                    });
                  }}
                >
                <Text style={{fontSize:25, marginBottom: 10, textAlign:'center' }}>
                {item.nombre}
                </Text>
                </Button>
                <Text>
                {'\n'}
                </Text>
                </View>
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
   paddingBottom: 10
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