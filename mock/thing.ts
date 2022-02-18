import {MockMethod} from "vite-plugin-mock";
import * as url from "url";



export default [
    {
        url: "/things",
        method: 'get',
        response: ({query}) => {
            return{
                things: "things"
            }
        }
    }
] as MockMethod[]