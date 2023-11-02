import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
export default class CurrencyConvertorApp extends LightningElement {
    currencyImage = currencyConverterAssets+'/currencyConverterAssets/currency.svg'
    countryList = countryCodeList
    countryFrom = "USD"
    countryTo = "AUD"
    amount=''
    result
    error

    handleChange(event){
        const {name, value} = event.target
        console.log("name",name)
        console.log("value",value)
        this[name] = value
        this.result=''
        this.error=''
    }
    submitHandler(event){
        event.preventDefault()
        this.convert()
    }
    async convert(){
        const API_KEY = 'eeb805a9da72a84f66f73eb8'
        const API_URl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`

        try{
            const data = await fetch(API_URl)
            const jsonData = await data.json()
            this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
            console.log(this.result)
        }catch(error){
            console.log(error)
            this.error = "An error occured. Please try again..."
        }

    }
}