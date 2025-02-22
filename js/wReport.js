

    const openWA = document.querySelector('.weather-app');
    const weatherApp = document.querySelector('#WeatherAppModal');
    openWA.addEventListener('click', () => {
        weatherApp.showModal();
    })

   /* ///=== End Open Weather App Modal ===\\\ */

    function getWeather() {
    const apiKey = '';
    const city = document.getElementById('city').value;
   
    if (!city) {
        alert('Please enter a city');
        return;
    }



    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather data
    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error Fetching current weather data', error);
            alert('Error Fetching current weather data, please try again');
        });

    // Fetch hourly forecast data
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);  // Call the function to display hourly forecast
        })
        .catch(error => {
            console.log('Error Fetching hourly forecast data', error);
            alert('Error Fetching hourly forecast data, please try again');
        });
	}

// Display hourly forecast
	function displayHourlyForecast(hourlyData) {
			const hourlyForecastDiv = document.getElementById('hourly-forecast');
    

      // Ensure the element exists before attempting to modify it
      if (!hourlyForecastDiv) {
        console.error("Element with ID 'hourly-forecast' not found");
        return;
    }
    const next24Hours = hourlyData.slice(0, 8); // Get the first 8 items (next 24 hours)
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);  // Convert the Unix timestamp
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);  // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}\u00B0C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHTML;
		});
	}

// Display current weather
	function displayWeather(data) {
		const tempDivInfo = document.getElementById('temp-div');
		const weatherInfoDiv = document.getElementById('weather-info');
		const weatherIcon = document.getElementById('weather-icon');
		const hourlyForecastDiv = document.getElementById('hourly-forecast');
		const convScale = document.getElementById('conv-scales');
		const hourly = document.getElementById('hrly');

		// Clear previous content
		weatherInfoDiv.innerHTML = '';
		hourlyForecastDiv.innerHTML = '';
		tempDivInfo.innerHTML = '';
		convScale.innerHTML = '';
		hourly.innerHTML = "";

		if (data.cod === '404') {
			weatherInfoDiv.HTML = `<p>${data.message}</p>`;
		} else {
			const cityName = data.name;
			const temperature = Math.round(((data.main.temp - 273.15) * 1.8) + 32, 1); // Convert to Celsius
			const description = data.weather[0].description;
			const iconCode = data.weather[0].icon;
			const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
			const kelvin = Math.round((data.main.temp * 1), 1) + '\u00B0K';
			const celcius =  Math.round((data.main.temp - 273.15), 1) + '\u00B0C';
			const rankine = Math.round((data.main.temp + 459.67), 1) + '\u00B0R';


			const temperatureHTML = `<p>${temperature}\u00B0F</p>`;
			const weatherHTML = `
				<p>${cityName}</p>
				<p>${description}</p>`;

			const scales = `
				<div class="converted">
				<span>${kelvin}</span>
				<span>${celcius}</span>
				<span>${rankine}</span>
				</div>          
				`;

			hourly.innerHTML = `
			<h2>24 Hour Forecast</h2>`;

			convScale.innerHTML = scales;
			tempDivInfo.innerHTML = temperatureHTML;
			weatherInfoDiv.innerHTML = weatherHTML;
			weatherIcon.src = iconUrl;
			weatherIcon.alt = description;

			showImage();
		}
	}

// Show weather icon
	function showImage() {
		const weatherIcon = document.getElementById('weather-icon');
		weatherIcon.style.display = 'block';
	}

// Ensure the DOM is loaded before running any code that manipulates it
	document.addEventListener('DOMContentLoaded', function() {
		// Your DOM is ready here, but we don't need to wrap displayHourlyForecast anymore
	});

