var cardAreaEl = document.querySelector('#cardArea')
var historyEl = document.querySelector('#history')
var srhBtnEl = document.querySelector('#srhBtn')
var srhInputEl = document.querySelector('#srhInput')
var historyListEl = document.querySelector('#historyList')

var BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?appid=ed9c4a903d4311b954d0f472b07f5c25&units=imperial&q='


var cityHistory = []


historyEl.addEventListener('click',function(event){
    var element = event.target;
    if(element !== srhBtnEl)return
    var input = srhInputEl.value
    var term = BASE_URL + input
    getForecast(term)
    saveHistory(input)
})
//---- Print and save history
function saveHistory(city){
    if(cityHistory.includes(city)) return
    cityHistory.push(city)
    localStorage.setItem('cityHistory',JSON.stringify(cityHistory))
    renderHistory()
}

function renderHistory(){
    for(var i = 0;i < cityHistory.length;i++){
    var HistoryItem = createHistoryItemElement(i)
    historyListEl.appendChild(HistoryItem);
    }
    
}

function createHistoryItemElement(i){
    var itemEl = document.createElement('div');
    itemEl.setAttribute('class','d-grid gap-2');
    var btnEl = document.createElement('button')
    btnEl.setAttribute('class',"btn btn-primary");
    btnEl.textContent = cityHistory[i]
    itemEl.append(btnEl)
    return itemEl
}

function historyInit(){
    var storedCity = JSON.parse(localStorage.getItem('cityHistory'));
    if(storedCity !== null){
        cityHistory = storedCity
    }
    renderHistory();
}
//----

//----Api Function
function getForecast(city){
    fetch(city)
    .then(function(res){
        if(!res.ok){throw new Error('Oops');};
        return res.json();
    })
    .then(function(data){
        console.log(data);
        renderWeather(data);
    })
    .catch(function(error){
        console.error(error)
    })
}
//----



//----Create weather elements
function create3hCardElement(cast){
    cardAreaEl.innerHTML = '';
    var cardEl = document.createElement('div');
    cardEl.classList.add("col-12");
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

function create5DCardElement(cast){
    var cardEl = document.createElement('div');
    cardEl.classList.add("col-2");
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
    
    var weather3h = create3hCardElement(cast);
    var weather5D = create5DCardElement(cast);
    cardAreaEl.appendChild(weather3h);
    cardAreaEl.appendChild(weather5D);
}
//----


historyInit()