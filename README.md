README
======

## Packaging Pipeline
The goal of this pipeline is to produce a bundle of your React project which can then be processed by Jalangi. The main component is the script pipeline/pack.js.


It is recommended to install js-beautify globally: <br />
```
npm -g install js-beautify
```

and then run: <br />
```
node pipeline/pack.js your_react_project_directory [output_directory]
```
<!-- Upon running the command above, modify homepage field in package.json in your react project depending on where you wish to deploy your program and run: npm run build. You may also be interested in running js-beautify on the produced JavaScript program. -->
`output_directory` is the place where you wish to deploy your react website. If you don't provide any value for `output_directory`, it would be set to /tmp/build. The deployment is a static build of your react project which has been beautified, and is ready to be processed by Jalangi.