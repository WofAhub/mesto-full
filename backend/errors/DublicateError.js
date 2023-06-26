class DublicateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DublicateError';
    this.statusCode = 409;
  }
}

module.exports = DublicateError;
