"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import {
  useCreatePrayerRequestMutation,
  useGetPrayerRequestsQuery,
  useDeletePrayerRequestMutation,
} from '@/store/prayerRequestsApi';
import type { PrayerRequest } from '@/types/api';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

const buttonVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

const formVariants = {
  hidden: { 
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
};

interface FormData {
  requesterName: string;
  requesterEmail: string;
  title: string;
  content: string;
  isPublic: boolean;
}

interface FormErrors {
  requesterName?: string;
  requesterEmail?: string;
  title?: string;
  content?: string;
  general?: string;
}

export default function ConnectPage() {
  const [formData, setFormData] = useState<FormData>({
    requesterName: '',
    requesterEmail: '',
    title: '',
    content: '',
    isPublic: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // RTK Query hooks
  const { data: prayerRequests = [], isLoading, error: fetchError, refetch } = useGetPrayerRequestsQuery({
    public: 'true', // Only show public prayer requests
    limit: 20,
  });
  
  const [createPrayerRequest, { isLoading: isSubmitting }] = useCreatePrayerRequestMutation();
  const [deletePrayerRequest] = useDeletePrayerRequestMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Full name is required';
    } else if (formData.requesterName.trim().length > 100) {
      newErrors.requesterName = 'Full name must be less than 100 characters';
    }

    if (!formData.requesterEmail.trim()) {
      newErrors.requesterEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requesterEmail)) {
      newErrors.requesterEmail = 'Please enter a valid email address';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Prayer request content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Prayer request must be at least 10 characters';
    } else if (formData.content.trim().length > 2000) {
      newErrors.content = 'Prayer request must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      await createPrayerRequest(formData).unwrap();

      // Success
      setIsSubmitted(true);
      setFormData({ 
        requesterName: '', 
        requesterEmail: '', 
        title: '', 
        content: '',
        isPublic: false,
      });

      // Refetch prayer requests to show the newly submitted request (if public)
      if (formData.isPublic) {
        refetch();
      }
    } catch (error: any) {
      // Log full error details for debugging
      console.error('Error submitting prayer request:', {
        error,
        errorString: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        errorKeys: error ? Object.keys(error) : [],
        errorType: typeof error,
        errorStatus: error?.status,
        errorData: error?.data,
        errorMessage: error?.message,
        errorOriginalStatus: error?.originalStatus,
      });

      // RTK Query error structure can have different formats
      // Handle different error structures
      let errorMessage = 'Failed to submit prayer request. Please try again.';
      let hasValidationErrors = false;

      // Check for validation errors in data.details
      if (error?.data?.details) {
        // Validation errors from server
        setErrors(error.data.details);
        hasValidationErrors = true;
      } else if (error?.data) {
        // Server returned an error response
        const serverError = error.data;
        if (typeof serverError === 'string') {
          errorMessage = serverError;
        } else if (serverError?.message) {
          errorMessage = serverError.message;
        } else if (serverError?.error) {
          errorMessage = serverError.error;
        }
      }

      // Handle HTTP error status codes
      const statusCode = error?.status || error?.originalStatus;
      if (statusCode) {
        if (statusCode === 401 || statusCode === 'FETCH_ERROR') {
          errorMessage = 'You must be logged in to submit a prayer request. Please sign in first.';
        } else if (statusCode === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (statusCode === 400) {
          errorMessage = error?.data?.message || 'Invalid request. Please check your input.';
        } else if (statusCode === 500 || statusCode === 502 || statusCode === 503) {
          errorMessage = 'Server error. Please try again later.';
        } else if (!hasValidationErrors) {
          errorMessage = `Error ${statusCode}: ${error?.data?.message || errorMessage}`;
        }
      }

      // Handle network errors
      if (error?.status === 'FETCH_ERROR' || error?.name === 'TypeError') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      // Set error message if no validation errors were set
      if (!hasValidationErrors) {
        setErrors({ 
          general: error?.message || errorMessage
        });
      }
    }
  };

  const handleDelete = async (requestId: string) => {
    if (!confirm('Are you sure you want to delete this prayer request?')) {
      return;
    }

    try {
      await deletePrayerRequest(requestId).unwrap();
      // RTK Query will automatically refetch and update the list
      refetch();
    } catch (error: any) {
      console.error('Error deleting prayer request:', error);
      alert('Failed to delete prayer request. Please try again.');
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20"
        variants={heroVariants}
      >
        <Image
          src="/images/content/Connect-page.png"
          alt="Get Connected Hero Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
        <motion.div 
          className="relative z-10 text-center text-white px-4 md:px-6 flex flex-col items-center w-full"
          variants={contentVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get Connected
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl font-medium drop-shadow mb-4 md:mb-6 max-w-2xl px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Be part of something greater. Join a group, serve, or share your story. Your testimony could inspire someone and show them what God can do in a life filled with faith.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button 
              onClick={() => window.location.href = '/signin'}
              className="bg-[#FF602E] text-white px-6 py-3 rounded font-semibold text-base shadow hover:opacity-90 transition w-full sm:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Join a Group
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = '/signin'}
              className="bg-white text-[#313131] px-6 py-3 rounded font-semibold text-base shadow hover:opacity-90 transition border border-white w-full sm:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Volunteer
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Prayer Request Section */}
      <motion.section 
        className="py-8 md:py-16 px-4 md:px-6 max-w-6xl mx-auto"
        variants={contentVariants}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-[#F98B68]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Prayer request
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Image
              src="/images/content/Prayer-image.png"
              alt="Prayer Request"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full max-w-sm md:max-w-md"
            />
          </motion.div>
          <motion.form 
            className="w-full lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-3 md:gap-4"
            variants={formVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="requesterName" className="font-medium text-gray-700 text-sm md:text-base">Full Name</label>
              <input 
                id="requesterName"
                name="requesterName"
                type="text"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.requesterName}
                onChange={handleInputChange}
              />
              {errors.requesterName && <span className="text-red-500 text-xs">{errors.requesterName}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="requesterEmail" className="font-medium text-gray-700 text-sm md:text-base">Email</label>
              <input 
                id="requesterEmail"
                name="requesterEmail"
                type="email"
                placeholder="Enter your email address"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.requesterEmail}
                onChange={handleInputChange}
              />
              {errors.requesterEmail && <span className="text-red-500 text-xs">{errors.requesterEmail}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="font-medium text-gray-700 text-sm md:text-base">Title</label>
              <input 
                id="title"
                name="title"
                type="text"
                placeholder="Enter a title for your prayer request"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="content" className="font-medium text-gray-700 text-sm md:text-base">Prayer Request</label>
              <textarea 
                id="content"
                name="content"
                placeholder="Type your prayer request here"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 min-h-[80px] md:min-h-[100px] text-sm md:text-base focus:outline-none text-black"
                value={formData.content}
                onChange={handleInputChange}
              />
              {errors.content && <span className="text-red-500 text-xs">{errors.content}</span>}
            </div>
            <div className="flex items-center gap-2">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                className="w-4 h-4 text-[#FF602E] border-gray-300 rounded focus:ring-[#FF602E]"
                checked={formData.isPublic}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                Make this prayer request public (visible to others)
              </label>
            </div>
            {errors.general && <p className="text-red-500 text-center text-xs">{errors.general}</p>}
            {isSubmitted && <p className="text-green-500 text-center text-sm">Thank you! Your prayer request has been submitted.</p>}
            <motion.button 
              type="submit"
              className="bg-[#FF602E] text-white px-6 py-3 rounded font-semibold text-base shadow hover:opacity-90 transition self-end mt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Display Prayer Requests Section */}
      <motion.section
        className="py-8 md:py-16 px-4 md:px-6 max-w-6xl mx-auto"
        variants={contentVariants}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-[#F98B68]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Recent Prayer Requests
        </motion.h2>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading prayer requests...</p>
          </div>
        )}

        {fetchError && (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">
              {'status' in fetchError 
                ? `Failed to load prayer requests. ${fetchError.status === 401 ? 'Please sign in to view prayer requests.' : `Error: ${fetchError.status}`}`
                : 'Failed to load prayer requests. Please try again later.'}
            </p>
          </div>
        )}

        {!isLoading && !fetchError && prayerRequests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No prayer requests yet.</p>
          </div>
        )}

        {!isLoading && !fetchError && prayerRequests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerRequests.map((request, index) => (
              <motion.div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  type="button"
                  onClick={() => handleDelete(request.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Delete prayer request"
                  title="Delete prayer request"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <h3 className="text-xl font-semibold text-[#FF602E] mb-2 pr-8">{request.title}</h3>
                <p className="text-gray-700 mb-3 line-clamp-4">{request.content}</p>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">From:</span> {request.requesterName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {request.status && (
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                      request.status === 'READ' ? 'bg-green-100 text-green-800' :
                      request.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
} 