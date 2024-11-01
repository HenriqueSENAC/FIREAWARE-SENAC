const app = require('./app');
const port = app.get('port');

app.listen(port, () => console.log(`ta rodando no port ${port}!`));

