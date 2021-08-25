// import {FrontOrBack} from "./FrontOrBack";
// import {MouseEventHandler} from "react";

export interface CardImageProps {
  card: string;
  // frontOrBack?: FrontOrBack;
  isSelected: boolean;
  onClick: (e: any) => void;
}

export interface CardProps {
  card: string;
  // frontOrBack?: FrontOrBack;
  isSelected: boolean;
  onClick: (cardId: string) => void;
}
