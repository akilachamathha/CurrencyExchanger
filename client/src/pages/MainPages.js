import React,{useEffect, useState} from 'react'
import axios from "axios"

export default function MainPages() {

  const [date, setDate]=useState(null);
  const [sourceCurrency, setSourceCurrency]=useState("");
  const [targetCurrency, setTargetCurrency]=useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency]=useState("0");
  const [amountInTargetCurrency, setAmountInTargetCurrency]=useState("0");
  const [currencyNames,setCurrencyNames] = useState([]);

  //handleSubmit method
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.get("http://localhost:5000/convert",{
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency
      }});

      setAmountInTargetCurrency(response.data);

    }catch(err){
      console.error(err);
    }
  }

  //get all currencies
  useEffect(()=>{
    const getCurrencyNames =async() => {
      try{
        const response = await axios.get('http://localhost:5000/getAllCurrencies');
        setCurrencyNames(response.data);
      }catch(err){
        console.error(err);
      }
    };
    getCurrencyNames();

  },[])

  return (
    <div>
      <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>
        Convert your currency today</h1>
      <p className='lg:mx-32 opacity-40 py-6'>
        simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date
                </label>
                
                <input 
                onChange={(e)=>setDate(e.target.value)}
                type="Date" 
                id={date}
                name={date} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required/>
              </div>
 
              <div className="mb-4">
                <label 
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Source currency
                </label>

                <select 
                onChange={(e)=>setSourceCurrency(e.target.value)}
                name={sourceCurrency} 
                id={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">

                  <option>select the source currency</option>
                  {Object.keys(currencyNames).map((currency)=>(
                    <option className='p=1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                    ))}

                </select>
              </div>

              <div className="mb-4">
                <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Target currency
                </label>

                <select 
                onChange={(e)=>setTargetCurrency(e.target.value)}
                name={targetCurrency} 
                id={targetCurrency}
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">

                  <option>select the target currency</option>
                  {Object.keys(currencyNames).map((currency)=>(
                    <option className='p=1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                    ))}

                </select>
              </div>

              <div className="mb-4">
                <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Amount
                </label>
                
                <input 
                onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                type="number" 
                id={amountInSourceCurrency} 
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='amount in source currency' required/>
              </div>

              <button className='bg-green-600 hover:bg-green-700 rounded-md py-2 px-4  text-white font-bold'>
                Get the target currency
              </button>

          </form>
        </section>
      </div>

      {amountInTargetCurrency}
    </div>

  )
}
