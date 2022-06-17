import { AndroidOutlined, AppleOutlined, TagsOutlined } from '@ant-design/icons';
import { Tabs, Row } from 'antd';
import Products from '../User/UI/products';
import Categories from '../User/UI/categories';
const { TabPane } = Tabs;

const Dashboard = () => (
    <Row justify='center'>
        <Tabs defaultActiveKey="2">
            <TabPane
                tab={
                    <span>
                        <TagsOutlined />
                       Gestion de productos
                    </span>
                }
                key="1"
            >
               <Products />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <TagsOutlined />
                       Gestion de categorias
                    </span>
                }
                key="2"
            >
               <Categories /> 
            </TabPane>
        </Tabs>
    </Row>
);

export default Dashboard;