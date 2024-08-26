import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"

interface AxiosCall {
    call: Promise<AxiosResponse>;
    controller?: AbortController
}

const useFetchAndLoad = () => {
    const [loading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);    // inicializamos la carga
        let result = {} as AxiosResponse
        try {
            result = await axiosCall.call;
        } catch (e) {}
        setLoading(false) // termino de cargar
        return result;
    }

    const cancelEndpoint = () => {
        setLoading(false);
        if (controller) controller.abort();
    }

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
    }, [])

    return { loading , callEndpoint }
};

export default useFetchAndLoad;