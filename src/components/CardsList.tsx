import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react-lite'

import Store from '../store/Store'
import CardExtended from './CardExtended'
import {ICard} from '../helpers/Intefaces'

const CardListContainer = styled.div`
  width: 80%;
  height: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  box-sizing: border-box;
  padding: 20px;
`

const Card = styled.div`
  width: 25%;
  height: 60px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  margin-right: 10px;
  box-sizing: border-box;
  padding: 5px;
  
  &:hover {
    cursor: pointer;
  }
`

const CardList: React.FC = observer(() => {
    useEffect(() => {
        Store.filterCards()
    }, [])

    const [open, setOpen] = useState(false);
    const [card, setCard] = useState<ICard>(Store.cards[1])

    const handleClickOpen = (card: ICard) => {
        setOpen(true);
        setCard(card)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <CardListContainer>
            {Store.filteredCards.map((card, key) => (
                <Card key={card.id}
                      onClick={() => handleClickOpen(card)}
                >
                    <span>ФИО: {card.fio}</span>
                    <span>Дата подачи заявки: {card.date + ' ' + card.time}</span>
                </Card>
            ))}
            <CardExtended open={open}
                          onClose={handleClose}
                          card={card}
            />
        </CardListContainer>
    )
})

export default CardList
