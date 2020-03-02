import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Cell } from './Cell';
import { AppContext, AppContextConsumer } from '../contexts/AppContext';

export interface Props {
    rowNumber: number;
}
export class Row extends React.Component<Props> {
    static contextType = AppContext;

    // define for TS what is type of context
    context!: React.ContextType<typeof AppContext>
    
    constructor(props: Props) {
        super(props);
    }

    style() {
        return StyleSheet.create({
            row: {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "red"
            }
        });
    }

    render() {
        return (
            <View style={this.style().row}>
                <Cell buttonText={this.context.gameboard[this.props.rowNumber][0]}></Cell>
                <Cell buttonText={this.context.gameboard[this.props.rowNumber][1]}></Cell>
                <Cell buttonText={this.context.gameboard[this.props.rowNumber][2]}></Cell>
                <Cell buttonText={this.context.gameboard[this.props.rowNumber][3]}></Cell>
            </View>
        );
    }
}