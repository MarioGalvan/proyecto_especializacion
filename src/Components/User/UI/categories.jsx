import { Space, Table, Tag,Button, Input, notification,Descriptions ,Modal,Form } from 'antd';
import React, {useState,useEffect,useRef} from "react"
import {collection, getDocs, getDoc,deleteDoc, doc,addDoc} from 'firebase/firestore'
import { db } from "../../../Firebase/firebaseConfig"
import { async } from "@firebase/util"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const openNotification = (tlt,msm) => {
 //alert(e)
  notification.open({
    message: tlt,
    description:msm,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
  if(extra.currentDataSource.length ==0)openNotification('Error','No existe categoria asociado al elemento de busqueda.')
};
const App = () => {
  // Configuramos los hooks
  const [categories,setCategories] = useState([])
  const [nombre,setNombre ]  = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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
  const store = async (e)=>{
    //e.preventDefault()
    await addDoc(categoriesCollection,{nombre : nombre, estado:true})
    openNotification('exito','Categoria registrada.')
    getCategories()
    handleOk()
    //alert("aaaa")
  }
  // usamos useEfectt
  useEffect(()=>{
    getCategories()
  },[])

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
 
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text) => <a>{text}</a>,
      width: '20%',
      ...getColumnSearchProps('nombre'),
    }
  ];
  
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create categories
      </Button>
      <br />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form onFinish={store}>
          <Input placeholder="Nombre de la categoria" maxLength={40}  onChange={(e) => setNombre(e.target.value)} value={nombre}/>
          <br />
          <br />
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={categories} onChange={onChange} />
    </>
    
  )
}

export default App;