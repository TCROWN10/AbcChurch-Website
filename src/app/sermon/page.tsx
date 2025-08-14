"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const sermonData = [
  {
    date: '2025-07-20',
    title: 'Freedom At Last',
    headline: 'Freedom At Last',
    image: '/images/content/Sermon-image.png',
    // You can add a summary or excerpt here if desired
  },
  {
    date: '2025-07-27',
    title: 'Free At Last I & II',
    headline: 'Free At Last I & II',
    image: '/images/content/Sermon-image.png',
    // You can add a summary or excerpt here if desired
  },
  // Add more sermon days here as needed
];

export default function SermonPage() {
  // Format the date as 'Sunday 20 July 2025'
  const dateObj = new Date(2025, 6, 20);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/Sermon-image.png"
          alt="Sermon Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">SERMON</h1>
        </div>
      </div>
      {/* Step-Grid Card Section */}
      <div className="max-w-4xl w-full mx-auto px-2 sm:px-4 md:px-12 py-4 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {sermonData.map((sermon) => (
          <div
            key={sermon.date}
            className="bg-[#18313B] rounded-lg shadow-md p-0 flex flex-col items-stretch cursor-pointer hover:bg-[#25506A] transition-colors border border-[#FF602E] overflow-hidden"
            onClick={() => router.push(`/sermon/${sermon.date}`)}
          >
            <div className="relative w-full h-24 sm:h-32 md:h-40">
              <Image
                src={sermon.image}
                alt={sermon.headline}
                fill
                className="object-cover w-full h-full"
                priority={false}
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <div className="text-xs text-[#FFDECC] mb-1 sm:mb-2 font-medium">{sermon.date}</div>
              <div className="text-base sm:text-lg font-bold text-[#FF602E] mb-1 sm:mb-2">{sermon.headline}</div>
              {/* Optionally add a summary/excerpt here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 