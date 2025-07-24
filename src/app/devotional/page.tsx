"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import JoinUsSection from '../components/Message';
import Footer from '../components/Footer';

const devotionalData = [
  {
    date: '2025-07-21',
    title: 'Promotion Cometh',
    headline: 'Promotion Cometh',
    image: '/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2025-07-24',
    title: 'Loving The Unlovables',
    headline: 'Loving The Unlovables',
    image: '/Devotional-iHero.png',
    // You can add a summary or excerpt here if desired
  },
  // Add more devotional days here as needed
];

export default function DevotionalPage() {
  // Set specific date: Monday, July 21st 2025
  const today = "Monday, July 21st 2025";
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/Devotional-iHero.png"
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
      <div className="max-w-4xl w-full mx-auto px-2 sm:px-4 md:px-12 py-4 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {devotionalData.map((devotional) => (
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
      <JoinUsSection />
      {/* Only one Footer should be rendered below */}
      {/* <Footer /> */}
    </div>
  );
} 