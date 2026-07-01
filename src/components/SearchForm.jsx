import React, { useState, useEffect } from 'react';
import ResultCard from './ResultCard';

export default function SearchForm({ selectedGov, govStatus }) {
  const [seatNumber, setSeatNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // إعادة تعيين النتيجة والتنبيهات عند تغيير المحافظة من الأسفل
  useEffect(() => {
    if (selectedGov) {
      setResult(null);
      setError('');
    }
  }, [selectedGov]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!seatNumber.trim()) return setError('من فضلك أدخل رقم جلوس صحيح');
    if (!selectedGov) return setError('من فضلك اختر المحافظة أولاً من القائمة بالأسفل');
    
    setError('');
    setLoading(true);
    setResult(null);

    try {
      // 🚀 استدعاء الباك آند الحقيقي بتاعك اللي شغال على بورت 5000
      const response = await fetch(`http://localhost:5000/api/v1/result?seatNo=${seatNumber.trim()}&gov=${selectedGov}`);
      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.message || 'رقم الجلوس غير موجود حالياً.');
      }
    } catch (err) {
      console.error(err);
      setError('تعذر الاتصال بخادم فحص الدرجات، تأكد من تشغيل السيرفر وحاول مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xl shadow-slate-200/50">
      <form onSubmit={handleSearch} className="space-y-4">
        
        {/* شريط يوضح المحافظة المختارة حالياً */}
        <div className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 p-2.5 rounded-xl flex justify-between items-center">
          <span>المحافظة المحددة للبحث: {selectedGov || 'برجاء اختيار محافظة من الأسفل 👇'}</span>
          {govStatus && <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-blue-200">{govStatus}</span>}
        </div>
        
        {/* صندوق الإدخال وزر العرض */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            value={seatNumber} 
            onChange={(e) => setSeatNumber(e.target.value)} 
            placeholder="اكتب رقم جلوس الشهادة الإعدادية" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-bold" 
          />
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md shadow-blue-500/10 transition-all">
            {loading ? 'جاري فحص سيرفر الكنترول...' : 'عرض النتيجة'}
          </button>
        </div>
        
        {/* التنبيهات والأخطاء */}
        {error && (
          <p className="text-xs p-3 rounded-xl border text-amber-600 bg-amber-50 border-amber-100 font-medium">
            {error}
          </p>
        )}
      </form>

      {/* الإنيميشن أثناء التحميل */}
      {loading && (
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-1/3"></div>
          <div className="h-12 bg-slate-100 rounded-xl"></div>
        </div>
      )}

      {/* كارت عرض النتيجة الفخم والزجاجي */}
      <ResultCard result={result} />
    </div>
  );
}