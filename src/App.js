import logo from "./logo.svg";
import "./App.css";
import "./ProductList/ProductList";
import ProductList from "./ProductList/ProductList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://storage.googleapis.com/hng-static/social-icons/logo_hng_big.svg"
          height="40px"
        />
      </header>
      <ProductList />
    </div>
  );
}

export default App;
