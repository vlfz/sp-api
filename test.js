const API = require('./');
const config = {
    project_id: '***', // sp/spm/spk
    token: '***', // https://spm.jakksoft.com/dev/apps
    response_key: '***' // https://spm.jakksoft.com/dev/apps
};

const client = new API(config);
client.pay({ // Пример работы получения АР через SP-Pay
    spPayCode: "481360",
    sum: "2",
    transactionMessage: "Тестовое получение АР"
}).then((data) => {
    if(data.response_key !== config.response_key) return console.error(`data.response_key !== config.response_key!`);
    return console.log(`[${(data.success == true) ? 'Успешно' : 'Ошибка'}] ${(data.success == true) ? JSON.stringify(data.data) : JSON.stringify(data.errors)}`);
}).catch(console.error);