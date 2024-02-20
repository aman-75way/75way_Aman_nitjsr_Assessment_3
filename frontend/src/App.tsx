import { useState } from 'react'
import { FetchMessages } from './components/fetchData/fetchData'
import { SendData } from './components/sendData/sendData.tsx'
import Navbar from './navbar/Navbar.tsx'
import Routes_ from './routes/Routes.tsx'

function App() {
  
  return (
    <>
      {/* <FetchMessages /> */}
      {/* <SendData /> */}
      <Navbar />
      <Routes_ />
    </>
  )
}

export default App
