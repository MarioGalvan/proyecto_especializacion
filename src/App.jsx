import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { UseTestingBackend } from './Services/User/TestBackend'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Index from './Components/User/UI/index';

function App() {
  const [count, setCount] = useState(0)
  const [dataTesting, setdataTesting] = useState([])

  React.useEffect(()=>{
    UseTestingBackend().then(data=>{
      if(data){
        data.forEach(element => {
          setdataTesting([...dataTesting, element.data()])
        });
      }
    })
  },[])

  console.log("dataTesting", dataTesting[0])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
