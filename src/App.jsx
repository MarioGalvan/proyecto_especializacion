import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { UseTestingBackend } from './Services/User/TestBackend'

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
      <header className="App-header">
        <img src={`${dataTesting[0]?.image}`} className="App-logo" alt="logo" />
        <p>Hello Vite + React Connected! {dataTesting[0]?.nombre} </p>
       
        <p>
         {JSON.stringify(dataTesting[0])}
        </p>
      
      </header>
    </div>
  )
}

export default App
