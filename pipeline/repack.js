'use strict';
////////// 
if (require.main === undefined) {
    console.log("This program should be run from a terminal.");
    process.exit(1);
}

if (process.argv.length < 3) {
    console.log("usage: repack react_project_path");
    process.exit(1);
}

const project_dir = process.argv[2];
/////////

const webpack_config_filename = "node_modules/react-scripts/config/webpack.config.prod.js";
const our_webpack_config = "webpack.config.js"

////////
const path =  require("path");
const fs = require("fs");
///////

const program_dir = path.dirname(require.main.filename);
const our_webpack_config_path = path.join(program_dir, our_webpack_config);
const webpack_config_path = path.join(project_dir, webpack_config_filename);
fs.copyFileSync(our_webpack_config, webpack_config_path);
console.log("New configuration for wepack copied to " + project_dir);
console.log();
console.log("Now you can run:");
console.log("cd " + project_dir + " && npm run build");
console.log();
const static_build_dir = path.join(project_dir, "build/static/js");
console.log("Upon building the static bundle, run:");
console.log("js-beautify " + static_build_dir + "/main.INFIX.js > " + static_build_dir + "/main.INFIX.js");
console.log("Note: INFIX above refers to a string generated during static build.")
