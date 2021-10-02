import React from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react-lite'

import Store from '../store/Store'

const RequestStateContainer = styled.div`
  width:50%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`

const StateCard = styled.div<{ buttonState: string, activeState: string }>`
  width:25%;
  height: 70px;
  border-radius: 30px;
  background: ${props => props.buttonState === 'pending' ? 'orange' : props.buttonState === 'resolved' ? 'green' : 'red'};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${props => props.buttonState === props.activeState? 'scale(1.3, 1.3)' : 'none'};
  
  span {
    font-weight: bold;
    color: white;
  }
  
  &:hover {
    cursor: pointer;
  }
`

const RequestState: React.FC = observer(() => {
    const states = ['pending', 'resolved', 'rejected']

    return (
        <RequestStateContainer>
            {states.map((state, key) => (
                <StateCard buttonState={state}
                           activeState={Store.listState}
                           key={key}
                           onClick={() => {
                               Store.setListState(state)
                               Store.filterCards()
                           }}
                >
                    <span>
                        {state === 'pending' ? 'Ожидается' : state === 'resolved' ? 'На объекте' : 'Не допущены'}
                    </span>
                </StateCard>
            ))}
        </RequestStateContainer>
    )
})

export default RequestState
