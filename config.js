exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost/minimalistapp';
exports.PORT = process.env.PORT || 5000;

exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-minimalistapp';
exports.PORT = process.env.PORT || 5000;
