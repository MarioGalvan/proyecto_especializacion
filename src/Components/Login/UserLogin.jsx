import React from 'react'
import { Button, Checkbox, Form, Input, Card, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import loginBackgound from '../../Assets/img/loginbackground.png'

export const UserLogin = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('This is a warning message');
    };
    return (
        <Row justify="center" align='middle' style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${loginBackgound})`,
        }}>
               

            <Card
                cover={
                  <Row justify='center'>
                      <img src="https://theburguerfactory.com/wp-content/uploads/2020/10/favicon.png" alt="logo" style={{ width: '50%', height: '50%', borderRadius: 12, margin:4 }} />
                  </Row>
                }
                hoverable
                bordered
                style={{ width: 400, borderRadius: 12, height: 400,
                    borderWidth: 2,
                    borderColor: '#422E20'
                }}>
                
                <Form
                    style={{
                        position: 'absolute',
                        top: '60%',
                        left: '10%',
                    }}
                    name="basic"
                    // labelCol={{
                    //     span: 8,
                    // }}
                    // wrapperCol={{
                    //     span: 16,
                    // }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Usuario"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo es obligatorio',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo es obligatorio',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                    >
                        <Button icon={<SendOutlined />} size="middle" shape='round' style={{
                            background: '#422E20',
                            color: 'white',
                            border: 'none',
                        }} htmlType="submit">
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>

    )
}
