import './App.css';
import ProductDisplay from './components/ProductDisplay';

function App() {

  const productList = [
    {
      id: 1, name: "옷1", img: "옷1.png"
    },
    {
      id: 2, name: "옷2", img: "옷2.png"
    },
    {
      id: 3, name: "옷3", img: "옷3.png"
    }
  ]
  return (
    <div className="App">
      <img src={require("./img/옷1.png")}></img>
      <div>
        <a>더보기</a>
        <div>
          { productList.map((product)=><ProductDisplay img={product.img} name={product.img}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
