import { Axios } from "./Axios";

// function getHome() {
//     return Axios.get("everything?q=tesla&from=2022-03-20&sortBy=publishedAt&apiKey=c2eff9224edd4d97946e20bcbc870c34");
// }
//
// function getListPost(keyword){
//     return Axios.get(`everything?q=${keyword}&from=2022-03-21&sortBy=publishedAt&apiKey=c2eff9224edd4d97946e20bcbc870c34`);
// }

function login(payload) {
    return Axios.post("login",payload)
}

export const authService = {
    // getHome,
    // getListPost,
    login,
};