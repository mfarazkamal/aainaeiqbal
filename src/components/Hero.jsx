import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-[#373434]  p-6 md:p-12 text-white border-t-4 border-gray-300 mb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Heading and First Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Right Side: Site Name and Tagline (Order changed for Desktop) */}
          <div className="md:order-2 flex flex-col gap-8 justify-center items-center md:items-end md:text-right">
            <h1 className="text-6xl w-full text-center md:text-[10rem] mb-2">
              آئینہ اقبال
            </h1>
            <p className="text-sm w-full text-center bg-zinc-800 py-4 rounded-md font-semibold md:text-xl tracking-widest uppercase opacity-80">
              Reflection of Knowledge Towards Reality
            </p>
            <div className="flex flex-col md:flex-row justify-center w-full gap-4">
              <button className="bg-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors py-3 px-12 rounded cursor-pointer text-xl border border-gray-600">
                <a target="_blank" href="https://forms.gle/fPxL99bGU8dGKSqYA">
                  Contribute / معاون
                </a>
              </button>
              <button className="bg-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors py-3 px-12 rounded cursor-pointer text-xl border border-gray-600">
                <Link to="/posts">Posts / پوسٹز</Link>
              </button>
            </div>
          </div>

          {/* Left Side: First Card (Main intro) */}
          <div className="md:order-1 bg-[#545454] p-8 rounded-lg shadow-lg">
            <p className="text-right text-xl md:text-3xl leading-12 dir-rtl">
              <span className="bg-zinc-800 pb-1 ml-3 rounded px-2">مقصد </span>
              بر صغیرِ ہند میں باالخصوص اور پوری دنیا میں باالعموم علامہ اقبال
              کی نظموں اور اشعار کو جو پزیرائی حاصل ہوئی ہے وہ شاید کسی اور کے
              حصے میں نہیں آئی ۔بعض لوگ مطلب اور مفہوم کو سمجھتے ہیں اور اس کا
              حق بھی ادا کرتے ہیں جب کہ اکثریت ایسے لوگوں کی ہے جو اپنی تقریروں
              اور تحریروں میں چار چاند لگانے کے لیے علامہ کی شاعری کا استعمال
              کرتے ہیں لیکن علامہ نے جس درد اور جس فکر میں ڈوب کر یہ اشعار کہے
              ہیں وہ پسِ پشت رہ جاتا ہے۔
            </p>
          </div>
        </div>

        {/* Bottom Section: Two Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 2 */}
          <div className="bg-[#545454] p-8 rounded-lg shadow-lg">
            <p className="text-right text-xl md:text-3xl leading-12 dir-rtl">
              <span className="bg-zinc-800 pb-1 ml-3 rounded px-2">
                اس خلا کو پر کرنے کی ایک ناتواں سی سعی و کوشش{" "}
              </span>
              اشعار کی تشریح اقبالیات کے ماہرین ،جن میں پروفیسریوسف سلیم چشتی
              صاحب ، عارف بتالوی ،ڈاکٹر خواجہ حمیدیزدانی ، ڈاکٹر سلیم اختر صاحب
              وغیرہ کی کتابوں اور آرا٫ کی روشنی میں کی گئی ہے۔اللہ سے دعا ہے کہ
              اللہ تعالیٰ ہمارے اس کام میں مدد فرمائے اور ہمیں اس کام کو آغاز سے
              انجام تک پہونچانے میں مدد فرمائے۔ آمین
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#545454] p-8 rounded-lg shadow-lg">
            <p className="text-right text-xl md:text-3xl leading-12 dir-rtl">
              <span className="bg-zinc-800 pb-1 ml-3 rounded px-2">
                اس وقت صورتِ حال یہ ہے کہ{" "}
              </span>
              علامہ کے اشعار کو ہم پڑھتے ہیں لیکن افسوس کہ ہم سمجھ نہیں پاتے اور
              جب انکے اشعار کو سمجھنے کے لئے ہم انٹرنیٹ پر کچھ چھان بین کرتے ہیں
              تو وہاں سے بھی ہم کو مایوس ہو کر ہی لوٹنا پڑتا ہے اورعلم کے ذخیروں
              ( کتابوں) سے تو ہماری دلچسپی بالکل ختم ہو کر رہ گئی ہے۔
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors py-3 px-12 rounded cursor-pointer text-xl border border-gray-600">
            <Link to={"https://aainaeiqbal.co.in/life-of-dr-allama-iqbal/"}>
              Life of Allama Iqbal / علامہ اقبال کی زندگی
            </Link>
          </button>
          <button className="bg-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors py-3 px-12 rounded cursor-pointer text-xl border border-gray-600">
            <Link to="/posts">Special Posts/ خصوصی پوسٹز</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
