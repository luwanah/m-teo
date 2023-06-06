console.log('hello world')

//on va déclarer une constante avec notre clé d'api de open weather
//bien sur vous prenais la votre 

const apikey = '045e93640b58260c5ba8cb3178b29c83';

function getWeather() {
    //on va récupéré les valeurs des inputs
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=fr`;

    //on va cherché une requete ajax avec fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //dans une constante weather on va reconstruire un bject literal avec les donné de l'api
            //je veux comme prpriété: description, icon, temperature, humidity, windspeed, city et country


            const weather = {
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
            };
            //on va appeler la fonction displayWeather en lui passant en parametre l'objet weather 
            displayWeather(weather);

        })
        .catch(error => console.log(error));

}

function displayWeather(weather) {
    console.log(weather);
    const resultDiv = document.getElementById('result');

    //créer une div avec la classe card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card mb-3';
    cardDiv.style.maxWidth = '540px';
    cardDiv.style.backgroundColor = '#E3E3E3';

    //cree une div avec la class row
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row g-0';

    //cree une collment pour l'image 
    const colImgDiv = document.createElement('div');
    colImgDiv.className = 'col-md-4';

    //creer une image
    const iconImg = document.createElement('img')
    iconImg.src = weather.icon;
    iconImg.alt = `icone météo${weather.description}`;
    iconImg.className = 'img-fluid rounded-start w-100';

    //crée une collone pour le contenue de la carte
    const colContentDiv = document.createElement('div');
    colContentDiv.className = 'col-md-8';

    //créer le corps de la card
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    //creer le titre de la card
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${weather.city}, ${weather.country}`;

    //céer le paragraphe de la descriptionfu temps
    const descP= document.createElement('p');
    descP.className = 'card-text';
    descP.textContent = ` ${weather.description}`;

    //céer le paragraphe de la descriptionfu temps
    const tempsP = document.createElement('p');
    tempsP.className = 'card-text';
    tempsP.textContent = `température: ${weather.temperature}°C`;

    //céer le paragraphe de la descriptionfu temps
    const humidityP = document.createElement('p');
    humidityP.className = 'card-text';
    humidityP.textContent = `humidité: ${weather.humidity}%`;

    //céer le paragraphe de la descriptionfu temps
    const windspeedP = document.createElement('p');
    windspeedP.className = 'card-text';
    windspeedP.textContent = `vitesse du vent: ${weather.windspeed}°m/s`;

    //on va ajouter les élément dans le DOM
    colImgDiv.appendChild(iconImg);
    //on va ajouter le titre; la description, la temperature, l'humidit" et la vitesse du vent dans le corp de la card 
    cardBodyDiv.append(cardTitle, descP, tempsP, humidityP, windspeedP);
    //on va ajouter le corp de la card dans la colonne du contenu
    colContentDiv.appendChild(cardBodyDiv);
    //on va ajouter la colonne de l'image et de la colonne du contenu dans la div row
    rowDiv.append(colImgDiv, colContentDiv);
    //on va ajouter row dans la div card
    cardDiv.appendChild(rowDiv);

    //on va ajouter la div card dans la div result
    resultDiv.innerHTML = '';
    resultDiv.appendChild(cardDiv);


}