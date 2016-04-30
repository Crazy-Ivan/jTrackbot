var ws = require('ws');

module.exports = function setup(options, imports, register) {

	function broadcast(data, options) {
		for(var i in this.clients) {
			if(this.clients[i].readyState = 1) {
				this.clients[i].send(data, options);
			}
		}
	}

	function createServer(options) {
		var server = new ws.Server(options);
		server.broadcast = broadcast;

		return server;
	}

	function connect(url) {
		return new ws(url);
	}

	register(null, {
		websocket: {
			createServer: createServer,
			connect: connect
		}
	});
};