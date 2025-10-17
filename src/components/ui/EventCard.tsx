import { motion } from 'framer-motion';
import Image from 'next/image';

export interface EventCardProps {
  title: string;
  time: string;
  date?: string;
  thumbnail: string;
  videoUrl?: string;
  highlight?: boolean;
  custom?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export default function EventCard({ title, time, date, thumbnail, videoUrl, highlight }: EventCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-[240px] sm:max-w-[260px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[340px] rounded-xl overflow-hidden shadow-lg group bg-black"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
      {/* Play Button Overlay */}
      {highlight && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
            <svg width="20" height="20" className="sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="white" />
              <polygon points="13,11 23,16 13,21" fill="#FF602E" />
            </svg>
          </div>
        </motion.div>
      )}
      {/* Event Info */}
      <div className="absolute left-0 bottom-0 w-full p-2.5 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-[#FF602E] font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">{title}</div>
        {date && <div className="text-white text-xs mb-0.5 sm:mb-1">{date}</div>}
        <div className="text-white text-sm sm:text-base md:text-lg font-medium opacity-90">{time}</div>
      </div>
    </motion.div>
  );
} 