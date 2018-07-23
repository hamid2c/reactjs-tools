README
======

## Packaging Pipeline
Reactjs is a popular framework for developing frontend applications. It comes with its own set of tools for debugging, however, it is beneficial to be able to transform a React project to a form which can be processed by other tools such as [Jalangi](https://github.com/Samsung/jalangi2 "Jalangi2 on Github").

The goal of this pipeline is to produce a bundle of your React project, and then analyze it by using Jalangi. The main component is the script pipeline/pack.js.

You need to install js-beautify globally: <br />
```
npm -g install js-beautify
```

Then

```
cd reactjs-tools
npm install
```

Follow the instruction on [https://github.com/Samsung/jalangi2](https://github.com/Samsung/jalangi2) to install Jalangi on your computer.

Set the JALANGI_HOME environment variable to the location where you have installed Jalangi.

To run the pipeline: <br />
```
node pipeline/pack.js react_project_directory output_directory
```

`react_project_directory` indicates the place of your react project. `output_directory` is the place where you wish to deploy your react website. The deployment is a static build of your react project which has been beautified, and also instrumented by Jalangi.

To define the set of Jalangi analyses, the file `pipeline.analyses.js` should be placed in the current working directory. It should follow the same structure as [this sample file](https://github.com/hamid2c/reactjs-tools/blob/master/pipeline.analyses.js).

