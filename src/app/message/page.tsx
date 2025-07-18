"use client";
import Image from 'next/image';
import EventCard, { EventCardProps } from '../components/EventCard';
import StepsGrid from '../components/StepsGrid';
import Footer from '../components/Footer';

const events: EventCardProps[] = [
  {
    title: 'Last Sunday',
    time: '6th July, 2025',
    date: '',
    thumbnail: '/Video-Image.png',
    videoUrl: '#',
    highlight: true,
  },
  {
    title: "Upcoming Events",
    time: '',
    date: '',
    thumbnail: '/Connect-pic.png',
    videoUrl: '#',
    highlight: false,
  },
];

export default function MessagePage() {
  return (
    <div className="relative min-h-screen bg-[#232B33] flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <Image
          src="/Hero-page.png"
          alt="Join Live Service Hero Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg">Join Live Service</h1>
          <button className="mt-4 bg-[#FF602E] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg flex items-center gap-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Watch Live
          </button>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full py-16 px-4 flex flex-col items-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <Image
            src="/Mission-Background.png"
            alt="Upcoming Events Background"
            fill
            className="object-cover w-full h-full opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-[#232B33] bg-opacity-40" />
        </div>
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-start gap-12 z-10 relative">
          {/* Event Cards */}
          <div className="flex flex-row gap-6 mb-8 md:mb-0">
            {events.map((event, idx) => (
              <div
                key={event.title}
                className={`relative z-10 ${idx === 0 ? 'mt-0' : 'mt-8'}`}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
          {/* Description */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-[#B0B8C1] text-base md:text-lg mb-8 max-w-md">
              Stay connected and spiritually refreshed by joining our upcoming gatherings, special services, and community outreach programs.
            </p>
          </div>
        </div>
      </section>

      {/* Steps to Being Born Again Section */}
      <StepsGrid />
      {/* <Footer /> */}
    </div>
  );
} 