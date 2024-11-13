export default function GameBoard({onSelectSquare, board}){


    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIdx, colIdx){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map((innerBoard) => [...innerBoard])]

    //         updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled = {playerSymbol !== null}>{playerSymbol}</button>
                    </li>
                ))}
                </ol>
            </li>
        ))}
        </ol>
    );
}