import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Admin({ setTela }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')

  async function adicionar() {
    if (nome === '' || preco === '') {
      alert('Preencha os campos')
      return
    }

    const produto = nome + ',' + descricao + ',' + preco + ',' + imagem

    const dados = await AsyncStorage.getItem('produtos')

    let lista = ''

    if (dados) {
      lista = dados + ';' + produto;
    } else {
      lista = produto
    }

    await AsyncStorage.setItem('produtos', lista)

    alert('Produto cadastrado')

    setNome('')
    setDescricao('')
    setPreco('')
    setImagem('')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Área do Administrador</Text>

      <TextInput
        placeholder="Nome do produto"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        placeholder="Preço"
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
      />

      <TextInput
        placeholder="Link da imagem"
        style={styles.input}
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={styles.botao} onPress={adicionar}>
        <Text style={styles.textoBotao}>Adicionar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={() => setTela('login')}>
        <Text style={styles.textoBotao}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  titulo: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },

  botao: {
    backgroundColor: '#2e86de',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },

  logout: {
    backgroundColor: '#e74c3c',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },

  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
})
