import { useEffect, useState } from 'react';

import {
    Alert,
    App as AntApp,
    theme as antdTheme,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col,
    Collapse,
    ConfigProvider,
    DatePicker,
    Descriptions,
    Divider,
    Empty,
    Flex,
    Input,
    InputNumber,
    Layout,
    List,
    Menu,
    Pagination,
    Progress,
    Radio,
    Rate,
    Result,
    Row,
    Segmented,
    Select,
    Skeleton,
    Slider,
    Space,
    Spin,
    Steps,
    Switch,
    Table,
    Tabs,
    Tag,
    Timeline,
    Typography,
} from 'antd';

import './ant_componet.css';
import { createAppTheme } from './antDesignThemeConfig';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Item } = Breadcrumb;
const { Panel } = Collapse;

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { token } = antdTheme.useToken(); // Hook to access resolved tokens

    // Effect to toggle the data-theme attribute on the body
    useEffect(() => {
        const body = document.body;
        if (isDarkMode) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
    }, [isDarkMode]);

    // Create theme based on current mode
    const appTheme = createAppTheme(isDarkMode);

    return (
        <ConfigProvider theme={appTheme}>
            <AntApp>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: `1px solid ${token.colorBorder}`,
                            background: token.colorBgContainer,
                        }}
                    >
                        <Title level={3} style={{ color: token.colorText, margin: 0 }}>
                            Comprehensive Ant Design Theme
                        </Title>
                        <Space>
                            <Text style={{ color: token.colorTextSecondary }}>
                                {isDarkMode ? 'Dark' : 'Light'} Mode
                            </Text>
                            <Switch checked={isDarkMode} onChange={setIsDarkMode} />
                        </Space>
                    </Header>

                    <Content style={{ padding: '24px 48px', background: token.colorBgLayout }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {/* Basic Components */}
                            <Card
                                title="Basic Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Space wrap size="middle">
                                        <Button type="primary">Primary Button</Button>
                                        <Button>Default Button</Button>
                                        <Button type="dashed">Dashed Button</Button>
                                        <Button type="text">Text Button</Button>
                                        <Button type="link">Link Button</Button>
                                        <Button danger>Danger Button</Button>
                                    </Space>

                                    <Space wrap size="middle">
                                        <Input placeholder="Basic Input" style={{ width: 200 }} />
                                        <InputNumber
                                            placeholder="Number Input"
                                            style={{ width: 200 }}
                                        />
                                        <Select placeholder="Select Option" style={{ width: 200 }}>
                                            <Option value="option1">Option 1</Option>
                                            <Option value="option2">Option 2</Option>
                                        </Select>
                                        <DatePicker
                                            placeholder="Select Date"
                                            style={{ width: 200 }}
                                        />
                                    </Space>

                                    <Space wrap size="middle">
                                        <Checkbox>Checkbox</Checkbox>
                                        <Radio.Group>
                                            <Radio value="radio1">Radio 1</Radio>
                                            <Radio value="radio2">Radio 2</Radio>
                                        </Radio.Group>
                                        <Switch defaultChecked />
                                        <Slider defaultValue={30} style={{ width: 200 }} />
                                        <Rate defaultValue={3} />
                                    </Space>
                                </Space>
                            </Card>

                            {/* Data Display Components */}
                            <Card
                                title="Data Display Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Space wrap size="middle">
                                        <Badge count={5}>
                                            <div
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    background: token.colorFill,
                                                    borderRadius: 4,
                                                }}
                                            />
                                        </Badge>
                                        <Tag color="blue">Blue Tag</Tag>
                                        <Tag color="green">Green Tag</Tag>
                                        <Tag color="red">Red Tag</Tag>
                                        <Tag color="orange">Orange Tag</Tag>
                                    </Space>

                                    <Progress percent={30} />
                                    <Progress percent={50} status="active" />
                                    <Progress percent={70} status="success" />
                                    <Progress percent={100} status="exception" />

                                    <Table
                                        dataSource={[
                                            {
                                                key: '1',
                                                name: 'John',
                                                age: 32,
                                                address: 'New York',
                                            },
                                            { key: '2', name: 'Jane', age: 28, address: 'London' },
                                        ]}
                                        columns={[
                                            { title: 'Name', dataIndex: 'name', key: 'name' },
                                            { title: 'Age', dataIndex: 'age', key: 'age' },
                                            {
                                                title: 'Address',
                                                dataIndex: 'address',
                                                key: 'address',
                                            },
                                        ]}
                                        pagination={false}
                                        size="small"
                                    />
                                </Space>
                            </Card>

                            {/* Feedback Components */}
                            <Card
                                title="Feedback Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Alert message="Success Alert" type="success" showIcon />
                                    <Alert message="Info Alert" type="info" showIcon />
                                    <Alert message="Warning Alert" type="warning" showIcon />
                                    <Alert message="Error Alert" type="error" showIcon />

                                    <Space wrap size="middle">
                                        <Spin />
                                        <Spin size="large" />
                                        <Skeleton active />
                                        <Empty description="No Data" />
                                    </Space>

                                    <Result
                                        status="success"
                                        title="Successfully Completed!"
                                        subTitle="Your operation has been completed successfully."
                                    />
                                </Space>
                            </Card>

                            {/* Navigation Components */}
                            <Card
                                title="Navigation Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Breadcrumb>
                                        <Item>Home</Item>
                                        <Item>Application</Item>
                                        <Item>An Application</Item>
                                    </Breadcrumb>

                                    <Menu
                                        mode="horizontal"
                                        style={{
                                            background: token.colorBgContainer,
                                            color: token.colorText,
                                        }}
                                    >
                                        <Menu.Item key="1" style={{ color: token.colorText }}>
                                            Navigation One
                                        </Menu.Item>
                                        <Menu.Item key="2" style={{ color: token.colorText }}>
                                            Navigation Two
                                        </Menu.Item>
                                        <Menu.Item key="3" style={{ color: token.colorText }}>
                                            Navigation Three
                                        </Menu.Item>
                                    </Menu>

                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="Tab 1" key="1">
                                            Content of Tab Pane 1
                                        </TabPane>
                                        <TabPane tab="Tab 2" key="2">
                                            Content of Tab Pane 2
                                        </TabPane>
                                        <TabPane tab="Tab 3" key="3">
                                            Content of Tab Pane 3
                                        </TabPane>
                                    </Tabs>

                                    <Steps current={1}>
                                        <Step
                                            title="Finished"
                                            description="This is a description."
                                        />
                                        <Step
                                            title="In Progress"
                                            description="This is a description."
                                        />
                                        <Step
                                            title="Waiting"
                                            description="This is a description."
                                        />
                                    </Steps>

                                    <Pagination defaultCurrent={1} total={50} showSizeChanger />
                                </Space>
                            </Card>

                            {/* Advanced Components */}
                            <Card
                                title="Advanced Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Collapse>
                                        <Panel header="This is panel header 1" key="1">
                                            <p>Panel content 1</p>
                                        </Panel>
                                        <Panel header="This is panel header 2" key="2">
                                            <p>Panel content 2</p>
                                        </Panel>
                                    </Collapse>

                                    <Timeline>
                                        <Timeline.Item>
                                            Create a services site 2015-09-01
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            Solve initial network problems 2015-09-01
                                        </Timeline.Item>
                                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                        <Timeline.Item>
                                            Network problems being solved 2015-09-01
                                        </Timeline.Item>
                                    </Timeline>

                                    <List
                                        header={<div>Header</div>}
                                        footer={<div>Footer</div>}
                                        bordered
                                        dataSource={[
                                            'Racing car sprays burning fuel into crowd.',
                                            'Japanese princess to wed commoner.',
                                            'Australian walks 100km after outback crash.',
                                            'Man charged over missing wedding girl.',
                                            'Los Angeles battles huge wildfires.',
                                        ]}
                                        renderItem={item => <List.Item>{item}</List.Item>}
                                    />

                                    <Descriptions title="User Info" bordered>
                                        <Descriptions.Item label="UserName">
                                            Zhou Maomao
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Telephone">
                                            1810000000
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Live">
                                            Hangzhou, Zhejiang
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                                        <Descriptions.Item label="Address">
                                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang,
                                            China
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Space>
                            </Card>

                            {/* Layout Components */}
                            <Card
                                title="Layout Components"
                                style={{ background: token.colorBgContainer }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    padding: 16,
                                                    background: token.colorBgElevated,
                                                    borderRadius: 6,
                                                    border: `1px solid ${token.colorBorder}`,
                                                    color: token.colorText,
                                                }}
                                            >
                                                Column 1
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    padding: 16,
                                                    background: token.colorBgElevated,
                                                    borderRadius: 6,
                                                    border: `1px solid ${token.colorBorder}`,
                                                    color: token.colorText,
                                                }}
                                            >
                                                Column 2
                                            </div>
                                        </Col>
                                    </Row>

                                    <Flex gap="middle" wrap>
                                        <div
                                            style={{
                                                padding: 16,
                                                background: token.colorBgElevated,
                                                borderRadius: 6,
                                                border: `1px solid ${token.colorBorder}`,
                                                color: token.colorText,
                                                flex: 1,
                                            }}
                                        >
                                            Flex Item 1
                                        </div>
                                        <div
                                            style={{
                                                padding: 16,
                                                background: token.colorBgElevated,
                                                borderRadius: 6,
                                                border: `1px solid ${token.colorBorder}`,
                                                color: token.colorText,
                                                flex: 1,
                                            }}
                                        >
                                            Flex Item 2
                                        </div>
                                        <div
                                            style={{
                                                padding: 16,
                                                background: token.colorBgElevated,
                                                borderRadius: 6,
                                                border: `1px solid ${token.colorBorder}`,
                                                color: token.colorText,
                                                flex: 1,
                                            }}
                                        >
                                            Flex Item 3
                                        </div>
                                    </Flex>

                                    <Divider orientation="left">Divider</Divider>

                                    <Segmented
                                        options={[
                                            'Daily',
                                            'Weekly',
                                            'Monthly',
                                            'Quarterly',
                                            'Yearly',
                                        ]}
                                    />
                                </Space>
                            </Card>
                        </Space>
                    </Content>

                    <Footer style={{ textAlign: 'center', background: token.colorBgContainer }}>
                        <Text style={{ color: token.colorTextSecondary }}>
                            Comprehensive Ant Design Theme System ©2024
                        </Text>
                    </Footer>
                </Layout>
            </AntApp>
        </ConfigProvider>
    );
};

export default App;
