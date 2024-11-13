import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./components/winning-combinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(let turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if((firstSquareSymbol)&&  
       (firstSquareSymbol === secondSquareSymbol)&& 
       (firstSquareSymbol === thirdSquareSymbol)){
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function updatePlayerSymbol(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X')
  const [players, setPlayers] = useState({
    X: 'Player 1',
    Y: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = updatePlayerSymbol(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);

    const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      const currentPlayer = updatePlayerSymbol(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}
        ,...prevTurns]

        return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
     return {
      ...players,
      [symbol] : newName
    }})
  }
  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName="Player-1" symbol="X" isActive = {activePlayer === 'X'} onNameChange = {handlePlayerNameChange} />
          <Player initalName="Player-2" symbol="O" isActive = {activePlayer === 'O'} onNameChange = {handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard} />
      </div>
      <Log turns = {gameTurns} />
    </main>
  )
}

export default App
