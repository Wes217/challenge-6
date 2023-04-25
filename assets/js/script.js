var cardAreaEl = document.querySelector('#cardArea')
var historyEl = document.querySelector('#history')
var srhBtnEl = document.querySelector('#srhBtn')
var srhInputEl = document.querySelector('#srhInput')

var BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?appid=ed9c4a903d4311b954d0f472b07f5c25&units=imperial&q='



historyEl.addEventListener('click',function(event){
    var element = event.target;
    if(element !== srhBtnEl)return
    var input = srhInputEl.value
    var term = BASE_URL + input
    getForecast(term)
})





function getForecast(city){
    fetch(city)
    .then(function(res){
        if(!res.ok){throw new Error('Oops');};
        return res.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.list[0].main.temp)
        renderWeather(data);
    })
    .catch(function(error){
        console.error(error)
    })
}





function createCardElement(cast){
    if (cardAreaEl.hasChildNodes()){
        cardAreaEl.removeChild(cardAreaEl.firstChild)
    }
    

    
    var cardEl = document.createElement('div');

    var titleEl = document.createElement('h2');
    titleEl.textContent = cast.city.name;
    var tempEl = document.createElement('h3');
    tempEl.textContent = 'temp: '+ cast.list[0].main.temp + ' °F'
    var windEl = document.createElement('h3');
    windEl.textContent = 'wind: '+ cast.list[0].wind.speed + ' MPH'
    var humidEl = document.createElement('h3');
    humidEl.textContent = 'humid: '+ cast.list[0].main.humidity + '%'
    cardEl.append(titleEl,tempEl,windEl,humidEl);
    return cardEl;
}

function renderWeather(cast){
    
    var weatherDay = createCardElement(cast);
   
    cardAreaEl.appendChild(weatherDay);
}

