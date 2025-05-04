import { Error as MongooseError, mongo } from 'mongoose';

interface ErrorResponse {
  message: string;
  field?: string;
  code?: number;
  name?: string;
}

export const handleMongooseError = (error: unknown): ErrorResponse => {
  console.error('Mongoose Error:', error);

  // Handle ValidationError (e.g., required field missing)
  if (error instanceof MongooseError.ValidationError) {
    const firstError = Object.values(error.errors)[0];
    return {
      message: firstError.message,
      field: firstError.path,
      code: 400,
      name: error.name
    };
  }

  // Handle Duplicate Key Error (MongoServerError with code 11000)
  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'unknown';
    return {
      message: `Duplicate value for field: ${field}`,
      field,
      code: 409,
      name: error.name
    };
  }

  // Handle CastError (e.g., invalid ObjectId)
  if (error instanceof MongooseError.CastError) {
    return {
      message: `Invalid value for field: ${error.path}`,
      field: error.path,
      code: 400,
      name: error.name
    };
  }

  // Default fallback
  return {
    message: (error as Error)?.message || 'Unknown error',
    code: 500,
    name: (error as Error)?.name
  };
};
