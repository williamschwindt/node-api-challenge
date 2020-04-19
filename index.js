const port = process.env.PORT || 8000;

const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Node api challenge</h1>`);
});

server.use((req, res) => {
    res.status(404).json({
        message: 'route not found'
    })
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'something went wrong'
    })
});

server.listen(port, () => {
    console.log(`server running on port ${port}`)
});


