import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppContext, AppContextConsumer } from '../contexts/AppContext';

export interface Props {
    buttonText: string;
}

export class Cell extends React.Component<Props> {
    static contextType = AppContext;

    context!: React.ContextType<typeof AppContext>
    
    constructor(props: Props) {
        super(props);
    }

    style() {
        return StyleSheet.create({
            cell: {
                backgroundColor: this.props.buttonText === '' ? "#ffe5e8" : "#595959",
                flex: 1,
                borderColor: "#ffe5e8",
                borderWidth: 2,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
            },
            buttonText: {
                color: "#ffe5e8",
                fontSize: 30
            }
        });
    }

    render() {
        return (
            <TouchableOpacity style={this.style().cell} onPress={() => { this.context.makeMove(this.props.buttonText); }}>
                <Text style={this.style().buttonText}>{this.props.buttonText}</Text>
            </TouchableOpacity>
        );
    }
}