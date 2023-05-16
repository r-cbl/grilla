import { ProvinciaType } from '../types/ProvinciaType'

export class Provincia {
    id: number
    nombre: string

    constructor() {
        this.id = -1
        this.nombre = ''
    }
    setProvincia (provincia: ProvinciaType) {
        this.id = provincia.id
        this.nombre = provincia.nombre
    }
}