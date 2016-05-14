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
		packagePath: './services/camera'
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

    {
        packagePath: './modules/movement'
	},
	{
		packagePath: './modules/video'
	},
    {
        packagePath: './modules/control'
    },
	{
        packagePath: './modules/routes/main',
        path: './client/index.html'
	}
];


