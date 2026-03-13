import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ setTela,setUsuario }) {

const [usuario,setUser] = useState("")
const [senha,setSenha] = useState("")

const adminUser = "admin"
const adminPass = "123"

async function entrar(){

if(usuario === adminUser && senha === adminPass){
setTela("admin")
return
}

const dados = await AsyncStorage.getItem("users")

if(!dados){
alert("Usuário não encontrado")
return
}

const lista = dados.split(";")

for(let item of lista){

const partes = item.split(",")

if(partes[0] === usuario && partes[1] === senha){
setUsuario(usuario)
setTela("products")
return
}

}

alert("Usuário ou senha incorretos")

}

return(

<View style={styles.container}>

<Text style={styles.titulo}>Login</Text>

<TextInput
placeholder="Usuário"
style={styles.input}
onChangeText={setUser}
/>

<TextInput
placeholder="Senha"
secureTextEntry
style={styles.input}
onChangeText={setSenha}
/>

<TouchableOpacity style={styles.botao} onPress={entrar}>
<Text style={styles.textoBotao}>Entrar</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>setTela("register")}>
<Text style={styles.link}>Criar conta</Text>
</TouchableOpacity>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20,
backgroundColor:"#0f2027"
},

titulo:{
fontSize:30,
color:"#00ffff",
textAlign:"center",
marginBottom:30
},

input:{
backgroundColor:"#1c2b33",
padding:12,
borderRadius:8,
marginBottom:15,
color:"white"
},

botao:{
backgroundColor:"#00ffff",
padding:14,
borderRadius:8,
alignItems:"center"
},

textoBotao:{
fontWeight:"bold"
},

link:{
color:"white",
textAlign:"center",
marginTop:15
}

})