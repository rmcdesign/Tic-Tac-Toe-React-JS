import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      p1_symbol: "X",
      p2_symbol: "O",
      currentTurn: "X",
      board: [
          "","","","","","","","",""
      ],
      winningCombos: [
          [0,1,2]
      ]
    }
  }

  handleClick(index) {
    if(this.state.board[index] === "") {
      this.state.board[index] = this.state.currentTurn
      this.setState({
        board: this.state.board,
        currentTurn: this.state.currentTurn === this.state.p1_symbol ? this.state.p2_symbol : this.state.p1_symbol
      })
    }
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((cell, index) => {
          return <div className="square" onClick={()=> this.handleClick(index)}>{cell}</div>;
        })}
      </div>
    );
  }
}

export default App;
