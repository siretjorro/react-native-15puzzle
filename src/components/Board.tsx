import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Row } from './Row';

export interface State {
    // gameState: GameState
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

    // pressIncrement = () => {
    //     this.setState({
    //         gameState: {
    //             moves: this.state.gameState.moves + 1
    //         }
    //     });
    // }

    // pressDecrement = () => {
    //     this.setState({
    //         gameState: {
    //             moves: this.state.gameState.moves - 1
    //         }
    //     });
    // }

    buttonPressed = () => console.log("hey");

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

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexGrow: 1
    }
});