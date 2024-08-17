import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/sun.svg'
import clear_sky from "../assets/clear_sky.png"
import drizzle from "../assets/drizzle.svg"
import cloud from '../assets/cloud.svg'
import snow from '../assets/snow.png'
import rain from '../assets/rain1.png'
import thunderstorm from '../assets/thunderstorm.png'
import mist  from '../assets/haze.svg'
import { FaMoon } from 'react-icons/fa'
import { IoIosSunny } from 'react-icons/io'
import { FaTemperatureHigh } from "react-icons/fa";



function Weather(props) {

  const [weatherdata,setWeatherdata] = useState();
  const [error,setError] = useState(false);
  

  const inuptRef = useRef();

  const allIcons = {
    "01d": clear_sky,
    "01n": clear_sky,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
    };
  
  
  const search = async (city) =>{
   

    if(!city){
      setError("Value can't be blank, Please enter city name");
      setWeatherdata(false);
      return;
     
    }
    

    try{
      let api_key = "08b134dc51a593fa582598c015b0e37e";
            
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

      const response = await fetch(url);
      
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear_sky;

      console.log(data);
      setWeatherdata({
        humidity : data.main.humidity,
        temp : Math.floor(data.main.temp),
        mintemp : Math.floor(data.main.temp_min),
        maxtemp : Math.floor(data.main.temp_max),
        winSpeed : data.wind.speed,
        location : data.name,
        description : data.weather[0].main,
        icon : icon,
      });
      setError(false);
      
    }
    catch{
      console.error(error);
      setError("404 city not found, error in fetching data");
      setWeatherdata(false);
      
    }
  }


  useEffect(()=>{
    search("london")
  },[])


  const handleSubmit = (e) =>{
      e.preventDefault();
      search(inuptRef.current.value);
      inuptRef.current.value = "";
  }
  return (
    <div>
      
          <div className="bg-neutral-50 dark:bg-gray-600 py-2 px-5 flex justify-between items-center p-2">
                <div className='flex items-center'>
                            <img className='w-9 lg:w-10 mr-5'src={logo} alt="logo"/>
                            <h1 className='text-gray-700 dark:text-white font-semibold'>Weather Forecast</h1>
                  </div>
                <div onClick={props.handleThemeSwitcher} className='text-neutral-400 dark:text-white'>
                {(props.theme === 'dark')? <IoIosSunny size={30}/> :<FaMoon size={25}/>}   
                </div>
                            
          </div>
           {/* Logo ends here */}
          <div className='pb-12 lg:pb-10'>
                <form className='bg-gray-200 dark:bg-gray-700 flex justify-around py-3 px-2 ' onSubmit={handleSubmit}>
                <input className='w-3/4  h-[35px] rounded-full p-5 text-gray-500 outline-none ' ref={inuptRef} type="text" placeholder='Search your city name' />
                <button type="submit" className='bg-red-500 px-5 py-2 cursor-pointer mx-2 rounded-full text-white'>Submit</button>
                </form>            
          </div>
           {/* input ends here */}

           
          
         

          <p className="text-center  font-semibold text-base lg:text-lg text-red-600 dark:text-white pt-50">{error}</p>

          
 
          {weatherdata && <div className='w-3/4 lg:w-3/12 h3/4 lg:h-2/4 bg-gray-100   text-neutral-700 mx-auto flex flex-col items-center shadow-xl rounded-2xl p-3'>
            <p className='text-5xl  drop-shadow'>{weatherdata.location}</p>
            <p className='text-3xl m-3 '>{weatherdata.description}</p>
            <div className="flex justify-between items-center">
                <img src={weatherdata.icon} className=' w-16 m-2' alt="weather"/>
                <p className='text-4xl mx-1'>{weatherdata.temp} °C</p>
            </div>


            <div className="flex justify-between items-center ">
                  <div className="p-4">
                  <p className='text-2xl m-3 '>Min</p>
                  <div className='flex'>
                  <FaTemperatureHigh size={30}/>
                  <p className='text-3xl'>{weatherdata.mintemp} °</p>
                  </div>
                  </div>

                  <div className="p-4">
                  <p className='text-2xl m-3'>Max</p>
                  <div className='flex'>
                  <FaTemperatureHigh size={30}/>
                  <p className='text-3xl'>{weatherdata.maxtemp} °</p>
                  </div>
                  </div>
            </div>

            <div className='flex '>
                <div className="flex-col p-5">
                <p className='text-base font-bold'>Humidity</p> 
                <p className='text-lg'>{weatherdata.humidity} %</p>
                </div>
                <div className="flex-col p-5">
                <p className='text-base font-bold'>Wind Speed</p> 
                <p className='text-lg'>{weatherdata.winSpeed} Km/hr</p>
                </div>
            </div>

      </div>}

           
          

          

    </div>
  )
}

export default Weather
