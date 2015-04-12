module.exports = function(RED) {
	var artnet = require('artnet-node');

    function ArtnetNodeOutput(config) {
        RED.nodes.createNode(this, config);

        this.address = config.address;
        this.port = config.port;
        this.rate = config.rate;
        this.size = config.size;
        this.interval = 1000.0 / config.rate;

        this.client = artnet.Client.createClient(this.address, this.port);
        this.data = [];
        this.set = function(address, value) {
        	this.data[address] = value;
        };

        var node = this;

        this.on('input', function(msg) {
        	var payload = msg.payload;
        	if(Array.isArray(payload.data)) {
	        	payload.offset = payload.offset || 0;
        		for(var i = payload.offset; i < payload.offset + data.length; i++) {
        			node.data[i] = payload.data[i];
        		}
        	} else if(payload.address) {
        		node.set(payload.address, payload.value);
        	} else if(Array.isArray(payload.buckets)) {
        		for(var i = 0; i < payload.buckets.length; i++) {
        			node.set(payload.buckets[i].address, payload.buckets[i].value);
        		}
        	}
        });

        var timer = setInterval(function() {
        	node.client.send(node.data);
        }, this.interval);
    }
    RED.nodes.registerType("artnet out", ArtnetNodeOutput);
}