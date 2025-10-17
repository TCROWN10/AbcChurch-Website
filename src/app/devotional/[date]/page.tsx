import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const devotionalData = [
  {
    date: '2025-08-05',
    title: 'Signs Of A Backslidden Heart',
    headline: 'Signs Of A Backslidden Heart',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        {/* Full content for August 5, 2025 */}
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse :</span> 2 Corinthians 13:5 | ESV<br/>
          <span className="text-xs md:text-sm">Examine yourselves, to see whether you are in the faith. Test yourselves. Or do you not realize this about yourselves, that Jesus Christ is in you?—unless indeed you fail to meet the test!</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Revelation 2:2 - 5 | KJV<br/>
          <span className="text-xs md:text-sm">2 I know thy works, and thy labour, and thy patience, and how thou canst not bear them which are evil: and thou hast tried them which say they are apostles, and are not, and hast found them liars:<br/><br/>
          3 And hast borne, and hast patience, and for my name's sake hast laboured, and hast not fainted.<br/><br/>
          4 Nevertheless I have somewhat against thee, because thou hast left thy first love.<br/><br/>
          5 Remember therefore from whence thou art fallen, and repent, and do the first works; or else I will come unto thee quickly, and will remove thy candlestick out of his place, except thou repent.</span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Message</h3>
          <p className="mb-4 text-sm md:text-base">Have you ever felt that you were not as close to God as you used to be? There are certain warning signs in our spiritual life that indicate we are slowly drifting away from God. When we are aware of the warning signs, we are able to remedy the unhealthy attitudes and behaviors that lead us away from the Lord. Here are some of the reasons:</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. A Decrease in Your Quiet Time</h4>
            <p className="mb-2 text-sm md:text-base">Any healthy relationship requires quality time to thrive. Our relationship with God is no different. Spending time with God by reading His word and praying is a great privilege and tool to strengthen our faith and keep our hearts focused. If you notice the following, beware:</p>
            <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
              <li>You don't have quiet time with God.</li>
              <li>You don't want to have quiet time with God.</li>
              <li>You no longer see the value of having quiet time with God.</li>
            </ul>
            <p className="mb-2 text-sm md:text-base">Losing the desire to spend time with God is the first telltale sign that something is not right spiritually.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. A Loss of Conviction</h4>
            <p className="mb-2 text-sm md:text-base">Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity. (1 Timothy 4:1-2).</p>
            <p className="mb-2 text-sm md:text-base">Our conscience is one of the main channels through which God gets our attention. We must not succumb to attitudes that eventually harden the heart. Some common, unhealthy excuses for hardness of the heart may include:</p>
            <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
              <li>"I deserve this."</li>
              <li>"I'm not as bad as others."</li>
              <li>"Everyone struggles."</li>
              <li>"I'm not as bad as I used to be."</li>
              <li>"I'll ask for forgiveness tomorrow." etc</li>
            </ul>
            <p className="mb-2 text-sm md:text-base">A hardness of heart, or seared conscience, is a natural condition for human beings to fall into. It can often be a direct result of a lack of repentance. As pursuers of God, we ought to be sensitive to our conscience and sincere about correcting bad patterns of thought so as to honor God (Matthew 12:34b).</p>
            <p className="mb-2 text-sm md:text-base">If you spend more time devising excuses than repenting for sinful thoughts and actions, you are actually saying God's standards is faulty and that His opinion does not matter.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. When You Lose Confidence in Prayer</h4>
            <p className="mb-2 text-sm md:text-base">Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: (Matthew 7:7 NIV)</p>
            <p className="mb-2 text-sm md:text-base">When you doubt that God is interested in answering your prayers, you may begin to doubt that He is interested in you at all. But He is interested in you. The question is: are you interested in hearing what He has to say?</p>
            <p className="mb-2 text-sm md:text-base">Praying for others is also a vital habit for Christians. Do you often fail to pray for people when you promise to pray for them, or do you typically follow through? If you find that prayer matters less and less to you, it is time to start taking counteractive steps to fix this issue.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">4. A Loss of Compassion for Those in Pain</h4>
            <p className="mb-2 text-sm md:text-base">Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you. (Ephesians 4:32 ESV)</p>
            <p className="mb-2 text-sm md:text-base">God may bring people into your life who are suffering or going through hardships that you might serve them. When you refuse to sympathize and help those in need, it could be a pointer of an hardened and a backsliding heart. Not only will you be missing important opportunities to serve, you will also be missing the opportunities to demonstrate your faith practically. And if you are not willing to demonstrate your faith practically, its like saying your faith is no longer important to you. (Matthew 25:34-40).</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base text-[#FF602E]">Prayer Points</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Father, I thanks and praise your holy name, for this blessed day, in Jesus Name.</li>
            <li>Father, search my heart, revive me and help me to find my way back to you, in Jesus name.</li>
          </ol>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base text-[#FF602E]">Quotes</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>Backsliding, generally first begins with neglect of private prayer. <span className="italic">+ J. C. Ryle</span></li>
            <li>Men fall in private long before they fall in public. <span className="italic">+ J. C. Ryle</span></li>
            <li>The best way to avoid going downhill is to stay off the slope. <span className="italic">+ Woodrow Kroll</span></li>
          </ul>
          
          <div className="mt-4">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
            <span className="text-sm md:text-base">John 1 - 10</span>
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
          <p className="mb-2 text-sm md:text-base">Love isn't always comfortable—it's often costly. Jesus didn't just love the lovable; He loved the unlovable, the outcast, the sinner. His love wasn't conditional on behavior or reciprocation. It was a choice, a commitment, a covenant.</p>
          <p className="mb-2 text-sm md:text-base">When we love only those who love us back, we're no different from the world. But when we love the unlovable, we become like Christ. We become His hands, His feet, His heart in a broken world.</p>
          <p className="mb-2 text-sm md:text-base">Today, ask yourself: Who is the "unlovable" person in your life? Who needs your love, even if they don't deserve it? Remember, you were once unlovable too, but God loved you anyway.</p>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Prayer Points</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Father, thank you for loving me when I was unlovable, in Jesus name.</li>
            <li>Lord, give me the grace to love those who are difficult to love, in Jesus name.</li>
            <li>Father, help me to see others through your eyes of love, in Jesus name.</li>
            <li>Lord, break down the walls of prejudice and judgment in my heart, in Jesus name.</li>
            <li>Father, use me as an instrument of your love to the unlovable, in Jesus name.</li>
            <li>Lord, give me the courage to reach out to those who are rejected by society, in Jesus name.</li>
            <li>Father, help me to love without expecting anything in return, in Jesus name.</li>
            <li>Lord, teach me to love like Jesus loved, in Jesus name.</li>
          </ol>
          
          <h4 className="font-semibold mt-4 mb-1 text-sm md:text-base">Quotes</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>"Love is not about finding the perfect person, but about seeing an imperfect person perfectly." <span className="italic">+ Sam Keen</span></li>
            <li>"The greatest act of love is to love someone who doesn't deserve it." <span className="italic">+ Unknown</span></li>
            <li>"Love is the only force capable of transforming an enemy into a friend." <span className="italic">+ Martin Luther King Jr.</span></li>
          </ul>
          
          <div className="mt-4">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
            <span className="text-sm md:text-base">Isaiah 1 - 10</span>
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
    date: '2025-07-29',
    title: 'The Kingdom Givers',
    headline: 'The Kingdom Givers',
    image: '/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse :</span> Matthew 6:38 | ERV<br/>
          <span className="text-xs md:text-sm">Give to others, and you will receive. You will be given much. It will be poured into your hands—more than you can hold. You will be given so much that it will spill into your lap. The way you give to others is the way God will give to you.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> 1 Timothy 6:17-19 | ESV<br/>
          <span className="text-xs md:text-sm">
            17 As for the rich in this present age, charge them not to be haughty, nor to set their hopes on the uncertainty of riches, but on God, who richly provides us with everything to enjoy.<br/>
            18 They are to do good, to be rich in good works, to be generous and ready to share,<br/>
            19 thus storing up treasure for themselves as a good foundation for the future, so that they may take hold of that which is truly life.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Message</h3>
          <p className="mb-2 text-sm md:text-base">Giving to Kingdom projects isn't just an act of charity — it's a choice of covenant commitment, a response to God's call to partner in His purpose. Whether it's organizing crusades, building Churches, sending missionaries, feeding the needy, or funding revival—giving is God's gateway to greater glory. In a world driven by possessions, Kingdom givers choose purpose over profit, and mission over money.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">🪙 1. Sow to Grow – Not Just to Go</h3>
          <p className="mb-2 text-sm md:text-base">Kingdom giving is spiritual sowing, not casual spending. You don't "lose" when you give; you launch your seed into soil that grows spiritual dividends and earthly returns. The Bible in 2 Corinthians 9:6 (NIV) says,</p>
          <p className="mb-2 text-sm md:text-base italic">Whoever sows generously will also reap generously.</p>
          <p className="mb-2 text-sm md:text-base">The world says, "save to gain," but the Word says, "sow to grow." God's economy responds to faithful flow, not fearful hoarding.</p>
          <p className="mb-2 text-sm md:text-base">If you want more in store, be a Kingdom sower, not a selfish storer.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">💎 2. Giving is Living – Not Leaving</h3>
          <p className="mb-2 text-sm md:text-base">Giving is a life-giving grace that echoes into eternity. You may leave wealth, but giving lets you live well—even beyond your years, for "It is more blessed to give than to receive." (Acts 20:35 KJV)</p>
          <p className="mb-2 text-sm md:text-base">Your gift is your gospel—it testifies of God's grace in you. Givers live loudly even in silence. For instance, Steve Jobs left billions—but givers like Mother Teresa left blessings. Learn to not just leave a will, live a witness—by what you give.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">🕊 3. Mission Over Mansion</h3>
          <p className="mb-2 text-sm md:text-base">Seek ye first the Kingdom of God and His righteousness. (Matthew 6:33 KJV)</p>
          <p className="mb-2 text-sm md:text-base">Don't be mansion-minded, rather be mission-moved. Kingdom projects aren't about building empires but about empowering eternity.</p>
          <p className="mb-2 text-sm md:text-base">What you give to earthly buildings may fade, but what you give to heavenly missions will stand forever.</p>
          <p className="mb-2 text-sm md:text-base">Many invest in luxury, few in legacy. Be part of the few.</p>
          <p className="mb-2 text-sm md:text-base italic">Note: Don't just build mansions on earth—fund miracles for Heaven.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">🏗 4. Build the House – Be Blessed at Home</h3>
          <p className="mb-2 text-sm md:text-base italic">Is it a time for you yourselves to be living in your paneled houses, while this house remains a ruin?" (Haggai 1:4 NIV)</p>
          <p className="mb-2 text-sm md:text-base">When you prioritize God's house, God prioritizes your home. Giving is not subtraction—it's spiritual construction.</p>
          <p className="mb-2 text-sm md:text-base">The surest and the fastest way to fix your finances is to fund God's work and family. The foundation of divine fortune is often buried in the funding of God's projects or house.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">🎁 5. From Gift to Glory – Giving is Worship</h3>
          <p className="mb-2 text-sm md:text-base">Honor the Lord with your wealth, with the firstfruits of all your crops. (Proverbs 3:9 NIV)</p>
          <p className="mb-2 text-sm md:text-base">Giving isn't a transaction, it's a transformation. Every gift is a glorious graft into God's eternal purpose.</p>
          <p className="mb-2 text-sm md:text-base">Giving is not a burden; it's a holy act of adoration for your gift, it isn't just a currency, it's a confession of trust in God.</p>
          <p className="mb-2 text-sm md:text-base">Worship without giving is like a lamp without oil—you're present but not impactful.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Prayers</h3>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base">
            <li>Father, I praise and worship your holy name for the blessing of another brand new day, in Jesus Name.</li>
            <li>Ask the Lord to encourage you on the matter of kingdom giving.</li>
          </ol>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">✨ Quotes</h3>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base">
            <li>"You can give without loving, but you cannot love without giving." <span className="italic">+ Amy Carmichael</span></li>
            <li>What you keep you lose. What you give, God uses. <span className="italic">+ Jim Elliot</span></li>
            <li>God prospers me not to raise my standard of living, but to raise my standard of giving. <span className="italic">+ Randy Alcorn</span></li>
            <li>Missions Multiply When Money Meets Ministry. <span className="italic">+ Anonymous</span></li>
          </ul>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">BIBLE IN ONE YEAR</span><br/>
          <span className="text-sm md:text-base">Matthew 1 - 10</span>
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