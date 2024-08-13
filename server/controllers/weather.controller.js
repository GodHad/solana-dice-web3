const OpenWeather = require('@open-weather/index')
const getWeather = (req, res)  => {
    
    let openWeather = new OpenWeather(process.env.WEATHER_APPID);
    
    openWeather.getWeather(req.query.city)
    .then(data => {
        res.render('weather', {temp: data.temp, city: data.city});
    })
    .catch(error => {
        res.render('weather', {error: 'City not found'});
    }); 
}

module.exports = {
    getWeather
}