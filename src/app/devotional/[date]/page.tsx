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
  {
    date: '2026-01-20',
    title: 'Beware Of This Enemies',
    headline: 'Beware Of This Enemies',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">👹🐭👹▫️🐭🦚🐭▫️👹🐭👹</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Tuesday, January 20th, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Beware Of This Enemies*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : 2 Corinthians 2:11 | NKJV</span><br/>
          <span className="text-xs md:text-sm">lest Satan should take advantage of us; for we are not ignorant of his devices.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : Ephesians 6:10-13 | NLT</span><br/>
          <span className="text-xs md:text-sm">
            10 ...Be strong in the Lord and in his mighty power.<br/><br/>
            11 Put on all of God's armor so that you will be able to stand firm against all strategies of the devil.<br/><br/>
            12 For we are not fighting against flesh-and-blood enemies, but against evil rulers and authorities of the unseen world, against mighty powers in this dark world, and against evil spirits in the heavenly places.<br/><br/>
            13 Therefore, put on every piece of God's armor so you will be able to resist the enemy in the time of evil. Then after the battle you will still be standing firm.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">There are five gigantic forces that fight us as Christians. There is a race that we must run and while at it we are required to keep the faith. These five forces purpose on drawing us further away from God. We must overcome them no matter what it takes.</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. *SATAN AGAINST US.*</h4>
            <p className="mb-2 text-sm md:text-base">John 10:10 (a) "the devil comes but to STEAL, KILL and DESTROY." He will steal whatever is entitled to a Christian, destroy them by encouraging them to engage in things that are against God and eventually succeeds in getting rid of them. Resisting the devil is the sure way in which the devil will flee from us. Get closer to God and overcome the various temptations and tests. As long as we understand who we are in Christ, the devil should never win in his attempts to steal, kill and destroy us.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. *THE WORLD AROUND US.*</h4>
            <p className="mb-2 text-sm md:text-base">The world entices a Christian to befriend it. As its friend, you adopt its style of doing things after which you become spotted and end up loving the world and its ways. Romans 12:2 (a) tells us not to be conformed to the patterns of this world. If you find yourself talking, dressing and behaving like the world, you need to understand that you have been swallowed up by the world. Though the ways of the world are inviting yet as God's children and visitors in the world, we need to take a firm stand against them.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. *THE FLESH UPON US.*</h4>
            <p className="mb-2 text-sm md:text-base">This is actually the biggest force that a believer is constantly fighting. Once a believer loses control over their flesh, they are given into its sinful desires The battle against the flesh is a battle within. This battle is divided into;</p>
            <p className="mb-2 text-sm md:text-base ml-4">a. <span className="font-semibold">*The battle in the mind.*</span></p>
            <p className="mb-2 text-sm md:text-base ml-6">If a believer is able to guard their thoughts, they can overcome the battle of the flesh because it all begins in the mind. You will first think of something before actually doing it.</p>
            <p className="mb-2 text-sm md:text-base ml-4">b. <span className="font-semibold">*The battle in speech.*</span></p>
            <p className="mb-2 text-sm md:text-base ml-6">Speak the oracles of God always. For all vain words ever spoken, we shall give account of them all before God. Note, the words you speak can either build or destroy.</p>
            <p className="mb-2 text-sm md:text-base ml-4">c. <span className="font-semibold">*The battle of Actions.*</span></p>
            <p className="mb-2 text-sm md:text-base ml-6">See into it that you only please God in whatever you do. Crucify the flesh. Do not let it come between you and God.</p>
          </div>

        <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">4. *THE MEMORIES BEHIND US.*</h4>
            <p className="mb-2 text-sm md:text-base">A memory is a record of your personal experience. It is a record of trial, error, defeat and success as the case may be. As humans, we seem not to remember days but moments. Phil 3:13, Rom 8:1 The scriptures tell us to forget the past and look forward to whatever lies ahead. Whatever you did before you got saved should never, at one given time, cross your mind. The devil uses the memories behind you to discourage you but you must be assured that all the sins of the past have been forgiven you and forgotten. Do not let the memories of your past hinder you from getting closer to God.</p>
        </div>

        <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">5. *THE FEAR BEFORE US.*</h4>
            <p className="mb-2 text-sm md:text-base">Where faith is absent, fear occupies. We have not been given the spirit of fear but of courage. Do not fear to set up a project or a business just because you feel like nobody will respond to it. That is a force trying to pull you away from success. It is God who delivers from all fears (Psalms 34:4).</p>
            <p className="mb-2 text-sm md:text-base">Isaiah 41:10 says, Fear not, for I am with you; Be not dismayed, for I am your God. I will strengthen you, Yes, I will help you, I will uphold you with My righteous right hand.</p>
            <p className="mb-2 text-sm md:text-base">John 14: 27 has this to say, Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.</p>
            <p className="mb-2 text-sm md:text-base italic">(Coined from "BEWARE OF THESE FIVE FORCES THAT ARE FIGHTING YOU AS A CHRISTIAN" By Pst. Gitahi Daniel)</p>
        </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer Points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, arise and fight for me today, in Jesus mighty Name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>The first step on the way to victory is to recognize the enemy. <span className="italic">+ Corrie Ten Boom</span></li>
            <li>Conformity is the jailer of freedom and the enemy of growth. <span className="italic">+ John F. Kennedy</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">*Good Morning, God Bless You &*</p>
            <p className="text-base md:text-lg font-semibold mb-4">*Bless Your Day*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Deuteronomy 21 - 30</span>
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