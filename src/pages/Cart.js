import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cart({ usuario, setTela }) {
  const [itens, setItens] = useState([])

  useEffect(() => {
    carregar()
  }, [])

  async function carregar() {
    const dados = await AsyncStorage.getItem('cart_' + usuario)

    if (dados) {
      setItens(dados.split(';'))
    }
  }

  function remover(index) {
    let novaLista = [...itens]

    novaLista.splice(index, 1)

    setItens(novaLista)

    AsyncStorage.setItem('cart_' + usuario, novaLista.join(';'))
  }

  async function finalizar() {
    await AsyncStorage.removeItem('cart_' + usuario)

    setItens([])

    alert('Compra realizada com sucesso!')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.map((item, i) => {
        const partes = item.split(',')

        const nome = partes[0]
        const preco = partes[2]

        return (
          <View key={i} style={styles.card}>
            <Text style={styles.nome}>{nome}</Text>

            <Text style={styles.preco}>R$ {preco}</Text>

            <TouchableOpacity
              style={styles.remover}
              onPress={() => remover(i)}
            >
              <Text style={styles.texto}>Remover</Text>
            </TouchableOpacity>
          </View>
        )
      })}

      {/* BOTÃO PARA ADICIONAR MAIS ITENS */}
      <TouchableOpacity
        style={styles.adicionar}
        onPress={() => setTela('products')}
      >
        <Text style={styles.texto}>Adicionar mais itens</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.comprar} onPress={finalizar}>
        <Text style={styles.texto}>Finalizar Compra</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.voltar}
        onPress={() => setTela('products')}
      >
        <Text style={styles.texto}>Voltar</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  preco: {
    color: '#2e86de',
    marginTop: 5,
  },

  remover: {
    backgroundColor: '#e74c3c',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },

  adicionar: {
    backgroundColor: '#f39c12',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },

  comprar: {
    backgroundColor: '#27ae60',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 6,
  },

  voltar: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },

  texto: {
    color: 'white',
    fontWeight: 'bold',
  },
})