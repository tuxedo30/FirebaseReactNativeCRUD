import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import { FieldPath, collection, doc, setDoc, ref, set, getDoc, query, where,deleteDoc,updateDoc } from "firebase/firestore";
import db from "../database/firebaseDb"

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
    const param = this.props.route.params.key
    const dbRef = collection(db,'articulo')
    getDoc(query(doc(dbRef,param)))
    .then((res) => {
      if (res.exists) {
        const articulo = res.data();
        this.setState({
          key: res.id,
          nombre: articulo.nombre,
          precio: articulo.precio,
          referencia: articulo.referencia,
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
    const param = this.props.route.params.key
    const updateDBRef = collection(db,'articulo')
    const docRef = doc( updateDBRef, param)
    updateDoc(docRef, {
      nombre: this.state.nombre,
      precio: this.state.precio,
      referencia: this.state.referencia,
    }).then((res) => {
      console.log('Articulo actualizado de Base de Datos')
      this.setState({
        key: '',
        nombre: '',
        precio: '',
        referencia: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ArticuloScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteArticulo() {
    // let eliminar=false
    // Alert.alert(
    //   '¿Eliminar artículo?',
    //   [
    //     {text: 'Si', onPress: () => this.eliminar = true},
    //     {text: 'No', onPress: () => console.log('No se ha eliminado'), style: 'cancel'},
    //   ],
    //   { 
    //     cancelable: true 
    //   }
    // );
    //if (eliminar == true){ 
    const param = this.props.route.params.key
    const dbRef = collection(db,'articulo')
    deleteDoc(doc(dbRef,param))
    
          console.log('Articulo eliminado de Base de Datos')
          this.props.navigation.navigate('ArticuloScreen');
      
    // }
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
            title='Actualizar'
            onPress={() => this.updateArticulo()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Eliminar'
            onPress={() => this.deleteArticulo()}
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