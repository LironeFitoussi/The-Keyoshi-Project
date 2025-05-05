import { RequestHandler } from 'express';

export const validateBody: RequestHandler = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).json({
      success: false,
      message: 'Request body must be a valid JSON object'
    });
    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      success: false,
      message: 'Request body must contain at least one field'
    });
    return;
  }

  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Request body must contain at least one field'
      });
      return;
    }
  }
  next();
};
