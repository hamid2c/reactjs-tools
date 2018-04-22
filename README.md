README
======

## Packaging Pipeline
The goal of this pipeline is to produce a bundle of your React project which can then be processed by Jalangi. The main component is the script pipeline/repack.js.


It is recommended to install js-beautify globally: <br />
```
npm -g install js-beautify
```

and then run: <br />
```
node pipeline/repack.js your_react_project_directory
```

Upon running the command above, modify homepage field in package.json in your react project depending on where you wish to deploy your program and run: npm run build. You may also be interested in running js-beautify on the produced JavaScript program.