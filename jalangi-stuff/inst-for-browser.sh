#!/bin/bash
export JALANGI_HOME=/all/projs/jalangi2
if [ -z "$JALANGI_HOME" ]; then
    echo "JALANGI_HOME should be set."
    exit 1
fi
cd $JALANGI_HOME
if [ $((1)) == 1 ]; then
echo "No 1"
node src/js/commands/instrument.js --inlineIID --inlineSource -i --inlineJalangi \
 --analysis src/js/sample_analyses/ChainedAnalyses.js \
 --analysis src/js/sample_analyses/dlint/Utils.js \
 --analysis src/js/sample_analyses/dlint/CheckNaN.js \
 --analysis src/js/sample_analyses/dlint/FunCalledWithMoreArguments.js \
 --analysis src/js/sample_analyses/dlint/CompareFunctionWithPrimitives.js \
 --analysis src/js/sample_analyses/dlint/ShadowProtoProperty.js \
 --analysis src/js/sample_analyses/dlint/ConcatUndefinedToString.js \
 --analysis src/js/sample_analyses/dlint/UndefinedOffset.js \
 --analysis /all/projs/reactjs-tools/sample-analyses/cg-analysis.js \
 --outputDir /mybins/temp/o/ /mybins/temp/foo-app/build # temp-dir proj-dir/build

 cp -TRv /mybins/temp/o/build /tmp/new  # temp-dir/build out-dir
fi

if [ $((0)) == 1 ]; then
echo "No 2"
node src/js/commands/instrument.js --inlineIID --inlineSource -i --inlineJalangi \
--analysis src/js/sample_analyses/ChainedAnalyses.js \
--analysis src/js/runtime/SMemory.js \
--analysis src/js/sample_analyses/pldi16/TraceAll.js \
--outputDir /tmp/new /tmp/new/
fi

#chromium-browser --incognito /tmp/annex/index.html &
# open file:///tmp/annex/index.html
 # While performing analysis in a browser, one needs to press Alt-Shift-T to end the analysis and to print the analysis results in the console.


## node
#node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js \
# --analysis src/js/runtime/SMemory.js --analysis src/js/sample_analyses/pldi16/TraceAll.js ~/temp/1.js
