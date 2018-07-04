import fs from 'fs';
import path from 'path';

const proj_dir = process.argv[2]
const out_dir = process.argv[4];

const packaje_json_path = path.join(proj_dir, "package.json");

const read_text = fs.readFileSync(packaje_json_path);
var obj = JSON.parse(read_text, "utf-8");
obj.homepage = out_dir;

fs.writeFileSync(packaje_json_path, JSON.stringify(obj))

