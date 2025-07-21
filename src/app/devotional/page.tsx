"use client";
import Image from 'next/image';
import JoinUsSection from '../components/Message';
import Footer from '../components/Footer';

export default function DevotionalPage() {
  // Set specific date: Monday, July 21st 2025
  const today = "Monday, July 21st 2025";
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
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF602E] drop-shadow mb-1">Promotion Cometh</h2>
          <div className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">{today}</div>
        </div>
      </div>
      {/* Devotional Content */}
      <div className="max-w-4xl w-full mx-auto text-white rounded-b-lg px-4 sm:px-6 md:px-12 py-6 md:py-8 mt-0 z-10 relative" style={{ backgroundColor: '#0C252E' }}>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse :</span> Psalm 75:6 | KJV<br/>
          <span className="text-xs md:text-sm">For promotion cometh neither from the east, nor from the west, nor from the south.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Psalm 113:1 - 9 | KJV<br/>
          <span className="text-xs md:text-sm">1 Praise ye the Lord. Praise, O ye servants of the Lord, praise the name of the Lord.<br/>
          2 Blessed be the name of the Lord from this time forth and for evermore.<br/>
          3 From the rising of the sun unto the going down of the same the Lord's name is to be praised.<br/>
          4 The Lord is high above all nations, and his glory above the heavens.<br/>
          5 Who is like unto the Lord our God, who dwelleth on high,<br/>
          6 Who humbleth himself to behold the things that are in heaven, and in the earth!<br/>
          7 He raiseth up the poor out of the dust, and lifteth the needy out of the dunghill;<br/>
          8 That he may set him with princes, even with the princes of his people.<br/>
          9 He maketh the barren woman to keep house, and to be a joyful mother of children. Praise ye the Lord.</span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Message</h3>
          <p className="mb-2 text-sm md:text-base">Promotion is an advancement in rank or position. Everyone needs to desire promotion. It is a gift from God. Bible says in Psalm 75:6-7;</p>
          <p className="mb-2 text-sm md:text-base italic">"For promotion cometh neither from the east, nor from the west, nor from the south.<br/>
          But God is the judge: he putteth down one, and setteth up another."</p>
          <p className="mb-2 text-sm md:text-base">For a user of this devotional, the Lord will lift you up, in Jesus name.</p>
          <p className="mb-2 text-sm md:text-base">As believers, we have to look unto God for our promotion not neglecting hard work, for promotion is a reward. However, due to high competition in today's world and in some fields of job or operations, some people are denied their rights to promotion but as you pray this prayer along, the Lord will promote you even beyond your expectation in Jesus mighty name.</p>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Prayer Points</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Father, you are the King of kings and the Lord of lords. I give all Glory to your holy name.</li>
            <li>Father, I thank you for another day in the land of the living, in Jesus name.</li>
            <li>Father, you are the Alfa and the Omega, please go ahead of me today and the rest of the week, in Jesus name.</li>
            <li>Father, I commit into your hand, all my steps and actions this day and for the rest of the week, please direct my path and prosper my way, in Jesus mighty name.</li>
            <li>Father! Please Prosper the works of my hands exceedingly, in Jesus name.</li>
            <li>Father, please promote me in every areas of my life, in Jesus name.</li>
            <li>Father, please help me in all my pursuits - in my business and my chosen field of operations. Please make me the head and above only, in Jesus mighty name.</li>
            <li>Father, give me the kind of promotion that I did not qualify for, in Jesus mighty name.</li>
            <li>Father, by yourself and with your own hand, promote me in a way that the human brain cannot comprehend, in Jesus mighty name.</li>
            <li>Father, in my life, in my career and in my business, please glorify yourself, in Jesus mighty name.</li>
            <li>Father, for all users of this devotional, please promote us today, in Jesus mighty name.</li>
            <li>Father, in your Church, please glorify yourself again, in Jesus mighty name.</li>
            <li>Father, concerning this land and this nation, please glorify yourself and let your will be done, in Jesus mighty name.</li>
            <li>Father, thank you for the grace to pray and for the answers, in Jesus name.</li>
          </ol>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Quotes</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>You Have The Holy Spirit That's All You Need For That's All It Takes! <span className="italic">+ J. N.E. Agu</span></li>
            <li>A man who is not ready to risk is not worthy of getting promotion <span className="italic">+ Sunday Adelaja</span></li>
            <li>It's all about motive. Climbing up and climbing out look the same on the outside. <span className="italic">+ Joyce Rachell</span></li>
          </ul>
          
          <div className="mt-4">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
            <span className="text-sm md:text-base">Hosea 1 - 14</span>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lg md:text-xl font-semibold mb-2">🙏 Good Morning 🙏</p>
            <p className="text-base md:text-lg mb-4">& God Bless You Today</p>
            <p className="text-sm md:text-base font-semibold text-[#FF602E]">ConnectLife Daily Devotional</p>
            <p className="text-xs md:text-sm">abcchurchhq@gmail.com</p>
            <p className="text-xs md:text-sm">GodlyConnection | GodlyCollection</p>
          </div>
        </div>
      </div>
      <JoinUsSection />
      {/* Only one Footer should be rendered below */}
      {/* <Footer /> */}
    </div>
  );
} 