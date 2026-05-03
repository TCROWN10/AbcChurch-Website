import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const sermonData = [
  {
    date: '2026-05-03',
    title: 'Obedience: The gateway to Glory, Guidance and Greatness',
    headline: 'Obedience: The gateway to Glory, Guidance and Greatness',
    content: (
      <div className="text-white">
        <div className="mb-6 text-center md:text-left">
          <p className="font-semibold text-[#FF602E] text-sm md:text-base mb-1">Sunday Service Sermon</p>
          <p className="text-[#FFDECC] text-sm mb-2">May 3rd, 2026 · By Pastor Emmanuel Bolaji</p>
          <p className="text-sm md:text-base italic text-[#FFDECC]/90 mb-2">Obedience is Better · 1 Samuel 15:22</p>
          <p className="text-base md:text-lg font-semibold text-white">
            OBEDIENCE: The Gateway to Glory, Guidance, and Greatness.
          </p>
          <p className="text-xs md:text-sm text-[#FFDECC]/80 mt-1">1 Samuel 15:22</p>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-sm md:text-base leading-relaxed">
            Obedience is the master key of God&apos;s Kingdom. It is the bridge between instruction and manifestation,
            between promise and performance, between hearing God and experiencing God. The Bible in 1 Samuel 15:22
            exhorts, saying, &quot;To obey is better than sacrifice...&quot; It&apos;s observed that truly, many pray
            but only few obey, and while many believe, it&apos;s just a few that follow through. Yet, God responds more
            to obedience than to emotion.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-3 text-[#FF602E]">Bible Verses</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
            <li>
              <strong>1 Samuel 15:22:</strong> &quot;Has the Lord as great delight in burnt offerings and sacrifices, as in
              obeying the voice of the Lord? Behold, to obey is better than sacrifice...&quot;
            </li>
            <li>
              <strong>Ecclesiastes 12:13:</strong> &quot;Fear God and keep his commandments, for this is the whole duty
              of man&quot;.
            </li>
            <li>
              <strong>Deuteronomy 28:1-2:</strong> &quot;If you fully obey the Lord your God... All these blessings will come
              on you...&quot;
            </li>
            <li>
              <strong>Isaiah 1:19:</strong> &quot;If you are willing and obedient, you shall eat the good of the land.&quot;
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-3 text-[#FF602E]">Reasons To Choose Obedience (1 Samuel 15:22)</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
            <li>
              <strong>Obedience is better than Sacrifice:</strong> self denial / inconvenience to satisfy a condition (1 Cor
              13:1-3).
            </li>
            <li>
              <strong>Obedience is better than Services:</strong> self-designed activity (ies) to impress (Lk 10:42).
            </li>
            <li>
              <strong>Obedience is better than Sanity:</strong> state of the mind or mood relating to a subject (John 2:7).
            </li>
            <li>
              <strong>Obedience is better than Sanctity:</strong> state of being holy or inviolability (Hebrews 12:14).
            </li>
            <li>
              <strong>Obedience is better than Sensibility:</strong> it may not make sense or be generally accepted
              (Isaiah 53:1, Lk 5:4).
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-4 text-[#FF602E]">Vertical Representation: O‑B‑E‑D‑I‑E‑N‑C‑E</h3>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 O – OBEDIENCE OPENS OPPORTUNITIES</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Isaiah 1:19</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;If ye be willing and obedient, ye shall eat the good of the land.&quot;
            </p>
            <p className="text-sm md:text-base mb-2">Obedience is the key that unlocks divine doors.</p>
            <p className="text-sm md:text-base mb-2">
              Abraham obeyed and stepped into covenant blessings (Genesis 12). Closed doors are often not spiritual attacks
              but missed instructions.
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 B – OBEDIENCE BRINGS BLESSINGS</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Deuteronomy 28:2</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;All these blessings will come on you and accompany you if you obey...&quot;
            </p>
            <p className="text-sm md:text-base mb-2">Blessings don&apos;t just come—they follow obedience.</p>
            <p className="text-sm md:text-base">
              Isaac obeyed in famine, stayed, sowed and prospered the same year (Genesis 26:12).{' '}
              <strong>Obedience attracts blessings even in dry seasons.</strong>
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 E – OBEDIENCE ESTABLISHES EXCELLENCE</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Joshua 1:8</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;Be careful to do everything written... then you will be prosperous and successful.&quot;
            </p>
            <p className="text-sm md:text-base mb-2">
              Excellence is not talent; it is consistent obedience to divine principles. Joshua followed instructions
              precisely and he became successful (Josh 1:8). Obedience turns ordinary effort into extraordinary results.
              Esther obediently followed the advice of Hegai, the king&apos;s eunuch, in her beauty regimen and attire,
              which helped her win favor (Esther 2:15).
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 D – OBEDIENCE DEMANDS DISCIPLINE</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Hebrews 5:8</p>
            <p className="italic text-sm md:text-base mb-2">&quot;Though he were a Son, yet learned he obedience...&quot;</p>
            <p className="text-sm md:text-base">
              Obedience is not automatic; it is trained and practiced. Even Jesus Christ learned obedience through
              suffering—for obedience isn&apos;t easy, and if it were, everyone would be great.
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 I – OBEDIENCE IGNITES INCREASE</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Luke 5:5-6</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;Because you say so, I will let down the nets...&quot;
            </p>
            <p className="text-sm md:text-base mb-2">
              Increase is triggered when instruction is obeyed. Peter&apos;s obedience got him a net-breaking miracle. One
              act of obedience can rewrite your entire story and repay all your wasted years or efforts.
            </p>
            <p className="text-sm md:text-base font-medium text-[#FFDECC]">
              For someone out there I prophesy: all your wasted or lost years, efforts or opportunities shall be restored to
              you double from today, in Jesus Name.
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 E – OBEDIENCE ENGAGES ENCOUNTERS</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Exodus 3:4</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;When the Lord saw that he (Moses) turned aside... God called unto him...&quot;
            </p>
            <p className="text-sm md:text-base mb-2">
              The Lord will turn to you today if you turn to Him in obedience to His Word.{' '}
              <strong>Note:</strong> God only reveals Himself to those who respond to Him in obedience. Moses obeyed the
              divine prompting in the burning bush encounter and his life never remained the same.
            </p>
            <p className="text-sm md:text-base font-medium text-[#FFDECC] mb-2">
              From today, your life will not remain the same, in Jesus Name.
            </p>
            <p className="text-sm md:text-base">
              Remember: divine encounters are hidden in simple acts of obedience, and if you follow His voice, you will see
              His hand.
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 N – OBEDIENCE NAVIGATES DESTINY</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Proverbs 3:6</p>
            <p className="italic text-sm md:text-base mb-2">
              &quot;In all your ways submit to him, and he will make your paths straight.&quot;
            </p>
            <p className="text-sm md:text-base mb-2">
              Obedience is heaven&apos;s navigation system. Joseph followed divine direction; though the road was rough and
              long, at the end he ended up in the palace. Always trust the Instructor (God) even when the instructions sound
              foolish.
            </p>
            <p className="text-sm md:text-base">
              <strong>Note:</strong> Disobedience delays destiny; obedience delivers it.
            </p>
          </div>

          <div className="mb-6 pb-6 border-b border-[#FF602E]/20">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 C – OBEDIENCE CONQUERS CHALLENGES</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Joshua 6:20</p>
            <p className="italic text-sm md:text-base mb-2">&quot;The wall collapsed...&quot;</p>
            <p className="text-sm md:text-base mb-2">
              Victory often hides behind unusual instructions. Jericho&apos;s wall fell through obedient marching, not
              through military strategy. Military strategy would have been good, but heavenly strategy was best—for what
              looks foolish to man may be powerful before God.
            </p>
          </div>

          <div className="mb-2">
            <p className="font-semibold text-[#FFDECC] mb-2">🔥 E – OBEDIENCE ENDS IN ELEVATION</p>
            <p className="text-xs md:text-sm text-[#FF602E] mb-2">📖 Philippians 2:9</p>
            <p className="italic text-sm md:text-base mb-2">&quot;Therefore God exalted him...&quot;</p>
            <p className="text-xs md:text-sm mb-3">&quot;Righteousness exalts a nation...&quot; (Prov 14:34)</p>
            <p className="text-sm md:text-base mb-2">
              <strong>Every true obedience produces elevation.</strong> Even Jesus Christ was never exalted until He was
              complete in obedience. Likewise, your promotion is tied to your obedience, and your obedience today is your
              promotion tomorrow.
            </p>
            <p className="text-sm md:text-base font-semibold text-[#FF602E]">
              Your next level is hidden in your next obedience.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-base md:text-lg mb-3 text-[#FF602E]">Conclusion</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
            <li>Obedience to forgive may hurt but it heals deeper than the hurt.</li>
            <li>Obedience may feel painful but it produces powerful outcomes.</li>
            <li>Obedience is the proof of love for God (John 14:15).</li>
            <li>Obedience converts prophecy into reality.</li>
            <li>Obedience is the difference between potential and performance.</li>
            <li>Obedience is better than explanation.</li>
            <li>Delayed obedience is silent disobedience.</li>
            <li>God&apos;s instructions are not suggestions.</li>
            <li>Obedience is not always easy but it&apos;s always rewarding.</li>
          </ul>
        </div>

        <div className="mb-4 rounded-lg border border-[#FF602E]/40 bg-[#18313B]/50 p-4 text-sm md:text-base">
          <h3 className="font-bold text-base md:text-lg mb-3 text-[#FF602E]">Further information</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-0">
            <li>
              <span className="font-semibold text-[#FFDECC]">Visit our:</span>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Website:{' '}
                  <a
                    href="https://www.abcchurch.us"
                    className="text-[#FF602E] underline hover:text-[#ff7f50]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.abcchurch.us
                  </a>
                </li>
                <li>Download the Church app</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold text-[#FFDECC]">Contact us:</span>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Phone / Text:</strong>{' '}
                  <a href="tel:+15638891930" className="text-[#FF602E] underline hover:text-[#ff7f50]">
                    +1 563 889 1930
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:abcchurchhq@gmail.com"
                    className="text-[#FF602E] underline hover:text-[#ff7f50]"
                  >
                    abcchurchhq@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Facebook:</strong>{' '}
                  <a
                    href="https://www.facebook.com/abcchurchDavenportIA"
                    className="text-[#FF602E] underline hover:text-[#ff7f50]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.facebook.com/abcchurchDavenportIA
                  </a>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    ),
  },
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