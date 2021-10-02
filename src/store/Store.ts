import {makeAutoObservable} from 'mobx'

import {ICard, IFormData} from '../helpers/Intefaces'

class State {
    constructor() {
        makeAutoObservable(this)
    }

    listState: string = 'pending'

    cards: ICard[] = [
        {
            id: 1,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            fio: 'Суворов Артем Вячеславович',
            passport: '6914174147',
            carNumber: 'T130OK',
            state: 'pending',
            position: 'водитель'
        },
        {
            id: 2,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            fio: 'Крымов Андрей Алексеевич',
            passport: '6914174147',
            carNumber: 'У282ЕЕ',
            state: 'resolved',
            position: 'Поломойщик'
        },
        {
            id: 3,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            fio: 'Булдаев Баир Тимурович',
            passport: '6914174147',
            carNumber: 'О999ОО',
            state: 'resolved',
            position: 'Директор'
        },
        {
            id: 4,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            fio: 'Иванов Никита Алексеевич',
            passport: '6914174147',
            carNumber: 'Е777КК',
            state: 'rejected',
            position: 'Шашлычник'
        }]

    filteredCards: ICard[] = []

    setListState(state: string) {
        this.listState = state
    }

    filterCards() {
        this.filteredCards = this.cards.filter(card => card.state === this.listState)
    }

    changeCardData(passedData: IFormData, cardID: number) {
        this.cards.forEach(card => {
            if(card.id === cardID) {
                for(let key in passedData) {
                    card[key] = passedData[key]
                }
            }
        })
    }

    changeCardState(passedId: number, passedState: string) {
        this.cards.forEach(card => {
            if(card.id === passedId) {
                card.state = passedState
            }
        })
    }
}

export default new State()
