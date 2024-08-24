// LogoutButton.js
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const LogoutButton = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout');
      
      // Show the toast notification
      toast({
        description: 'Logged out successfully',
        variant: 'default', // or any other variant you've defined
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;