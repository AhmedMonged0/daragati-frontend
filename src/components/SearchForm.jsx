import React, { useState } from 'react';

export default function SearchForm({ selectedGov, govStatus, apiUrl }) {
  const [seatNo, setSeatNo] = useState('');
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedGov) {
      setErrorMsg('برجاء اختيار محافظة من الأسفل أولاً 👇');
      setResultData(null);
      return;
    }
    if (!seatNo.trim()) {
      setErrorMsg('برجاء كتابة رقم الجلوس أولاً ✍️');
      setResultData(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResultData(null);

    try {
      // 🌐 هنا السر: بيقرأ مباشرة الرابط اللايف المتمرر له من الـ App.jsx بدون localhost
      const response = await fetch(`${apiUrl}/api/v1/result?seatNo=${seatNo.trim()}&gov=${selectedGov}`);
      const data = await response.json();

      if (data.success) {
        setResultData(data.result);
      } else {
        setErrorMsg(data.message || 'عذراً، لم نتمكن من العثور على النتيجة.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('تعذر الاتصال بخادم فحص الدرجات، تأكد من تشغيل السيرفر وحاول مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-right" style={{ direction: 'rtl' }}>
      <form onSubmit={handleSearch} className="space-y-4">
        
        {/* حالة المحافظة المحددة */}
        <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex justify-between items-center text-xs md:text-sm font-semibold">
          <span className="text-slate-600">المحافظة المحددة للبحث: <strong className="text-blue-600">{selectedGov || "برجاء اختيار محافظة من الأسفل 👇"}</strong></span>
          {selectedGov && (
            <span className="px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[11px]">
              {govStatus}
            </span>
          )}
        </div>

        {/* حقل الإدخال والزر */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={seatNo}
            onChange={(e) => setSeatNo(e.target.value)}
            placeholder="اكتب رقم جلوس الشهادة الإعدادية..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] disabled:opacity-50 text-sm cursor-pointer whitespace-nowrap"
          >
            {loading ? 'جاري الفحص... ⏳' : 'عرض النتيجة'}
          </button>
        </div>
      </form>

      {/* رسائل الخطأ والتنبيهات */}
      {errorMsg && (
        <div className="bg-amber-50 border border-amber-200/70 text-amber-800 p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed">
          {errorMsg}
        </div>
      )}

      {/* عرض كارت النتيجة الاحترافي للطلاب الفائزين */}
      {resultData && (
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full"></div>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-3">
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">اسم الطالب الثلاثي</p>
              <h4 className="text-lg font-black text-slate-800 mt-0.5">{resultData.name}</h4>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl text-center sm:text-left self-start sm:self-auto">
              <p className="text-[10px] font-bold text-emerald-600">النسبة المئوية</p>
              <p className="text-xl font-black text-emerald-700 font-mono mt-0.5">{resultData.percentage}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 text-xs font-bold text-slate-600">
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <span className="text-slate-400 block text-[10px]">المجموع الكلي</span>
              <span className="text-sm font-mono text-slate-800 mt-1 block">{resultData.total}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <span className="text-slate-400 block text-[10px]">حالة الطالب</span>
              <span className="text-sm text-emerald-600 mt-1 block">✨ {resultData.status}</span>
            </div>
          </div>

          {/* جدول المواد والدرجات */}
          <div className="mt-2 space-y-2">
            <p className="text-[10px] font-black text-slate-400 border-b border-slate-100 pb-1">تفاصيل درجات المواد الأساسية</p>
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {resultData.grades.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 text-xs font-semibold">
                  <span className="text-slate-700">{item.subject}</span>
                  <span className="font-mono bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800">
                    {item.score} <span className="text-slate-400 text-[10px]">/ {item.max}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
