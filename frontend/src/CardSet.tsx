import React from "react"

import "./index.css"

import {Card} from "./components/Card"

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
const suits = ["c", "d", "h", "s"]

const mappedSuits = suits.map(suit => ranks.reverse().map(r => r + suit))

type SelectedCardsMap = Record<string, boolean>;

interface CardSetProps {
    id: number;
    selectedCardsMap: SelectedCardsMap;
    onCardClick: (setId: number, cardId: string) => void
}

export function CardSet(props: CardSetProps) {
    return (
        <div className="card-set">
            <span>{props.id}</span>
            {
                mappedSuits.map((mappedSuit, i) =>
                    (
                        <ul key={`mappedSuit-${i}`} className="cards">
                            {
                                mappedSuit.map(c =>
                                    <li key={c}>
                                        <Card onClick={(cardId => props.onCardClick(props.id, cardId))}
                                              isSelected={props.selectedCardsMap && props.selectedCardsMap[c]} card={c}/>
                                    </li>
                                )
                            }
                        </ul>
                    ))
            }
        </div>
    )
}
