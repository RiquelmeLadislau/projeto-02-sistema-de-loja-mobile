import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Register({ setTela }){

const [usuario,setUsuario] = useState("")
const [senha,setSenha] = useState("")

async function cadastrar(){

const dados = await AsyncStorage.getItem("users")

let lista=""

if(dados){
lista = dados + ";" + usuario + "," + senha
}else{
lista = usuario + "," + senha
}

await AsyncStorage.setItem("users",lista)

alert("Conta criada")

setTela("login")

}

return(

<View style={styles.container}>

<Text style={styles.titulo}>Cadastro</Text>

<TextInput
placeholder="Usuário"
style={styles.input}
onChangeText={setUsuario}
/>

<TextInput
placeholder="Senha"
style={styles.input}
onChangeText={setSenha}
/>

<TouchableOpacity style={styles.botao} onPress={cadastrar}>
<Text>Cadastrar</Text>
</TouchableOpacity>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20
},

titulo:{
fontSize:28,
textAlign:'center',
marginBottom:20
},

input:{
borderWidth:1,
padding:10,
marginBottom:10,
borderRadius:5
},

botao:{
backgroundColor:"#2ecc71",
padding:12,
alignItems:"center"
}

})