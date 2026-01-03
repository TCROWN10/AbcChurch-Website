"use client";
import { useState } from 'react';
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  usePublishMessageMutation,
} from '@/store';
import type { MessageType, CreateMessageRequest, UpdateMessageRequest } from '@/types/api';

export default function MessagesManagement() {
  const [filterType, setFilterType] = useState<MessageType | ''>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<any>(null);

  const { data: messages, isLoading, refetch } = useGetMessagesQuery({
    type: filterType || undefined,
  });

  const [createMessage] = useCreateMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [publishMessage] = usePublishMessageMutation();

  const handleCreate = async (data: CreateMessageRequest) => {
    try {
      await createMessage(data).unwrap();
      setShowCreateModal(false);
      refetch();
    } catch (error) {
      console.error('Failed to create message:', error);
    }
  };

  const handleUpdate = async (id: string, data: UpdateMessageRequest) => {
    try {
      await updateMessage({ id, data }).unwrap();
      setEditingMessage(null);
      refetch();
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMessage(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          <p className="text-sm text-gray-600">Manage sermons and devotionals</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
        >
          + Create Message
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
        >
          <option value="">All Types</option>
          <option value="SUNDAY">Sunday</option>
          <option value="WEEKDAY">Weekday</option>
        </select>
      </div>

      {/* Messages Grid */}
      {isLoading ? (
        <div className="text-center py-8">Loading messages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    message.type === 'SUNDAY' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {message.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    message.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{message.title}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{message.content}</p>
                {message.videoUrl && (
                  <a
                    href={message.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#FF602E] hover:underline"
                  >
                    Watch Video →
                  </a>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setEditingMessage(message)}
                    className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                  >
                    Edit
                  </button>
                  {!message.published && (
                    <button
                      onClick={() => handlePublish(message.id)}
                      className="flex-1 px-3 py-2 text-sm bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No messages found</div>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingMessage) && (
        <MessageModal
          message={editingMessage}
          onClose={() => {
            setShowCreateModal(false);
            setEditingMessage(null);
          }}
          onSave={editingMessage 
            ? (data) => handleUpdate(editingMessage.id, data as UpdateMessageRequest)
            : (data) => handleCreate(data as CreateMessageRequest)
          }
        />
      )}
    </div>
  );
}

function MessageModal({
  message,
  onClose,
  onSave,
}: {
  message?: any;
  onClose: () => void;
  onSave: (data: CreateMessageRequest | UpdateMessageRequest) => void | Promise<void>;
}) {
  const [title, setTitle] = useState(message?.title || '');
  const [content, setContent] = useState(message?.content || '');
  const [type, setType] = useState<MessageType>(message?.type || 'SUNDAY');
  const [videoUrl, setVideoUrl] = useState(message?.videoUrl || '');
  const [published, setPublished] = useState(message?.published || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      type,
      videoUrl: videoUrl || undefined,
      ...(message && { published }),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {message ? 'Edit Message' : 'Create Message'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MessageType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="SUNDAY">Sunday</option>
              <option value="WEEKDAY">Weekday</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (Optional)</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          {message && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>
          )}
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
              {message ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

