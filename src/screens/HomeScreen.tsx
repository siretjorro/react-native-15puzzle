import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteName, MagicStrings, AppName } from '../enums/Constants';

export interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface State {
}

export class HomeScreen extends React.Component<Props, State> {

    static navigationOptions = {
        title: RouteName.home
    }
    
    constructor(props: Props) {
        super(props);
    }

    style() {
        return StyleSheet.create({
            safeArea: {
                flex: 1,
                backgroundColor: "#ffe5e8"
            },
            root: {
                flexDirection: "column",
                flex: 1,
                backgroundColor: "#ffe5e8",
                justifyContent: "space-around",
                alignItems: "center"
            },
            appName: {
                color: "#595959",
                fontSize: 50
            },
            button: {
                backgroundColor: "#595959",
                // flex: 1,
                borderColor: "#ffe5e8",
                borderWidth: 2,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 150
            },
            buttonText: {
                color: "#ffe5e8",
                fontSize: 30
            }
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <SafeAreaView style={this.style().safeArea}>
                <View style={this.style().root}>
                    <Text style={this.style().appName}>{AppName.puzzle15}</Text>
                    <Button title={MagicStrings.play} onPress={() => {
                        try {
        console.log("tere")
                            navigate('Game')
                        } catch(e) {
                            console.log(e)
                    }}}>
                        <Text style={this.style().buttonText}>{MagicStrings.play}</Text>
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}