const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
const watch = require('node-watch');
const watcher = watch('./', { recursive: true });
const respawn = require('respawn')
require('events').EventEmitter.prototype._maxListeners = 100;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const runner = respawn(['npm','run', 'electron']);
            runner.start()
            runner.on('stdout', (data)=>{
                console.log(data.toString());
            });

            runner.on('stderr', (data)=>{
                console.error(data.toString());
            });
            console.log('starting watching');
            watcher.on('change', function(evt, name) {
              console.log("runner  restart")
                 runner.stop(()=>runner.start())
            });

            watcher.on('error', function(err) {
               console.log(`${evt}`);
            });
          process.on('beforeExit',function(){
             runner.stop();
          })
        }
    }
);


tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
