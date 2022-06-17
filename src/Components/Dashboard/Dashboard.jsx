import { AndroidOutlined, AppleOutlined, TagsOutlined } from '@ant-design/icons';
import { Tabs, Row } from 'antd';
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
               aqui va el componente de productos 
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
               aqui va el componente de categorias 
            </TabPane>
        </Tabs>
    </Row>
);

export default Dashboard;