import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(userName, userPassword) {
        console.log('getuserinfo');
        return axiosAgent.get(`login/${userName}/${userPassword}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }
    async checkUserInfo(userName) {
        console.log('checkUserInfo');
        return axiosAgent.get(`login/${userName}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }
    async createUserInfo(userName, userPassword,create) {
        console.log('createUserInfo');
        return axiosAgent.get(`login/${userName}/${userPassword}/${create}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }
    async getUserID(userName, a, b, get) {
        console.log('getUserID');
        return axiosAgent.get(`login/${userName}/${a}/${b}/${get}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async getUserNfts(userID){
        console.log('getUserNfts a');
        return axiosAgent.get(`collection/${userID}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async putUserNft(url, title, path, userID, keyhash){
        console.log('putUserNft 1');
        return axiosAgent.get(`collection/${url}/${title}/${path}/${userID}/${keyhash}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                }));
    }

    async removeUserNft(id){
        console.log("remove Nft");
        return axiosAgent.get(`collection/${id}/remove`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async getKey(id){
        console.log('getUserNfts a');
        return axiosAgent.get(`collection/getkey/${id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    
}