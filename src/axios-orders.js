import  axios from 'axios';

const instance= axios.create({
    baseURL : 'https://burgerbuilder-ee9dc.firebaseio.com/'
});

export default instance;