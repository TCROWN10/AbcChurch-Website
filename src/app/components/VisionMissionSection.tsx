import Image from 'next/image';
import React from 'react';

export default function VisionMissionSection() {
  return (
    <section className="relative w-full py-10 px-2 sm:px-4 bg-[#222A31] overflow-visible">
      {/* Background Image */}
      <Image
        src="/Mission-Background.png"
        alt="Mission Section Background"
        fill
        className="object-cover w-full h-full z-0 pointer-events-none select-none"
        priority
      />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-12 relative z-10">
        {/* Left: Bible-curve Image (bigger, can overflow vertically) */}
        <div className="flex-shrink-0 relative flex items-center justify-center w-full md:w-[520px] h-[180px] xs:h-[240px] sm:h-[320px] md:h-[420px] max-w-full mt-0 mb-0 md:mt-[-40px] md:mb-[-40px]">
          <Image
            src="/Bible-curve.png"
            alt="Bible Curve"
            fill
            className="object-contain w-full h-full"
            priority
          />
        </div>
        {/* Right: Vision & Mission */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 text-white w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">Our Vision & Mission</h2>
          {/* Vision Card */}
          <div className="rounded-lg bg-[#283947cc] p-3 sm:p-5 mb-1 sm:mb-2">
            <div className="font-semibold text-base sm:text-lg mb-1">Vision</div>
            <div className="text-sm sm:text-base">All People; All Nations; All Saved; All Spirit-filled; All Sanctified.</div>
          </div>
          {/* Mission Card */}
          <div className="rounded-lg bg-[#474628cc] p-3 sm:p-5 mb-1 sm:mb-2">
            <div className="font-semibold text-base sm:text-lg mb-1">Mission Statement</div>
            <div className="text-sm sm:text-base">All of God, for All People; All People for all of God.</div>
          </div>
          {/* Details Card */}
          <div className="rounded-lg bg-[#284747cc] p-3 sm:p-5">
            <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><b>All People:</b> Reaching male & female, rich & poor, across all beliefs. <span className="text-[#B2E0FF]">(John 3:16)</span></li>
              <li><b>All Nations:</b> Reaching all Nations, tribes, tongues and languages, irrespective of colour or race. <span className="text-[#B2E0FF]">(Gal 3:28)</span></li>
              <li><b>All Saved:</b> Reaching all (1 & 2 above) with the Salvation message of Our Lord Jesus Christ in Global Evangelism. <span className="text-[#B2E0FF]">(Mark 16:15-17)</span></li>
              <li><b>All Spirit - filled:</b> Holy Spirit baptism with physical evidence of speaking in tongues and deliverance from demonic oppression. <span className="text-[#B2E0FF]">(Acts 2:1)</span></li>
              <li><b>All Sanctified:</b> Practicing, Preaching & Teaching uncompromisingly the Word of God. <span className="text-[#B2E0FF]">(1Thess 5:23)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 