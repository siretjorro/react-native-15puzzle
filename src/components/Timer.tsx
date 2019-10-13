import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext, AppContextConsumer } from '../contexts/AppContext';

export interface Props {
    timer: boolean
}

export interface State {
    timer: number,
    minutes_Counter: string,
    seconds_Counter: string,
    startDisable: boolean
}

export class Timer extends React.Component<Props, State> {
    static contextType = AppContext;

    // define for TS what is type of context
    context!: React.ContextType<typeof AppContext>
    
    constructor(props: Props) {
        super(props);

        this.state = {
            timer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
            startDisable: false
          }
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    startTimer = () => {
        let timer = setInterval(() => {
     
          var num = (Number(this.state.seconds_Counter) + 1).toString(),
            count = this.state.minutes_Counter;
     
          if (Number(this.state.seconds_Counter) == 59) {
            count = (Number(this.state.minutes_Counter) + 1).toString();
            num = '00';
          }
     
          this.setState({
            minutes_Counter: count.length == 1 ? '0' + count : count,
            seconds_Counter: num.length == 1 ? '0' + num : num
          });
          
          if (!this.context.timerStarted) {
              this.stopTimer();
          }
        }, 1000);

        this.setState({ timer });
     
        this.setState({startDisable : true})
    }

    stopTimer = () => {
        clearInterval(this.state.timer);
        this.setState({startDisable : false})
    }
     
     
    clearTimer = () => {
        this.setState({
          timer: null,
          minutes_Counter: '00',
          seconds_Counter: '00',
        });
      }

    style() {
        return StyleSheet.create({
            stat: {
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
            },
            statText: {
                color: "#595959",
                fontSize: 25
            }
        });
    }

    render() {
        return (
            <View style={this.style().stat}>
                <Text style={this.style().statText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
            </View>
        );
    }
}