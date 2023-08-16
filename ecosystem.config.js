module.exports = {
  apps: [{
    name: 'my-app',
    script: './src/server.js',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'render',
      host: 'my-app.onrender.com',
      ref: 'origin/main',
      repo: 'git@github.com:GomidesTs/food-explorer-back-end.git',
      path: '/home/render/my-app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};