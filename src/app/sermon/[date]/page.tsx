import Image from 'next/image';
import { notFound } from 'next/navigation';

const sermonData = [
  {
    date: '2025-07-20',
    title: 'Freedom At Last',
    headline: 'Freedom At Last',
    content: (
      <div className="text-white">
        {/* Full content for July 20, 2025 */}
        <div className="mb-4">
          <span className="font-semibold text-[#FF602E] text-sm md:text-base">Bible Reading :</span> Luke 13:10-13 | NKJV<br/>
          <span className="text-xs md:text-sm">10 Now He was teaching in one of the synagogues on the Sabbath.<br/>
          11 And behold, there was a woman who had a spirit of infirmity eighteen years, and was bent over and could in no way raise herself up.<br/>
          12 But when Jesus saw her, He called her to Him and said to her, "Woman, you are loosed from your infirmity."<br/>
          13 And He laid His hands on her, and immediately she was made straight, and glorified God.</span>
        </div>
        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-2 text-[#FF602E]">Introduction</h3>
          <p className="mb-2 text-sm md:text-base">Freedom, in its broadest sense, signifies the power or right to act, speak, or think as one wants without undue restraint or hindrance.<br/>
          It encompasses both individual liberty and collective rights, enabling people to pursue their own paths, express their beliefs, and shape their destinies. Freedom is the absence of restraint.</p>
          {/* ...rest of the content... */}
          <p className="italic text-sm mb-4">(To be cont'd, next week Sunday)</p>
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
        <button
          onClick={() => {/* router.push('/sermon') */}}
          className="mb-6 px-4 py-2 rounded bg-[#FF602E] text-white font-semibold shadow hover:bg-[#ff7f50] transition-colors text-sm sm:text-base"
        >
          ← Back to All Sermons
        </button>
      </div>
      {/* Sermon Content */}
      <div className="max-w-4xl w-full mx-auto text-white rounded-b-lg px-4 sm:px-6 md:px-12 py-6 md:py-8 mt-0 z-10 relative" style={{ backgroundColor: '#0C252E' }}>
        {sermon.content}
      </div>
    </div>
  );
} 