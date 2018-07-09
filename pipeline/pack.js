'use strict';

const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');

function run_cmd(cmd) {
    console.log("CMD: " + cmd);
    execSync(cmd);
}

if (require.main === undefined) {
    console.log("This program should be run from a terminal.");
    process.exit(1);
}

if (process.argv.length < 3) {
    console.log("usage: pack proj_dir [out_dir]");
    process.exit(1);
}

const proj_dir = process.argv[2];
var out_dir = "/tmp/build";
if (process.argv.length == 4) {
    out_dir = process.argv[3];
}

const packaje_json_path = path.join(proj_dir, "package.json");
const read_text = fs.readFileSync(packaje_json_path);
var obj = JSON.parse(read_text, "utf-8");
// Modify the homepage property of package.json
obj.homepage = out_dir;
fs.writeFileSync(packaje_json_path, JSON.stringify(obj))

// Copy our webpack configuration file to the react project directory
const webpack_config_filename = "node_modules/react-scripts/config/webpack.config.prod.js";
const our_webpack_config = "webpack.config.js"

const program_dir = path.dirname(require.main.filename);
const our_webpack_config_path = path.join(program_dir, our_webpack_config);
fs.copyFileSync(our_webpack_config_path, 
    path.join(proj_dir, webpack_config_filename));

// npm run build in project directory
run_cmd(util.format("cd %s && npm run build", proj_dir));

// Move the build to out_dir
run_cmd(util.format("cp -TR %s %s", path.join(proj_dir, "build/"), out_dir));
