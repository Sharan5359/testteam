if ((process.env.NODE_ENV || '').trim() !== 'production'){
    require('dotenv').config();
}
module.exports = {
    PORT : process.env.PORT
}