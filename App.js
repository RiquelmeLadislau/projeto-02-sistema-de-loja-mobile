import { View } from 'react-native'
import { useState } from 'react'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Admin from './src/pages/Admin'
import Products from './src/pages/Product'
import Cart from './src/pages/Cart'

export default function App(){

const [tela,setTela] = useState("login")
const [usuario,setUsuario] = useState("")

if(tela === "login"){
return <Login setTela={setTela} setUsuario={setUsuario}/>
}

if(tela === "register"){
return <Register setTela={setTela}/>
}

if(tela === "admin"){
return <Admin setTela={setTela}/>
}

if(tela === "products"){
return <Products setTela={setTela} usuario={usuario}/>
}

if(tela === "cart"){
return <Cart setTela={setTela} usuario={usuario}/>
}

return <View/>
}