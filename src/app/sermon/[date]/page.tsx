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
          src="/Sermon-image.png"
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