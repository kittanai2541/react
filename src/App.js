import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style/style.css';
import { Layout, Menu, Icon } from 'antd';
import one_point from './pages/Root of Equation/One_point_iteration'
import false_position from'./pages/Root of Equation/False_Position'
import Bisection from './pages/Root of Equation/Bisection'
import Cramer from './pages/Linear Algebra/Cramer'
import Newton from './pages/Root of Equation/Newton-raphson'
import Secant from './pages/Root of Equation/Secant'


import comptrapzoidel from './pages/Intregrate&diff/compositeTrapzoidel'
import compsimpson from'./pages/Intregrate&diff/compositeSimpson'
import ForwardOh from './pages/Intregrate&diff/forwardOh'
import BackwardOh from './pages/Intregrate&diff/backwardOh'
import Central from './pages/Intregrate&diff/centralOh'
import trapezoidal from './pages/Intregrate&diff/Trapzoidal'
import newsimpson from './pages/Intregrate&diff/newsimpson'
import {menuStyle} from './style/strye'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
class App extends Component {

  render() {
    return (
      <Router>
        <Layout>
          <Header className="header" style={{ height: "80px" }}>
            <div className="headertext">
             {/*  <Icon type="fund" theme="filled" style={{ color: "white", fontSize: "70px", float: "left", marginTop: "2%" }} /> */}
              <h6 style={{color:"white",fontSize:"30px",marginLeft:"900px"}}> 
                Numerical Method
              </h6>

            </div>>
        </Header>

          <Layout>
            <Sider width={335}  style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                style={{ height: '105vh', borderRight: 0, backgroundColor: "#001529"}}
                theme="dark"
              >
                <SubMenu key="root_submenu" title={<span><Icon type="user" />Root of Equation</span>}>
                  <Menu.Item key="menu_bisection" >Bisection<Link to="/bisection" /></Menu.Item>
                  <Menu.Item key="menu_false">False Position<Link to="/false_position" /></Menu.Item>
                  <Menu.Item key="menu_onepoint">One-Point Iteration<Link to="/one_point_iteration" /></Menu.Item>
                  <Menu.Item key="menu_newton">Newton-Raphson<Link to="/newton" /></Menu.Item>
                  <Menu.Item key="menu_secant">Secant Method<Link to="/secant" /></Menu.Item>
                </SubMenu>
                <SubMenu key="algebra_submenu" title={<span><Icon type="laptop" />Linear Algebra</span>}>
                  <Menu.Item key="menu_cramer">Cramer's Rule<Link to="/cramer" /></Menu.Item>
                 
                </SubMenu>
  
                <SubMenu key="integrate_submenu" title={<span><Icon type="calculator" />Integration</span>}>
                <Menu.Item key="menu_Trapzoidal">Trapezoidal Rule<Link to="/Trapzoidel" /></Menu.Item>
                  <Menu.Item key="menu_compositeTrapzoidal">Composite Trapezoidal Rule<Link to="/composite_Trapzoidel" /></Menu.Item>
                  <Menu.Item key="menu_compositeSimpson">Composite Simpson's Rule<Link to="/composite_Simpson" /></Menu.Item>
                  <Menu.Item key="menu_simpson">Simpson Rule<Link to="/simson" /></Menu.Item>
                </SubMenu>
                <SubMenu key="diff_submenu" title={<span><Icon type="notification" />Differentiation</span>}>
                  <Menu.Item key="menu_forwardh">Forward Divided-Differences O(h)<Link to="/forward_Oh" /></Menu.Item>
                  <Menu.Item key="menu_backwardh">Backward Divided-Differences O(h)<Link to="/backward_Oh" /></Menu.Item>
                  <Menu.Item key="menu_centralh">Central Divided-Differences O(h{<sup>2</sup>})<Link to="/central_Oh_square" /></Menu.Item>
  
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
                <Route path="/bisection" component={Bisection} />
                <Route path="/cramer" component={Cramer} />
                <Route path="/false_position" component={false_position} />
                <Route path="/one_point_iteration" component={one_point} />
                <Route path="/newton" component={Newton} />
                <Route path="/secant" component={Secant} />
                <Route path="/Trapzoidel" component={trapezoidal} />
                <Route path="/composite_Trapzoidel" component={comptrapzoidel} />
                <Route path="/composite_Simpson" component={compsimpson} />
                <Route path="/forward_Oh" component={ForwardOh} />
                <Route path="/backward_Oh" component={BackwardOh} />
                <Route path="/central_Oh_square" component={Central} />
                <Route path="/simson" component={newsimpson} />
              </Content>
            </Layout>
          </Layout>
         

        </Layout>

      </Router>

    )
  }
}

export default App
