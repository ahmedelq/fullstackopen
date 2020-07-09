import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
const get = (resource) => axios
                        .get(`${BASE_URL}/${resource}`)
                        .then(res => res.data);

const post = (resource, obj) => axios
                               .post(
                                   `${BASE_URL}/${resource}`, 
                                    obj)
                                .then(res=> res.data);

const remove = (resouce, id) => axios
                                .delete(`${BASE_URL}/${resouce}/${id}`)

const put = (resouce, id, obj) => axios
                             .put(`${BASE_URL}/${resouce}/${id}`, obj)
                             .then(result => result.data);

export default {get, post, remove, put}