"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import JoinUsSection from '@/components/ui/Message';
import Footer from '@/components/layout/Footer';

const devotionalData = [
  {
    date: '2026-02-15',
    title: 'Sing For Joy',
    headline: 'Sing For Joy',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-14',
    title: 'Marital Maturity & Marital Stability',
    headline: 'Marital Maturity & Marital Stability',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-13',
    title: 'Dealing With Secret Sins',
    headline: 'Dealing With Secret Sins',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-12',
    title: 'The Full Armour Of God II',
    headline: 'The Full Armour Of God II',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-11',
    title: 'The Full Armour Of God I',
    headline: 'The Full Armour Of God I',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-10',
    title: 'Actions Speaks Louder',
    headline: 'Actions Speaks Louder',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-09',
    title: "Great Is God's Faithfulness",
    headline: "Great Is God's Faithfulness",
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-08',
    title: 'Understanding The Bible',
    headline: 'Understanding The Bible',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-07',
    title: 'Proof Of Love',
    headline: 'Proof Of Love',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-06',
    title: 'Through It All',
    headline: 'Through It All',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-05',
    title: 'Forgive, Forget & Forgo',
    headline: 'Forgive, Forget & Forgo',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-04',
    title: "It's Time To Start Praying II",
    headline: "It's Time To Start Praying II",
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-03',
    title: "It's Time To Start Praying I",
    headline: "It's Time To Start Praying I",
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-02-02',
    title: 'Fresh Oil',
    headline: 'Fresh Oil',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-25',
    title: 'Reasons To Praise The Lord',
    headline: 'Reasons To Praise The Lord',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-24',
    title: 'The \'Thou Shall\' In Marriage',
    headline: 'The \'Thou Shall\' In Marriage',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-23',
    title: 'Greater Tomorrow',
    headline: 'Greater Tomorrow',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-22',
    title: 'Surely There Is A Future',
    headline: 'Surely There Is A Future',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-21',
    title: 'Pursuing Specific Purpose',
    headline: 'Pursuing Specific Purpose',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-20',
    title: 'Beware Of This Enemies',
    headline: 'Beware Of This Enemies',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2026-01-19',
    title: 'Arise!, Help Me, O Lord!',
    headline: 'Arise!, Help Me, O Lord!',
    image: '/images/content/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
];

const ITEMS_PER_PAGE = 9; // 3 columns × 3 rows

export default function DevotionalPage() {
  // Set specific date: Monday, January 19th 2026
  const today = "Monday, January 19th 2026";
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(devotionalData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDevotionals = useMemo(() => {
    return devotionalData.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of cards section
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum visible page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/Devotional-iHero.png"
          alt="Daily Devotional Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">CONNECTLife Daily Devotional</h1>
        </div>
      </div>
      
      {/* Step-Grid Card Section */}
      <div className="max-w-4xl w-full mx-auto px-2 sm:px-4 md:px-12 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {currentDevotionals.map((devotional) => (
            <div
              key={devotional.date}
              className="bg-[#18313B] rounded-lg shadow-md p-0 flex flex-col items-stretch cursor-pointer hover:bg-[#25506A] transition-colors border border-[#FF602E] overflow-hidden"
              onClick={() => router.push(`/devotional/${devotional.date}`)}
            >
              <div className="relative w-full h-24 sm:h-32 md:h-40">
                <Image
                  src={devotional.image}
                  alt={devotional.headline}
                  fill
                  className="object-cover w-full h-full"
                  priority={false}
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="text-xs text-[#FFDECC] mb-1 sm:mb-2 font-medium">{devotional.date}</div>
                <div className="text-base sm:text-lg font-bold text-[#FF602E] mb-1 sm:mb-2">{devotional.headline}</div>
                {/* Optionally add a summary/excerpt here */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 mb-6 flex flex-col items-center gap-4">
            {/* Page Info */}
            <div className="text-sm text-[#FFDECC]">
              Showing {startIndex + 1}-{Math.min(endIndex, devotionalData.length)} of {devotionalData.length} devotionals
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-[#18313B] text-gray-500 cursor-not-allowed border border-gray-600'
                    : 'bg-[#FF602E] text-white hover:bg-[#E5552A] border border-[#FF602E]'
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 text-[#FFDECC]">
                        ...
                      </span>
                    );
                  }
                  
                  const pageNum = page as number;
                  const isActive = pageNum === currentPage;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-[#FF602E] text-white border border-[#FF602E]'
                          : 'bg-[#18313B] text-[#FFDECC] hover:bg-[#25506A] border border-[#FF602E]'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-[#18313B] text-gray-500 cursor-not-allowed border border-gray-600'
                    : 'bg-[#FF602E] text-white hover:bg-[#E5552A] border border-[#FF602E]'
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      <JoinUsSection />
      {/* Only one Footer should be rendered below */}
      {/* <Footer /> */}
    </div>
  );
} 