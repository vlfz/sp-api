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

function requestAPI(params) {
	params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	let postData;
    if(params.body) {
		postData = stringify( params.body );
		params.headers['Content-Length'] = Buffer.byteLength(postData);
	}
	
	return send(params, (params.body) ? postData : null);
};

module.exports = function({ project_id, token, response_key }) {
    if(!project_id || !token || !response_key) throw "[sp-api] Не указаны нужные данные для работы с SP-API";
    
    let options = (data = null) => {
        let toRequest = {
            method: "POST",
            hostname: `${project_id}.jakksoft.com`,
            path: "/api/request",
            headers: {}
        };
        
        if(data !== null) toRequest.body = data;
        toRequest.body.token = token;
    
        return toRequest;
    };

    this.test = () =>
		requestAPI(options({ action: 'test' }))
            .then((r) => r, (e) => { throw e; });
            
    this.permissionTest = (license_key = null) =>
		requestAPI(options({ action: 'permission_test', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.pay = ({ spPayCode = "000000", sum = "0", transactionMessage = null }) =>
		requestAPI(options({ action: 'pay', spPayCode, sum, transactionMessage }))
            .then((r) => r, (e) => { throw e; });
            
    this.getPermission = ({ license_key = null, permission_id = 0 }) =>
		requestAPI(options({ action: 'get_permission', license_key, permission_id }))
            .then((r) => r, (e) => { throw e; });
            
    this.getCardsInfo = (license_key = null) =>
		requestAPI(options({ action: 'get_cards_info', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.getUnreadNotifications = (license_key = null) =>
		requestAPI(options({ action: 'get_unread_notifications', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.markNotificationsAsRead = (license_key = null) =>
		requestAPI(options({ action: 'mark_notifications_as_read', license_key }))
			.then((r) => r, (e) => { throw e; });
};
