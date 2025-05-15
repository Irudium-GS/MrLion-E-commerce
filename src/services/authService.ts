import { User } from '../types';

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
];

// This is a mock implementation - would be replaced with actual API calls in production
export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Don't include password in returned user object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const register = async (name: string, email: string, password: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user with email already exists
  const existingUser = MOCK_USERS.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // In a real app, this would create a user in the database
  const newUser = {
    id: (MOCK_USERS.length + 1).toString(),
    name,
    email,
    password,
  };
  
  MOCK_USERS.push(newUser);
};