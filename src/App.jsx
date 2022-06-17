import React, { useState } from 'react'
import './App.css'
import { UseTestingBackend } from './Services/User/TestBackend'
import { MainRouter } from './Routes/MainRouter'

function App() {
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

  return (
    <div className="App">
     <MainRouter />
    </div>
  )
}

export default App
