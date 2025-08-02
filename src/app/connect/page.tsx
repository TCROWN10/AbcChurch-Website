"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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
  fullName: string;
  email: string;
  subject: string;
  prayerRequest: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  prayerRequest?: string;
  general?: string;
}

export default function ConnectPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    prayerRequest: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = 'Full name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    if (!formData.prayerRequest.trim()) {
      newErrors.prayerRequest = 'Prayer request is required';
    } else if (formData.prayerRequest.trim().length < 10) {
      newErrors.prayerRequest = 'Prayer request must be at least 10 characters';
    } else if (formData.prayerRequest.trim().length > 2000) {
      newErrors.prayerRequest = 'Prayer request must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          // Validation errors from server
          setErrors(result.details);
        } else {
          setErrors({ general: result.error || 'Failed to submit prayer request' });
        }
        return;
      }

      // Success
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', subject: '', prayerRequest: '' });
      
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
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
              <label htmlFor="fullName" className="font-medium text-gray-700 text-sm md:text-base">Full Name</label>
              <input 
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-gray-700 text-sm md:text-base">Email</label>
              <input 
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="font-medium text-gray-700 text-sm md:text-base">Subject</label>
              <input 
                id="subject"
                name="subject"
                type="text"
                placeholder="Enter a subject"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none text-black"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && <span className="text-red-500 text-xs">{errors.subject}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="prayerRequest" className="font-medium text-gray-700 text-sm md:text-base">Prayer Request</label>
              <textarea 
                id="prayerRequest"
                name="prayerRequest"
                placeholder="Type your prayer request here"
                className="border border-gray-300 rounded px-3 md:px-4 py-2 min-h-[80px] md:min-h-[100px] text-sm md:text-base focus:outline-none text-black"
                value={formData.prayerRequest}
                onChange={handleInputChange}
              />
              {errors.prayerRequest && <span className="text-red-500 text-xs">{errors.prayerRequest}</span>}
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
    </motion.div>
  );
} 