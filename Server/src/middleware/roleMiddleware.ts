import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

// Role hierarchy: admin > editor > user
const roleHierarchy = {
  admin: 3,
  editor: 2,
  user: 1
};

export const requireRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      // Get user's role from database to ensure it's up to date
      const dbUser = await User.findById(user.id);
      if (!dbUser) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      const userRole = dbUser.role;
      const userRoleLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

      if (userRoleLevel < requiredRoleLevel) {
        res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${requiredRole}, current role: ${userRole}`
        });
        return;
      }

      // Add role info to request for use in controllers
      (req as any).userRole = userRole;
      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({
        success: false,
        message: 'Error checking user role'
      });
    }
  };
};

// Check if user has any of the specified roles
export const requireAnyRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const dbUser = await User.findById(user.id);
      if (!dbUser) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      if (!roles.includes(dbUser.role)) {
        res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${roles.join(', ')}, current role: ${dbUser.role}`
        });
        return;
      }

      (req as any).userRole = dbUser.role;
      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({
        success: false,
        message: 'Error checking user role'
      });
    }
  };
}; 