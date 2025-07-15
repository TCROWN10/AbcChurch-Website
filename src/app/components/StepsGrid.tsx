import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
  {
    category: 'Belief and Acceptance',
    items: [
      {
        title: 'Recognize your need',
        desc: 'Understand that you are a sinner and that you need a savior.'
      },
      {
        title: 'Believe in Jesus',
        desc: 'Accept that Jesus Christ is the Son of God, who died for your sins and rose again.'
      },
      {
        title: 'Accept Jesus as Lord',
        desc: 'Surrender your life to Jesus, acknowledging him as the ultimate authority in your life.'
      },
    ]
  },
  {
    category: 'Repentance and Forgiveness',
    items: [
      {
        title: 'Confess your sins',
        desc: 'Acknowledge your wrongdoings to God and ask for forgiveness.'
      },
      {
        title: 'Repent',
        desc: 'Turn away from your sinful ways and commit to living a life that pleases God.'
      },
    ]
  },
  {
    category: 'Spiritual Renewal',
    items: [
      {
        title: 'Receive the Holy Spirit',
        desc: 'Pray for the Holy Spirit to fill you and guide you.'
      },
      {
        title: 'Live a transformed life',
        desc: 'Strive to live according to God’s will, seeking to grow in faith and obedience.'
      },
      {
        title: 'Come to Church Regularly',
        desc: 'Being in the presence of other believers helps to challenge you to a deeper love for God.'
      },
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      duration: 0.7,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export default function StepsGrid() {
  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center py-16 px-4 bg-transparent relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
        <Image
          src="/StepGrid.png"
          alt="Steps Background"
          fill
          className="object-cover w-full h-full opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-[#232B33] bg-opacity-30" />
      </div>
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-gray-200 mb-8 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Steps to Being Born Again
      </motion.h2>
      <div className="w-full max-w-4xl bg-[#232B33] bg-opacity-80 rounded-2xl p-8 flex flex-col gap-8 shadow-lg z-10 relative">
        {/* Category Groups */}
        <div className="flex flex-col gap-8">
          {/* Belief and Acceptance */}
          <motion.div variants={containerVariants}>
            <h3 className="text-lg font-semibold text-gray-300 text-center mb-4">Belief and Acceptance</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {steps[0].items.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className="flex-1 bg-[#2C3742] rounded-lg p-5 text-center shadow-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="font-semibold text-[#FF602E] mb-2">{step.title}</div>
                  <div className="text-gray-200 text-sm">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Repentance and Forgiveness */}
          <motion.div variants={containerVariants}>
            <h3 className="text-lg font-semibold text-gray-300 text-center mb-4">Repentance and Forgiveness</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {steps[1].items.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className="flex-1 bg-[#2C3742] rounded-lg p-5 text-center shadow-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="font-semibold text-[#FF602E] mb-2">{step.title}</div>
                  <div className="text-gray-200 text-sm">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Spiritual Renewal */}
          <motion.div variants={containerVariants}>
            <h3 className="text-lg font-semibold text-gray-300 text-center mb-4">Spiritual Renewal</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {steps[2].items.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className="flex-1 bg-[#2C3742] rounded-lg p-5 text-center shadow-xl"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="font-semibold text-[#FF602E] mb-2">{step.title}</div>
                  <div className="text-gray-200 text-sm">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 