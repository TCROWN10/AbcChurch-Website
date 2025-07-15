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
      className="relative w-[260px] h-[340px] rounded-xl overflow-hidden shadow-lg group bg-black"
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
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="white" />
              <polygon points="13,11 23,16 13,21" fill="#FF602E" />
            </svg>
          </div>
        </motion.div>
      )}
      {/* Event Info */}
      <div className="absolute left-0 bottom-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-[#FF602E] font-semibold text-base mb-1">{title}</div>
        {date && <div className="text-white text-sm mb-1">{date}</div>}
        <div className="text-white text-lg font-medium opacity-80">{time}</div>
      </div>
    </motion.div>
  );
} 