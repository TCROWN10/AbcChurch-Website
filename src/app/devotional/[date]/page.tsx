import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const devotionalData = [
  {
    date: '2026-01-22',
    title: 'Surely There Is A Future',
    headline: 'Surely There Is A Future',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">🌾🌿🌱🍏🌾🌿🌱🍏🌾🌿🌱</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Thursday, January 22nd, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Surely There Is A Future*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Proverbs 23:18 | ESV</span><br/>
          <span className="text-xs md:text-sm">Surely there is a future, and your hope will not be cut off.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : 2 Corinthians 4:16-18 | NKJV</span><br/>
          <span className="text-xs md:text-sm">
            16 Therefore we do not lose heart. Even though our outward man is perishing, yet the inward man is being renewed day by day.<br/><br/>
            17 For our light affliction, which is but for a moment, is working for us a far more exceeding and eternal weight of glory,<br/><br/>
            18 while we do not look at the things which are seen, but at the things which are not seen. For the things which are seen are temporary, but the things which are not seen are eternal.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">The challenge before us all is to keep hope alive in spite of… This means "hoping when things are hopeless. As long as matters are really hopeful, hope is mere flattery or platitude; it is only when everything is hopeless that hope begins to be a strength." Paul says it this way in Romans 8:24-25</p>
          <p className="mb-2 text-sm md:text-base">For in this hope we were saved. But hope that is seen is no hope at all. Who hopes for what he already has? But if we hope for what we do not yet have, we wait for it patiently.</p>
          <p className="mb-2 text-sm md:text-base">We have to learn to keep hope alive when the enemy comes against us. We can not live life without hope. We can not walk around with a bleak outlook on our condition. For as long as God is alive we have a reason to keep hope alive. That is why Lamentation 3:26 says; "[It is] good that [a man] should both hope and quietly wait for the salvation of the LORD."</p>
          <p className="mb-2 text-sm md:text-base">The absence of hope is despair and depression. Indeed, hopelessness leads to a sense of meaninglessness which can be fatal. We have to fight ourselves if we must, in order not to lose hope. For it is a lot harder to regain hope after it is lost, than it is to keep hope alive.</p>
          <p className="mb-4 text-sm md:text-base">There are three things you can do to keep hope alive:</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. *Practice Spiritual Optimism*</h4>
            <p className="mb-2 text-sm md:text-base">Spiritual optimism has to do with looking at your situation with a hopeful outlook no matter how bad things may look like. It is seeing the providential hands of God working for your good even when things are not looking good. It is living with spiritual 20/20 vision. It is trusting that God will make a way out of nowhere.</p>
            <p className="mb-2 text-sm md:text-base">Plug yourself into the word of God for upliftment.</p>
            <p className="mb-2 text-sm md:text-base">Phillipians 4:13 says, "I can do all things..."</p>
            <p className="mb-2 text-sm md:text-base">They that wait upon the Lord shall renew their strength (Isa. 40:31).</p>
            <p className="mb-2 text-sm md:text-base">Being confident of this very thing, that he which hath begun a good work in you will perform [it] until the day of Jesus Christ: (Phillipians 1:6)</p>
            <p className="mb-2 text-sm md:text-base">Always believe that weeping may endure but for one night but joy will come in the morning (Psalm 30:5). See every situation as a learning opportunity. And when keeping hope alive becomes harder and harder, try and position yourself around hopeful people.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. *Position Yourself Around Hopeful People*</h4>
            <p className="mb-2 text-sm md:text-base">One of the worst things that can happen to a believer when passing through hard times is to be surrounded with nay sayers and pessimistic people. You see, the last thing you need to hear when things seems upside down is negative words. The last thing you want to do is to sit around with a group of negative people who are always up for a pity party.</p>
            <p className="mb-2 text-sm md:text-base">Beloved in Christ, when you are trying to keep your hope alive you need to stay away from depressed folks. Stay away from people who do not think that life is worth living. Stay away from people who are battling low self esteem. Stay away from those who don ot think they deserve the best that life has to offer.</p>
            <p className="mb-2 text-sm md:text-base">You have to be careful who you hang out with. Do not hang out with someone with no vision and no sense of purpose. Do not hang around someone who always sees the glass half empty. Avoid people with negative spirits, because negativity is contagious. Instead go with someone with the mindset that all things are possible.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. *Pray With An Expectant Spirit*</h4>
            <p className="mb-2 text-sm md:text-base">You should always expect an answer to your prayer when you pray. You should always expect a breakthrough in times of trouble.</p>
            <p className="mb-2 text-sm md:text-base">To pray without hope is to waste time. Effectual prayer comes from the reservoir of hope and trust in God. Praying with an expectant spirit is to acknowledge the miracle working power of God and its unlimited potential. Indeed, one of the best ways to keep your hope alive is to pray with an expectant spirit. That is faith at its best-substance of things hoped for and the evidence of things not seen.</p>
            <p className="mb-2 text-sm md:text-base">The very act of praying is meaningless if the person who prays does not expect something to happen as a result of the prayer. No matter the nature of your need and the difficulty of your situation, you must pray with an expectant spirit thereby keeping hope alive.</p>
            <p className="mb-2 text-sm md:text-base">Truly, the fervent and effectual prayers of the righteous availeth much. That is, prayer where the person who prays hope for a change in their situation because of that act of talking to God.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">*Conclusion*</h4>
            <p className="mb-2 text-sm md:text-base">The Psalmist says The LORD taketh pleasure in them that fear him, in those that hope in his mercy (Ps. 147:11).</p>
            <p className="mb-2 text-sm md:text-base">Are you struggling to keep hope alive? Are you battling despair and depression? I want to encourage you to keep hope alive. Remember, life is worth the living because Jesus lives.</p>
            <p className="mb-2 text-sm md:text-base">Keep hope alive when things look dark and dreary</p>
            <p className="mb-2 text-sm md:text-base">Keep hope alive when your weakness is greater than your strength.</p>
            <p className="mb-2 text-sm md:text-base">Keep hope alive when your enemies are more numerous than your friends</p>
            <p className="mb-2 text-sm md:text-base">Keep hope alive when your sorrow is more potent than your joy</p>
            <p className="mb-2 text-sm md:text-base">Keep hope alive when your blessings are delayed.</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer Points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, I thank and praise you for your love, grace and faithfulness to me and my loved ones thus far, in Jesus Name.</li>
            <li>Father, let me see the end of every problem that wants to see my end today, in Jesus mighty name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>Hope is being able to see that there is light despite all of the darkness. <span className="italic">+ Desmond Tutu</span></li>
            <li>God grant me the courage not to give up what I think is right even though I think it is hopeless. <span className="italic">+ Chester W. Nimitz</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">🙏 *Good Morning* 🙏</p>
            <p className="text-base md:text-lg font-semibold mb-4">& *God Bless You Today*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Joshua 1 - 10</span>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm md:text-base font-semibold mb-2">*Conneclife Daily Devotional*</p>
            <p className="text-xs md:text-sm mb-1">www.abcchurch.us</p>
            <p className="text-xs md:text-sm mb-2">abcchurchhq@gmail.com</p>
            <p className="text-xs md:text-sm">GodlyConnection | GodlyCollection</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    date: '2026-01-21',
    title: 'Pursuing Specific Purpose',
    headline: 'Pursuing Specific Purpose',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">🏃‍♂️▫️◻️◽⬜🔳⬜🔲◽◻️🏃‍♂️</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Wednesday, January 21st, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Pursuing Specific Purpose*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Proverbs 16:4a | ESV</span><br/>
          <span className="text-xs md:text-sm">The Lord has made everything for its purpose</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : Ephesians 1:4-5 | KJV</span><br/>
          <span className="text-xs md:text-sm">
            4 just as He chose us in Him before the foundation of the world, that we should be holy and without blame before Him in love,<br/><br/>
            5 having predestined us to adoption as sons by Jesus Christ to Himself, according to the good pleasure of His will,
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">Whether you are working to find, prepare for or fulfill your purpose, be intentional to take action toward your Christian goals both inside and out. Below are some principles to follow in the goal-setting and action planning process:</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. *Trust God And Believe In Yourself*</h4>
            <p className="mb-2 text-sm md:text-base">Therefore do not throw away your confidence, which has a great reward. For you have need of endurance, so that when you have done the will of God you may receive what is promised.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Hebrews 10:35-36 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Your confidence is based in knowing that He has designed you and called you to your purpose and He will help you in fulfilling it. Replace any limiting beliefs or negative thoughts with the truth of God's word.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. *Seek To Transform*</h4>
            <p className="mb-2 text-sm md:text-base">All things are lawful for me," but not all things are helpful. "All things are lawful for me," but I will not be dominated by anything.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(1 Corinthians 6:12 ESV)</p>
            <p className="mb-2 text-sm md:text-base">There are areas within yourself and your life where God is leading you to grow. The more you develop the heart of God and mind of Christ, the more you will sense and respond to the Spirit's leading.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. *Keep Focus Of Your Vision*</h4>
            <p className="mb-2 text-sm md:text-base">Let your eyes look directly forward, and your gaze be straight before you.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Proverbs 4:25 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Instead of outside influences always remember that you are moving toward God's plan for your life rather than following the external influences.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">4. *Make Choices That Fits*</h4>
            <p className="mb-2 text-sm md:text-base">The heart of man plans his way, but the Lord establishes his steps.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Proverbs 16:9 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Be authentic and realistic in making decisions about what you do, timing and strategies to avoid unnecessary stress.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">5. *Plan Simple And Clear Action Steps*</h4>
            <p className="mb-2 text-sm md:text-base">Commit your work to the Lord, and your plans will be established.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Proverbs 16:3 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Setting goals that stretch you is beneficial, but make sure your actions are attainable and have a workable schedule so you can build confidence while progressing.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">6. *Make A Plan To Manage Existing or Potential Obstacles.*</h4>
            <p className="mb-2 text-sm md:text-base">External obstacles (eg. overcrowded schedule) or internal obstacles (eg. unhealthy mindsets) must be addressed both before and throughout your action steps.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">7. *Set Up Accountability*</h4>
            <p className="mb-2 text-sm md:text-base">So then each of us will give an account of himself to God.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Romans 14:12 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Set up accountability or support with a friend, group or system when needed. Letting others know what your goals are to help keep you on track can help you more effectively focus and move past doubts and procrastination. Also getting expert support to work on aspects of your path you are struggling with is wise to avoid pitfalls.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">8. *Be Flexible*</h4>
            <p className="mb-2 text-sm md:text-base">The way of a fool is right in his own eyes, but a wise man listens to advice.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Proverbs 12:15 ESV)</p>
            <p className="mb-2 text-sm md:text-base">Be flexible to reverse or change course if something isn't feeling right. If your feelings are based on self-doubts or fears, it may not be a true sign to rework your plan. But if something seems to be taking you farther away from your natural design, passions, vision or purpose foundations, then pray for God to give you guidance on making the right decision.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">*Conclusion*</h4>
            <p className="mb-2 text-sm md:text-base">It may take days, weeks, months or longer to be completely certain of every aspect of your God-given purpose. And though you may start walking in your purpose in one way, it may shift over time to more closely match what God continues to reveal to you. However, these steps will lay the foundation, and as you keep intentionally and prayerfully exploring and experiencing, more details will be revealed in time. Be patient to move within God's pace and timing</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer Points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, please help me to fulfill your desired purpose for my life, in Jesus mighty Name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>Don't try to use God to achieve your purpose. Rather, aim to achieve His. <span className="italic">+ Sunday Adelaja</span></li>
            <li>The intersection of God's sovereignty and human responsibility is where divine purpose unfolds <span className="italic">+ Dr. Lucas D. Shallua</span></li>
            <li>Purpose spurs passion which fans the sparks that light the fires that fuel change. <span className="italic">+ Sir Richard Branson</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">*Good Morning, God Bless You &*</p>
            <p className="text-base md:text-lg font-semibold mb-4">*Bless Your Day*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Deuteronomy 31 - 40</span>
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