
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import ProductsDetails from './components/ProductsDetails';
import CategoryProducts from './components/CategoryProducts';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/category/:id' element={<CategoryProducts />} />
        <Route path='*' element={<HomePage />} />
      </Routes>

    </Router>
  );
}

export default App;
