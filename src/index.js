import React from 'react';
import {createRoot} from "react-dom/client";

class Index extends React.Component {
    state = {
        minute: 0,
        second: 0,
        hour: 0,
        startDisabled: false,
        stopInterval: " ",
        saveInterval: [],
        table:false
    }
    onClickStart = () => {
        this.setState({startDisabled: true})
        let onStartBtn = setInterval(() => {
            const {second, minute, hour} = this.state
            if (second === 59) {
                if (minute === 59) {
                    this.setState({hour: hour + 1})
                    this.setState({minute: 0})
                    this.setState({second: 0})
                } else {
                    this.setState({minute: minute + 1})
                    this.setState({second: 0})
                }

            } else {
                this.setState({second: second + 1})
            }

        }, 1000)
        this.setState({stopInterval: onStartBtn})
    }
    onClickStop = () => {
        clearInterval(this.state.stopInterval)
        this.setState({startDisabled: false})
    }
    onClickInterval = () => {
        const {second, minute, hour} = this.state
        this.state.saveInterval.push(hour + ":" + minute + ":" + second
        )
        this.setState({table:true})
        console.log(this.state.saveInterval)
    }
    onClickClear = ()=>{
        this.setState({hour:0,minute:0,second:0,saveInterval:[]})
        this.setState({table:false})
        this.onClickStop()
    }


    render() {
        const {second, minute, hour, startDisabled, saveInterval,table} = this.state
        return (
            <div className={"container"}>
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card">
                            <div className="card-header">
                                <h1>Stopwatch</h1>
                            </div>
                            <div className="card-body d-flex justify-content-center">
                                <h1>{hour}:</h1>
                                <h1>{minute}:</h1>
                                <h1>{second}</h1>
                            </div>
                            <div className="card-footer">
                                <button className={"btn btn-success w-25"} disabled={startDisabled}
                                        onClick={this.onClickStart}>start
                                </button>
                                <button className={"btn btn-warning w-25"} disabled={!startDisabled}
                                        onClick={this.onClickStop}>Stop
                                </button>
                                <button className={"btn btn-info w-25"} onClick={this.onClickInterval}>Interval</button>
                                <button className={"btn btn-dark w-25"} onClick={this.onClickClear}>Clear</button>
                            </div>
                            {table ?  <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <td>№</td>
                                    <td>Interval</td>
                                </tr>
                                </thead>
                                <tbody>
                                {saveInterval.map((item, index) => {
                                    return<tr>
                                        <td>{index+1}</td>
                                        <td>{item}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>:" "
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<Index/>)