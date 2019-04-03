import { base_api_url } from './constants';
import { recordConnectionStatus } from '../utility/actions';

export const buildRequest = ({ mainEndpoint = '', params = {}, body = null, method='GET'/*, dispatch*/ }) => {
    let finalUrl = base_api_url + mainEndpoint;
    
    if (method == 'GET') {
        finalUrl = finalUrl + '?view=Grid%20view'; // ?view=Grid%20view - was suggested by the AirTable API
    }
    else if (method == 'DELETE' || method == 'UPDATE') {
        finalUrl = finalUrl + '/' + params.id;
    }
    // POST just needs the mainEndpoint at the end of the url
    
    console.log('finalURL: ', finalUrl);

	let request = body != null ? 
	{
		method: method,
		headers: {
			'Authorization': 'Bearer key65euQPFbxTNyqz',
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify(body)
	} : {
		method: method,
		headers: {
			'Authorization': 'Bearer key65euQPFbxTNyqz', // depends on how tokens are being handled
		}
	};
	console.log('request object:', request);
	
	return fetch(finalUrl, request).then((response) => {
        console.log('Response:', response);
		if(!response.ok) {
			throw response; // Deal with these responses on the associated screen
        }
		return response.json();
    });/*.catch((error) => {
        console.log('Error: ', error);
        if (error.message == 'Network request failed') {
            console.log('network request failed');
            dispatch(recordConnectionStatus(false));
        }
        //throw error;
    })*/
}