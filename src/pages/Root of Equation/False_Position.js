import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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
class Falseposition extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.falseposition = this.falseposition.bind(this);
    }
    falseposition(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xi = 0;
        var eror = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }
        do {
            xi = (xl*this.func(xr) - xr*this.func(xl))/(this.func(xr)-this.func(xl));
            if (this.func(xi) * this.func(xr) < 0) {
                eror = this.error(xi, xl);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }
            }
            else {
                eror= this.error(xi, xl);
                if (increaseFunction) {
                    xr = xi;
                }
                else {
                    xl = xi;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xi.toFixed(8);
            data['error'][n] = Math.abs(eror).toFixed(6);
            n++;
        } while (Math.abs(eror) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,

        })


    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
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
        var response = await axios.get('http://localhost:3001/api/users/showfalsee').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            xl:response['data'][0]['xl'],
            xr:response['data'][0]['xr']
        })
        this.falseposition(this.state.xl,this.state.xr);
    }
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold",marginLeft:"44%" }}>False_Position</h2>
                <div>
                    {!this.state.showOutputCard && <Card
                        title={"Input False_Position"}
                        bordered={true}
                        style={{ width: 300, background: "#f44336", color: "#FFFFFFFF",marginLeft:"37%" }}
                        onChange={this.handleChange}
                        id="inputCard"
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                        <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                        <Button id="submit_button" onClick={
                            () => this.falseposition(parseFloat(this.state.xl), parseFloat(this.state.xr))
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
export default Falseposition;