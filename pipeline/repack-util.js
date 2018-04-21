'use strict';
function error_and_exit(msg) {
    console.log(msg)
    process.exit(1);
}

function beautify_build(project_dir) {
    const fs = require('fs');
    const path = require('path');
    const beautify = require('js-beautify').js;

    const files = fs.readdirSync(path.join(project_dir, "build/static/js"));
    const bad_project_msg = "Invalid project structure: " + project_dir;
    if (files.length != 2) error_and_exit(bad_project_msg);

    const main_js = files[0];
    if (!main_js.endsWith(".js")) {
        main_js = files[1];
    }
    if (!main_js.startsWith("main") || !main_js.endsWith(".js")) error_and_exit(bad_project_msg);

    const main_js_path = path.join(project_dir, "build/static/js", main_js);

    const pretty_js = fs.readFileSync(main_js_path);
    console.log(data);
    fs.writeFileSync(main_js_path, pretty_js);

    
    console.log(beautify(data, { indent_size: 2, space_in_empty_paren: true }));
    
}

exports.beautify_build = beautify_build;