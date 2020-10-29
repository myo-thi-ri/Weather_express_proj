const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('index');
    //res.sendFile(__dirname+"/index.html")
});

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = "4fc145a29e5e0b7f8bb3055a335e63cc";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=unit"
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
            const weatherdata = JSON.parse(data);
            //console.log(weatherdata);
            const name = weatherdata.name;
            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const mintemp = weatherdata.main.temp_min;
            const maxtemp = weatherdata.main.temp_max;
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            //console.log(temp,description)
            res.render('weather',{name: name,temp: temp,description: description,mintemp: mintemp, maxtemp: maxtemp,imageurl: imageurl});
            
        });
    });
    //res.send('Server is up and running.')
});





app.listen(3000,function(){
    console.log('Server is running on port 3000.')
})