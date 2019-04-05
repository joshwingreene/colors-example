import { buildRequest } from './helper';

// POST

export const postUserColor = (hexColor) => {
    return buildRequest({ mainEndpoint: 'UserColors', method: 'POST', body: { fields: { hexColor } }});
}

// DELETE

export const apiDeleteUserColor = (id) => {
    return buildRequest({ mainEndpoint: 'UserColors', method: 'DELETE', params: { id } });
}