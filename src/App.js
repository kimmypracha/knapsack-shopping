import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
function ProductBox({product, price, priority, setPriority, key}){
  return (<div className="flex flex-row w-full justify-between px-2 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:brightness-125">
      <div className="flex w-1/2">{product}</div>
      <div className="flex w-16">{price}</div>
      <div className="flex w-16">{priority}</div>
      <div className="cursor-pointer text-xl hover:bg-blue-300" onClick={()=>setPriority((x)=>x+1)}>+</div>
      <div className="cursor-pointer text-xl hover:bg-blue-300" onClick={()=>setPriority((x)=>x-1)}>-</div>
  </div>)
}
function Knapsack(prodList, limited){
  const price = prodList.map((value) => value.price);
  const priority = prodList.map((value) => value.priority);
  const dp = new Array(limited+1).fill(0);
  const parent = new Array(limited+1).fill(-1);
  for(var i = 0; i < price.length ; ++i){
    for(var j = limited; j >= 0; --j){
      if(price[i] <= j && dp[j] < dp[j-price[i]] + priority[i] &&
        (dp[j-price[i]] > 0 || j === price[i])){
          dp[j] = dp[j-price[i]] + priority[i]
          parent[j] = i; 
      }
    }
  }
  for(var i = limited; i >= 0 ; --i){
    if(dp[i] != 0){
      const ans = [];
      var current_budget = i;
      while(current_budget != 0){
        console.log(current_budget);
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
  const [prevList, setPrev] = useState([]);
  const [priority, setPriority] = useState(1);
  const [budget, setBudget] = useState(0);
  const [calMode, setMode] = useState(false);
  const handleSubmit = () => {
    setList([...prodList, {"product" : product, "price" : price, "priority" : priority}].sort((a, b) => a.priority - b.priority));
  }
  useEffect(()=>{
    setProduct("");
    setPrice(0);
    setPriority(1);
  },[prodList]);
  const handleCal = () => {
    setPrev(prodList)
    setMode(true);
    setList(Knapsack(prodList, budget));
  }
  const handleBack = () => {
    setMode(false);
    setList(prevList);
  }
  const convNum = (num) => (num==="")? num : parseInt(num, 10);
  return (
    <div className="w-full h-screen flex flex-col items-center gap-2 py-4 bg-gray-100">
      <div className="w-[550px] flex flex-col shadow-md py-2 mb-2 bg-white rounded-md">
      <header className="w-full flex flex-row justify-center text-3xl font-bold">
        Knapsack Shopping List
      </header>
      <div className="w-full flex flex-row justify-center gap-4 p-2">
        <div className="flex"> Budget : </div>
        <input className="border" name="budget" value={budget} onChange={(e)=>setBudget(convNum(e.target.value))}/>
      </div>
      </div>
      <div className="w-[550px] h-[450px] flex flex-col items-center bg-white shadow-md">
        <div className="w-full flex flex-row justify-between px-4 py-2 mb-2 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
          <input className="w-1/2 bg-slate-800 px-2 py-1" name="product" placeholder="Product Name" value={product} onChange={(e)=>setProduct(e.target.value)}/>
          <input className="w-16 bg-slate-800 px-2 py-1" name="price" placeholder="Price" defaultValue={0} value={price} onChange={(e)=>setPrice(convNum(e.target.value))}/>
          <input className="w-16 bg-slate-800 px-2 py-1" name="priority" placeholder="Priority" defaultValue={0} value={priority} onChange={(e)=>setPriority(convNum(e.target.value))}/>
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
      <div className="bg-slate-900 hover:bg-slate-400 text-white p-2 rounded-md">
          <button onClick={calMode? handleBack : handleCal}> {calMode? "Back" : "Calculate"} </button>
      </div>
    </div>
  );
}

export default App;
