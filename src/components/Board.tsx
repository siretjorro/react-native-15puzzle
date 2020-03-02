import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Row } from './Row';

export interface State {
}

export interface Props {
}


export class Board extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
    }

    style() {
        return StyleSheet.create({
            gameboardContainer: {
                flex: 5,
                alignItems: "center"
            },
            gameboard: {
                flex: 1,
                margin: 20,
                aspectRatio: 1
            }
        });
    }

    render() {
        return (
            <View style={this.style().gameboardContainer}>
                        <View style={this.style().gameboard}>
                            <Row rowNumber={0}></Row>
                            <Row rowNumber={1}></Row>
                            <Row rowNumber={2}></Row>
                            <Row rowNumber={3}></Row>
                        </View>
                    </View>
        );
    }
}