import React from "react"

import "./index.css"

import {Card} from "./components/Card"

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
const suits = ["c", "d", "h", "s"]

const [clubs, diamonds, hearts, spades] = suits.map(suit => ranks.map(r => r + suit))

type SelectedCardsMap = Record<string, boolean>;

interface CardSetProps {
    id: number;
    selectedCardsMap: SelectedCardsMap;
    onCardClick: (id: string) => void
}

export function CardSet(props: CardSetProps) {

    return (
        <div className="card-set">
            <span>{props.id}</span>
            <ul className="cards">
                {
                    clubs.map(c =>
                        <li key={c}>
                            <Card onClick={(cardId => props.onCardClick(`${props.id}-${cardId}`))} isSelected={props.selectedCardsMap[`${props.id}-${c}`]} card={c}/>
                        </li>
                    )
                }
            </ul>
            <ul className="cards">
                {
                    diamonds.map(c =>
                        <li key={c}>
                            <Card onClick={(cardId => props.onCardClick(`${props.id}-${cardId}`))} isSelected={props.selectedCardsMap[`${props.id}-${c}`]} card={c}/>
                        </li>
                    )
                }
            </ul>
            <ul className="cards">
                {
                    hearts.map(c =>
                        <li key={c}>
                            <Card onClick={(cardId => props.onCardClick(`${props.id}-${cardId}`))} isSelected={props.selectedCardsMap[`${props.id}-${c}`]} card={c}/>
                        </li>
                    )
                }
            </ul>
            <ul className="cards">
                {
                    spades.map(c =>
                        <li key={c}>
                            <Card onClick={(cardId => props.onCardClick(`${props.id}-${cardId}`))} isSelected={props.selectedCardsMap[`${props.id}-${c}`]} card={c}/>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
