import { Space, Table, Tag } from 'antd';
import React, {useState,useEffect} from "react"
import {collection, getDocs, getDoc,deleteDoc, doc} from 'firebase/firestore'
import { db } from "../../../Firebase/firebaseConfig"
import { async } from "@firebase/util"
const columns = [
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Contenido',
    dataIndex: 'contenido',
    key: 'contenido',
  },
  {
    title: 'Precio',
    dataIndex: 'precio',
    sorter: (a, b) => a.precio - b.precio,
  }
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => {
  // Configuramos los hooks
  const [products,setProducts] = useState([])
  // referenciar database
  const productsCollection=collection (db,"productos")
  // creamos funcion para crear documento
  const getProducts = async () =>{
    const data = await getDocs(productsCollection)
      setProducts(
        data.docs.map((doc) =>({...doc.data(),key:doc.id}))
      )
  }
  // usamos useEfectt
  useEffect(()=>{
    getProducts()
   },[])

  return (
    <Table columns={columns} dataSource={products} onChange={onChange} />
  )
}

export default App;