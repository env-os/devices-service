
import express = require('express');
import { DevicesService } from './services/device.service';
import { createConnection } from 'typeorm';
import bodyParser = require('body-parser');

const app: express.Application = express();
const devicesService = new DevicesService();


const connection = createConnection() // open db connection for all routes
app.use(bodyParser.json())

app.post('/create', (req, res) => {
    const test = devicesService.create(
        req.body.name,
        req.body.macaddress,
        req.body.description
    )
    res.send("Device created successfully")
})

app.get('/get', async (req, res) => {
    const device = await devicesService.getAll()
    res.json(device)
})

app.delete('/:name', (req, res) => {
    devicesService.delete(req.params.name);
    res.send("Device deleted successfully")
})

app.listen(3000, function () {
    console.log("Device module is listening on port " + 3000 +"!");
    
});