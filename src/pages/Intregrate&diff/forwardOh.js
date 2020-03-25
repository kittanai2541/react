import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
//import '../../style/style.css';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import math from 'mathjs';
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
    

};
var y;
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Forward extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            h:0,
            degree:0,
            showOutputCard: false,
            showGraph: false,
            

        }
        this.handleChange = this.handleChange.bind(this);
        /* this.forwardh = this.forwardh.bind(this); */
    }
    forwardh(degree,x0,h) {
        switch (degree) {
            case 1:
                y = (this.func(x0+(1*h)) - this.func(x0)) / h
                break;
            case 2:
                y = (this.func(x0+(2*h)) - 2*this.func(x0+(1*h)) + this.func(x0)) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x0+(3*h)) - 3*this.func(x0+(2*h)) + 3*this.func(x0+(1*h)) - this.func(x0)) / Math.pow(h, 3)
                break;
            default:
                y = (this.func(x0+(4*h)) - 4*this.func(x0+(3*h)) + 6*this.func(x0+(2*h)) - 4*this.func(x0+(1*h)) + this.func(x0)) / Math.pow(h, 4) 
        }

        
        this.setState({
            showOutputCard: true,
            
        })


    }
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    db = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showforward').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            degree:response['data'][0]['degree'],
            x0:response['data'][0]['x0'],
            h:response['data'][0]['h']
        })
        this.forwardh(this.state.degree,this.state.x0,this.state.h);
    }
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold",marginLeft:"44%" }}>ForwardOH</h2>
                <div>
                    {!this.state.showOutputCard && <Card
                        title={"Input Forward"}
                        bordered={true}
                        style={{ width: 300, background: "#f44336", color: "#FFFFFFFF",marginLeft:"37%" }}
                        onChange={this.handleChange}
                        id="inputCard"
                    >
                        <h2 >f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                        <h2 >X</h2><Input size="large" name="x0" style={InputStyle}></Input><br /><br />
                        <h2 >h</h2><Input size="large" name="h" style={InputStyle}></Input><br /><br />
                        <Button id="submit_button" onClick={
                            () => this.forwardh(parseFloat(this.state.degree),parseFloat(this.state.x0),parseFloat(this.state.h))
                        }
                            style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>

                        <Button id="db_button" onClick={
                            () => this.db()
                        }
                            style={{ background: "#4caf50", color: "white", fontSize: "20px",marginLeft:"30px" }}>db</Button>
                    </Card>}

                    {this.state.showOutputCard &&

                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#72E0A9", color: "#FFFFFFFF", }}
                            id="outputCard"
                        >

                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {y}<br/>
                            </p>
                            
                        </Card>
                    }
                </div>


            </div>
        );
    }
}
export default Forward;