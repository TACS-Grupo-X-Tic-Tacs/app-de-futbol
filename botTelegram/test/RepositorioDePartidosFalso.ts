import {RepositorioDePartidos} from "../src/repositorios/repositorioDePartidos";


export class RepositorioDePartidosFalso implements RepositorioDePartidos {

  loQueDevuelva: any
  constructor(loQueDevuelva: any) {
    this.loQueDevuelva = loQueDevuelva
  }

  pedirPartido(idPartido: string): Promise<Object> {
    return this.loQueDevuelva;
  }

  pedirPartidos(): Promise<Object> {
    return this.loQueDevuelva;
  }

  inscribirseAPartido(idPartido: string, {
    telefono,
    mail,
    nombre
  }: { telefono: string; mail: string; nombre: string }): Promise<Object> {
    return this.loQueDevuelva;
  }

}
