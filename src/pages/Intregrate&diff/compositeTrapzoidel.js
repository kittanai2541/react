import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import math from 'mathjs';
var Algebrite = require('algebrite')

const InputStyle = {
    background: "#f58216",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var I, exact, error;
class Composite_Trapezoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_trapezoidal(a, b, n) {
        var h = (b-a)/n
        I = (h / 2) * (this.func(a) + this.func(b) + 2*this.summationFunction(n, h))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact-I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = math.compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    db = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showcompositetrap').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            a:response['data'][0]['a'],
            b:response['data'][0]['b'],
            n:response['data'][0]['n']
        })
        this.composite_trapezoidal(this.state.a,this.state.b,this.state.n);
    }
    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Composite Trapezoidal Rule</h2>
                <div style={{float:"left"}}>
                    {!this.state.showOutputCard && 
                    <Card
                    bordered={true}
                    style={{ width: 300, background: "#f44336", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                        <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                        <h2>N</h2><Input size="large" name="n" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.composite_trapezoidal(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button>
                        <Button id="db_button" onClick={
                            () => this.db()
                        }
                            style={{ background: "#4caf50", color: "white", fontSize: "20px",marginLeft:"30px" }}>db</Button>
                        
                    </Card>    
                    } 
                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"left"}}
                        id="outputCard"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {I}<br/>
                                Exact = {exact}<br/>
                                Error = {error}%
                            </p>
                        </Card>
                    }              
                </div>                
            </div>
        );
    }
}
export default Composite_Trapezoidal;