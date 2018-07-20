'use strict';

const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');
const find = require('find');

const list_of_analyses_path = path.join(process.cwd(),
     "pipeline.analyses");
const analyses_module = require(list_of_analyses_path);

const proj_dir = process.argv[2];
var out_dir = "/tmp/build";
if (process.argv.length == 4) {
    out_dir = process.argv[3];
}

function run_cmd(cmd) {
    console.log("CMD: " + cmd);
    execSync(cmd);
}

function js_beautify_main(build_dir) {
    var files = find.fileSync(/main\..+\.js$/,build_dir);
    if (files.length !== 1) {
        console.log("Could not find main.*.js in " + build_dir + " to beautify." );
        return;
    }
    run_cmd(util.format("js-beautify --replace %s ", files[0]));
}

function convert_to_real_path(analysis_path) {
    if (analysis_path.startsWith("$JALANGI_HOME") || analysis_path.startsWith("/"))
        return analysis_path;
    return path.join(analyses_module.baseDirectory, analysis_path);
}

function run_jalangi_command() {
    const temp_dir = fs.mkdtempSync("tempDir");
    console.log("Created temp directory: " + temp_dir);

    let analysis_options_string = "";
    analyses_module.analyses.forEach(function(analysis_path) {
        analysis_options_string += "--analysis " + convert_to_real_path(analysis_path) + " ";
    });

    const first_part = "node $JALANGI_HOME/src/js/commands/instrument.js --inlineIID --inlineSource -i --inlineJalangi";
    const last_part = util.format(
    "--outputDir %s %s", temp_dir, path.join(proj_dir, "build"));
    
    const jalangi_command = util.format("%s %s %s", first_part, analysis_options_string, last_part);
    run_cmd(jalangi_command);
    
    // copy the intrumented application to output directory
    run_cmd(util.format("cp -TRv %s %s", path.join(temp_dir, "build"), out_dir));
    // clean up
    run_cmd(util.format("rm -rf %s", temp_dir));
}


if (require.main === undefined) {
    console.log("This program should be run from a terminal.");
    process.exit(1);
}

if (process.argv.length < 3) {
    console.log("usage: pack proj_dir [out_dir]");
    process.exit(1);
}

// package.json
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

// npm run build
run_cmd(util.format("cd %s && npm run build", proj_dir));

// js-beautify
const proj_build_dir = path.join(proj_dir, "build/");
js_beautify_main(proj_build_dir);

// Move the build to out_dir
// run_cmd(util.format("cp -TR %s %s", proj_build_dir, out_dir));

run_jalangi_command();

