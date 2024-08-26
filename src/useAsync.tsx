import { AxiosResponse } from "axios";
import { useEffect } from "react"


const useAsync = ( 
    asyncFunction: () => Promise<AxiosResponse>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = []
) => {
    useEffect( () => {
        let isActive = true;
        
        asyncFunction().then((result) => {
            if (isActive) successFunction(result.data);
        })

        return () => {
            if( returnFunction ) returnFunction();
            isActive = false;
        }
    }, dependencies )
}

export default useAsync;