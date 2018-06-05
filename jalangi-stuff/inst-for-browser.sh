#!/bin/bash
if [ -z "$JALANGI_HOME" ]; then
    echo "JALANGI_HOME should be set."
    exit 1
fi
cd $JALANGI_HOME
node src/js/commands/instrument.js --inlineIID --inlineSource -i --inlineJalangi \
 --analysis src/js/sample_analyses/ChainedAnalyses.js \
 --analysis src/js/sample_analyses/dlint/Utils.js \
 --analysis src/js/sample_analyses/dlint/CheckNaN.js \
 --analysis src/js/sample_analyses/dlint/FunCalledWithMoreArguments.js \
 --analysis src/js/sample_analyses/dlint/CompareFunctionWithPrimitives.js \
 --analysis src/js/sample_analyses/dlint/ShadowProtoProperty.js \
 --analysis src/js/sample_analyses/dlint/ConcatUndefinedToString.js \
 --analysis src/js/sample_analyses/dlint/UndefinedOffset.js \
 --outputDir /tmp /home/hamid/temp/foo/build #tests/tizen/annex

#chromium-browser --incognito /tmp/annex/index.html &
# open file:///tmp/annex/index.html
 # While performing analysis in a browser, one needs to press Alt-Shift-T to end the analysis and to print the analysis results in the console.


## node
#node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js \
# --analysis src/js/runtime/SMemory.js --analysis src/js/sample_analyses/pldi16/TraceAll.js ~/temp/1.js

