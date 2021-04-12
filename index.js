const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App      - ${port}`);
});