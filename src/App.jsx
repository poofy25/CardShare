import './App.css'
import { useState , useEffect } from "react"

function App() {
 
  const [mobile, setMobile] = useState(window.innerWidth <= 767);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 767);
    if(!mobile){ console.log('Desktop is not supported')}else {console.log('Mobile is supported')}
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

 

  return (
    <>
    </>
  )
}

export default App
