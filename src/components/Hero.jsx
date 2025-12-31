
function Hero() {
  return (
    <>
      {/* Left Section */}
      <section className="flex justify-center items-center px-4 py-2 h-full border-b-2">
        <div className="w-full">
          <img
            className="shadow-xl rounded-md shadow-gray-400 w-fit object-cover h-[60vh] mx-auto"
            src="./cover.png"
          />
        </div>

        {/* Right Section */}

        <div className="w-full text-center px-6">
          <h1 className="text-[8rem] text-[#0f1115] font-medium tracking-widest uppercase">
            آئینہ اقبال
          </h1>
          <p className="mt-6 text-[2rem] w-fit px-4 pb-2 mx-auto border-white border-2 bg-[#caced6] rounded">
            Reflection of Knowledge Towards Reality
          </p>
         
            <p className="text-3xl text-[#1f2430] my-4 w-[25vw] mx-auto leading-12">
              اشعار کی تشریح اقبالیات کے ماہرین ،جن میں پروفیسریوسف سلیم چشتی
              صاحب ، عارف بتالوی ،ڈاکٹر خواجہ حمیدیزدانی ، ڈاکٹر سلیم اختر صاحب
              وغیرہ کی کتابوں اور آرا٫ کی روشنی میں کی گئی ہے۔اللہ سے دعا ہے کہ
              اللہ تعالیٰ ہمارے اس کام میں مدد فرمائے اور ہمیں اس کام کو آغاز سے
              انجام تک پہونچانے میں مدد فرمائے۔ آمین
            </p>
            
          <div className="m-6 flex justify-center gap-6 text-[2rem]">
            <button className="px-6 pb-2 border rounded-sm bg-[#e6eaf2] hover:bg-[#1f2430] hover:text-white ">
              معاون/Contribute
            </button>
            <button className="px-6 pb-2 border text-white rounded-sm bg-[#1f2430] hover:bg-[#e6eaf2] hover:text-[#1f2430]">
              پوسٹز/Posts
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
