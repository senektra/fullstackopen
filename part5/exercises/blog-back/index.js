import app from './app.js'
import logger from './utils/logger.js'
import config from './utils/config.js'

app.listen(config.port, () => {
  logger.info('Server listening on port', config.port)
})
