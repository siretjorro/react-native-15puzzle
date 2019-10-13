import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext, AppContextConsumer } from '../contexts/AppContext';

export interface Props {
    statText: string;
}

export class Stat extends React.Component<Props> {
    static contextType = AppContext;

    // define for TS what is type of context
    context!: React.ContextType<typeof AppContext>
    
    constructor(props: Props) {
        super(props);
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
                <Text style={this.style().statText}>{this.props.statText}</Text>
            </View>
        );
    }
}