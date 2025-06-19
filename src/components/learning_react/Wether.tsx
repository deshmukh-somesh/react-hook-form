import React, { useState, useEffect } from 'react'

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const WeatherApp: React.FC = () => {
    const apiKey = "cb8ff42369810c782d502f9c91689417"
    interface WeatherData {
        name: string,
        temp: number,
        description: string,
        emoji: string
    }

    const [city, setCity] = useState<string>("london");
    const [weather, setWeather] = useState<WeatherData | null>(null); // TypeScript knows: "weather can be WeatherData OR null"
    const [loading, setLoading] = useState(false);

    // const getWeatherdata = async (cityName: string) => {


    //     await new Promise(resolve => setTimeout(resolve, 2000));

    //     return {

    //         name: cityName,
    //         temp: Math.floor(Math.random() * 30) + 5,
    //         description: "Clear Sky",
    //         emoji: "☀️"
    //     }
    // }

    useEffect(() => {
        handleSearch()
    }, []); // Empty array = runs once on mount . 

    const fetchWeather = async (cityName: string) => {

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }
            console.log(response)
            console.log(typeof (response))

            const data = await response.json()
            // console.log(typeof(data));

            console.log(data);
            return {
                name: cityName,
                temp: data.main.temp,
                description: data.weather[0]?.description,
                emoji: "☀️"
            }


        } catch (error) {
            throw new Error("Failed to fetch weather.")
        }
    }

    const handleInuptCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setCity(e.target.value);
    }

    const handleSearch = async () => {
        // if (city.trim() === "") return;
        // setCity("")
        console.log("handleSearch was called in useffect when our componet mounted for the first time.")
        setLoading(true);
        try {
            const data = await fetchWeather(city)
            setWeather(data);

        } catch (error) {
            throw new Error("Cound not get weather data.")
        } finally {

            setLoading(false);
        }
        // console.log(data);
    }

    return (
        <div className="min-h-screen bg-blue-500 p-4 ">
            <h1> 🌤️  Weather App</h1>
            <div className="flex justify-center items-center gap-8 mt-10">
                <input type="text" value={city} onChange={handleInuptCity} placeholder='Enter city name...' />
                <button className="bg-lime-500 w-20 rounded-md h-10" onClick={handleSearch} disabled={loading}>{loading ? "Loading..." : "Search"}</button>
            </div>
            <div>

                {loading && <div> 🔄Loading weather... </div>}

                {!loading && weather && (
                    <div className='mt-10'>
                        <h2>{weather.name}</h2>
                        <div>{weather.emoji}</div>
                        <p>{weather.description}</p>
                        <div>{weather.temp}</div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default WeatherApp;