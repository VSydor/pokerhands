import React, {useState} from "react"
import {CardSet} from "./CardSet";

type SelectedCardsMap = Record<number, Record<string, boolean>>;
type ProcessCardResponseMap = Record<number, string>;

export function CardGrid() {

    const [selectedCardsMap, setSelectedCards]: [SelectedCardsMap, React.Dispatch<React.SetStateAction<SelectedCardsMap>>] =
        useState({});

    const [processCardResponseMap, setProcessCardResponseMap]: [ProcessCardResponseMap, React.Dispatch<React.SetStateAction<ProcessCardResponseMap>>] =
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

    const onSendData = (setId: number) => {
        const selectedCards = Object.entries(selectedCardsMap[setId])
            .filter(([_, isSelected]) => isSelected)
            .map(([cardId, _]) => cardId);

        postData("/cards", {selectedCards})
            .then(resp => {
                setProcessCardResponseMap(prevState => ({
                    ...prevState,
                    [setId]: JSON.stringify(resp)
                }));
            })
            .catch(e => {
                setProcessCardResponseMap(prevState => ({
                    ...prevState,
                    [setId]: JSON.stringify(e)
                }))
            });

        setSelectedCards((prevState) => ({
            ...prevState,
            [setId]: {}
        }));
    }

    return (
        <div>
            <div>
                <label>
                    Grid Size
                    <input type="number" id="gridSize" style={{"marginLeft": "5px", "width": "40px"}} value={gridSize}
                           onInput={(e: any) => setGridSize(e.target.value)}/>
                </label>
            </div>
            <div className="card-grid">
                {
                    Array.from({length: gridSize}).map((_, setId) =>
                        <div key={`card-set-${setId}`}>
                            <CardSet id={setId}
                                     selectedCardsMap={selectedCardsMap[setId]}
                                     onCardClick={handleChange}/>
                            <button onClick={() => onSendData(setId)} style={{margin: "10px"}}>Send</button>
                            <span>Response: {processCardResponseMap[setId]}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
}
