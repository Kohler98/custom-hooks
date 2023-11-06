import { useEffect, useState } from "react"

 

export const useFetch = (url) => {
    //creamos el state inicial donde data sera el url, isloading servira para verificar si se completo o no la peticion a la api
    //y has error sirver para verificar si hay un error o no
    const [state, setState] = useState({
        data:null,
        isLoading:true,
        hasError:null
    })

    const getFetch = async() =>{
        //se barre el state primero por si hay mas informacion ants de la actual
        setState({
            ...state,
            isLoading:true
        })
        //se hace la peticio http con fetch
        const resp = await fetch(url)
        //se convierte la respuesta en un json
        const data = await resp.json()

        //se setea el state nueva mente con la peticion ya realizada y se cambia el isLoading a false por que ya hay una respuesta
        setState({
            data,
            isLoading:false,
            hasError:null
        })
    }
    
    //el useEffect se utiliza para verificar si hay un cambio en el state si lo hay se reenderiza y se hace de nuevo la peticion http con getFetch
    useEffect(()=>{
        getFetch()
    },[url])

  return {
    data:state.data,
    isLoading:state.isLoading,
    hasError:state.hasError
  }
}
