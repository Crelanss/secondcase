export interface ICard {
    [key: string]: any,
    id: number,
    date: string,
    time: string,
    fio: string,
    passport: string,
    carNumber: string,
    state: string,
    position: string
}

export interface IFormData {
    [key: string]: any,
    fio: string,
    position: string,
    passport: string,
    carNumber: string
}

export interface IDialogProps {
    open: boolean,
    onClose: Function,
    card: ICard
}
