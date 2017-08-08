module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'API',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '47.88.63.229',
      port : '22',
      ref  : 'origin/master',
      repo : 'git@github.com:Code4AppiOS/ele-vue.git',
      path : '/www/ice/production',
      "post-deploy": "pm2 startOrRestart ecosystem.config.js && pm2 save"
    }
  }
};
