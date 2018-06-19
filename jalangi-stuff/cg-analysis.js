/*
 * Copyright 2014 Samsung Information Systems America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

/**
 * A dynamic call-graph generator for JavaScript
 * (parts of the code are copied from TraceAll.js in Jalangi2 distribution)
 * @author Hamid A. Toussi 
 * @author  Koushik Sen
 * 
 */

function NodeInfo(metaData) {
    if (metaData !== undefined) this.metaData = metaData;
    this.children = new Set();
    this.addChild = function(n) {
        if (typeof n !== "string")
            throw "parameter n should be a string"
        this.children.add(n);
        console.log("# children " + this.children.size);
    }
}

function CallGraph() {
    this.node2NodeInfo = new Map();
    this.setMetaData = function(nodeName, metaData) {
        var nodeInfo = this.node2NodeInfo.get(nodeName);
        if (nodeInfo === undefined) {
            nodeInfo = new NodeInfo();
            this.node2NodeInfo.set(nodeName, nodeInfo);
        }
        nodeInfo.metaData = metaData;
    }

    this.addEdge = function(srcName, destName) {
        var srcInfo = this.node2NodeInfo.get(srcName);
        if (srcInfo === undefined) {
            srcInfo = new NodeInfo();
            this.node2NodeInfo.set(srcName, srcInfo);
        }
        srcInfo.addChild(destName);
    }
}

function getTop(stack) {
    if (stack === undefined || stack.length === undefined || stack.length === 0) throw "Error";
    return stack[stack.length - 1]
}

(function (sandbox) {

    if (sandbox.Constants.isBrowser) {
        sandbox.Results = {};
    }

    function MyAnalysis() {
        var MAX_STRING_LENGTH = 20;

        var indentationCount = 0;
        var cacheCount = 0;
        var cacheIndentStr = "";

        var logs = [];

        var functionStack = ["<init>"];
        var callGraph = new CallGraph();

        function log(str) {
            if (cacheCount !== indentationCount) {
                cacheIndentStr = "";
                for (var i=0; i<indentationCount; i++) {
                    cacheIndentStr += "    ";
                }
                cacheCount = indentationCount;
            }
            if (sandbox.Results) {
                logs.push("<li>" + cacheIndentStr.replace(/ /g, '\u00a0') +str+ " </li>");
            } else {
                console.log(cacheIndentStr + str)
            }
        }


        this.invokeFun = function (iid, f, base, args, result, isConstructor, isMethod, functionIid, functionSid) {
            indentationCount--;
            return {result: result};
        };

        this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
            indentationCount++;
            // ret += ") of function created at "+J$.iidToLocation(functionSid, functionIid);
            callGraph.addEdge(getTop(functionStack), J$.iidToLocation(functionSid, functionIid));
            console.log(getTop(functionStack) + " calls " + J$.iidToLocation(functionSid, functionIid));
                       
            return {f: f, base: base, args: args, skip: false};
        };
        

        this.functionEnter = function (iid, f, dis, args) {
            functionStack.push(J$.iidToLocation(J$.sid, iid));
            console.log("current function is " + J$.iidToLocation(J$.sid, iid));
        };

        this.functionExit = function (iid, returnVal, wrappedExceptionVal) {
            functionStack.pop()
            return {returnVal: returnVal, wrappedExceptionVal: wrappedExceptionVal, isBacktrack: false};
        };
        

        this.endExecution = function () {
            var ret = "endExpression!!()";
            log(ret);
            callGraph.node2NodeInfo.forEach(function (value, key) {
                var entry = [key, [...value.children]];
                console.log(JSON.stringify(entry));
            });
            if (sandbox.Results) {
                for (var i = 0; i < logs.length; i++) {
                    sandbox.log(logs[i]);
                }
            }
        };

    }

    sandbox.analysis = new MyAnalysis();
})(J$);

/*
 node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis src/js/sample_analyses/pldi16/TraceAll.js tests/pldi16/TraceAllTest.js
 node src/js/commands/esnstrument_cli.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis src/js/sample_analyses/pldi16/TraceAll.js --out /tmp/pldi16/TraceAllTest.html  tests/pldi16/TraceAllTest.html
 node src/js/commands/esnstrument_cli.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis src/js/sample_analyses/pldi16/TraceAll.js --out /tmp/pldi16/TraceAllTest.js  tests/pldi16/TraceAllTest.js
 open file:///tmp/pldi16/TraceAllTest.html
 */


