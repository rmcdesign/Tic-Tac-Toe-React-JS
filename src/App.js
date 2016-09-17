import React, { Component } from 'react'
import './App.css'


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
      moves: 0,
      gameOver: false,
      winningCombos: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
      ]
    }
  }

  checkWinner() {

    var board = this.state.board
    var currentTurn = this.state.currentTurn
    var winner = false

    var compareAgainstBoard = function(element, index, array) {
      if (board[element[0]] === currentTurn
          && board[element[1]] === currentTurn
          && board[element[2]] === currentTurn) {
        winner = true
      }
    }

    this.state.winningCombos.forEach(compareAgainstBoard)

    return winner

  }

  handleClick(index) {
    if(this.state.board[index] === "" && this.state.gameOver != true) {
      this.state.board[index] = this.state.currentTurn
      if (this.checkWinner() || this.state.moves === 8) {
        this.setState({
          gameOver: true,
        })
      } else {
        this.setState({
          currentTurn: this.state.currentTurn === this.state.p1_symbol ? this.state.p2_symbol : this.state.p1_symbol,
          moves: ++this.state.moves
        })
      }
      console.log(this.state.moves)
    }
  }

  resetGame() {
    if(this.state.gameOver) {
      this.setState({
        board: [
          "","","","","","","","",""
        ],
        gameOver: false,
        moves: 0
      })
    }
  }

  displayStatus() {
    var status = ""
    if (this.state.gameOver) {
      status =  "The game is over. Player " + this.state.currentTurn + " has won. Click to restart"
      if(this.state.moves === 8) {
        status = "The game is over. It was a draw. Click to restart"
      }
    } else {
      status = "Player " + this.state.currentTurn + " turn"
    }
    return status
  }

  render() {
    return (
      <div className="board" onClick={()=> this.resetGame()}>
        {this.state.board.map((cell, index) => {
          return <div className="square" onClick={()=> this.handleClick(index)}>{cell}</div>
        })}
        <div className="status">{ this.displayStatus() }</div>
      </div>
    )
  }
}

export default App
