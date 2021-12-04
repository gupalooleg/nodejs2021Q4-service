const { PORT } = require('./common/config');
const festify = require('./app');

(async () => {
  try {
    await festify.listen(PORT);
  } catch (err) {
    festify.log.error(err);
    process.exit(1);
  }
})();
