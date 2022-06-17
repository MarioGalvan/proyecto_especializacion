import { Space, Table, Tag } from 'antd';
import React, {useState,useEffect} from "react"
import {collection, getDocs, getDoc,deleteDoc, doc} from 'firebase/firestore'
import { db } from "../../../Firebase/firebaseConfig"
import { async } from "@firebase/util"
const columns = [
  {
    title: 'Nombres',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  }
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => {
  // Configuramos los hooks
  const [categories,setCategories] = useState([])
  // referenciar database
  const categoriesCollection=collection (db,"categorias")
  // creamos funcion para crear documento
  const getCategories = async () =>{
    const data = await getDocs(categoriesCollection)
      setCategories(
        data.docs.map((doc) =>({...doc.data(),key:doc.id}))
      )
      console.log(categories)
  }
  // usamos useEfectt
  useEffect(()=>{
    getCategories()
   },[])

  return (
    <Table columns={columns} dataSource={categories} onChange={onChange} />
  )
}

export default App;