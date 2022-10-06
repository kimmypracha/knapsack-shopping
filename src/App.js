import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
function ProductBox({product, price, priority, setPriority, key}){
  return (<div className="flex flex-row w-full justify-between px-2">
      <div className="flex">{product}</div>
      <div className="flex">{price}</div>
      <div className="flex">{priority}</div>
      <div className="bg-white cursor-pointer" onClick={()=>setPriority((x)=>x+1)}>+</div>
      <div className="bg-white cursor-pointer" onClick={()=>setPriority((x)=>x-1)}>-</div>
  </div>)
}
function App() {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [prodList, setList] = useState([]);
  const [priority, setPriority] = useState(1);
  const handleSubmit = () => {
    setList([...prodList, {"product" : product, "price" : price, "priority" : priority}].sort((a, b) => a.priority - b.priority));
  }
  useEffect(()=>{
    setProduct("");
    setPrice(0);
    setPriority(1);
    // const copList = prodList.sort((a, b) => a.priority - b.priority);
    // console.log(prodList);
    // console.log(copList);
  },[prodList]);
  const convNum = (num) => (num==="")? num : parseInt(num, 10);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2 py-4">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Knapsack Shopping List
      </header>
      <div className="w-[500px] h-[500px] flex flex-col justify-center items-center bg-blue-200">
        <div className="w-full flex flex-row">
          <input name="product" placeholder="Product Name" value={product} onChange={(e)=>setProduct(e.target.value)}/>
          <input name="price" placeholder="Price" defaultValue={0} value={price} onChange={(e)=>setPrice(convNum(e.target.value))}/>
          <input name="priority" placeholder="Priority" defaultValue={0} value={priority} onChange={(e)=>setPriority(convNum(e.target.value))}/>
          <button onClick={handleSubmit}> +  </button>
        </div>
        <div className="w-full flex flex-col">
          {prodList.map((prod, index) => {
              return (
              <ProductBox product={prod.product}
                          price={prod.price}
                          priority={prod.priority} 
                          setPriority={(f) => {
                            setList(
                                      prodList.map((item, idx) => {
                                        if (idx === index) {
                                          return { ...item, "priority": f(item.priority) };
                                        }
                                        else
                                          return item;
                                      }).sort((a, b) => a.priority - b.priority))    
                            }} 
                          key={index} />
                      )
                      })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
