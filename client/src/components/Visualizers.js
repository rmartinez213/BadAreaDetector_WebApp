import React from 'react'
import { connect } from 'react-redux';
import Gauge from './Gauge'
import CallTable from './CallTable'


class Visualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    componentDidMount() {
        setTimeout(
            () => {
                if (this.state.liveToggled) {
                    console.log('From visualizer: ' + this.props.refresh);
                    this.componentDidMount()
                }
            },
            this.props.refresh * 1000);
    }


    render() {

        var priority = []
        var totalPriority = 0;

        var gaugeAmount1 = 0;
        var gaugeAmount2 = 0;
        var gaugeAmount3 = 0;
        var gaugeAmount4 = 0;


        priority.push(1)
        priority[1] = 0
        priority.push(2)
        priority[2] = 0
        priority.push(3)
        priority[3] = 0
        priority.push(4)
        priority[4] = 0





        //console.log("Total amount of priority 1: " + priority[1])
        //console.log("Total amount of priority 2: " + priority[2])
        //console.log("Total amount of priority 3: " + priority[3])
        //console.log("Total amount of priority 4: " + priority[4])
        //console.log("Total calls: " + totalPriority)

        gaugeAmount1 = Math.round((priority[1] / totalPriority) * 100)
        gaugeAmount2 = Math.round((priority[2] / totalPriority) * 100)
        gaugeAmount3 = Math.round((priority[3] / totalPriority) * 100)
        gaugeAmount4 = Math.round((priority[4] / totalPriority) * 100)

        
        return (

            <div class="column piecharts" style={{ color: 'aliceblue' }}>

                {console.log('Printing from Visualizer: ' + this.props.refresh)}

                {this.props.policeCall.map(({ L }) => {

                    if (L === '1') {
                        priority[1]++;
                        totalPriority++
                    }
                    else if (L === '2') {
                        priority[2]++;
                        totalPriority++
                    }
                    else if (L === '3') {
                        priority[3]++;
                        totalPriority++
                    }
                    else if (L === '4') {
                        priority[4]++;
                        totalPriority++
                    }
                })
                }



                <h1 className="callTypeHeader">Call Type</h1>



                <Gauge gaugeSpecs={{ id: "Gauge1", size: "half", amount: this.props.refresh, valueText: this.state.value + ' %', labelText: ' ', tooltipId: 'Gauge1' }} classProperties={{ className1: 'gauge1', className2: 'gaugeText' }} other={{ title: 'Assault' }} />
                <Gauge gaugeSpecs={{ id: "Gauge2", size: "half", amount: this.state.value, valueText: this.state.value + ' %', labelText: ' ', tooltipId: 'Gauge2' }} classProperties={{ className1: 'gauge234', className2: 'gaugeText' }} other={{ title: 'Murder' }} />
                <Gauge gaugeSpecs={{ id: "Gauge3", size: "half", amount: this.state.value, valueText: this.state.value + ' %', labelText: ' ', tooltipId: 'Gauge3' }} classProperties={{ className1: 'gauge234', className2: 'gaugeText' }} other={{ title: 'Ransom' }} />
                <Gauge gaugeSpecs={{ id: "Gauge4", size: "half", amount: this.state.value, valueText: this.state.value + ' %', labelText: ' ', tooltipId: 'Gauge4' }} classProperties={{ className1: 'gauge234', className2: 'gaugeText' }} other={{ title: 'Car Theft' }} />


                {/*Data Table with all calls*/}
                <CallTable />

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall,
    refresh: state.policeCall.refreshValue,
    toggle: state.policeCall.liveToggled
});


export default connect(mapStateToProps)(Visualizer);