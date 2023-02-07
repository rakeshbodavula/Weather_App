const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

const API_Key = '5c6570c4f4d94ee9d2fa26cdcb7f96a1'  // API KEY of weather api


// List of 30 cities
const cities = ["Chennai", "New Delhi", "Tokyo", "Moscow", "Beijing", "Istanbul", "Mumbai", "Shanghai", "Lahore", "Karachi", "Dhaka", "Seoul", "Bangkok", "Tehran", "Jakarta", "Kolkata", "Beirut", "Manila", "Riyadh", "Yangon", "Ho Chi Minh City", "Cairo", "Baghdad", "Bangalore", "Hyderabad", "Shenzhen", "Guangzhou", "Pune", "Kabul", "Lima"]



// the api that gets the data from the 3rd party api, paginates it and returns data in JSON format 
app.get('/getCoordinates/v1', (req, res) => {
    let Result = []  // an array to store the weather details of all the cities
    let promises = []  // an array to store the promises for each city
    cities.forEach(city => {
        promises.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`)
                .then(res => res.data)
                .then(data => {
                    Result.push({
                        name: data.name,
                        longitude: +data.coord.lon,
                        latitude: +data.coord.lat,
                        main: data.weather[0].main,
                        description: data.weather[0].description,
                        temperature: data.main.temp,
                        min_temperature: data.main.temp_min,
                        max_temperature: data.main.temp_max,
                        humidity: data.main.humidity,
                        sea_level: data.main.sea_level,
                        windSpeed: data.wind.speed
                    })
                })
                .catch(err => console.log(err))
        )
    })

    const PAGE_SIZE = 10  // ideal Page Size

    Promise.all(promises)
        .then(() => {

            // Code for pagination
            const page = +req.query.page || 1;
            const pageSize = +req.query.pageSize || PAGE_SIZE;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedData = Result.slice(startIndex, endIndex);
            res.json({
                data: paginatedData,
                totalPages: Math.ceil(Result.length / pageSize),
            }).status(200);
        })
        .catch(err => {
            res.json(err).status(500)
        })
})



const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server up at port ${PORT}`)
})