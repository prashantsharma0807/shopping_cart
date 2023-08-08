import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Reg from './Reg';
import Login from './Login';
import { Contextapi } from './Contextapi';
import { useState } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Adminproducts from './Adminproducts';
import Adminaddproduct from './Adminaddproduct';
import Adminupdatepro from './Adminupdatepro';
import Products from './Products';
import Moredetaile from './Moredetaile';
import Cart from './Cart';



function App() {
  const [loginname,setLoginname]= useState(window.localStorage.getItem('loginname'))
  const [cart,setCart]=useState('')
  window.localStorage.setItem('cart',JSON.stringify(cart))
  return (
    <Router>
      <Contextapi.Provider value={{loginname,setLoginname,cart,setCart}}>
      <Header/>
      <Routes>
        <Route path='/reg' element={<Reg/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/adminproducts' element={<Adminproducts/>}></Route>
        <Route path='/adminaddproduct' element={<Adminaddproduct/>}></Route>
        <Route path='/adminupdateproduct/:id' element={<Adminupdatepro/>}></Route>
        <Route path='/product' element={<Products/>}></Route>
        <Route path='/moredetaile/:id' element={<Moredetaile/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      </Contextapi.Provider>
    </Router>
    );
}

export default App;