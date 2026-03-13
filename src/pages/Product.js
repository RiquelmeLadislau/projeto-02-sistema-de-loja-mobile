import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Image,} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Products({ setTela, usuario }) {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    carregar()
  }, [])

  async function carregar() {
    const dados = await AsyncStorage.getItem('produtos')

    if (dados) {
      setProdutos(dados.split(';'))
    }
  }

  async function adicionar(produto) {
    const dados = await AsyncStorage.getItem('cart_' + usuario)

    let lista = ''

    if (dados) {
      lista = dados + ';' + produto
    } else {
      lista = produto
    }

    await AsyncStorage.setItem('cart_' + usuario, lista)

    alert('Adicionado ao carrinho')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Produtos</Text>

      {produtos.map((p, i) => {
        const partes = p.split(',')

        const nome = partes[0]
        const descricao = partes[1]
        const preco = partes[2]
        const imagem = partes[3]

        return (
          <View key={i} style={styles.card}>
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.imagem} />
            ) : null}

            <Text style={styles.nome}>{nome}</Text>

            <Text style={styles.desc}>{descricao}</Text>

            <Text style={styles.preco}>R$ {preco}</Text>

            <TouchableOpacity style={styles.botao} onPress={() => adicionar(p)}>
              <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        )
      })}

      <TouchableOpacity style={styles.ver} onPress={() => setTela('cart')}>
        <Text style={styles.textoBotao}>Ver carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={() => setTela('login')}>
        <Text style={styles.textoBotao}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  titulo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  desc: {
    color: 'gray',
    marginTop: 4,
  },

  preco: {
    color: '#2e86de',
    fontSize: 18,
    marginTop: 6,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#2e86de',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },

  ver: {
    backgroundColor: '#27ae60',
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
    marginBottom: 40,
  },

  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
})
