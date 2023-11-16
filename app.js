const express=require('express')
const https=require('https')
const app=express()
const bodyParser=require('body-parser');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.post('/',(req,res)=>{
    const city=req.body.city
    
    url='https://api.openweathermap.org/data/2.5/weather?appid=870111657b9797a5e3ddab8b8a1d4ab6&q='+city+'&units=metric'   
    https.get(url,(response)=>{
        response.on("data",(data)=>{
        const weatherData=JSON.parse(data)
        
        
        const temp=weatherData.main.temp
        const weatherDesc=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const iconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        
        res.write(`<h1>The weather is currently ${weatherDesc}</h1>`)
        res.write(`<h1>The Temperature in ${city} is ${Math.round(temp)}</h1>`)
        res.write("<img src="+iconURL+">")
        
        res.send()
        
        })
    })  

})
    


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})