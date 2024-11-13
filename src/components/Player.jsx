import { useState } from "react"

export default function Player({initalName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initalName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing(editing => !editing)

        if(isEditing){
            onNameChange(symbol, playerName)
        }
    }

    function handleName(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>

    if(isEditing){
        editablePlayerName = <input type="text" value={playerName} required onChange={handleName} />//Two Way Data-Binding
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
          </li>
    )
}