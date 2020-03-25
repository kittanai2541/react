import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
//import '../../style/style.css';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import math from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
    

};
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
class Newton extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false,
            

        }
        this.handleChange = this.handleChange.bind(this);
        this.newton = this.newton.bind(this);
    }
    newton(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['x'] = []
        data['error'] = []

        do{ 
            xnew = xold - (this.func(xold)/this.funcDiff(xold));
            epsilon = this.error(xnew, xold)
            data['x'][n] =  xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;  
            xold = xnew;

        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X) {
        var expr = math.derivative(this.state.fx, 'x');
        let scope = {x:parseFloat(X)};
        return expr.eval(scope); 
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    db = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/shownewtonn').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            x0:response['data'][0]['x0']
            
        })
        this.newton(this.state.x0);
    }
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold",marginLeft:"44%" }}>Newton</h2>
                <div>
                    {!this.state.showOutputCard && <Card
                        title={"Input newton"}
                        bordered={true}
                        style={{ width: 300, background: "#f44336", color: "#FFFFFFFF",marginLeft:"37%" }}
                        onChange={this.handleChange}
                        id="inputCard"
                    >
                        <h2 >f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2 >X</h2><Input size="large" name="x0" style={InputStyle}></Input><br /><br />
                        <Button id="submit_button" onClick={
                            () => this.newton(parseFloat(this.state.x0))
                        }
                            style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        <Button id="db_button" onClick={
                            () => this.db()
                        }
                            style={{ background: "#4caf50", color: "white", fontSize: "20px",marginLeft:"30px" }}>db</Button>



                    </Card>}
                    {this.state.showGraph &&
                       
                        <Card
                            style={{ borderRadius: "50px",background:"#FFFFFF",paddingLeft:285}}
                        >
                            
                            <LineChart width={730} height={250} data={dataInTable}
                                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                                <XAxis dataKey="error" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line name="error" type="monotone" dataKey="error" stroke="#0419F6" />
                            </LineChart>
                        </Card>
                        
                    }

                    {this.state.showOutputCard &&

                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#72E0A9", color: "#FFFFFFFF", }}
                            id="outputCard"
                        >

                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", marginTop: "30px" }}
                            ></Table>
                            
                        </Card>
                    }
                </div>


            </div>
        );
    }
}
export default Newton;