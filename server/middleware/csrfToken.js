function attachCsrfToken (req, res, next) {
  console.log(' here is generating csrf token');
  res.locals.csrfTokenFunction = req.csrfToken;
  next();
}


module.exports = attachCsrfToken;
