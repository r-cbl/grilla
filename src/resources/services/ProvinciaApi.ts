import axios from 'axios';
import {Provincia} from "../domain/Provincia";
import {ProvinciaType} from "../types/ProvinciaType";


export class ProvinciaApi {
    async getProvincias (): Promise<Array <ProvinciaType>> {
        const provincias =  await axios.get(process.env.REACT_APP_GRILLA+'/provincia/')
        return provincias.data
        /*.data.map( (provincia: any) => {
        return this.mapProvincia(provincia)
    })*/
    }

    async getProvinciaByID (id: number): Promise<ProvinciaType> {
        const provincia =  await axios.get(process.env.REACT_APP_GRILLA+'/provincia/'+id)
        //const provinciaMapped = this.mapProvincia(provincia.data)
        //return provinciaMapped
        return provincia.data
    }

    async deleteProvinciaByID (id: number): Promise<number> {
        const provincia =  await axios.delete(process.env.REACT_APP_GRILLA+'/provincia/'+id)
        return provincia.status
    }

    async putProvinciaByID(id: Number, nuevoNombre: string): Promise<number> {
        const body = { nombre: nuevoNombre }
        const provincia =  await axios.put(process.env.REACT_APP_GRILLA+'/provincia/'+id, body)
        return provincia.status
    }
    /*private mapProvincia(provincia: ProvinciaType):ProvinciaType {
        return  {
            id : provincia.id,
            nombre: provincia.nombre
        }
    }*/
}