let header = document.getElementById("header");
header.textContent = "Weather App";

let greetingDiv = document.getElementById("greetingResult");
greetingDiv.textContent = "Welcome to the best weather app";

let aboutText = document.getElementById("aboutText");
aboutText.textContent = "This app provides accurate weather forecasts for cities around the world. Stay informed about temperature, humidity, and other important weather metrics.";

let creatorText = document.getElementById("creatorText");
creatorText.textContent = "WeatherAlert was created by Daniel Ivtimov, a passionate developer dedicated to providing valuable weather information to users worldwide.";

let contactInfo = document.getElementById("contactInfo");
contactInfo.textContent = "For inquiries and support, contact us at danieliftimov3@gmail.com";

let navigationMenuService ={
    navigationLinks: document.getElementsByClassName("nav-link"),
    pages: document.getElementsByClassName("page"),
    citySearchInput: document.getElementById("citySearchInput"),
    citySearchBtn: document.getElementById("citySearchBtn"),
    displayPage: function(index){
        for(let i = 0; i < this.pages.length; i++){
            this.pages[i].style.display = i === index ? "block" : "none";
        }
    },
    activateMenuItem: function(linkElement){
        for(let i = 0; i < this.navigationLinks.length; i++){
            if(this.navigationLinks[i] === linkElement){
                this.navigationLinks[i].parentElement.classList.add("active");
            }else{
                this.navigationLinks[i].parentElement.classList.remove("active");
            }
        }
    },
    registerClickEventListeners: function(){
        for(let i = 0; i < this.navigationLinks.length; i++){
            this.navigationLinks[i].addEventListener("click",function(){
                navigationMenuService.displayPage(i);
                navigationMenuService.activateMenuItem(this);
            });
        }
        this.citySearchBtn.addEventListener("click", function(){
            let city = navigationMenuService.citySearchInput.value;
            weatherApiService.getWeatherData(city);
        });
    }
};

let statisticsService ={
    calculateStatistics: function(data){
        let tempSum = 0;
        let humiditySum = 0;
        let minTemperature = data.list[0].main.temp;
        let maxTemperature = data.list[0].main.temp;
        let minHumidity = data.list[0].main.humidity;
        let maxHumidity = data.list[0].main.humidity;

        for(let i = 0; i < data.list.length; i++){
            let listItem = data.list[i];
            tempSum += listItem.main.temp;
            humiditySum += listItem.main.humidity;

            if(listItem.main.temp < minTemperature){
                minTemperature = listItem.main.temp;
            }
            if(listItem.main.temp > maxTemperature){
                maxTemperature = listItem.main.temp;
            }
            if(listItem.main.humidity < minHumidity){
                minHumidity = listItem.main.humidity;
            }
            if(listItem.main.humidity > maxHumidity){
                maxHumidity = listItem.main.humidity;
            }
        }

        let result ={
            averageTemperature: tempSum / data.list.length,
            averageHumidity: humiditySum / data.list.length,
            minTemperature: minTemperature,
            maxTemperature: maxTemperature,
            minHumidity: minHumidity,
            maxHumidity: maxHumidity
        }
        return result;
    }
};

let uiService ={
    displayStatistics: function(statisticsResult){
        let statisticsResultElement = document.getElementById("statisticsResult");
        statisticsResultElement.innerHTML = "";

        let table = document.createElement("table");
        table.classList.add("table");

        let tbody = document.createElement("tbody");

        let keys = Object.keys(statisticsResult);
        keys.forEach(key => {
            let row = document.createElement("tr");
            let cell1 = document.createElement("td");
            cell1.textContent = key.trim();
            let cell2 = document.createElement("td");
            cell2.textContent = statisticsResult[key];
            row.appendChild(cell1);
            row.appendChild(cell2);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        statisticsResultElement.appendChild(table);
    },
    displayHourlyData:function(hourlyData){
        let tableHTML = "<table class='table'>";
        tableHTML += "<thead><tr><th>Icon</th><th>Description</th><th>Time</th><th>Temperature (°C)</th><th>Humidity (%)</th><th>Wind Speed (m/s)</th></tr></thead><tbody>";

        for(let i = 0; i < hourlyData.length; i++){
            let hour = hourlyData[i];
            tableHTML += "<tr>";
            tableHTML += "<td><img src='http://openweathermap.org/img/w/" + hour.weather[0].icon + ".png' alt='" + hour.weather[0].description + "'></td>";
            tableHTML += "<td>" + hour.weather[0].description + "</td>";
            tableHTML += "<td>" + hour.dt_txt + "</td>"; 
            tableHTML += "<td>" + hour.main.temp + "</td>";
            tableHTML += "<td>" + hour.main.humidity + "</td>";
            tableHTML += "<td>" + hour.wind.speed + "</td>";
            tableHTML += "</tr>";
        }

        tableHTML += "</tbody></table>";

        document.getElementById("hourlyTableResult").innerHTML = tableHTML;
    }
};

let weatherApiService ={
    getWeatherData:async function(city){
        try{
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=2095b65c75e8d13fe9e3b0e095b36936`;
            let response = await fetch(url);
            let data = await response.json();
            let statisticsResult = statisticsService.calculateStatistics(data);
            let hourlyData = data.list;
            uiService.displayStatistics(statisticsResult);
            uiService.displayHourlyData(hourlyData);
        }
        catch {
            console.log("An error occurred");
        }
    }
};

navigationMenuService.registerClickEventListeners();
weatherApiService.getWeatherData("skopje");






















