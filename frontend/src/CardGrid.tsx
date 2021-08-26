import React, {useState} from "react"
import {CardSet} from "./CardSet";

type SelectedCardsMap = Record<number, Record<string, boolean>>;

export function CardGrid() {

    const [selectedCardsMap, setSelectedCards]: [SelectedCardsMap, React.Dispatch<React.SetStateAction<SelectedCardsMap>>] =
        useState({});

    const handleChange = (setId: number, cardId: string) => {
        setSelectedCards((prevState) => {
            if (!prevState[setId]) {
                return {
                    ...prevState,
                    [setId]: {
                        [cardId]: true
                    }
                }
            }

            const entries = Object.entries(prevState[setId]);
            const maxCardsSelected = entries.length > 1;

            if (maxCardsSelected) {
                return {
                    ...prevState,
                    [setId]: Object.fromEntries([
                        ...entries.filter((_, i) => i !== 0),
                        [
                            cardId,
                            !prevState[setId][cardId]
                        ]
                    ])
                }
            }

            return {
                ...prevState,
                [setId]: {
                    ...prevState[setId],
                    [cardId]: !prevState[setId][cardId]
                }
            }
        });
    };

    const [gridSize, setGridSize]: [number, React.Dispatch<React.SetStateAction<number>>] =
        useState(4);

    const onSendData = () => {
        const strs = Object.entries(selectedCardsMap)
            .reduce((acc: string[], [setId, cardsIdxd]) => {
                Object.entries(cardsIdxd).forEach(([cardId, isSelected]) => {
                    if (isSelected) {
                        acc.push(`Set ${setId}, cardId ${cardId}`);
                    }
                })
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
                                 selectedCardsMap={selectedCardsMap[i]}
                                 onCardClick={handleChange}/>
                    )
                }
            </div>
        </div>
    )
}
