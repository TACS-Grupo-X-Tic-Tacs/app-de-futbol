import axios from "axios";

const apiURL = process.env.API_URL;

// los tipos quedan pendientes
export interface RepositorioDePartidos {
  pedirPartidos: () => Promise<Object>
  pedirPartido: (idPartido: string) => Promise<Object>
  inscribirseAPartido: (idPartido: string, {telefono, mail, nombre}: {telefono: string, mail: string, nombre: string}) => Promise<Object>
}

export class RepoDePartidosQueLePegaALaAPI implements RepositorioDePartidos {

  async pedirPartidos() {
    return await axios.get(apiURL + "/partidos").then(response => response.data)
  }

  async pedirPartido(idPartido: string) {
    return await axios.get(apiURL + "/partidos/" + idPartido).then(response => response.data)
  }

  async inscribirseAPartido(idPartido: string, {telefono, mail, nombre}: {telefono: string, mail: string, nombre: string}){
    return await axios.post(apiURL + "/partidos/" + idPartido + "/jugadores", {
      telefono,
      mail,
      nombre
    }).then(response => response.status)
  }
}
