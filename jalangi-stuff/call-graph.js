
function NodeInfo(metaData) {
    if (metaData !== undefined) this.metaData = metaData;
    this.children = new Set();
    this.addChild = function(n) {
        if (typeof n !== "string")
            throw "parameter n should be an string"
        this.children.add(n);
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

(function testNodeInfo_addChild() {
    var nodeInfo = new NodeInfo();
    nodeInfo.addChild("a");
    nodeInfo.children.add("b");

    console.log(nodeInfo.children.size);
    console.log(nodeInfo.children);
})();

(function testAddEdge() {
    var cg = new CallGraph();
    cg.addEdge("a", "b");

    console.log(cg.node2NodeInfo.entries());
})();