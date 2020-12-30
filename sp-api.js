const request = require('./request');
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
		request(options({ action: 'test' }))
            .then((r) => r, (e) => { throw e; });
            
    this.permissionTest = (license_key = null) =>
		request(options({ action: 'permission_test', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.pay = ({ spPayCode = "000000", sum = "0", transactionMessage = null }) =>
		request(options({ action: 'pay', spPayCode, sum, transactionMessage }))
            .then((r) => r, (e) => { throw e; });
            
    this.getPermission = ({ license_key = null, permission_id = 0 }) =>
		request(options({ action: 'get_permission', license_key, permission_id }))
            .then((r) => r, (e) => { throw e; });
            
    this.getCardsInfo = (license_key = null) =>
		request(options({ action: 'get_cards_info', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.getUnreadNotifications = (license_key = null) =>
		request(options({ action: 'get_unread_notifications', license_key }))
            .then((r) => r, (e) => { throw e; });
            
    this.markNotificationsAsRead = (license_key = null) =>
		request(options({ action: 'mark_notifications_as_read', license_key }))
			.then((r) => r, (e) => { throw e; });
};