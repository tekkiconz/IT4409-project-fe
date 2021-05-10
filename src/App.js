import './App.css';
import { Route } from './Route/Route';
import Navbar from './component/NavBar/NavBar'
import Home from './component/Home/Home'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Home}></Route>
    </div>
  );
}

export default App;
