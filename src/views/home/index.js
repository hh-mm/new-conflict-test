import React,{ useState,useEffect } from 'react';

import { Layout, Menu, Icon,Button,Drawer, Row, Col,Switch,Breadcrumb,Dropdown,Tabs, Modal,ConfigProvider,DatePicker} from 'antd';
import { getThemeColor, changeAntdTheme } from 'dynamic-antd-theme';
import Upload from './upload/index';
import List from './list/index';
import Form from './form/index';
import Dashboard from './dashboard/index';
import { Route,Switch as  RouteSwitch ,Redirect } from 'react-router-dom';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('en');
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const Home = ({history}) => {
  const colors = ['rgb(245, 34, 45)', 'rgb(250, 84, 28)', 'rgb(250, 173, 20)', 'rgb(19, 194, 194)', 'rgb(82, 196, 26)', 'rgb(24, 144, 255)', 'rgb(47, 84, 235)', 'rgb(114, 46, 209)']
  let [checkColor, setCheckColor] = useState('#1890ff')
  let [collapsed,setCollapsed] = useState(false)
  let [theme,setTheme] = useState('dark')
  let [logoDisplay, setLogoDisplay] = useState('inline-block')
  let [navDirection,setNavDirection] = useState('inline')
  let [current,setCurrent] = useState('mail')
  let [showDrawer,setShowDrawer] = useState(false)
  let [bellVisiable,setBellVisiable] = useState(false)

let [locale,setLocale] = useState(enUS)
 function  changeLocale (value){
    const localeValue = value;
   setLocale(localeValue);
    if (!localeValue) {
      moment.locale('en');
    } else {
      moment.locale('zh-cn');
    }
  };
  function logoutFunc(){
      history.push(`${process.env.PUBLIC_URL}/login`)
  }
 function  toggle(){
   collapsed === false ? setLogoDisplay('none') : setLogoDisplay('inline-block')
     setCollapsed(!collapsed)
  };
  function setThemeClick(newTheme){
    newTheme ===true? setTheme('dark'):setTheme('light')
  }
   // 设置显示横导航还是竖导航 
  function setNavDirectionClick(newDirection){
    newDirection ===true? setNavDirection('inline'): setNavDirection('horizontal')
  }
  function handleClick(e){
     setCurrent(e.key);
  }
  function onDrawerToggle(){
    let isShow = showDrawer===true ? false:true
    setShowDrawer(isShow)
  }
//bell 消息弹框隐藏显示事件
  function bellModalToggle(){
    let visible = bellVisiable !== true
    setBellVisiable(visible)
    }
// 横导航右侧消息按钮弹出框
  const bell = (
    <div  >
       <Modal 
       className="bell-dialog"
          visible={bellVisiable}
          closable={false}
          footer={null}
           mask={false}
          onCancel={bellModalToggle}
        >
       <Tabs defaultActiveKey="1" tabPosition='top' style={{ height: 220 }}>
          {['notifications','message','event'].map(i => (
            <TabPane tab={i} key={i}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
   </Modal>
    </div>
  )
  // 横导航右侧国际化按钮
      const menu = (
      <Menu>
        <Menu.Item className="language" onChange={()=>changeLocale(enUS)}> English</Menu.Item>
        <Menu.Item  className="language" onChange={()=>changeLocale(zhCN)}>Russian</Menu.Item>
        <SubMenu title="Chinese" className="language">
           <Menu.Item className="language">Simplified </Menu.Item>
        <Menu.Item className="language">Traditional</Menu.Item>
        </SubMenu>
      </Menu>
    );

  const ele =  <Menu
          theme={theme}
          onClick={handleClick}
          selectedKeys={[current]}
          mode={navDirection}
          
          style={navDirection === 'horizontal' ? { Width :'100vw',margin: 'auto',paddingLeft:'200px',height:'64px',lineHeight:'64px'}:{}}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
           </Menu>
  return(
    <ConfigProvider locale={locale}>
      <Layout>
      <Sider  trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor:theme === 'dark' ? '#001529':'#fff',display:navDirection==='inline'?'inline-block':'none' }} >
          <div className="logo" style={{ fontSize: '28px', color: checkColor, fontWeight: 800 }}><Icon type="ant-design" style={{ fontSize: '36px'}}/><span style={{ display: logoDisplay }} >&nbsp;Amber</span></div>
        
          {ele}
      </Sider>
      <Layout>

        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon 
          style={{display:navDirection==='inline'?'inline-block':'none' }}
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
            {navDirection==='horizontal'&&
              <div className="logo" style={{ fontSize: '28px', color: checkColor, fontWeight: 800, position: 'absolute', top: 0, left:'30px'}}><Icon type="ant-design" style={{ fontSize: '36px' }} /><span>&nbsp;Amber</span></div>
           
            }
            {
              navDirection === 'horizontal' && ele
            }
            <div className="header-right" style={{fontSize: '24px',position:'absolute',height:'64px',lineHeight:'64px',right:'16px',top:0}}>
                <span onClick={bellModalToggle}>
                  {/* <Dropdown overlay={bell} placement="bottomRight" > */}
                       <a className="ant-dropdown-link" href="#"><Icon type="bell" /></a>
                      {/* </Dropdown> */}
                 </span>
                    <span >
                      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                       <a className="ant-dropdown-link" href="#"><Icon  type="global" /></a>
                      </Dropdown>
                    </span> 
                <span  onClick={onDrawerToggle}> <a className="ant-dropdown-link" href="#"><Icon type="setting" /></a></span>
             
            </div>
         {bell}
        </Header>
       <Breadcrumb style={{ margin: '16px 0 16px 16px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            margin: '0 16px 24px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
               overflow: 'hidden'
          }}
        >
             <DatePicker />

             <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>

 <Button>My Button 2</Button>
            <RouteSwitch>

              <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard}></Route>
              <Route path={`${process.env.PUBLIC_URL}/list`} component={List}></Route>
               <Route path={`${process.env.PUBLIC_URL}/form`} component={Form}></Route>
              <Route path={`${process.env.PUBLIC_URL}/upload`} component={Upload}></Route>
              <Redirect  path={`${process.env.PUBLIC_URL}/`} exact to={`${process.env.PUBLIC_URL}/dashboard`}></Redirect>
            </RouteSwitch>
       
            <Drawer
          title="Basic Setting"
          placement="right"
          closable={true}
          onClose={onDrawerToggle}
          visible={showDrawer}
          getContainer={false}
         
        >
              <div className="set-style">
                <h3>Page Style Setting</h3>
                 <Switch checkedChildren="Dark" unCheckedChildren="light" defaultChecked onChange={setThemeClick}/>
             </div>
             
              <div className="set-style">
                <h3>Navigation  Mode</h3>
                 <Switch checkedChildren="V" unCheckedChildren="H" defaultChecked onChange={setNavDirectionClick}/>
             </div>
             <hr></hr>
              <div className="set-style">
                <h3>Theme Color</h3>
                <Row >
                  {colors.map((val, key) => {
                    return <Col style={{ margin: '10px 0' }} key={key} span={6}><Button onClick={
                      () => {
                        const color = val
                        changeAntdTheme(
                          getThemeColor(color)
                        )
                          setCheckColor(val)
                    }
                    } type="primary" icon={checkColor === val ? "check" : "heart"} style={{ backgroundColor: val, borderColor: val }} /></Col>
                  })}
                </Row>
            </div>
            <br></br>
           <h3>Log out</h3> <Button type="primary" size='large' icon="logout" onClick={logoutFunc}></Button>
        </Drawer>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Practice ©2019 Created by Amber</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  )
}

 
export default Home;