"use client";
import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
  useRegisterAdminMutation,
} from '@/store';
import type { UserProfile, UpdateUserRequest, RegisterRequest } from '@/types/api';

export default function UsersManagement() {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterAdminModal, setShowRegisterAdminModal] = useState(false);
  const [filterRole, setFilterRole] = useState<'USER' | 'ADMIN' | 'SUPER_ADMIN' | ''>('');
  const [filterVerified, setFilterVerified] = useState<boolean | undefined>(undefined);

  const { data: users, isLoading, refetch } = useGetAllUsersQuery({
    role: filterRole || undefined,
    isEmailVerified: filterVerified,
  });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const [registerAdmin, { isLoading: isRegistering }] = useRegisterAdminMutation();

  const handleUpdateUser = async (id: string, data: UpdateUserRequest) => {
    try {
      await updateUser({ id, data }).unwrap();
      setShowEditModal(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleRegisterAdmin = async (data: RegisterRequest) => {
    try {
      const result = await registerAdmin(data).unwrap();
      console.log('Admin registration result:', result);
      
      setShowRegisterAdminModal(false);
      refetch();
      
      // Show success message with details
      if (result.success) {
        const userData = result.data?.user || result.data;
        const isEmailVerified = userData?.isEmailVerified;
        const hasAccessToken = result.data?.accessToken;
        
        let message = 'Admin registered successfully!\n\n';
        if (!isEmailVerified) {
          message += '⚠️ IMPORTANT: The admin needs to verify their email before they can log in.\n';
          message += 'An OTP code has been sent to: ' + data.email + '\n\n';
          message += 'They should:\n';
          message += '1. Check their email for the OTP code\n';
          message += '2. Go to /verify-otp page\n';
          message += '3. Enter the OTP code to verify\n';
          message += '4. Then they can log in';
        } else if (hasAccessToken) {
          message += '✅ The admin can log in immediately with:\n';
          message += 'Email: ' + data.email + '\n';
          message += 'Password: [the password you entered]';
        } else {
          message += 'The admin can now log in with their credentials.';
        }
        alert(message);
      } else {
        alert(result.message || 'Admin registration completed, but there may be an issue.');
      }
    } catch (error: any) {
      console.error('Failed to register admin:', error);
      const errorMessage = error?.data?.message || error?.data?.data?.message || error?.message || 'Failed to register admin. Please try again.';
      alert(`Error: ${errorMessage}\n\nMake sure you are logged in as a Super Admin.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Register Admin Button */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <p className="text-sm text-gray-600">Manage users and their roles</p>
        </div>
        <button
          onClick={() => setShowRegisterAdminModal(true)}
          className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition font-semibold"
        >
          + Register Admin
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All Roles</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Verified</label>
            <select
              value={filterVerified === undefined ? '' : String(filterVerified)}
              onChange={(e) => setFilterVerified(e.target.value === '' ? undefined : e.target.value === 'true')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterRole('');
                setFilterVerified(undefined);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Users ({users?.length || 0})</h3>
        </div>
        {isLoading ? (
          <div className="p-6 text-center">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name} {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="text-[#FF602E] hover:text-[#FF602E]/80 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={handleUpdateUser}
        />
      )}

      {/* Register Admin Modal */}
      {showRegisterAdminModal && (
        <RegisterAdminModal
          onClose={() => setShowRegisterAdminModal(false)}
          onSave={handleRegisterAdmin}
          isLoading={isRegistering}
        />
      )}
    </div>
  );
}

function EditUserModal({
  user,
  onClose,
  onSave,
}: {
  user: UserProfile;
  onClose: () => void;
  onSave: (id: string, data: UpdateUserRequest) => void;
}) {
  const [role, setRole] = useState(user.role || 'USER');
  const [isEmailVerified, setIsEmailVerified] = useState(user.isEmailVerified || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user.id, { role: role as any, isEmailVerified });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN' | 'SUPER_ADMIN')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isEmailVerified}
                onChange={(e) => setIsEmailVerified(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Email Verified</span>
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterAdminModal({
  onClose,
  onSave,
  isLoading,
}: {
  onClose: () => void;
  onSave: (data: RegisterRequest) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    lastName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Register New Admin</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
              placeholder="Enter password"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

