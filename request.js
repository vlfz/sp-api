const
	{ stringify } = require('querystring'), 
    { request } = require('https');

function send(params, postData) {
	return new Promise((resolve, reject) => {
		let req = request(params, (res) => {
			res.setEncoding('utf8');
			res.on('data', (data) => resolve( JSON.parse(data) ));
		});

		req.on('error', reject);

		if(postData !== null) req.write(postData);
		req.end();
	});
}

module.exports = (params) => {
	params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	let postData;
    if(params.body) {
		postData = stringify( params.body );
		params.headers['Content-Length'] = Buffer.byteLength(postData);
	}
	
	return send(params, (params.body) ? postData : null);
};