const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

//middle were
app.use(express.json());
app.use(cors());

//all curencies
app.get("/getAllCurrencies",async(req, res)=>{

    const nameUrl ='https://openexchangerates.org/api/currencies.json?app_id=9f8533b53eca43258f9d8f1d0589067f';
    
    try{
        const nameResponce = await axios.get(nameUrl);
        const nameData = nameResponce.data;
        return res.json(nameData);

    }catch(err){
        console.error(err);
    }

})
//get the target amount
app.get("/convert", async(req, res)=>{
    const{date,sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query;
    try{
        const dataUrl ='https://openexchangerates.org/api/historical/${date}.json?app_id=9f8533b53eca43258f9d8f1d0589067f';
        const dataResponse = await axios.get(dataUrl);
        const rates = dataResponse.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetAmount = (targetRate/sourceRate)*amountInSourceCurrency;

        return res.json(targetAmount);

    }catch(err){
        console.error(err);
    }
});

//listen to a port 
app.listen(5000,()=>{
    console.log("SERVER STARTED");
});