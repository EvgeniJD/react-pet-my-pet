const env = process.env.NODE_ENV || 'development';

console.log('ProcessENV: ', process.env.NODE_ENV);

const config = {
    development: {
        baseURL: 'http://localhost:5000'
    },
    production: {
        baseURL: 'https://amica-evgeni.herokuapp.com'
    }
};

export default config[env]; 