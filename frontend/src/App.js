
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import ProductsDetails from './components/ProductsDetails';
import CategoryProducts from './components/CategoryProducts';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'
import { useEffect } from 'react';
import axios from 'axios';
import { domain, userToken, header } from './env';
import { useGlobalState } from './state/provider'
import Cart from './components/Cart';
import OldOrders from './components/OldOrders';
import Order from './components/Order';
import OrderDetails from './components/OrderDetails';

function App() {

  const [{ profile, pagereload, cart_complete, cart_uncomplete }, dispatch] = useGlobalState()


  useEffect(() => {
    if (userToken !== null) {
      const getData = async () => {
        await axios({
          method: 'get',
          url: `${domain}/api/profile/`,
          headers: header
        }).then(res => {
          dispatch({
            type: "ADD_PROFILE",
            profile: res.data.data
          })
        })
      }
      getData()
    }

  }, [pagereload])


  useEffect(() => {
    const getCartData = async () => {
      await axios({
        method: 'get',
        url: `${domain}/api/cart/`,
        headers: header
      }).then(res => {
        // console.log(res.data, ': cart product');
        {
          const all_data = []
          res?.data.map(data => {
            if (data.complete) {
              all_data.push(data)
              dispatch({
                type: 'CART_COMPLETE',
                cart_complete: all_data
              })
            } else {
              dispatch({
                type: 'CART_UNCOMPLETE',
                cart_uncomplete: data
              })
            }
          })
        }
      })
    }
    getCartData()
  }, [])


  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/category/:id' element={<CategoryProducts />} />

        {
          profile !== null ? (
            <>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<Order />} />
              <Route path='/oldorders' element={<OldOrders />} />
              <Route path='/orderdetails/:id' element={<OrderDetails />} />
            </>
          ) : (
            <>
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </>
          )
        }


        <Route path='*' element={<HomePage />} />
      </Routes>

    </Router>
  );
}

export default App;
