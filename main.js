const setupApp = require('./app');
const { startDB, stopDB } = require('./db');

const port = process.env.PORT || 3000;

function stopServer(server) {
  server.close(error => {
    if (error) {
      console.error(error.message);
    }
    console.log('stopped http server');
  });
}

async function run() {
  const app = setupApp();
  let httpServer;

  try {
    const db = await startDB();
    console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`);
    httpServer = app.listen(port, () => {
      console.log(`Starting on port ${port}`);
    });
  } catch (e) {
    console.log('error starting server', e);
  }

  async function stop() {
    console.log('stop server');
    try {
      await stopDB();

      stopServer(httpServer);
    } catch (e) {
      console.log('error closing db');
    }
  }

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

run();
