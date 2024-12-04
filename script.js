const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');
const backgroundVideo = document.getElementById('backgroundVideo'); // New video element

// Function to change the background based on weather condition
function changeBackground(weather) {
    switch (weather) {
        case 'Clear':
            backgroundVideo.src = 'clear-bg.mp4'; // Change to your clear background video
            break;
        case 'Rain':
            backgroundVideo.src = 'rain-bg.mp4'; // Change to your rain background video
            break;
        case 'Snow':
            backgroundVideo.src = 'snow-bg.mp4'; // Change to your snow background video
            break;
        case 'Clouds':
            backgroundVideo.src = 'clouds-bg.mp4'; // Change to your clouds background video
            break;
        case 'Mist':
        case 'Haze':
            backgroundVideo.src = 'mist.mp4'; // Change to your mist/haze background video
            break;
        default:
            backgroundVideo.src = 'default.mp4'; // Change to your default background video
    }
}

search.addEventListener('click', () => {
    const APIKey = '272399bad93e622c05ee19587b7612e9'; // Enter your API Key here
    const city = document.getElementById('search-btn').value.trim();
    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityhide.textContent = city;
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            if (cityhide.textContent === city) {
                return;
            }

            cityhide.textContent = city;
            container.style.height = '560px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Set background based on the weather condition
            changeBackground(json.weather[0].main);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.jpg.png'; // Change if needed
                    break;
                case 'Rain':
                    image.src = 'rain.jpg.png'; // Change if needed
                    break;
                case 'Snow':
                    image.src = 'images/snow-new.png'; // Change if needed
                    break;
                case 'Clouds':
                    image.src = 'cloud.jpg.png'; // Change if needed
                    break;
                case 'Mist':
                    image.src = 'mist.jpg.png'; // Change if needed
                    break;
                case 'Haze':
                    image.src = 'mist.jpg.png'; // Change if needed
                    break;
                default:
                    image.src = 'clear.jpg.png'; // Change if needed
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action (e.g., form submission)
            searchButton.click();  // Simulates a click on the search button
        }
    });

    searchButton.addEventListener('click', () => {
        const location = inputField.value.trim();
        if (location) {
            console.log(`Searching for: ${location}`);
        } else {
            console.log('Please enter a location.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('locationInput');
    const autocompleteResults = document.getElementById('autocompleteResults');
    const searchButton = document.getElementById('searchButton');

    // Mock data for demonstration
    const locations = [
        "New York, USA",
        "London, UK",
        "Paris, France",
        "Tokyo, Japan",
        "Sydney, Australia",
        "Berlin, Germany",
        "Los Angeles, USA",
        "Toronto, Canada"
    ];

    // Function to update autocomplete results
    function updateAutocompleteResults(input) {
        autocompleteResults.innerHTML = ''; // Clear previous results

        // Filter locations based on input value
        const filteredLocations = locations.filter(location =>
            location.toLowerCase().includes(input.toLowerCase())
        );

        // Display suggestions
        filteredLocations.forEach(location => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('autocomplete-item');
            suggestion.textContent = location;

            suggestion.addEventListener('click', () => {
                inputField.value = location;
                autocompleteResults.innerHTML = ''; // Clear results after selection
                cityhide.classList.add('hide');
            });

            autocompleteResults.appendChild(suggestion);
        });

        // Show/hide autocomplete results based on input
        if (input) {
            autocompleteResults.style.display = 'block';
            cityhide.classList.remove('hide'); // Show the autocomplete container
        } else {
            autocompleteResults.style.display = 'none';
            cityhide.classList.add('hide'); // Hide the autocomplete container
        }
    }

    // Event listener for input field
    inputField.addEventListener('input', () => {
        const input = inputField.value;
        updateAutocompleteResults(input);
    });

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        const location = inputField.value.trim();
        if (location) {
            console.log(`Searching for: ${location}`);
            cityhide.classList.add('hide'); // Hide the autocomplete container
        } else {
            console.log('Please enter a location.');
        }
    });
});
