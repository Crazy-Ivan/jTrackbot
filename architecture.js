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
		packagePath: './services/webserver',
		port: 3000,
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

	
//	{
//        packagePath: './modules/routes/page',
//        path: './client/index.html'
//	}
];


