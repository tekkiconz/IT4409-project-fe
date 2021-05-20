import { useState } from 'react';
import './App.css';
import { Route } from './Route/Route';
import Navbar from './component/NavBar/NavBar'
import Home from './component/Home/Home'
import Product from './component/Product/Product'
import FeaturedProductsCarousel from './component/FeaturedProductsCarousel/FeaturedProductsCarousel'
import SearchBar from './component/SearchBar/SearchBar'
import PostProduct from './component/PostProduct/PostProduct';
import Modal from './component/Modal/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Navbar setShowModal={setShowModal} />
      <FeaturedProductsCarousel />
      <SearchBar />
      <Route exact path='/' component={Home} />
      <Route path='/product' component={Product} />
      <Route exact path='/post' component={PostProduct} />
    </div>
  );
}

export default App;
