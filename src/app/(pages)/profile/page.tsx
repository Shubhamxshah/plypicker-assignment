'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card"

const ProfilePage: React.FC = () => {
  // Placeholder data currently
  const stats = {
    updates: 5,
    approvedRequests: 2,
    rejectedRequests: 3
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="container mx-auto py-36 relative z-10">
        <h1 className="text-4xl sm:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          My profile
        </h1>

        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.updates}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Updates Made</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.approvedRequests}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Approved Requests</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.rejectedRequests}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Rejected Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;