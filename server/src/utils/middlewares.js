export function notFound(req, res, next) {
  res.status(404).send('Unknown endpoint');
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
}
