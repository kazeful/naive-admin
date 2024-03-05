/* eslint-disable no-console */
const process = require('node:process')
const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')

const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

if (rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`)

  const port = 2200
  const publicPath = config.publicPath

  const connect = require('connect')
  const serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/'],
    }),
  )

  app.listen(port, () => {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    if (report)
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
  })
}
else {
  run(`vue-cli-service build ${args}`)
}
