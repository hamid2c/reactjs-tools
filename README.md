README
======

## Packaging Pipeline
Reactjs is a popular framework for developing frontend applications. It comes with its own set of tools for debugging, however, it is beneficial to be able to transform a React project to a form which can be processed by other tools such as [Jalangi](https://github.com/Samsung/jalangi2 "Jalangi2 on Github").

The goal of this pipeline is to produce a bundle of your React project, and then analyze it by using Jalangi. The main component is the script pipeline/pack.js.

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