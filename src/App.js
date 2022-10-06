import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { setPriority } from 'os';
function App() {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [prodList, setList] = useState([]);
  const [priority, setPriority] = useState(1);
  const handleSubmit = () => {
    setList([...prodList, {"Product" : product, "Price" : price, "Priority" : priority}]);
  }
  useEffect(()=>{
    setProduct("");
    setPrice(0);
    setPriority(1);
  },[setList]);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2 py-4">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Knapsack Shopping List
      </header>
      <div className="w-[500px] h-[500px] flex justify-center items-center bg-blue-200">
        <div className="w-full flex flex-row">
          <input name="product" placeholder="Product Name" value={product} onChange={(e)=>setProduct(e.target)}/>
          <input name="price" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target)}/>
          <input name="priority" placeholder="Priority"value={price} onChange={(e)=>setPriority(e.target)}/>
          <button onClick={handleSubmit}> +  </button>
        </div>
      </div>
    </div>
  );
}

export default App;
