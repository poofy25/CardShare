import './App.css'
import { useState , useEffect } from "react"
import { lazy } from 'react'
import { Suspense } from 'react'

import NavigationBar from './components/Navigation/Navigation.jsx'

const ViewCardPage = lazy(()=>import('./pages/ViewCard/ViewCard.jsx'))
const CreateCardPage = lazy(()=>import('./pages/CreateCard/CreateCard.jsx'))
const ContactsPage = lazy(()=>import('./pages/Contacts/Contacts.jsx'))
const CardsPage = lazy(()=>import('./pages/Cards/Cards.jsx'))
const ProfilePage = lazy(()=>import('./pages/Profile/Profile.jsx'))
const SignInPage = lazy(()=>import('./pages/SignIn/SignIn.jsx'))
const SignUpPage = lazy(()=>import('./pages/SignUp/SignUp.jsx'))
const HomePage = lazy(()=>import('./pages/Home/HomePage.jsx'))

import { BrowserRouter , Route , Routes } from 'react-router-dom'
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

<BrowserRouter>

      <Routes>
        <Route path="/" element={<Suspense fallback={'DAMNNNNNN'}><HomePage /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={'DAMNNNNNN'}><HomePage /></Suspense>}/>
        <Route path="/signin" element={<Suspense fallback={'DAMNNNNNN'}><SignInPage /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={'DAMNNNNNN'}><SignUpPage /></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={'DAMNNNNNN'}><ProfilePage /></Suspense>} />
        <Route path="/cards" element={<Suspense fallback={'DAMNNNNNN'}><CardsPage /></Suspense>} />
        <Route path="/contacts" element={<Suspense fallback={'DAMNNNNNN'}><ContactsPage /></Suspense>} />
        <Route path="/createcard" element={<Suspense fallback={'DAMNNNNNN'}><CreateCardPage use='create' /></Suspense>} />
        <Route path="/editcard/:id" element={<Suspense fallback={'DAMNNNNNN'}><CreateCardPage use='edit' /></Suspense>} />
        <Route path="/viewcard/:id" element={<Suspense fallback={'DAMNNNNNN'}><ViewCardPage /></Suspense>} />
      </Routes>

      <NavigationBar/>
    
</BrowserRouter>


    </>
  )
}

export default App
