import React, {useState} from "react"
import {CardSet} from "./CardSet";

type SelectedCardsMap = Record<string, boolean>;

export function CardGrid() {

    const [selectedCardsMap, setSelectedCards]: [SelectedCardsMap, React.Dispatch<React.SetStateAction<SelectedCardsMap>>] =
        useState({});

    const handleChange = (cardSetCardId: string) => {
        setSelectedCards((prevState) => ({
            ...prevState,
            [`${cardSetCardId}`]: !prevState[cardSetCardId]
        }));
    };

    const [gridSize, setGridSize]: [number, React.Dispatch<React.SetStateAction<number>>] =
        useState(4);

    const onSendData = () => {
        const strs = Object.entries(selectedCardsMap)
            .filter(([_, isSelected]) => isSelected)
            .reduce((acc: string[], [key, _]) => {
                const [setId, cardId] = key.split("-");
                acc.push(`Set ${setId}, cardId ${cardId}`);
                return acc;
            }, []);
        alert(strs.join("\n"));
        setSelectedCards({});
    }

    return (
        <div>
            <div>
                <button onClick={onSendData} style={{margin: "10px"}}>Send</button>
                <label>
                    Grid Size
                    <input type="number" id="gridSize" style={{"marginLeft": "5px"}} value={gridSize}
                           onInput={(e: any) => setGridSize(e.target.value)}/>
                </label>
            </div>
            <div className="card-grid">
                {
                    Array.from({length: gridSize}).map((_, i) =>
                        <CardSet key={`card-set-${i}`} id={i}
                                 selectedCardsMap={selectedCardsMap}
                                 onCardClick={handleChange}/>
                    )
                }
            </div>
        </div>
    )
}
