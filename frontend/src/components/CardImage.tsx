import React from "react"
import classnames from "classnames";

import {CardImageProps} from "./Card.interface";

export function CardImage(props: CardImageProps) {
    const {card} = props

    return (
        <div onClick={props.onClick} className={classnames("card", {'selected': props.isSelected})}>
            <img src={card} alt="card-front"/>
        </div>
    )
}
