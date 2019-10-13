import React from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Statistics } from '../components/Statistics';
import { Board } from '../components/Board';
import { AppContextProvider, IAppContext } from '../contexts/AppContext';
import { ScreenOrientationName, AppName, RouteName } from '../enums/Constants';

export interface NavigationParams {
}

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface IState extends IAppContext {}

export class GameScreen extends React.Component<IProps, IState> {

    static navigationOptions = {
        title: RouteName.game
    }
    
    constructor(props: IProps) {
        super(props);
    
        this.state = {
          orientation: this.getOrientation(),
          moves: 0,
          game: true,
          gameboard: [['1', '2', '3', '4'], ['5', '6', '7', '8'], ['9', '10', '11', '12'], ['13', '14', '15', '']],
          winningSolution: [['1', '2', '3', '4'], ['5', '6', '7', '8'], ['9', '10', '11', '12'], ['13', '14', '15', '']],
          timerStarted: true,
          makeMove: this.makeMove,
          newGame: this.newGame
        }
    }

    componentDidMount() {
        this.shuffle();

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: this.getOrientation()
            })
        });
    }

    getOrientation() {
        return Dimensions.get('window').width > Dimensions.get('window').height ? ScreenOrientationName.landscape : ScreenOrientationName.portrait
    } 

    shuffle = () => {
        for (let i = 0; i < 100; i++) {
            let emptyCell: number[] = this.getEmptyCoordinates();
            let emptyCellRowNo: number = emptyCell[0];
            let emptyCellColNo: number = emptyCell[1];
            let clickable: number[][] = [];

            if (emptyCellRowNo - 1 >= 0) {
                clickable.push([emptyCellRowNo - 1, emptyCellColNo]);
            }

            if (emptyCellRowNo + 1 <= 3) {
                clickable.push([emptyCellRowNo + 1, emptyCellColNo]);
            }

            if (emptyCellColNo - 1 >= 0) {
                clickable.push([emptyCellRowNo, emptyCellColNo - 1]);
            }

            if (emptyCellColNo + 1 <= 3) {
                clickable.push([emptyCellRowNo, emptyCellColNo + 1]);
            }

            let random: number = Math.floor(Math.random() * clickable.length);
            let randomCell: number[] = clickable[random];

            this.move(randomCell[0], randomCell[1]);
        }

        this.setState({
            moves: 0
        });
    }

    makeMove = (cell: string) => {
        // make a move
        if (cell != '') {
            const clicked: number[] = this.getClickedCoordinates(cell);
            const clickedRow: number = clicked[0];
            const clickedCol: number = clicked[1];

            if (this.move(clickedRow, clickedCol)) {
                this.setState({
                    moves: this.state.moves + 1
                });
            }

            if (this.isWon()) {
                alert("You won!");
                this.newGame();
            }
        }

        return true
    }

    isWon = () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state.gameboard[i][j] != this.state.winningSolution[i][j]) {
                    return false;
                }
            }
        }

        this.setState({
            timerStarted: false,
        });

        return true;
    }

    move = (clickedRow: number, clickedCol: number) => {
        const emptyCell: number[] = this.getEmptyCoordinates();
        const emptyCellRowNo: number = emptyCell[0];
        const emptyCellColNo: number = emptyCell[1];
        const isXAxis: boolean = clickedRow-emptyCellRowNo == 0;
        const isYAxis: boolean = clickedCol-emptyCellColNo == 0;

        if (!isXAxis && !isYAxis ) {
            return false;
        }

        if (isXAxis) {
            if (clickedCol < emptyCellColNo) {
                for (var i = emptyCellColNo; i > clickedCol; i--) {
                    let newGameboard = [...this.state.gameboard];
                    newGameboard[clickedRow][i] = this.state.gameboard[clickedRow][i-1];
                    this.setState({
                        gameboard: newGameboard
                    });
                }
            } else if (clickedCol > emptyCellColNo) {
                for (let i = emptyCellColNo; i < clickedCol; i++) {
                    let newGameboard = [...this.state.gameboard];
                    newGameboard[clickedRow][i] = this.state.gameboard[clickedRow][i+1];
                    this.setState({
                        gameboard: newGameboard
                    });
                }
            }
        } else if (isYAxis) {
            if (clickedRow < emptyCellRowNo) {
                for (let i = emptyCellRowNo; i > clickedRow; i--) {
                    let newGameboard = [...this.state.gameboard];
                    newGameboard[i][clickedCol] = this.state.gameboard[i-1][clickedCol];
                    this.setState({
                        gameboard: newGameboard
                    });
                }
            } else if (clickedRow > emptyCellRowNo) {
                for (let i = emptyCellRowNo; i < clickedRow; i++) {
                    let newGameboard = [...this.state.gameboard];
                    newGameboard[i][clickedCol] = this.state.gameboard[i+1][clickedCol];
                    this.setState({
                        gameboard: newGameboard
                    });
                }
            }
        }

        let newGameboard = [...this.state.gameboard];
        newGameboard[clickedRow][clickedCol] = '';
        this.setState({
            gameboard: newGameboard
        });
        return true;
    }

    getClickedCoordinates = (cell: string) => {
        let coordinates: number[] = [];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.state.gameboard[i][j] == cell) {
                    coordinates[0] = i;
                    coordinates[1] = j;
                }
            }
        }

        return coordinates;
    }

    getEmptyCoordinates = () => {
        let coordinates: number[] = [];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.state.gameboard[i][j] == "") {
                    coordinates[0] = i;
                    coordinates[1] = j;
                }
            }
        }

        return coordinates;
    }

    newGame = () => {
        this.setState({
            timerStarted: false,
            moves: 0,
            gameboard: [['1', '2', '3', '4'], ['5', '6', '7', '8'], ['9', '10', '11', '12'], ['13', '14', '15', '']],
        });

        this.shuffle();
    }

    style() {
        return StyleSheet.create({
            safeArea: {
                flex: 1,
                backgroundColor: "#ffe5e8"
            },
            root: {
                flexDirection: this.state.orientation === ScreenOrientationName.landscape ? "row" : "column",
                flex: 1,
                backgroundColor: "#ffe5e8"
            },
        });
    }

    render() {
        const navigate = this.props.navigation.navigate;
            return (
                <AppContextProvider value={this.state}>
                    <SafeAreaView style={this.style().safeArea}>
                    <View style={this.style().root}>
                        <Statistics timer={this.state.timerStarted}></Statistics>
                        <Board></Board>
                    </View>
                    </SafeAreaView>
                </AppContextProvider>
            );
        }
}