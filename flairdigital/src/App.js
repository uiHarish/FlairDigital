import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import MenuBar from "./components/Menubar/MenuBar";
// import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MenuBar/>
      <Footer/>
      <ProductList/>
    </div>
  );
}

export default App;
