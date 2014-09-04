module.exports = [
	
	/*
	 * Services
	 * ****************************************************************************
	 */

	{
		packagePath: './services/logger',
		transports: [
			{
				type: 'console',   
				colorize: true
			},

			{
				type: 'file',   
				filename: './logs/log.txt'
			}
		]
	},
    {
        packagePath: './services/motor'
    },
    {
        packagePath: './services/websocket'
    },

	{
		packagePath: './services/webserver',
		port: 5000,
		favicon: './client/favicon.ico',
		statics: [
			'./client/vendor',
			'./client/assets',
			'./client/'
		]
	},

	/*
	 * Application modules
	 * ****************************************************************************
	 */

//    {
//        packagePath: './modules/movement'
//	},
    {
        packagePath: './modules/camera'
    }
//	{
//        packagePath: './modules/routes/page',
//        path: './client/index.html'
//	}
];


