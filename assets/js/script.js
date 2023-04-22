
var BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?id=524901&appid=ed9c4a903d4311b954d0f472b07f5c25&id='

fetch(BASE_URL+'New+York')
.then(function(res){
    if(!res.ok){throw new Error('Oops');};
    return res.json();
})
.then(function(data){
    console.log(data);
    console.log(data.name)
    renderWeather(data);
})
.catch(function(error){
    console.error(error)
})

function createCardElement(city){
    var cardEl = document.createElement('div');
    
    var titleEl = document.createElement('h2');
    titleEl.textContent = city.name + ' (date)';
    var tempEl = document.createElement('h3');
    tempEl.textContent = 'temp:'+city.main.temp
    var windEl = document.createElement('h3');
    windEl.textContent = 'wind:'+ city.wind.speed
    var humidEl = document.createElement('h3');
    humidEl.textContent = 'humid:'+ city.main.humidity
    cardEl.append(titleEl,tempEl,windEl,humidEl);
    return cardEl;
}

function renderWeather(city){

    var weatherDay = createCardElement(city);

    document.body.appendChild(weatherDay);
}

