import React, {useState} from 'react'
import Weather from './components/Weather'

function App() {

  const [theme, setTheme] = useState(false); 

  const handleThemeSwitcher = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }
  

  return (
    <div className='overflow-x-hidden text-black'>
     <div className="fixed w-full h-full bg-gray-300 dark:bg-gray-900">
     <Weather city="goa" handleThemeSwitcher={handleThemeSwitcher}  theme={theme} />
     </div>
    
    </div>
  )
}

export default App
