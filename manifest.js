module.exports = {
  version: '1.0.0',
  init: (pluginContext) => {
     pluginContext.registerPolicy(require('./policies/advanced-jwt.policy'))
  },
  policies: ['advanced-jwt'],
  schema: {
    $id: 'N/A',
  }
}