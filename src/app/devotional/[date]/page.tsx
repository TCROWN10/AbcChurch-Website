import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const devotionalData = [
  {
    date: '2025-07-21',
    title: 'Promotion Cometh',
    headline: 'Promotion Cometh',
    image: '/Devotional-iHero.png',
    content: (
      <div className="text-white">
        {/* Full content for July 21, 2025 */}
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
    ),
  },
  {
    date: '2025-07-24',
    title: 'Loving The Unlovables',
    headline: 'Loving The Unlovables',
    image: '/Devotional-iHero.png',
    content: (
      <div className="text-white">
        {/* Full content for July 24, 2025 */}
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verses :</span> Romans 5:8 | NKJV<br/>
          <span className="text-xs md:text-sm">But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading:</span> Luke 6:32–36 | NLT<br/>
          <span className="text-xs md:text-sm">32 "If you love only those who love you, why should you get credit for that? Even sinners love those who love them!<br/>
          33 And if you do good only to those who do good to you, why should you get credit? Even sinners do that much!<br/>
          35 Love your enemies! Do good to them. Lend to them without expecting to be repaid. Then your reward from heaven will be very great, and you will truly be acting as children of the Most High, for he is kind to those who are unthankful and wicked.<br/>
          36 You must be compassionate, just as your Father is compassionate.</span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">🌟 Message</h3>
          <h4 className="font-semibold text-sm md:text-base mb-2">Loving the "Unlovable": God's Call Beyond Comfort</h4>
          <p className="mb-2 text-sm md:text-base">Some people are hard to hug—prickly personalities, hurtful histories, or bitter behaviors can make them feel unreachable. Yet, God's love calls us to love beyond limits, beyond logic, and beyond likes. Jesus didn't just die for the delightful; He died for the difficult too. Loving the unlovable isn't about them—it's about reflecting Jesus. Here are some ways to show Love to the "Unlovable":</p>
          
          <div className="mb-4">
            <h5 className="font-semibold text-sm md:text-base mb-1">1. Care, Even When They're Cold</h5>
            <p className="mb-1 text-sm md:text-base"><span className="font-semibold">Cold hearts need consistent care.</span></p>
            <p className="mb-2 text-sm md:text-base">Just like a frozen heart needs time to thaw, persistently caring even when you get no warmth back can melt through bitterness. Be kind to all not minding who they are - the rude co-worker or distant neighbor—your care may be the only Christ they will ever encounter. Proverbs 15:1a says, "A gentle answer turns away wrath…"</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-sm md:text-base mb-1">2. Pray, Even If They Push You Away</h5>
            <p className="mb-1 text-sm md:text-base"><span className="font-semibold">Persistent prayer pierces pride.</span></p>
            <p className="mb-2 text-sm md:text-base">Intercession does what interaction sometimes can't. Praying softens both their heart and yours. Stop talking about others rather, talk to God for others. Remember, when Job prayed for his friends who misjudged him, God restored all he ever lost by double (Job 42:10)</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-sm md:text-base mb-1">3. Forgive, Even If They Frown</h5>
            <p className="mb-1 text-sm md:text-base"><span className="font-semibold">Forgiveness frees the forgiver.</span></p>
            <p className="mb-2 text-sm md:text-base">Sometimes the unlovable are also unforgiving. But forgiveness isn't about feeling—it's about faithfulness to the Lord. A family member may never say sorry or be apologetic, however, your release of resentment gladens God's heart and invites His peace. Mercy is ministry. "Forgive one another… as God in Christ forgave you." (Ephesians 4:32)</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-sm md:text-base mb-1">4. Help, Even When They Hurt You</h5>
            <p className="mb-1 text-sm md:text-base"><span className="font-semibold">Healers help even when it hurts.</span></p>
            <p className="mb-2 text-sm md:text-base">The unlovable might lash out because of past wounds. Loving them is planting seeds of love, remember, not all seeds grow overnight. Even Jesus washed Judas' feet, despite the fact that he knows he was still going to betray him. You're actually not helping because they deserve it—you're helping because God deserves obedience. We love not by natural reaction, but by supernatural direction.</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-sm md:text-base mb-1">5. See Value, Even In Their Violence</h5>
            <p className="mb-1 text-sm md:text-base"><span className="font-semibold">See soul before scars.</span></p>
            <p className="mb-2 text-sm md:text-base">Beneath harshness lies a hurting human—still made in God's image. Loving them is choosing to look beyond their behavior. If Saul the persecutor became Paul the preacher, then no one is too bad for God to change, never underestimate God's grace plan. Grace gives what's undeserved to those who don't request it. "Man looks at the outward appearance, but the LORD looks at the heart." (1 Samuel 16:7)</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Things to do</h4>
          <p className="mb-2 text-sm md:text-base">Write down the name of one "unlovable" person. Ask God daily to help you love them intentionally this week.</p>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Prayer</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Father, I give you praise and Glory for the blessing and the privilege of Witnessing another day in the land of the living, in Jesus Name.</li>
            <li>Lord, please teach me to love like You—sacrificially, sincerely, and supernaturally. Help me to see what You see in them.</li>
          </ol>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Quotes</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>The true test of love is loving someone you struggle to like. <span className="italic">+ Unknown</span></li>
            <li>He who cannot forgive breaks the bridge over which he must pass. <span className="italic">+ George Herbert</span></li>
            <li>Love is the only force capable of transforming an enemy into a friend. <span className="italic">+ Martin Luther King Jr.</span></li>
          </ul>
          
          <div className="mt-4">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
            <span className="text-sm md:text-base">Micah 1- 7<br/>
            Nahum 1 - 3</span>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lg md:text-xl font-semibold mb-2">🙏 Good Morning 🙏</p>
            <p className="text-base md:text-lg mb-4">& God Bless You Today</p>
            <p className="text-sm md:text-base font-semibold text-[#FF602E]">ConnectLife Daily Devotional</p>
            <p className="text-xs md:text-sm">www.abcchurch.us</p>
            <p className="text-xs md:text-sm">abcchurchhq@gmail.com</p>
            <p className="text-xs md:text-sm">GodlyConnection | GodlyCollection</p>
          </div>
        </div>
      </div>
    ),
  },
  // Add more devotional days here as needed
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