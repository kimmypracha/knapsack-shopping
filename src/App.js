import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
function ProductBox({product, price, priority, setPriority, key}){
  return (<div className="flex flex-row w-full justify-between px-2">
      <div className="flex w-1/2">{product}</div>
      <div className="flex w-16">{price}</div>
      <div className="flex w-16">{priority}</div>
      <div className="bg-white cursor-pointer" onClick={()=>setPriority((x)=>x+1)}>+</div>
      <div className="bg-white cursor-pointer" onClick={()=>setPriority((x)=>x-1)}>-</div>
  </div>)
}
function Knapsack(prodList, limited){
  
  const price = prodList.map((value) => value.price);
  const priority = prodList.map((value) => value.priority);
  const dp = new Array(limited+1).fill(0);
  const parent = new Array(limited+1).fill(-1);
  for(var i = 0; i < limited ; ++i){
    for(var j = 0; j < price.length(); ++j){
      if(price[j] <= i && dp[i] < dp[i-price[j]] + priority[j]){
          dp[i] = dp[i-price[j]] + priority[j]
          parent[i] = j; 
      }
    }
  }
  for(var i = limited; i >= 0 ; --i){
    if(dp[i] != 0){
      const ans = [];
      var current_budget = i;
      while(current_budget != 0){
        ans.push(parent[current_budget]);
        current_budget -= price[parent[current_budget]];
      }
      return ans.map((value)=>prodList[value])
    }
  }
  return [];
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
      <header className="w-full flex flex-row justify-center text-4xl font-bold mb-4">
        Knapsack Shopping List
      </header>
      <div className="w-[550px] h-[500px] flex flex-col items-center bg-blue-200">
        <div className="w-full flex flex-row justify-between px-4 py-2 mb-2 bg-blue-400">
          <input className="w-1/2" name="product" placeholder="Product Name" value={product} onChange={(e)=>setProduct(e.target.value)}/>
          <input className="w-16" name="price" placeholder="Price" defaultValue={0} value={price} onChange={(e)=>setPrice(convNum(e.target.value))}/>
          <input className="w-16" name="priority" placeholder="Priority" defaultValue={0} value={priority} onChange={(e)=>setPriority(convNum(e.target.value))}/>
          <button onClick={handleSubmit}> +  </button>
        </div>
        <div className="w-full flex flex-col px-4 gap-4">
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
