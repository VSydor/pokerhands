package com.codeart.pokerhands;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardsController {

    @PostMapping("/cards")
    public CardsResponse greeting(@RequestBody CardsDto cardsDto) {
        return new CardsResponse(String.join( ",", cardsDto.getSelectedCards()));
    }
}
