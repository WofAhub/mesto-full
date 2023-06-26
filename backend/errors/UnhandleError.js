class UnhandleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnhandleError';
    this.statusCode = 500;
  }
}

module.exports = UnhandleError;
