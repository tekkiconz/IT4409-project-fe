import './App.css';
import { Route } from './Route/Route';
import Navbar from './component/NavBar/NavBar'
import Home from './component/Home/Home'
import Product from './component/Product/Product'
import FeaturedProductsCarousel from './component/FeaturedProductsCarousel/FeaturedProductsCarousel'

function App() {
  return (
    <div className="App">
      <Navbar />
      <FeaturedProductsCarousel />
      <Route exact path='/' component={Home} />
      <Route exact path='/product' component={Product} />
    </div>
  );
}

export default App;
