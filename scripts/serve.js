const yargs = require("yargs");
const browserSync = require("browser-sync");

const argv = yargs.argv;

const dir = argv._[0];

if (!dir) {
  console.log("Usage: serve <dir>");
  return;
}

const options = {
  server: dir,
  watch: true, // Watch for changes in the <dir> directory
  open: false, // Don't open a browser window on start up
  notify: false, // Don't show browser sync notifications in the browser
  serveStatic: ["./static"], // Both /image.jpeg and /static/image.jpeg will work
};

const server = browserSync.create("rescript-static");

server.init(options);
