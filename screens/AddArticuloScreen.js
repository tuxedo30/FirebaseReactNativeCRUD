import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import { collection, doc, Firestore, setDoc, onSnapshot} from "firebase/firestore";
import db from "../database/firebaseDb"


class AddArticuloScreen extends Component {

  constructor() {
    super();
    this.dbRef = collection(db,'articulo');
    this.state = {
      nombre: '',
      precio: '',
      referencia: '',
      isLoading: false
    };
    ReferenciasArtsArr:[]
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  componentDidMount() {
    this.unsubscribe = onSnapshot(this.dbRef, this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const ReferenciasArtsArr = [];
    querySnapshot.forEach((res) => {
      const { referencia } = res.data();
      ReferenciasArtsArr.push({referencia})
    });
    this.setState({
      ReferenciasArtsArr,
      isLoading: false,
   });
   //console.log(ReferenciasArtsArr)
  }
  

  storeArticulo() {
    let guarda =true
    //console.log(this.state.ReferenciasArtsArr)
    this.state.ReferenciasArtsArr.forEach(ref => {
      // console.log(this.state.referencia)
      // console.log(ref.referencia)
      if(this.state.referencia == ref.referencia){
        alert('El artículo ya existe')
        guarda =false
      }
    });

    if(this.state.nombre === ''){
     alert('El artículo debe tener un nombre')
     guarda =false
    } 
    if (guarda === true){
      this.setState({
        isLoading: true,
      });
      const data = {nombre: this.state.nombre,precio: this.state.precio,referencia: this.state.referencia}
      setDoc(doc(this.dbRef), data)  
      .then((res) => {
        this.setState({
          nombre: '',
          precio: '',
          referencia: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ArticuloScreen')
      }).catch((err) => {
        console.err("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'nombre'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'precio'}
              value={this.state.precio}
              onChangeText={(val) => this.inputValueUpdate(val, 'precio')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'referencia'}
              value={this.state.referencia}
              onChangeText={(val) => this.inputValueUpdate(val, 'referencia')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agregar Articulo'
            onPress={() => this.storeArticulo()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding:15,
    fontSize:25
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

export default AddArticuloScreen;