import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const devotionalData = [
  {
    date: '2026-01-19',
    title: 'Arise!, Help Me, O Lord!',
    headline: 'Arise!, Help Me, O Lord!',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">🍇🍉🍒🍌🍇🍉🍒🍌🍇🍉🍌</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Monday, January 19th, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Arise!, Help Me, O Lord!*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Isaiah 41:10 | ESV</span><br/>
          <span className="text-xs md:text-sm">Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : 121:1 - 8 | GWT</span><br/>
          <span className="text-xs md:text-sm">
            1 I look up toward the mountains. Where can I find help?<br/><br/>
            2 My help comes from the LORD, the maker of heaven and earth.<br/><br/>
            3 He will not let you fall. Your guardian will not fall asleep.<br/><br/>
            4 Indeed, the Guardian of Israel never rests or sleeps.<br/><br/>
            5 The LORD is your guardian. The LORD is the shade over your right hand.<br/><br/>
            6 The sun will not beat down on you during the day, nor will the moon at night.<br/><br/>
            7 The LORD guards you from every evil. He guards your life.<br/><br/>
            8 The LORD guards you as you come and go, now and forever.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">The online Dictionary defines 'help' as : "make it easier or possible" for (someone) to do something by offering them one's services or resources.</p>
          <p className="mb-2 text-sm md:text-base">Therefore, "to help" could means to assist, aid or to lend a hand to etc.</p>
          <p className="mb-2 text-sm md:text-base">God can decide to help an individual or group by Himself and He can decide to send the help through a messenger but for a user of this devotional, the Lord shall arise and help you directly by Himself in Jesus name.</p>
          <p className="mb-4 text-sm md:text-base">Kindly pray the following prayer points:</p>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, I praise your holy and wonderful name for the privilege of witnessing another beautiful day, in Jesus Name.</li>
            <li>Father, thank you for your grace, thank you for your mercy at all time, in Jesus mighty name.</li>
            <li>Father, thank you for various ways you have been helping me in time past, in Jesus mighty name.</li>
            <li>Father, I need you now, more than ever before, please arise for my help today, in Jesus mighty name.</li>
            <li>Father, in all areas of my life, mentally, maritally, financially or materially and spiritually, please arise for my help today, in Jesus mighty name.</li>
            <li>Father, help me and make things easier for me, in Jesus mighty name.</li>
            <li>Father, help me, make my success and breakthrough come easier and faster, in Jesus mighty name.</li>
            <li>Father, arise for my help today and fight my battles for me, in Jesus mighty name.</li>
            <li>Father, do not send my help through a messenger, arise today, and help me all by yourself, in Jesus mighty name.</li>
            <li>Father, without you I'm done for, please arise for my help today, in Jesus mighty name.</li>
            <li>Father, please help my unbelieve, help my weaknesses, arise and help me beyond my wildest dream, in Jesus mighty Name.</li>
            <li>Father, your Church at such a time like this needs help, please arise and help us, in Jesus mighty name.</li>
            <li>Father, help me this year, lift me beyond my qualifications, in Jesus mighty Name.</li>
            <li>Father, help me this year, give me the blessing, the position I did not merit or qualify for, in Jesus mighty Name.</li>
            <li>Father, the nation's of the world needs your help at such a time like this, please arise and help us in Jesus mighty name.</li>
            <li>Father, help this nation and let it be known to all that you are our helper, in Jesus mighty name.</li>
            <li>Father, as I go out today and the rest of this week, please order my steps, direct my paths in Jesus mighty name.</li>
            <li>Father, thank you for all the answers, in Jesus mighty name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>God will never let us down because his love is unconditional. <span className="italic">+ Anonymous</span></li>
            <li>God doesn't give you the people you want, he gives you the people you need. To help you, to hurt you, to leave you, to love you and to make you the person you were meant to be. <span className="italic">+ Anonymous</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">*Good Morning, God Bless You &*</p>
            <p className="text-base md:text-lg font-semibold mb-4">*Bless Your Day*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Deuteronomy 11 - 20</span>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm md:text-base font-semibold mb-2">*Connectlife Daily Devotional*</p>
            <p className="text-xs md:text-sm">GodlyConnection | GodlyCollection</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default async function DevotionalByDatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const devotional = devotionalData.find((d) => d.date === date);
  if (!devotional) return notFound();

  // Format the date for display
  const dateObj = new Date(devotional.date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const displayDate = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src={devotional.image}
          alt="Devotional Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">{devotional.headline}</h1>
          <div className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">{displayDate}</div>
        </div>
      </div>
      {/* Back Button */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-12 mt-4">
        <Link href="/devotional" className="mb-6 inline-block px-4 py-2 rounded bg-[#FF602E] text-white font-semibold shadow hover:bg-[#ff7f50] transition-colors text-sm sm:text-base">← Back to All Devotionals</Link>
      </div>
      {/* Devotional Content */}
      <div className="max-w-4xl w-full mx-auto text-white rounded-b-lg px-4 sm:px-6 md:px-12 py-6 md:py-8 mt-0 z-10 relative" style={{ backgroundColor: '#0C252E' }}>
        {devotional.content}
      </div>
    </div>
  );
} 