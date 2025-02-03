// import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"
import Feed from './components/Feed'
import Connection from './components/Connection'
import Request from './components/Request'
// import SignUp from './components/Signup'

function App() {

  return (
    <Provider store={appStore}>
    <div>
     <BrowserRouter basename='/'>
     <Routes>
     <Route path="/" element={<Body/>}>
     <Route path='/feed' element={<Feed/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/connection' element={<Connection/>}/>
       <Route path='/request' element={<Request/>}/>
     </Route>
     
     </Routes>

     </BrowserRouter>
    </div>
    </Provider>
  )
}

export default App
