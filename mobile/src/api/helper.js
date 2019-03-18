import { base_api_url } from './constants';

export const buildRequest = ({ mainEndpoint = '', params = {}, body = null, method='GET' }) => {
	let finalUrl = base_api_url + mainEndpoint + '?view=Grid%20view'; // ?view=Grid%20view - was suggested by the AirTable API
    
    console.log('finalURL: ', finalUrl);
    
    if (params != {}) {
		let prms = [];
		for (let val in params) {
			let encodedParam = encodeURIComponent(val) + '=' + encodeURIComponent(params[val]);
			prms.push(encodedParam);
		}
		finalUrl = prms.length == 0 ? finalUrl : finalUrl + '?' + prms.join('&');
	}
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
	console.log('finalUrl:', finalUrl);
	console.log('request object:', request);
	
	return fetch(finalUrl, request).then((response) => {
		console.log('Response:', response);
		if(!response.ok) {
			throw response; // Deal with these responses on the associated screen
		}
		return response.json();
    });
}