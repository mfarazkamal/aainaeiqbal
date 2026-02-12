import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const btnsRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const bioLinkRef = useRef(null);

  useEffect(() => {
    const els = [
      titleRef.current,
      taglineRef.current,
      btnsRef.current,
      card1Ref.current,
      card2Ref.current,
      card3Ref.current,
      bioLinkRef.current,
    ].filter(Boolean);

    gsap.set(els, { opacity: 0, y: 25 });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(titleRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
    })
    .to(taglineRef.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.35")
    .to(btnsRef.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.3")
    .to(card1Ref.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.2")
    .to(card2Ref.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.3")
    .to(card3Ref.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.2")
    .to(bioLinkRef.current, {
      opacity: 1, y: 0, duration: 0.4, ease: "power3.out",
    }, "-=0.2");

    return () => tl.kill();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-6 pt-4 pb-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Title Area ── */}
        <div className="text-center mb-10 md:mb-14">
          <h1
            ref={titleRef}
            className="navbar-logo text-7xl md:text-9xl leading-tight mb-4 select-none"
          >
            آئینۂ اقبال
          </h1>
          <p
            ref={taglineRef}
            className="text-[#C8A961]/70 text-xs md:text-base tracking-[0.3em] uppercase"
          >
            Reflection of Knowledge Towards Reality
          </p>

          {/* CTA Buttons */}
          <div ref={btnsRef} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              target="_blank"
              to="https://forms.gle/fPxL99bGU8dGKSqYA"
              className="border border-[#C8A961]/30 text-[#C8A961] px-8 py-3 rounded-lg text-base tracking-wider hover:bg-[#C8A961]/10 hover:border-[#C8A961]/50 transition-all duration-300"
            >
              Contributor's / معاون
            </Link>
            <Link
              to="/posts"
              className="bg-[#C8A961]/10 border border-[#C8A961]/30 text-[#C8A961] px-8 py-3 rounded-lg text-base tracking-wider hover:bg-[#C8A961]/20 hover:border-[#C8A961]/50 transition-all duration-300"
            >
              پوسٹز / Posts
            </Link>
          </div>
        </div>

        {/* ── Content Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card 1: مقصد */}
          <div ref={card1Ref} className="hero-card post-card rounded-xl p-6 md:p-8">
            <h3 className="text-[#C8A961] text-xl md:text-3xl mb-4 text-right">مقصد</h3>
            <p className="text-gray-300 text-right text-lg md:text-3xl leading-10 md:leading-12" style={{ direction: "rtl" }}>
              بر صغیرِ ہند میں باالخصوص اور پوری دنیا میں باالعموم علامہ اقبال
              کی نظموں اور اشعار کو جو پزیرائی حاصل ہوئی ہے وہ شاید کسی اور کے
              حصے میں نہیں آئی ۔بعض لوگ مطلب اور مفہوم کو سمجھتے ہیں اور اس کا
              حق بھی ادا کرتے ہیں جب کہ اکثریت ایسے لوگوں کی ہے جو اپنی تقریروں
              اور تحریروں میں چار چاند لگانے کے لیے علامہ کی شاعری کا استعمال
              کرتے ہیں لیکن علامہ نے جس درد اور جس فکر میں ڈوب کر یہ اشعار کہے
              ہیں وہ پسِ پشت رہ جاتا ہے۔
            </p>
          </div>

          {/* Card 2: ہماری کوشش */}
          <div ref={card2Ref} className="hero-card post-card rounded-xl p-6 md:p-8">
            <h3 className="text-[#C8A961] text-xl md:text-3xl mb-4 text-right">اس خلا کو پر کرنے کی ایک ناتواں سی سعی و کوشش</h3>
            <p className="text-gray-300 text-right text-lg md:text-3xl leading-10 md:leading-12" style={{ direction: "rtl" }}>
              اشعار کی تشریح اقبالیات کے ماہرین ،جن میں پروفیسریوسف سلیم چشتی
              صاحب ، عارف بتالوی ،ڈاکٹر خواجہ حمیدیزدانی ، ڈاکٹر سلیم اختر صاحب
              وغیرہ کی کتابوں اور آرا٫ کی روشنی میں کی گئی ہے۔اللہ سے دعا ہے کہ
              اللہ تعالیٰ ہمارے اس کام میں مدد فرمائے اور ہمیں اس کام کو آغاز سے
              انجام تک پہونچانے میں مدد فرمائے۔ آمین
            </p>
          </div>
        </div>

        {/* Card 3: صورتِ حال */}
        <div ref={card3Ref} className="hero-card post-card rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-[#C8A961] text-xl md:text-3xl mb-4 text-right">اس وقت صورتِ حال یہ ہے کہ</h3>
          <p className="text-gray-300 text-right text-lg md:text-3xl leading-10 md:leading-12" style={{ direction: "rtl" }}>
            علامہ کے اشعار کو ہم پڑھتے ہیں لیکن افسوس کہ ہم سمجھ نہیں پاتے اور
            جب انکے اشعار کو سمجھنے کے لئے ہم انٹرنیٹ پر کچھ چھان بین کرتے ہیں
            تو وہاں سے بھی ہم کو مایوس ہو کر ہی لوٹنا پڑتا ہے اورعلم کے ذخیروں
            ( کتابوں) سے تو ہماری دلچسپی بالکل ختم ہو کر رہ گئی ہے۔
          </p>
        </div>

        {/* Biography Link */}
        <div ref={bioLinkRef} className="text-center">
          <Link
            to="/biography-allama-iqbal"
            className="text-[#C8A961]/70 text-lg tracking-wider hover:text-[#C8A961] transition-colors duration-300 inline-flex items-center gap-2"
          >
            علامہ اقبال کی زندگی / Life of Allama Iqbal
            <span className="text-xl">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Hero;
