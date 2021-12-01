const { PORT } = require('./common/config');
const festify = require('./app');

(async () => {
  try {
    await festify.listen(PORT);
    console.log(`App is running on http://localhost:${PORT}`);
  } catch (err) {
    festify.log.error(err);
    process.exit(1);
  }
})();
