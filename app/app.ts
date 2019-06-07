import 'reflect-metadata';
import { useContainer as typeormUseContainer, createConnection } from 'typeorm';
import { Container } from 'typedi';
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { DeviceController } from './controllers/device.controller';
import { CommandController } from './controllers/command.controller';

typeormUseContainer(Container)
routingUseContainer(Container)

const port = process.env.PORT || 3001;

const app = createExpressServer({
    controllers: [
        DeviceController,
        CommandController
    ]
});

app.listen(port, () => {
    console.log("Device service listening on port " + port);
})

createConnection()
.then(async connection => {
    console.log("Database connection started successfully");
})
.catch(error => console.log(error))