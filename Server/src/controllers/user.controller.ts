import { Request, Response } from 'express';
import User from '../models/user.model';
import type { IUser } from '../models/user.model';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('📝 Creating user with data:', req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log('✅ User created successfully:', savedUser._id);
    res.status(201).json(savedUser);
  } catch (error: any) {
    console.error('❌ Error creating user:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors,
        details: error.message 
      });
      return;
    }
    
    if (error.code === 11000) {
      res.status(409).json({ 
        message: 'User already exists', 
        error: 'Duplicate key error',
        details: error.message 
      });
      return;
    }
    
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message,
      details: error 
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Get user by regex
export const getUserRegex = async (req: Request, res: Response) => {
    // in case regex starts with 0, replace it with "+972"
    const regex = req.params.regex.startsWith('0') ? `${req.params.regex.replace('0', '972')}` : req.params.regex;
    try {
        console.log(regex);
    
        const searchRegex = new RegExp(regex, 'i');
        const users = await User.find({
        $or: [
            { firstName: searchRegex },
            { lastName: searchRegex },
            { email: searchRegex },
            { phone: searchRegex }
        ]
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Request editor role
export const requestEditorRole = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { reason } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'editor' || user.role === 'admin') {
      return res.status(400).json({ message: 'You already have editor or admin privileges.' });
    }
    if (user.roleRequest && user.roleRequest.status === 'pending') {
      return res.status(400).json({ message: 'You already have a pending request.' });
    }
    user.roleRequest = {
      status: 'pending',
      reason,
      requestedAt: new Date(),
      rejectionReason: ''
    } as NonNullable<IUser['roleRequest']>;
    await user.save();
    res.status(200).json({ message: 'Editor role request submitted.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting request', error });
  }
};

// Get all pending role requests (admin)
export const getRoleRequests = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      roleRequest: { 
        $exists: true, 
        $ne: null 
      },
      'roleRequest.status': 'pending'
    }).select('_id firstName email roleRequest');
    
    if (!users.length) {
      console.log('No pending role requests found');
    } else {
      console.log(`Found ${users.length} pending role requests`);
    }
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching role requests:', error);
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

// Approve editor role request (admin)
export const approveEditorRole = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const adminId = req.body.adminId; // Should be set by auth middleware in real app
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.roleRequest || user.roleRequest.status !== 'pending') {
      return res.status(400).json({ message: 'No pending request to approve.' });
    }
    user.role = 'editor';
    user.roleRequest.status = 'approved';
    user.roleRequest.reviewedAt = new Date();
    user.roleRequest.reviewedBy = adminId || null;
    await user.save();
    res.status(200).json({ message: 'Editor role approved.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error approving request', error });
  }
};

// Reject editor role request (admin)
export const rejectEditorRole = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { reason, adminId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.roleRequest || user.roleRequest.status !== 'pending') {
      return res.status(400).json({ message: 'No pending request to reject.' });
    }
    user.roleRequest.status = 'rejected';
    user.roleRequest.reviewedAt = new Date();
    user.roleRequest.reviewedBy = adminId || null;
    user.roleRequest.rejectionReason = reason || '';
    await user.save();
    res.status(200).json({ message: 'Editor role request rejected.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting request', error });
  }
}; 