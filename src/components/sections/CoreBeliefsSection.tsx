"use client";
import { motion, easeOut } from 'framer-motion';
import Image from 'next/image';

const beliefCategories = [
  {
    category: "Foundation of Faith",
    beliefs: [
      {
        title: "The Bible",
        description: "We believe the Bible, both Old and New Testaments, is the inspired and infallible Word of God."
      },
      {
        title: "The Trinity",
        description: "We believe in one God existing in three co-equal persons: Father, Son (Jesus Christ), and Holy Spirit."
      },
      {
        title: "Jesus Christ",
        description: "We believe Jesus is the Son of God, conceived by the Holy Spirit, born of the Virgin Mary, lived a sinless life, died on the cross for humanity's sins, and was resurrected."
      }
    ]
  },
  {
    category: "Salvation & Spirit",
    beliefs: [
      {
        title: "Salvation",
        description: "We believe salvation is a gift from God, received through grace and faith in Jesus Christ's atoning sacrifice. Repentance and turning away from sin are essential components."
      },
      {
        title: "The Holy Spirit",
        description: "We believe in the baptism of the Holy Spirit, manifested through speaking in tongues, as a gift available to all believers."
      },
      {
        title: "Divine Healing",
        description: "We believe in divine healing through faith in Jesus Christ, with sickness being a consequence of the fall of man and Satan's influence."
      }
    ]
  },
  {
    category: "Future & Service",
    beliefs: [
      {
        title: "Second Coming of Christ",
        description: "We believe in the literal, personal, and visible return of Jesus Christ to earth."
      },
      {
        title: "Service",
        description: "We believe the importance of prayer, evangelism / mission, restitution for wrongdoings, helping the needy and our community."
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut
    }
  }
};

export default function CoreBeliefsSection() {
  return (
    <section className="relative w-full py-10 px-2 sm:px-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/backgrounds/Mission-Background.png"
        alt="Core Beliefs Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#232B33] bg-opacity-30" />
      
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-200 mb-4 sm:mb-8 z-10 relative"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          Our Core Beliefs
        </motion.h2>
        
        <div className="w-full bg-[#232B33] bg-opacity-80 rounded-2xl p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 shadow-lg z-10 relative">
          {/* Category Groups */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {beliefCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-300 text-center mb-2 sm:mb-4">
                  {category.category}
                </h3>
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center">
                  {category.beliefs.map((belief, beliefIndex) => {
                    const globalIndex = beliefCategories
                      .slice(0, categoryIndex)
                      .reduce((acc, cat) => acc + cat.beliefs.length, 0) + beliefIndex;
                    
                    return (
                      <motion.div
                        key={belief.title}
                        className="flex-1 bg-[#2C3742] rounded-lg p-4 sm:p-6 text-center shadow-xl w-full"
                        variants={cardVariants}
                        whileHover="hover"
                        custom={globalIndex}
                      >
                        <div className="font-semibold text-[#FF602E] mb-2 sm:mb-3 text-base sm:text-lg">
                          {belief.title}
                        </div>
                        <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
                          {belief.description}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 