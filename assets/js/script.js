var cardAreaEl = document.querySelector('#cardArea')
var historyEl = document.querySelector('#history')
var srhBtnEl = document.querySelector('#srhBtn')
var srhInputEl = document.querySelector('#srhInput')
var historyListEl = document.querySelector('#historyList')

var BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?appid=ed9c4a903d4311b954d0f472b07f5c25&units=imperial&q='


var cityHistory = []

//---- Event Listeners
historyEl.addEventListener('click',function(event){
    var element = event.target;
    if(element !== srhBtnEl)return
    var input = srhInputEl.value
    var term = BASE_URL + input
    getForecast(term)
    if(input === '') return
    saveHistory(input)
})

historyListEl.addEventListener('click',function(event){
    var element = event.target;
    var hInput = element.textContent
    console.log(hInput)
    hTerm = BASE_URL + hInput
    getForecast(hTerm)
})


//---- Print and save history
function saveHistory(city){
    if(cityHistory.includes(city)) return
    cityHistory.push(city)
    localStorage.setItem('cityHistory',JSON.stringify(cityHistory))
    renderHistory()
}

function renderHistory(){
    historyListEl.innerHTML = ''
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
    var dateEl = document.createElement('p')
    dateEl.textContent =" "+ cast.list[0].dt_txt
    var titleEl = document.createElement('h2');
    titleEl.textContent = cast.city.name;
    var tempEl = document.createElement('p');
    tempEl.textContent = 'temp: '+ cast.list[0].main.temp + ' °F'
    var windEl = document.createElement('p');
    windEl.textContent = 'wind: '+ cast.list[0].wind.speed + ' MPH'
    var humidEl = document.createElement('p');
    humidEl.textContent = 'humid: '+ cast.list[0].main.humidity + '%'
    titleEl.append(dateEl)
    cardEl.append(titleEl,tempEl,windEl,humidEl);
    return cardEl;
}

function create5DCardElement(cast){
    var cardEl = document.createElement('div');
    cardEl.classList.add("col-2");
    var titleEl = document.createElement('h2');
    titleEl.textContent = cast.dt_txt;
    var tempEl = document.createElement('p');
    tempEl.textContent = 'temp: '+ cast.main.temp + ' °F'
    var windEl = document.createElement('p');
    windEl.textContent = 'wind: '+ cast.wind.speed + ' MPH'
    var humidEl = document.createElement('p');
    humidEl.textContent = 'humid: '+ cast.main.humidity + '%'
    cardEl.append(titleEl,tempEl,windEl,humidEl);
    return cardEl;
}

function renderWeather(cast){
    
    var weather3h = create3hCardElement(cast);
    
    cardAreaEl.appendChild(weather3h);
    for(var i = 1;i < 40 + 1;i += 8){
    var weather5D = create5DCardElement(cast.list[i]);
    cardAreaEl.appendChild(weather5D);
    }
}
//----


historyInit()