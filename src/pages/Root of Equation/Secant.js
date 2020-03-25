import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
//import '../../style/style.css';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
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
        title: "Xnew",
        dataIndex: "xnew",
        key: "xnew"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Secant extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x1: 0,
            x2: 0,
            showOutputCard: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x1,x2) {
        fx = this.state.fx;
        var xnew = 0;
        var xold = 0 ;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['xnew'] = []
        data['error'] = []

        do{ 
            xold = xnew;
            xnew = x2 - (this.func(x2)*((x2-x1)))/(this.func(x2)-this.func(x1));
            epsilon = this.error(xnew, xold)
            data['xnew'][n] =  xnew.toFixed(6);
            data['error'][n] = Math.abs(epsilon).toFixed(6);
            n++;  
            x1=x2;
            x2=xnew;
        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['xnew'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
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
    createTable(xnew, error) {
        dataInTable = []
        for (var i = 0; i < xnew.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xnew: xnew[i],
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
        var response = await axios.get('http://localhost:3001/api/users/showsecantt').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            x1:response['data'][0]['x1'],
            x2:response['data'][0]['x2']
            
        })
        this.secant(this.state.x1,this.state.x2);
    }
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold",marginLeft:"44%" }}>Secant</h2>
                <div>
                    {!this.state.showOutputCard && <Card
                        title={"Input Secant"}
                        bordered={true}
                        style={{ width: 300, background: "#f44336", color: "#FFFFFFFF",marginLeft:"37%" }}
                        onChange={this.handleChange}
                        id="inputCard"
                    >
                        <h2 >f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2 >X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br /><br />
                        <h2 >X<sub>2</sub></h2><Input size="large" name="x2" style={InputStyle}></Input><br /><br />
                        <Button id="submit_button" onClick={
                            () => this.secant(parseFloat(this.state.x1),parseFloat(this.state.x2))
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
export default Secant;