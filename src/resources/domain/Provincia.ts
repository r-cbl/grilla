import { ProvinciaType } from '../types/ProvinciaType'

export class Provincia {
    id: number
    nombre: string

    constructor(id = -1, nombre = '') {
        this.id = id
        this.nombre = nombre
    }
    setProvincia (provincia: ProvinciaType) {
        this.id = provincia.id
        this.nombre = provincia.nombre
    }
}