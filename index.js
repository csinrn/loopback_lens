const application = require('./dist');

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 3001),   //loopback server port
      host: '192.168.1.109', //process.env.HOST,    // user ip
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  application.main(config).catch(function (err) {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
