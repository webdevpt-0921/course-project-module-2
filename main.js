const setupApp = require("./app");
const { startDB, stopDB } = require("./db");

const port = process.env.PORT || 3000;

function stopServer(server) {
  server.close((error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("stopped http server");
  });
}

function run() {
  const app = setupApp();
  let httpServer;

  startDB()
    .then((db) => {
      console.log(
        `Connected to Mongo! Database name: "${db.connections[0].name}"`
      );
    })
    .then(() => {
      httpServer = app.listen(port, () => {
        console.log(`Starting on port ${port}`);
      });
    })
    .catch((e) => {
      console.log("error starting server", e);
    });

  function stop() {
    console.log("stop");
    stopDB()
      .then(() => {
        stopServer(httpServer);
      })
      .catch((e) => {
        console.log("error closing db");
      });
  }

  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

run();
