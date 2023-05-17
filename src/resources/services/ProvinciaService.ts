import { Provincia } from '../domain/Provincia'
import { ProvinciaApi } from './ProvinciaApi'

export class ProvinciaService {
    static async getProvincias (): Promise<Array<Provincia>> {
        const provinciaApi = new ProvinciaApi()
        return (await provinciaApi.getProvincias()).map( (unaProvincia)=>{
            const provincia = new Provincia()
            provincia.setProvincia(unaProvincia)
            return provincia
        })

    }
    static async getProvincia (provinciaId: number): Promise<Provincia> {
        const provinciaApi = new ProvinciaApi()
        const provincia = new Provincia()
        const response = await provinciaApi.getProvinciaByID(provinciaId)
        provincia.setProvincia(response)
        return provincia
    }

    static async deleteProvincia (provinciaId: number): Promise <number>  {
        const provinciaApi = new ProvinciaApi()
        return await provinciaApi.deleteProvinciaByID(provinciaId)

    }

    static async putProvincia(provinciaId: Number, nuevoNombre: string){
        const provinciaApi = new ProvinciaApi()
        return  await provinciaApi.putProvinciaByID(provinciaId,nuevoNombre)

    }
}