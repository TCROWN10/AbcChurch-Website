import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const sermonData = [
  {
    date: '2025-07-20',
    title: 'Freedom At Last',
    headline: 'Freedom At Last',
    content: (
      <div className="text-white">
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Luke 13:10-13 | NKJV<br/>
          <span className="text-xs md:text-sm">
            10 Now He was teaching in one of the synagogues on the Sabbath.<br/>
            11 And behold, there was a woman who had a spirit of infirmity eighteen years, and was bent over and could in no way raise herself up.<br/>
            12 But when Jesus saw her, He called her to Him and said to her, “Woman, you are loosed from your infirmity.”<br/>
            13 And He laid His hands on her, and immediately she was made straight, and glorified God.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Introduction</h3>
          <p className="mb-2 text-sm md:text-base">Freedom, in its broadest sense, signifies the power or right to act, speak, or think as one wants without undue restraint or hindrance.<br/>
          It encompasses both individual liberty and collective rights, enabling people to pursue their own paths, express their beliefs, and shape their destinies. Freedom is the absence of restraint.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Type of Freedom</h3>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li><b>Individual / Communal Liberty:</b> Freedom often refers to the ability to act without external constraints, such as physical confinement or legal restrictions. (Boundary reflects bondage)</li>
            <li><b>Liberty Of Choice and Action:</b> It implies the power to make decisions and take actions without being forced or coerced. (If you have to drink, drug or smoke under pressure, then you're in bondage)</li>
            <li><b>Political Freedom:</b> This includes the right to participate in the political process, vote, and hold office.</li>
            <li><b>Economic Freedom:</b> This can refer to the ability to pursue economic opportunities, own property, and engage in free markets.</li>
            <li><b>Religious Freedom:</b> This involves the right to practice one's religion without interference or coercion. (There's a sharp difference between religious freedom and Spiritual freedom)</li>
            <li><b>Spiritual Freedom:</b> This is liberation from sin, Satan and flesh by faith in the Lord Jesus Christ.</li>
            <li><b>Freedom of Speech:</b> This fundamental right allows individuals to express their opinions and ideas without censorship or fear of reprisal.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">How To Activate Your Freedom (Philippians 2:12b NLT)</h3>
          <p className="mb-2 text-sm md:text-base">Work hard to show the results of your salvation, obeying God with deep reverence and fear</p>
          <p className="mb-2 text-sm md:text-base">Note: Salvation is free by faith through our Lord Jesus Christ yet, there are accompanying works to be done in order to attain the perfection level, such as:</p>
          <ol className="list-decimal pl-6 mb-2 text-sm md:text-base">
            <li>Work hard on Yourself</li>
            <li>Work hard on Your Situation</li>
            <li>Work hard on Your Strength</li>
            <li>Work hard on Your Soul</li>
            <li>Work hard on Your Skill</li>
            <li>Work hard on your salvation</li>
            <li>Work hand-In-hand with the Holy Spirit</li>
          </ol>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">1. Work hard on Yourself</h3>
          <p className="mb-2 text-sm md:text-base">What, then, shall we say in response to these things? If God is for us, who can be against us? (Romans 8:31, 28-30).</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>No one or demon can be against you except yourself, therefore,</li>
            <li>Work hard on (your) self discipline & determination</li>
            <li>You can be your better self</li>
            <li>Stop excusing your weaknesses</li>
            <li>Do your best to be:
              <ul className="list-disc pl-6">
                <li>Physically fit and admirable</li>
                <li>Mentally fit and serviceable</li>
                <li>Medically fit and manageable</li>
                <li>Maritally stable and dependable</li>
                <li>Financially buoyant and Charitable</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">2. Work hard on Your Situation</h3>
          <p className="mb-2 text-sm md:text-base">The situation of this city is pleasant, as my lord seeth: but the water is naught, and the ground barren. (2Kg 2:19 KJV)</p>
          <p className="mb-2 text-sm md:text-base">This city's location is as good as you will ever find. But the water is bad, and the land cannot grow crops. (2 Kg 2:19b GWT)</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>Work hard to better your current situation</li>
            <li>No two situations are the same.</li>
            <li>Special problem requires special solutions</li>
            <li>Special situations require special actions.</li>
          </ul>
          <p className="mb-2 text-sm md:text-base">Note: if your problem is spiritual, it can only be solved spiritual means and not by medical, psychological or other means.</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>You need to take steps and You should take steps now!</li>
            <li>Don't resign to fate</li>
            <li>Your situation, isn't your definition, neither is it your destination.</li>
            <li>Work hard to go places</li>
          </ul>
        </div>
        <p className="italic text-sm mb-4">(To be cont'd, next week Sunday)</p>
      </div>
    ),
  },
  {
    date: '2025-07-27',
    title: 'Free At Last I & II',
    headline: 'Free At Last I & II',
    content: (
      <div className="text-white">
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Luke 13:10-13<br/>
          <span className="text-xs md:text-sm">
            10 And he was teaching in one of the synagogues on the sabbath.<br/>
            11 And, behold, there was a woman which had a spirit of infirmity eighteen years, and was bowed together, and could in no wise lift up herself.<br/>
            12 And when Jesus saw her, he called her to him, and said unto her, Woman, thou art loosed from thine infirmity.<br/>
            13 And he laid his hands on her: and immediately she was made straight, and glorified God.
          </span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Introduction</h3>
          <p className="mb-2 text-sm md:text-base">Freedom, in its broadest sense, signifies the power or right to act, speak, or think as one wants without undue restraint or hindrance.<br/>
          It encompasses both individual liberty and collective rights, enabling people to pursue their own paths, express their beliefs, and shape their destinies. Freedom is the absence of restraint.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Type of Freedom</h3>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li><b>Individual / Communal Liberty:</b> Freedom often refers to the ability to act without external constraints, such as physical confinement or legal restrictions. (Boundary reflects bondage)</li>
            <li><b>Liberty Of Choice and Action:</b> It implies the power to make decisions and take actions without being forced or coerced. (If you have to drink, drug or smoke under pressure, then you're in bondage)</li>
            <li><b>Political Freedom:</b> This includes the right to participate in the political process, vote, and hold office.</li>
            <li><b>Economic Freedom:</b> This can refer to the ability to pursue economic opportunities, own property, and engage in free markets.</li>
            <li><b>Religious Freedom:</b> This involves the right to practice one's religion without interference or coercion. (There's a sharp difference between religious freedom and Spiritual freedom)</li>
            <li><b>Spiritual Freedom:</b> This is liberation from sin, Satan and flesh by faith in the Lord Jesus Christ.</li>
            <li><b>Freedom of Speech:</b> This fundamental right allows individuals to express their opinions and ideas without censorship or fear of reprisal.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">How To Activate Your Freedom</h3>
          <p className="mb-2 text-sm md:text-base">...work out your own salvation with fear and trembling.(Philippians 2:12)</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">1. Work hard on Yourself</h3>
          <p className="mb-2 text-sm md:text-base">What, then, shall we say in response to these things? If God is for us, who can be against us? (Romans 8:31, 28-30).</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>Work hard on self discipline & determination</li>
            <li>You can be your better self</li>
            <li>Stop excusing your weaknesses</li>
            <li>Do your best to be:
              <ul className="list-disc pl-6">
                <li>Physically fit and admirable</li>
                <li>Mentally fit and serviceable</li>
                <li>Medically fit and manageable</li>
                <li>Maritally stable and charitable</li>
                <li>Financially buoyant and dependable</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">2. Work hard on Your Situation</h3>
          <p className="mb-2 text-sm md:text-base">The situation of this city is pleasant, as my lord seeth: but the water is naught, and the ground barren. (2Kg 2:19 KJV)</p>
          <p className="mb-2 text-sm md:text-base">This city's location is as good as you will ever find. But the water is bad, and the land cannot grow crops. (2 Kg 2:19b GWT)</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>No two situations are the same.</li>
            <li>Special problem requires special solutions</li>
            <li>Terrible situations requires terrible actions.</li>
          </ul>
          <p className="mb-2 text-sm md:text-base">Note: if your problem is spiritual, it can't be solved by medical or psychological means</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>You can take steps and You should take steps</li>
            <li>Don't resign to fate</li>
            <li>No Situation is Permanent</li>
            <li>Your situation, isn't your definition, neither is it your destination.</li>
            <li>Work hard and you'll go places</li>
            <li>You situation can improve positively</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">3. Work hard on Your Strength</h3>
          <p className="mb-2 text-sm md:text-base">Proverbs 24:10 - If you faint in the day of adversity, your strength is small</p>
          <p className="mb-2 text-sm md:text-base">1 Corinthians 10:13 ESV - No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.</p>
          <p className="mb-2 text-sm md:text-base">Isaiah 40:29 ESV - He gives power to the faint, and to him who has no might he increases strength.</p>
          <p className="mb-2 text-sm md:text-base">Your strength can be improved upon.</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>Make conscious effort to be strong in the Lord - Ephesians 6:10</li>
            <li>Ask the Lord for help and grace to overcome your weaknesses</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">4. Work hard on Your Soul</h3>
          <p className="mb-2 text-sm md:text-base"><b>The soul is precious</b></p>
          <p className="mb-2 text-sm md:text-base">Matthew 16:26 ESV - For what will it profit a man if he gains the whole world and forfeits his soul? Or what shall a man give in return for his soul?</p>
          <p className="mb-2 text-sm md:text-base"><b>The soul is flexible</b></p>
          <p className="mb-2 text-sm md:text-base">Romans 12:2 - You can be free from demons and demonic manipulations. (Addictions have spirit) If you need spiritual Deliverance, ask for it.</p>
          <p className="mb-2 text-sm md:text-base"><b>The soul can be deceitful</b></p>
          <p className="mb-2 text-sm md:text-base">Jeremiah 17:9 NLT - The human heart is the most deceitful of all things, and desperately wicked. Who really knows how bad it is?</p>
          <p className="mb-2 text-sm md:text-base">Psalm 103:1 - Bless the Lord, O my soul, and all that is within me, bless his holy name! Bless, worship, serve the Lord, O my soul</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">5. Work hard on Your Skill</h3>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>Find something to do,</li>
            <li>Find a vocation to learn</li>
            <li>Stop being idle or lazy</li>
            <li>Stop being a liability</li>
            <li>Hire yourself, if no one hires you.</li>
            <li>Choose to be creative,</li>
            <li>You can be free from begging, if you would learn a trade.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">6. Work hard on your Salvation</h3>
          <p className="mb-2 text-sm md:text-base">...work out your own salvation with fear and trembling.(Philippians 2:12)</p>
          <p className="mb-2 text-sm md:text-base">Salvation is by faith for the willing and the obedient (Isaiah 1:19)</p>
          <p className="mb-2 text-sm md:text-base">Salvation is free by faith in Christ Jesus</p>
          <ul className="list-disc pl-6 mb-2 text-sm md:text-base">
            <li>Reading the Bible is hardwork</li>
            <li>Praying is hardwork</li>
            <li>Fasting is hardwork</li>
            <li>Forgiveness is hardwork</li>
            <li>Obedience is hard</li>
            <li>Kingdom giving is hardwork</li>
            <li>Evangelism is hardwork</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">7. Work hand-In-hand with the Holy Spirit</h3>
          <p className="mb-2 text-sm md:text-base"><b>Liberty through the Holy Spirit</b></p>
          <p className="mb-2 text-sm md:text-base">Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty. (2 Corinthians 3:17)</p>
          <p className="mb-2 text-sm md:text-base"><b>Liberty by the help of the Holy Spirit</b></p>
          <p className="mb-2 text-sm md:text-base">Likewise the Spirit helps us in our weakness...(Romans 8:26 ESV)</p>
          <p className="mb-2 text-sm md:text-base"><b>The Spirit of Power</b></p>
          <p className="mb-2 text-sm md:text-base">For God has not given us a spirit of fear, but of power, love, and self-control.(2 Timothy 1:7)</p>
          <p className="mb-2 text-sm md:text-base">For as many as are led by the Spirit of God, they are the sons of God</p>
          <p className="mb-2 text-sm md:text-base">Be Led by the Holy Spirit and not by zodiac signs and other demonic influences.</p>
          <p className="mb-2 text-sm md:text-base">Walk with the Holy Spirit and He will work in you and with you.</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Prayers</h3>
          <p className="mb-2 text-sm md:text-base">Father! Set me completely free today, in the name of Jesus.</p>
        </div>
      </div>
    ),
  },
  // Add more sermon days here as needed
];

export default async function SermonByDatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const sermon = sermonData.find((s) => s.date === date);
  if (!sermon) return notFound();

  // Format the date for display
  const dateObj = new Date(sermon.date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const displayDate = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/Sermon-image.png"
          alt="Sermon Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">{sermon.headline}</h1>
          <div className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">{displayDate}</div>
        </div>
      </div>
      {/* Back Button */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-12 mt-4">
        <Link
          href="/sermon"
          className="inline-block mb-6 px-4 py-2 rounded bg-[#FF602E] text-white font-semibold shadow hover:bg-[#ff7f50] transition-colors text-sm sm:text-base"
        >
          ← Back to All Sermons
        </Link>
      </div>
      {/* Sermon Content */}
      <div className="max-w-4xl w-full mx-auto text-white rounded-b-lg px-4 sm:px-6 md:px-12 py-6 md:py-8 mt-0 z-10 relative" style={{ backgroundColor: '#0C252E' }}>
        {sermon.content}
      </div>
    </div>
  );
} 