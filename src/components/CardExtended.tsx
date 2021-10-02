import React, {useState} from 'react'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import {useForm} from 'react-hook-form'

import {ICard, IFormData, IDialogProps} from '../helpers/Intefaces'
import Store from "../store/Store";


const CardExtendedContainer = styled.div`
  form {
      width: 500px;
      height: 500px;
      background: white;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      
      span {
        input {
          &:focus {
            outline: none;
          }
        }
      }
  }
`

const ButtonContainer = styled.div`
  width: 50%;
  height:50px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  margin-top: 200px;
  justify-content: space-between;
`

const EditButton = styled.button<{ visible: boolean }>`
  width:100%;
  height:100%;
  border: 1px solid #F541F4;
  border-radius: 20px;
  background: white;
  display: ${props => props.visible ? 'none' : 'inline'};
`

const SaveCancelButton = styled.button<{ visible: boolean }>`
  width:45%;
  height:100%;
  border: 1px solid #F541F4;
  border-radius: 20px;
  background: white;
  display: ${props => props.visible ? 'inline' : 'none'};
`

const ChangeStateButtonContainer = styled.div`
  width:50%;
  height: 50px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  display: flex;
`

const ChangeStateButton = styled.button`
  width: 50%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #F541F4;
  border-radius: 20px;
  background: white;
`

const pickButtons = (card: ICard, handleClose: Function) => {
    switch (card.state) {
        case 'pending':
            return (
                <ChangeStateButtonContainer>
                    <ChangeStateButton type='button'
                                       onClick={() => {
                                           Store.changeCardState(card.id, 'resolved')
                                           handleClose()
                                           Store.filterCards()
                                       }}
                    >
                        Принять
                    </ChangeStateButton>
                    <ChangeStateButton type='button'
                                       onClick={() => {
                                           Store.changeCardState(card.id, 'rejected')
                                           handleClose()
                                           Store.filterCards()
                                       }}
                    >
                        Отказать
                    </ChangeStateButton>
                </ChangeStateButtonContainer>
            )
        case 'rejected':
            return (
                <ChangeStateButtonContainer>
                    <ChangeStateButton type='button'
                                       onClick={() => {
                                           Store.changeCardState(card.id, 'resolved')
                                           handleClose()
                                           Store.filterCards()
                                       }}
                    >
                        Принять
                    </ChangeStateButton>
                </ChangeStateButtonContainer>
            )
        case 'resolved':
            return (
                <ChangeStateButtonContainer>
                    <ChangeStateButton type='button'
                                       onClick={() => {
                                           Store.changeCardState(card.id, 'pending')
                                           handleClose()
                                           Store.filterCards()
                                       }}
                    >
                        Выпустить
                    </ChangeStateButton>
                </ChangeStateButtonContainer>
            )
    }
}

const CardExtended: React.FC<IDialogProps> = ({open, onClose, card}) => {
    const [editState, setEditState] = useState<boolean>(false)

    const {register, handleSubmit} = useForm<IFormData>()
    const onSubmit = handleSubmit(data => {
        Store.changeCardData(data, card.id)
        setEditState(false)
        handleClose()
    })

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <CardExtendedContainer>
                <form onSubmit={onSubmit}>
                    <span>ФИО: {editState ? (<input {...register("fio")}/>) : card.fio}</span>
                    <span>Должность: {editState ? (<input {...register("position")}/>) : card.position}</span>
                    <span>Паспорт: {editState ? (<input {...register("passport")}/>) : card.passport}</span>
                    <span>Номер ТС: {editState ? (<input {...register("carNumber")}/>) : card.carNumber}</span>
                    <ButtonContainer>
                        <EditButton visible={editState}
                                    onClick={() => {
                                        setEditState(true)
                                    }}
                                    type='button'
                        >
                            Редактировать
                        </EditButton>
                        <SaveCancelButton visible={editState}
                                          type='submit'
                        >
                            Сохранить
                        </SaveCancelButton>
                        <SaveCancelButton visible={editState}
                                          type='button'
                                          onClick={() => {
                                              setEditState(false)
                                          }}
                        >
                            Отменить
                        </SaveCancelButton>
                    </ButtonContainer>
                    {pickButtons(card, handleClose)}
                </form>
            </CardExtendedContainer>
        </Dialog>
    )
}

export default CardExtended
