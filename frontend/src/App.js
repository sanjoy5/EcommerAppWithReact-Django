
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

function App() {

  const [{ profile }, dispatch] = useGlobalState()
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

  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/category/:id' element={<CategoryProducts />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>

    </Router>
  );
}

export default App;
