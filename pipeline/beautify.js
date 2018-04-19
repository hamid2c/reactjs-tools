function beautify_build(project_dir) {
    const fs = require('fs');
    const path = require('path');
    const beautify = require('js-beautify').js;

    const files = fs.readdirSync(path.join(project_dir, "build/static/js"));
    const main_js = files[0];
    const main_js_path = path.join(project_dir, "build/static/js", main_js);

    const pretty_js = fs.readFileSync(main_js_path);
    console.log(data);
    fs.writeFileSync(main_js_path, pretty_js);

    
    console.log(beautify(data, { indent_size: 2, space_in_empty_paren: true }));
    
}

exports.beautify_build = beautify_build;