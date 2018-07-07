'use strict';
// program proj_dir -o /tmp/build
const fs = require('fs');
const path = require('path');

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
console.log(out_dir);
console.log(obj);
console.log("===========");

obj.homepage = out_dir;

fs.writeFileSync(packaje_json_path, JSON.stringify(obj))

