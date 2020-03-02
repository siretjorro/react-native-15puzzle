import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import { Stat } from './Stat';
import { Timer } from './Timer';

export interface State {
}

export interface Props {
    timer: boolean
}


export class Statistics extends React.Component<Props, State> {
    static contextType = AppContext;

    context!: React.ContextType<typeof AppContext>
    
    constructor(props) {
        super(props);
    }

    style() {
        return StyleSheet.create({
            stats: {
                flex: 4,
                marginTop: 5
            },
            newGame: {
                flex: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            },
            newGameButton: {
                flex: 0.5,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#595959",
                borderWidth: 2,
                borderRadius: 10,
            },
            newGameButtonText: {
                color: "#595959",
                fontSize: 20
            }
        });
    }

    render() {
        return (
            <View style={this.style().stats}>
                <Stat statText="Time"></Stat>
                <Timer timer={this.props.timer}></Timer>
                <Stat statText="Moves"></Stat>
                <Stat statText={this.context.moves.toString()}></Stat>
                <View style={this.style().newGame}>
                    <TouchableOpacity style={this.style().newGameButton} onPress={() => { this.context.newGame(); }}>
                        <Text style={this.style().newGameButtonText}>NEW GAME!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}