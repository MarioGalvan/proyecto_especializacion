import { Space, Table, Tag,Button, Input,notification } from 'antd';
import React, {useState,useEffect,useRef} from "react"
import {collection, getDocs, getDoc,deleteDoc, doc} from 'firebase/firestore'
import { db } from "../../../Firebase/firebaseConfig"
import { async } from "@firebase/util"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const openNotification = () => {
  notification.open({
    message: 'Producto',
    description:
      'No existe producto asociado al elemento de busqueda.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
  if(extra.currentDataSource.length ==0)openNotification()
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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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
      dataIndex: 'nombres',
      key: 'nombres',
      render: (text) => <a>{text}</a>,
      width: '30%',
      ...getColumnSearchProps('nombres'),
    },
    {
      title: 'Contenido',
      dataIndex: 'contenido',
      key: 'contenido',
      width: '20%',
      ...getColumnSearchProps('contenido'),
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      sorter: (a, b) => a.precio - b.precio,
    }
  ];
  return (
    <Table columns={columns} dataSource={products} onChange={onChange} />
  )
}

export default App;