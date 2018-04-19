'use strict';
////////// 
if (require.main === undefined) {
    console.log("This program should be run from a terminal.");
    process.exit(0);
}

if (process.argv.length < 3) {
    console.log("usage: repack react_project_path");
    process.exit(0);
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
console.log(our_webpack_config_path);
console.log(webpack_config_path);
//fs.copyFileSync(our_webpack_config, webpack_config_path);
