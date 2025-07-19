"use client";
import Image from 'next/image';

export default function SermonPage() {
  // Format the date as 'Sunday 13 July 2025'
  const dateObj = new Date(2025, 6, 13);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/Sermon-image.png"
          alt="Sermon Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">Sermon</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF602E] drop-shadow mb-1">God is Good</h2>
          <div className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">{today}</div>
        </div>
      </div>
      {/* Sermon Content */}
      <div className="max-w-4xl w-full mx-auto text-white rounded-b-lg px-4 sm:px-6 md:px-12 py-6 md:py-8 mt-0 z-10 relative" style={{ backgroundColor: '#0C252E' }}>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse :</span> Proverbs 11:3 | ESV<br/>
          <span className="text-xs md:text-sm">The integrity of the upright guides them, but the crookedness of the treacherous destroys them.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Titus 2:7 - 8 | AMPC<br/>
          <span className="text-xs md:text-sm">7 And show your own self in all respects to be a pattern and a model of good deeds and works, teaching what is unadulterated, showing gravity [having the strictest regard for truth and purity of motive], with dignity and seriousness.<br/>
          8 And let your instruction be sound and fit and wise and wholesome, vigorous and irrefutable and above censure, so that the opponent may be put to shame, finding nothing discrediting or evil to say about us.</span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Message</h3>
          <p className="mb-2 text-sm md:text-base">A godly character is beneficial not only for eternal purposes but also for our lives here on earth.<br/>
          Living a godly life, therefore, has everything to do with GENUINELY loving God and It also has a lot to do with representing Christ well here on earth. This, however, should be the desire and pursuit of every heaven minded Christian.<br/>
          Here are 3 keys to building a godly character :</p>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Godly and consistent devotional life</li>
            <li>Godly choices and decisions</li>
            <li>Godly mentoring and discipleship.</li>
          </ol>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">1. Godly And Consistent Devotional Life.</h4>
          <p className="mb-2 text-sm md:text-base">Maintaining your relationship with God through a consistent devotional life is key.<br/>
          Jesus said in John 15:5<br/>
          "…If you remain in Me and I in you, you will bear much fruit…"<br/>
          There are three types of fruit mentioned in the New Testament namely:</p>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>The fruit of good works (Colossians 1:10);</li>
            <li>The fruit of souls won to Christ (John 4:35-36, Proverbs 11:30, John 15); and</li>
            <li>The fruit of the Spirit "…love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control…" (Galatians 5:22-23).</li>
          </ul>
          <p className="mb-2 text-sm md:text-base">These "fruit" are all attributes of the character of Christ. Produced in us by yielding completely to the leading of the Holy Spirit.<br/>
          "…If you remain in Me and I in you, you will bear much fruit…"<br/>
          "if you remain in Me and My words remain in you…"</p>
          <p className="mb-2 text-sm md:text-base">By simply maintaining a consistent devotional life. The very life and character of God will in many ways almost "automatically" be transferred to you.<br/>
          A consistent devotional life is an absolute key to Christlike character. A great amount of Christlike character can be transferred into your life by simply keeping a consistent devotional life. This should not really be surprising. It just makes sense that we become like those whom we hang around most. They "rub off" on us. The more you "hang around" with Jesus, the more you will become like Him.</p>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">2. Godly Choices And Decisions.</h4>
          <p className="mb-2 text-sm md:text-base">Making the right choices, again and again, builds godly character into our lives. God has given us a will- the ability to choose and to choose righteousness.<br/>
          Habits I s it that turns to a lifestyle and lifestyle is it that will eventually becomes your personality.<br/>
          Regular communing, abiding and fellowshipping with the Holy Spirit will enhance a good decision making which will eventually bring tremendous peace. If your thoughts are anxious, it is an indication that your mind and emotions are not under the influence of the Holy Spirit. Learn to commune with Him. Talking to Him and worshipping Him and you will find it far easier to make right choices when the test comes. This is called, walking in the Spirit.</p>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">3. Godly Mentoring And Discipleship</h4>
          <p className="mb-2 text-sm md:text-base">Apart from the Word of God, and your relationship with Him, the single most important factor in a Christian life, would be godly mentoring. The Bible says in Proverbs 13:20,<br/>
          He who walks with wise men will be wise, But the companion of fools will suffer harm.</p>
          <p className="mb-2 text-sm md:text-base">Have you ever thought on how much your relationship with your friends influences you? It is surprisingly more than one can imagine.<br/>
          If you then, wants to live a godly life, make sure you are submivise to your spiritual father or mother as the case may be.<br/>
          There is something about discipleship allows for a transference of anointing and a life that you may not get from any other sources.<br/>
          Jesus mentored 12 disciples. He spent 3 ½ years, 24/7, with them. And imparted to them both godly character and supernatural power. Paul mentored Timothy. Elijah mentored Elisha. Moses mentored Joshua.<br/>
          Do you desire to build a godly character in your life?  Then, humbly submit yourself to the tutelage of your spiritual father and your life will never remain the same.</p>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Conclusion</h4>
          <p className="mb-2 text-sm md:text-base">It is the will of God for us to live godly in Christ Jesus. If you truly love God, you will want to honor Him. You will want to represent Him well. Knowing that a godly lifestyle brings glory and honor to the Lord.</p>
          <p className="italic text-xs mb-4">( Coined from "Three Keys to Building Godly Character" by Bishop Rich Conte)</p>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Prayer points</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>Good morning Father</li>
            <li>Good morning dear Jesus</li>
            <li>Good morning dear Holy Spirit</li>
            <li>Father, divinely order, direct and prosper my ways and actions today , in Jesus mighty name.</li>
          </ul>
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Quotes</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>Your character defines who you are by the actions you take. <span className="italic">+ Catherine Pulsifer</span></li>
            <li>Beauty has a lot to do with character. <span className="italic">+ Kevyn Aucoin</span></li>
            <li>Intelligence plus character - that is the goal of true education. <span className="italic">+ Martin Luther King Jr.</span></li>
          </ul>
          <div className="mt-4">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
            <span className="text-sm md:text-base">Ezekiel 21 - 30</span>
          </div>
        </div>
      </div>
    </div>
  );
} 