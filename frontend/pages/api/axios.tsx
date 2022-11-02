import axios from "axios";

export const axiosGet = function(url: string) {
    axios({
        method: "GET",
        url: url,
    })
    .then( (res) => {
        return res.data
    })
}
