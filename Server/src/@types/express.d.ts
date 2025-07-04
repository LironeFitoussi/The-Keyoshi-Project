import { Request } from 'express';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        firstName: string;
        lastName: string;
        picture?: string;
        sub: string;
        auth0Id: string;
        [key: string]: any;
      };
    }
  }
}

export {}; 