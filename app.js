const express=require('express')
const https=require('https')
const app=express()
const bodyParser=require('body-parser');


let temp=""
let iconURL=""
let weatherDesc=""
let city=""
let country=""
let fetched=''
let sty='none'
let date=new Date()
let month=date.getDate()+' '+date.toLocaleString('en-US',{month:'short'})

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs")
app.get('/',(req,res)=>{
    res.render("weather",{cityName:city,cityTemp:temp,fet:fetched,countryCode:country,weaCon:weatherDesc,m:month,ic:iconURL,sty:sty})
})
app.post('/',(req,res)=>{
     city=req.body.city
    
    url='https://api.openweathermap.org/data/2.5/weather?appid=870111657b9797a5e3ddab8b8a1d4ab6&q='+city+'&units=metric'   
    https.get(url,(response)=>{
        response.on("data",(data)=>{
        const weatherData=JSON.parse(data)
        console.log(weatherData);
        if (weatherData.cod!=200){
            fetched=false
            sty='none'
            res.sendFile(__dirname+'/404.html')
        }
        else{
            fetched=true
            temp=Math.round(weatherData.main.temp)+' °'
            weatherDesc=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            country=weatherData.sys.country
            sty='flex'
            iconURL="https://openweathermap.org/img/wn/"+icon+"@4x.png"
            
            res.redirect('/')
        }
        
        
        
        
        
        })
    })  

})
    


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})