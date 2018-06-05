
function NodeInfo() {
    this.children = new Set();
    this.addChild = function(n) {
        if (typeof n !== "string")
            throw "parameter n should be an string"
        this.children.add(n);
    }
}

(function testNodeInfo_addChild() {
    var nodeInfo = new NodeInfo();
    nodeInfo.addChild("a");
    nodeInfo.children.add("b");

    console.log(nodeInfo.children.size);
    console.log(nodeInfo.children);
})()