import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class ArticuloDetalleScreen extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      precio: '',
      referencia: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('articulo').doc(this.props.route.params.articulokey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          nombre: user.nombre,
          precio: user.precio,
          referencia: user.referencia,
          isLoading: false
        });
      } else {
        console.log("No existe el artículo");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateArticulo() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('articulo').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      precio: this.state.precio,
      referencia: this.state.referencia,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        precio: '',
        referencia: '',
        isLoading: false,
      });
      this.props.navigation.navigate('articuloScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteArticulo() {
    const dbRef = firebase.firestore().collection('articulo').doc(this.props.route.params.articulokey)
      dbRef.delete().then((res) => {
          console.log('Articulo eliminado de Base de DAtos')
          this.props.navigation.navigate('articuloScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      '¿Eliminar artículo?',
      '¿Está seguro/a?',
      [
        {text: 'Si', onPress: () => this.deleteArticulo()},
        {text: 'No', onPress: () => console.log('No se ha eliminado'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
              multiline={true}
              numberOfLines={4}
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
            title='Update'
            onPress={() => this.updateArticulo()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default ArticuloDetalleScreen;