"use client";
import { useState } from 'react';
import {
  useGetPrayerRequestsQuery,
  useDeletePrayerRequestMutation,
  useMarkPrayerRequestAsReadMutation,
  useMarkPrayerRequestAsUnreadMutation,
  useAddNotesToPrayerRequestMutation,
  useArchivePrayerRequestMutation,
} from '@/store';
import type { PrayerRequestStatus } from '@/types/api';

export default function PrayerRequestsManagement() {
  const [filterStatus, setFilterStatus] = useState<PrayerRequestStatus | ''>('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [notes, setNotes] = useState('');

  const { data: requests, isLoading, refetch } = useGetPrayerRequestsQuery({
    status: filterStatus || undefined,
  });

  const [deleteRequest] = useDeletePrayerRequestMutation();
  const [markAsRead] = useMarkPrayerRequestAsReadMutation();
  const [markAsUnread] = useMarkPrayerRequestAsUnreadMutation();
  const [addNotes] = useAddNotesToPrayerRequestMutation();
  const [archiveRequest] = useArchivePrayerRequestMutation();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await markAsUnread(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to mark as unread:', error);
    }
  };

  const handleAddNotes = async () => {
    if (!selectedRequest || !notes.trim()) return;
    try {
      await addNotes({ id: selectedRequest.id, data: { notes } }).unwrap();
      setShowNotesModal(false);
      setNotes('');
      setSelectedRequest(null);
      refetch();
    } catch (error) {
      console.error('Failed to add notes:', error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveRequest(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to archive:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this prayer request?')) {
      try {
        await deleteRequest(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="READ">Read</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prayer Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Prayer Requests ({requests?.length || 0})</h3>
        </div>
        {isLoading ? (
          <div className="p-6 text-center">Loading prayer requests...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Public</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests && requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.requesterName}</p>
                          <p className="text-sm text-gray-500">{request.requesterEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailsModal(true);
                          }}
                          className="text-left hover:underline"
                        >
                          <p className="text-sm font-medium text-gray-900">{request.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{request.content}</p>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          request.status === 'READ' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.isPublic ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col gap-2">
                          {request.status === 'PENDING' && (
                            <button
                              onClick={() => handleMarkAsRead(request.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Mark Read
                            </button>
                          )}
                          {request.status === 'READ' && (
                            <button
                              onClick={() => handleMarkAsUnread(request.id)}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              Mark Unread
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setNotes(request.notes || '');
                              setShowNotesModal(true);
                            }}
                            className="text-[#FF602E] hover:text-[#FF602E]/80"
                          >
                            Add Notes
                          </button>
                          {request.status !== 'ARCHIVED' && (
                            <button
                              onClick={() => handleArchive(request.id)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              Archive
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No prayer requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Prayer Request Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedRequest(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requester</label>
                <p className="text-sm text-gray-900">{selectedRequest.requesterName}</p>
                <p className="text-sm text-gray-500">{selectedRequest.requesterEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <p className="text-sm text-gray-900">{selectedRequest.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedRequest.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedRequest.status === 'READ' ? 'bg-blue-100 text-blue-800' :
                    selectedRequest.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Public</label>
                  <p className="text-sm text-gray-900">{selectedRequest.isPublic ? 'Yes' : 'No'}</p>
                </div>
              </div>
              {selectedRequest.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedRequest.notes}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Submitted</label>
                <p className="text-sm text-gray-900">
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setShowNotesModal(true);
                }}
                className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
              >
                {selectedRequest.notes ? 'Edit Notes' : 'Add Notes'}
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E] mb-4"
              rows={4}
              placeholder="Add notes about this prayer request..."
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setNotes('');
                  if (!showDetailsModal) {
                    setSelectedRequest(null);
                  }
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleAddNotes();
                  if (showDetailsModal) {
                    setShowDetailsModal(false);
                  }
                }}
                className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

