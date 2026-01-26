import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const devotionalData = [
  {
    date: '2026-01-26',
    title: 'The Promise Keeping God',
    headline: 'The Promise Keeping God',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">🍏🍎🍐🍊🍋🤩🍋🍊🍐🍎🍏</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Monday, January 26th, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*The Promise Keeping God*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Deuteronomy 7:9 | ESV</span><br/>
          <span className="text-xs md:text-sm">Know therefore that the Lord your God is God, the faithful God who keeps covenant and steadfast love with those who love him and keep his commandments, to a thousand generations,</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : Lamentations 3:22-23 | ESV</span><br/>
          <span className="text-xs md:text-sm">
            22 The steadfast love of the Lord never ceases; his mercies never come to an end;<br/><br/>
            23 they are new every morning; great is your faithfulness.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">The faithfulness of God is true and has been proven many times. In the Holy Scriptures, we can see that God is faithful and His Word is true. He cannot lie, nor will He break his unconditional promise that He says He will fulfill. Every covenant He made is kept. Every promise will come true.</p>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer Points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, Thank you for the blessing of a new day, in Jesus mighty name.</li>
            <li>Father, fulfill all your promises in my life n this season, in Jesus mighty name.</li>
            <li>Father, speed up the fulfilment of your promises to me now! In Jesus mighty name.</li>
            <li>Father, you promised me to be the head and above all. Please fulfill your promises to me today, in Jesus mighty name.</li>
            <li>Father, you promised me prosperity and abundance, please fulfill your promise to me today, in Jesus mighty name.</li>
            <li>Father, you promised to help me. Please fulfill your promises to me today, in Jesus mighty name.</li>
            <li>Father, you promised me favour from you and from men, please fulfill your promises to me today, in Jesus mighty name.</li>
            <li>Father, you promised me breakthrough at all side, please fulfill your promise to me today, in Jesus mighty name.</li>
            <li>Father, you promised me healing and sound health, please heal me completely today, in Jesus mighty name</li>
            <li>Father, you promised me divine provision, protection and presence, please fulfill your promises to me today, in Jesus mighty name.</li>
            <li>Father, you are the promise keeping God, please fulfill all your beautiful promises to my life today, in Jesus mighty name.</li>
            <li>Father, please remember and fulfill all your beautiful promises to my life today, in Jesus mighty name.</li>
            <li>Father, you promised to fight my battles for me, Arise and fight for me today, in Jesus mighty name</li>
            <li>Father, thank you for all the answers, in Jesus mighty name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>God never made a promise that was too good to be true. <span className="italic">+ D. L. Moody</span></li>
            <li>Great is Thy faithfulness!" Morning by morning new mercies I see; All I have needed Thy hand hath provided. <span className="italic">+ Hymn</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">🙏 *Good Morning* 🙏</p>
            <p className="text-base md:text-lg font-semibold mb-4">& *God Bless You Today*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Judges 11 - 20</span>
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
    date: '2026-01-25',
    title: 'Reasons To Praise The Lord',
    headline: 'Reasons To Praise The Lord',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">✋😆🤚🙏✋😆🤚🙏✋😆🤚</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Sunday, January 25th, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Reasons To Praise The Lord*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse: Hebrews 13:15 | ESV</span><br/>
          <span className="text-xs md:text-sm">Through him then let us continually offer up a sacrifice of praise to God, that is, the fruit of lips that acknowledge his name.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading: Psalm 65:1-13 | KJV</span><br/>
          <span className="text-xs md:text-sm">
            1 Praise waiteth for thee, O God, in Sion: and unto thee shall the vow be performed.<br/><br/>
            2 O thou that hearest prayer, unto thee shall all flesh come.<br/><br/>
            3 Iniquities prevail against me: as for our transgressions, thou shalt purge them away.<br/><br/>
            4 Blessed is the man whom thou choosest, and causest to approach unto thee, that he may dwell in thy courts: we shall be satisfied with the goodness of thy house, even of thy holy temple.<br/><br/>
            5 By terrible things in righteousness wilt thou answer us, O God of our salvation; who art the confidence of all the ends of the earth, and of them that are afar off upon the sea:<br/><br/>
            6 Which by his strength setteth fast the mountains; being girded with power:<br/><br/>
            7 Which stilleth the noise of the seas, the noise of their waves, and the tumult of the people.<br/><br/>
            8 They also that dwell in the uttermost parts are afraid at thy tokens: thou makest the outgoings of the morning and evening to rejoice.<br/><br/>
            9 Thou visitest the earth, and waterest it: thou greatly enrichest it with the river of God, which is full of water: thou preparest them corn, when thou hast so provided for it.<br/><br/>
            10 Thou waterest the ridges thereof abundantly: thou settlest the furrows thereof: thou makest it soft with showers: thou blessest the springing thereof.<br/><br/>
            11 Thou crownest the year with thy goodness; and thy paths drop fatness.<br/><br/>
            12 They drop upon the pastures of the wilderness: and the little hills rejoice on every side.<br/><br/>
            13 The pastures are clothed with flocks; the valleys also are covered over with corn; they shout for joy, they also sing.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">During an awards ceremony, when a person wins a prize or an award, they are praised for their accomplishments and achievements. The person who introduces the winner will spend time telling you why the person who receives the award or prize is deserving of it.</p>
          <p className="mb-2 text-sm md:text-base">In Psalm 65, we see David introducing God as the nominee for the Praise award. David gives a speech in the form of a psalm. David literally writes a song that tells the reader why God deserves praise. David says that "praise is rightfully" God's alone (Psalm 65:1).</p>
          <p className="mb-2 text-sm md:text-base">God deserves my praise. He deserves your praise. David shares seven reasons why God deserves our praises.</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. *He Hears And Answers Our Prayers. (Psalm 65:2)*</h4>
            <p className="mb-2 text-sm md:text-base">People come to God and pray to Him. The reason we do that is because we know that God listens and answers prayer.</p>
            <p className="mb-2 text-sm md:text-base">Knowing that God answers our prayers should give us the reason to shout to Him in praises.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. *We Are Reminded That God Has Paid For Our Sin. (Psalm 65:3)*</h4>
            <p className="mb-2 text-sm md:text-base">Sometimes, you can feel overwhelmed when you realize how much sin and wrong you have done in life. Think of the time when you rejected what God wanted you to do. When you rebelled against His authority. It's in times like these that you have to remind yourself that "where sin multiplied, grace multiplied even more" (Romans 5:20). Only God has been able to make payment for our sins. Only God has been able to eliminate the need for us to pay for our own sins. Only God has been able to put us in a right relationship with Him. God did this through the death of His Son Jesus Christ on the cross.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. *God Wants To Spend Time With Us. (Psalm 65:4)*</h4>
            <p className="mb-2 text-sm md:text-base">God wants to hear our prayers. God has paid for our sins. Why does He do all this? The reason is because God wants to spend time with us.</p>
            <p className="mb-2 text-sm md:text-base">God has chosen us to spend time with us. He has decided to share His goodness with us. He wants to take out of His eternally busy schedule and be with us.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">4. *God Has Proven To Be Our Hope. (Psalm 65:5)*</h4>
            <p className="mb-2 text-sm md:text-base">God deserves our praise because He hears our prayers, paid for our sins, wants to spend time with us, and He is our Hope.</p>
            <p className="mb-2 text-sm md:text-base">God has already shown how He has provided for His people. He sent the plagues to Egypt to deliver His people out of slavery. He parted the Red Sea to provide a way to safety. These are just two of the numerous ways in which God has shown how He has controlled circumstances to provide for His people.</p>
            <p className="mb-2 text-sm md:text-base">But God is the Hope for everyone – "the hope of all the ends of the earth." There are ways in which God has showed each person who trusts in Him a way out of difficulty. He has provided paths of safety for people who have encountered dangers and toils. He does works of might and miracle to provide a way for His people.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">5. *God Controls The Power Of The Earth. (Psalm 65:6-7)*</h4>
            <p className="mb-2 text-sm md:text-base">God deserves our praise, not just because He takes care of us. God deserves our praise because He takes care of the places around us.</p>
            <p className="mb-2 text-sm md:text-base">God created the Earth. He created a place for us to live on Earth. People may fear hurricanes, tornadoes, dustbowls, and floods. Yet, all of these potential environmental catastrophes do not go unnoticed. God controls the Earth He has made. He can calm the roaring sea. He can move mountains. Nature is under God's sovereign control. If God has the Earth under control, then He can certainly take care of us.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">6. *God Makes The Earth Provide For Us. (Psalm 65:9-13)*</h4>
            <p className="mb-2 text-sm md:text-base">There are ways in which we can make the Earth provide for us. We can grow crops, and raise animals. Ultimately, our work depends on God's provision.</p>
            <p className="mb-2 text-sm md:text-base">In Psalm 65, David is reminded that without God, the Earth cannot provide for David's needs. God visits the Earth and waters it. God prepares the Earth so that the Earth can provide for our needs.</p>
            <p className="mb-2 text-sm md:text-base">Nature does not deserve our praise for providing for our needs, God does. Man's ingenuity does not need our praise for providing for our needs. God alone deserves our praise for providing the means of our provision.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">7. *God is Our Source Of Joy. (Psalm 65:8)*</h4>
            <p className="mb-2 text-sm md:text-base">Ultimately, God deserves our praise because He is our Source. He provides for our spiritual needs (Psalm 65:1-5). He also provides for our physical needs (Psalm 65:6-13). He has provided in the past, present, and will continue to do so in the future. He is our Reason for being. He will be our Reason for eternity. Ultimately, we owe our lives to Him. Yet, we should not praise Him with hesitation. Between our spiritual needs (Psalm 65:1-4), and our physical needs (Psalm 65:9-13), God provides for our emotional needs (Psalm 65:8). God is the source of our joy. And because God is the source of our joy, He ultimately will receive our praise, and deservedly so.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Adapted from "7 Reasons God Deserves My Praises" by Jim Erwin)</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, thank you, for your faithfulness thus far, in Jesus mighty name.</li>
            <li>Father you alone deserves my praises, please accept my thanks and praises today, in Jesus mighty name.</li>
          </ol>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">🙏 *Good Morning* 🙏</p>
            <p className="text-base md:text-lg font-semibold mb-4">& *God Bless You Today*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Judges 1 - 10</span>
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
    date: '2026-01-24',
    title: 'The \'Thou Shall\' In Marriage',
    headline: 'The \'Thou Shall\' In Marriage',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">💃💍🏃‍♂️▪▪▫▪▪💃💍🏃‍♂️</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Saturday, January 24th, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*The 'Thou Shall' In Marriage*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Ecclesiastes 4:9-10a | ESV</span><br/>
          <span className="text-xs md:text-sm">9 Two are better than one, because they have a good reward for their toil. 10 For if they fall, one will lift up his fellow.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : 1 Corinthians 13:4-7 | ESV</span><br/>
          <span className="text-xs md:text-sm">
            4 Love is patient and kind; love does not envy or boast; it is not arrogant<br/><br/>
            5 or rude. It does not insist on its own way; it is not irritable or resentful;<br/><br/>
            6 it does not rejoice at wrongdoing, but rejoices with the truth.<br/><br/>
            7 Love bears all things, believes all things, hopes all things, endures all things.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">There are some necessary ingredients for a healthy marriage every child of God should desire and for this to happen, we need to consider these 7 Commandments of Marriage:</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1. *Thou Shalt Serve One Another.*</h4>
            <p className="mb-2 text-sm md:text-base">A good marriage practices mutual submission. Ephesians 5:21 commands us to submit to one another out of reverence to Christ. Marriage is not a 50/50 deal. It's a 100/100 deal—each willing to surrender all to the other person.</p>
            <p className="mb-2 text-sm md:text-base">How are you at serving your spouse? Would they say you strive to serve them more everyday? Are you more the giver or the taker in the relationship? Be honest.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2. *Thou Shalt Love Unconditionally.*</h4>
            <p className="mb-2 text-sm md:text-base">Unconditionally means without conditions. "I'll love you if…" is not the command. It's "I'll love you even if not."</p>
            <p className="mb-2 text-sm md:text-base">God commands us to love even our known enemies, how much more should this commitment be strong within a marriage?</p>
            <p className="mb-2 text-sm md:text-base">Are you loving your spouse even with the flaws that you can see better than anyone else? Here's a quick test:</p>
            <p className="mb-2 text-sm md:text-base">Does the way you communicate with your spouse indicate you have the highest regard for them—always?</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3. *Thou Shalt Respect One Another.*</h4>
            <p className="mb-2 text-sm md:text-base">The Golden Rule covers this one. Everyone wants to be respected—so in any good marriage respect is granted to and by both parties. And, by the way, respect too is to be unconditional.</p>
            <p className="mb-2 text-sm md:text-base">Sometimes, it is easier for one spouse to give than the other, especially the one who works hardest in the marriage. Respect is mostly given because of actions and it is indeed important for both spouses. Most people grant respect only when all conditions are met to be respected. That makes sense, but it doesn't provide motivation to improve when the other party needs it most. All of us need someone who believes in us even when we don't believe in ourselves. That's the grace of respect. When most of us feel respected we will work harder to keep that respect.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">4. *Thou Shalt Put No Other Earthly Relationships Above Your Marriage*</h4>
            <p className="mb-2 text-sm md:text-base">"Let not man put asunder" is not just a good King James Version wedding line. It's God's desire for a healthy marriage. Great couples strive to allow no one—even children—even in-laws—to get in the way of building a healthy marriage.</p>
            <p className="mb-2 text-sm md:text-base">We've seen many marriages been ruined because the children came first or the in-laws interfered. We've seen marriages ruined by friends—sometimes co-workers—who had little regard for the integrity of the marriage, and so they built a wedge between the couple. As hard as it is sometimes, great couples work to protect the marriage from every outside interruption.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">5. *Thou Shalt Commit Beyond Feelings.*</h4>
            <p className="mb-2 text-sm md:text-base">The Bible talks a great deal about the renewal of our mind (Romans 12:2, for example). The mind is more reliable than emotions. You may not always feel as in love as you did the day you got married. There will be tough seasons in any marriage.</p>
            <p className="mb-2 text-sm md:text-base">Strong marriages last because they have a commitment beyond their emotional response to each other. And when that's true for both parties, feelings almost always reciprocate and grow over time.</p>
            <p className="mb-2 text-sm md:text-base">As true and necessary as this is, great marriage partners continue to pursue each other—they date one another—fostering the romantic feelings that everyone craves in a relationship. Sobering question: When's the last time you pursued your spouse?</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">6. *Thou Shalt Consider The Other Person's Interest Ahead Of Thine Own.*</h4>
            <p className="mb-2 text-sm md:text-base">Again, we are commanded to consider other's interest in our relationships. How much more should we in marriage?</p>
            <p className="mb-2 text-sm md:text-base">Over the years, as couples get comfortable with one another, some become very selfish with their individual time. Sometimes, for example, one spouse pursues a hobby that excludes the other one, and more and more time is committed to that hobby. The other spouse begins to feel neglected. It may be allocation of time, in actions or the words used to communicate, but sometimes a spouse can make the other spouse feel they are no longer valuable to them.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">7. *Thou Shalt Complete One Another.*</h4>
            <p className="mb-2 text-sm md:text-base">The Biblical command is one flesh (Ephesians 5). Do you think that's anymore possible than the command that our individual flesh be molded into the image of Christ.</p>
            <p className="mb-2 text-sm md:text-base">It's a command we obey in process. We are saints still under construction. We still sin. And that process isn't completed here on earth in my opinion. So it is in a marriage. We never completely "get there," but we set such a high standard for our marriage that we continue to press towards the goal.</p>
            <p className="mb-2 text-sm md:text-base">There is no better place where "iron sharpens iron" than in a marriage.</p>
            <p className="mb-2 text-sm md:text-base">There are qualities in one spouse needed by the other to become one flesh but that's a process that takes time, humility, and intentionality.</p>
            <p className="mb-2 text-sm md:text-base">One question couples should always ask themselves is: Are we becoming closer as a couple—or are we drifting further apart?</p>
            <p className="mb-2 text-sm md:text-base">That's a great question to ask frequently throughout the marriage.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">*Conclusion*</h4>
            <p className="mb-2 text-sm md:text-base">These are obviously not the "10 Commandments." They aren't even necessarily God's commandments—although they are based on the commands of God.</p>
            <p className="mb-2 text-sm md:text-base">The point is to take Biblical principles and apply them to our marriage.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Adapted for "The 7 Commandments of Christian Marriage" by Pastor Ron Edmondson of Immanuel Baptist Church)</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer Points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, intervene in every Christian home today and let there be peace and understanding, in Jesus mighty name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>Marriage is like a graph—it has its ups and downs and as long as things bounce back up again, you've got a good marriage. If it heads straight down, then you've got some problems! <span className="italic">+ Julie Andrews</span></li>
            <li>Happy is the man who finds a true friend, and far happier is he who finds that true friend in his wife. <span className="italic">+ Franz Schubert</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">🙏 *Good Morning* 🙏</p>
            <p className="text-base md:text-lg font-semibold mb-4">& *God Bless You Today*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Joshua 21 - 30</span>
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
    date: '2026-01-23',
    title: 'Greater Tomorrow',
    headline: 'Greater Tomorrow',
    image: '/images/content/Devotional-iHero.png',
    content: (
      <div className="text-white">
        <div className="mb-4 text-center">
          <p className="text-lg md:text-xl mb-2">😍😂😍▫🤩😀🤩▫😍😂😍</p>
          <p className="font-bold text-base md:text-lg mb-1">*All Believers Christian Church*</p>
          <p className="font-bold text-base md:text-lg mb-4">*CONNECTLife Daily Devotional*</p>
          <p className="text-sm md:text-base mb-4">Friday, January 23rd, 2026</p>
          <p className="font-bold text-lg md:text-xl mb-6">*Greater Tomorrow*</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Memory Verse : Jeremiah 29:11 | ESV</span><br/>
          <span className="text-xs md:text-sm">For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading : Phillipians 4:6-8 | NKJV</span><br/>
          <span className="text-xs md:text-sm">
            6 Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.<br/><br/>
            7 And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">*Message*</h3>
          <p className="mb-2 text-sm md:text-base">Despite scientific advancements, greater education, fewer diseases, longer life expectancy and more money and resources than ever before in history, this age is known not for its peace, but for its persistent anxiety.</p>
          <p className="mb-2 text-sm md:text-base">This generation is plagued with fear, and has become so familiar with it that anxiety has almost become fashionable, something to embrace and refer to as "mine".</p>
          <p className="mb-2 text-sm md:text-base">Terror and panic are things we know very well and experience daily as the uncertainties of life increase. But we can take heart in knowing that in Christ Jesus we do not need to fear the future. Here are three reasons why:</p>
          
          <div className="mb-4 mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">1 *God's Is In Charge of All Circumstances*</h4>
            <p className="mb-2 text-sm md:text-base">Your present circumstances are known, understood and allowed by the Lord. He is seated on His throne, above the sphere of the Earth and has a plan not just for your life, but for the entire universe! He has not lost control. His wisdom and sovereignty are perfect, even in a seemingly chaotic world, and He is never surprised.</p>
            <p className="mb-2 text-sm md:text-base">Be encouraged Beloved, heaven is never in a hurry so you do not need to worry. Feel free to rest in the peace of God- that is, the confidence that God is in control and that as you love Him and walk in His calling for your life, you can relax in His loving leadership, even when you do not understand everything.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">2 *God Is In Charge Of Your Life*</h4>
            <p className="mb-2 text-sm md:text-base">He not only holds your world in His hands, He also holds you. Do not forget, you are worth more than many sparrows.</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-sm md:text-base mb-2 text-[#FF602E]">3 *Jesus Is Already in Your Future*</h4>
            <p className="mb-2 text-sm md:text-base">Fortunately, we serve the eternally present God "I AM", the Alpha, Omega and everything in between. He stands outside of time, and dwells in eternity present. All of our times, past present and future are laid out like a beautiful tapestry before Him. Heaven is never in a hurry, and the Lord is never caught by surprise. He already knows, He already sees, and He has already made provision.</p>
            <p className="mb-2 text-sm md:text-base">Consider the provision made for our sin before we even fell - Look at the Lamb of God, slain before the foundation of the earth. His foreknowledge is perfect, and comforting. You can rejoice in His sovereignty, and rest in His perfection and thoroughness.</p>
            <p className="mb-2 text-sm md:text-base">"Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.</p>
            <p className="mb-2 text-sm md:text-base italic text-xs md:text-sm">(Matthew 6:34 ESV)</p>
          </div>
          
          <h4 className="font-semibold mt-4 mb-2 text-sm md:text-base text-[#FF602E]">*Prayer points*</h4>
          <ol className="list-decimal list-inside ml-2 md:ml-4 mb-2 text-sm md:text-base space-y-1">
            <li>Father, thank you for your faithfulness thus far and thank you for a better and greater tomorrow, in Jesus mighty name.</li>
          </ol>
          
          <h4 className="font-semibold mt-6 mb-2 text-sm md:text-base text-[#FF602E]">*Quotes*</h4>
          <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-sm md:text-base space-y-2">
            <li>Never be afraid to trust an unknown future to a known God. <span className="italic">+ Corrie ten Boom</span></li>
            <li>If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present. <span className="italic">+ Roy T. Bennett</span></li>
          </ul>
          
          <div className="mt-6 text-center mb-4">
            <p className="text-base md:text-lg font-semibold mb-1">🙏 *Good Morning* 🙏</p>
            <p className="text-base md:text-lg font-semibold mb-4">& *God Bless You Today*</p>
          </div>
          
          <div className="mt-4 mb-6">
            <span className="font-semibold text-[#FF602E] text-sm md:text-base">*BIBLE IN ONE YEAR*</span><br/>
            <span className="text-sm md:text-base">Joshua 11 - 20</span>
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