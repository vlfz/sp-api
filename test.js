const API = require('./');
const config = {
    project_id: '***', // sp/spm/spk
    token: '***', // https://spm.jakksoft.com/dev/apps
    response_key: '***' // https://spm.jakksoft.com/dev/apps
};
const client = new API(config);

client.test().then((data) => { // Тестовый запрос
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.permissionTest("LICENSE_KEY").then((data) => { // Проверка на тестовое разрешение
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.pay({ // Пример работы получения АР через SP-Pay
    spPayCode: "481360",
    sum: "2",
    transactionMessage: "Тестовое получение АР"
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.getPermission({ // Запрос на разрешение проекту от пользователя
    license_key: "LICENSE_KEY",
    permission_id: "1" // https://spm.jakksoft.com/dev/permissions
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.getCardsInfo({ // Информация по банковским картам
    license_key: "LICENSE_KEY"
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.getUnreadNotifications({ // Получение списка непрочитанных уведомлений
    license_key: "LICENSE_KEY"
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);

client.markNotificationsAsRead({ // Пометка всех непрочитанных уведомлений пользователя как "прочитано"
    license_key: "LICENSE_KEY"
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(data);
}).catch(console.error);
