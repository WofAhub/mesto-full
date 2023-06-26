const errorHandler = (err, req, res, next)  => { // eslint-disable-line
  console.log('Дефолтный обработчик ошибок', err); // eslint-disable-line
  const { statusCode = 500, message = 'Ошибка' } = err;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
