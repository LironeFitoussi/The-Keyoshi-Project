import { Router, RequestHandler } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserRegex,
  requestEditorRole,
  getRoleRequests,
  approveEditorRole,
  rejectEditorRole,
  revokeEditorRole
} from '../controllers/user.controller';
import { jwtCheck, getUserProfile } from '../middleware/auth0Middleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

/**
 * Get all users
 * @route GET /api/v1/users
 * @description Get all users with optional pagination and role filtering
 */
router.get('/', jwtCheck, getUserProfile, requireRole('admin'), getAllUsers);

/**
 * Get user by email
 * @route GET /api/v1/users/email/:email
 * @description Get user by email
 */
router.get('/email/:email', getUserByEmail as RequestHandler);

/**
 * Get user by regex
 * @route GET /api/v1/users/regex/:regex
 * @description Get user by regex
 */
router.get('/regex/:regex', jwtCheck, getUserProfile, getUserRegex as RequestHandler);

/**
 * Get all pending editor role requests (admin only)
 * @route GET /api/v1/users/role-requests
 */
router.get('/role-requests', jwtCheck, getUserProfile, requireRole('admin'), getRoleRequests as RequestHandler);

/**
 * Create new user
 * @route POST /api/v1/users
 * @description Create new user
 */
router.post('/', createUser as RequestHandler);

/**
 * Get user by ID
 * @route GET /api/v1/users/:id
 * @description Get user by ID
 */
router.get('/:id', jwtCheck, getUserProfile, getUserById as RequestHandler);

/**
 * Update user
 * @route PUT /api/v1/users/:id
 * @description Update user
 */
router.put('/:id', jwtCheck, getUserProfile, updateUser as RequestHandler);

/**
 * Delete user
 * @route DELETE /api/v1/users/:id
 * @description Delete user
 */
router.delete('/:id', jwtCheck, getUserProfile, requireRole('admin'), deleteUser as RequestHandler);

/**
 * Request editor role
 * @route POST /api/v1/users/:id/request-editor
 */
router.post('/:id/request-editor', jwtCheck, getUserProfile, requestEditorRole as RequestHandler);

/**
 * Approve editor role request (admin only)
 * @route POST /api/v1/users/:id/approve-editor
 */
router.post('/:id/approve-editor', jwtCheck, getUserProfile, requireRole('admin'), approveEditorRole as RequestHandler);

/**
 * Reject editor role request (admin only)
 * @route POST /api/v1/users/:id/reject-editor
 */
router.post('/:id/reject-editor', jwtCheck, getUserProfile, requireRole('admin'), rejectEditorRole as RequestHandler);

/**
 * Revoke editor role (admin only)
 * @route POST /api/v1/users/:id/revoke-editor
 */
router.post('/:id/revoke-editor', jwtCheck, getUserProfile, requireRole('admin'), revokeEditorRole as RequestHandler);

export default router; 