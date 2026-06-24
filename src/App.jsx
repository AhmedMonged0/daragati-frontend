import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import { NEWS_ARTICLES, STATS_DATA, PREPARATORY_EXPECTATIONS } from './data/mockData';

// 🌐 حط رابط سيرفر الـ API بتاعك هنا بعد ما ترفعه لايف
const API_BASE_URL = 'https://daragati-backend.vercel.app';

export default function App() {
  const [activeGov, setActiveGov] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [governorates, setGovernorates] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/governorates`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setGovernorates(data.governorates);
      })
      .catch(err => console.error("Error loading live govs:", err));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 90,
        behavior: 'smooth'
      });
    }
  };

  const handleGovClick = (govName, govStatus) => {
    setActiveGov(govName);
    setActiveStatus(govStatus);
    scrollToSection('search-portal');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans tracking-wide pt-20">
      
      {/* 🧭 النافبار العلوي */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50 flex items-center shadow-sm" dir="rtl">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center">
          
          <div className="flex items-center gap-1 md:gap-4 text-xs md:text-sm font-bold text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">الرئيسية</button>
            <button onClick={() => scrollToSection('govs-section')} className="hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">نتائج المحافظات</button>
            <button onClick={() => scrollToSection('articles-section')} className="hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">التقارير والأخبار</button>
            <button onClick={() => scrollToSection('developer-footer')} className="hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">معلومات المطور</button>
          </div>

          <div className="flex items-center gap-2.5 font-sans" style={{ direction: 'ltr' }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xl text-white shadow-md shadow-blue-500/10">
              🎓
            </div>
            <span className="text-base font-black bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent tracking-tight">
              Daragati
            </span>
          </div>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 mt-6">
        
        {/* سيكشن محرك البحث الرئيسي */}
        <div id="search-portal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/80 relative overflow-hidden" dir="rtl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
          <div className="lg:col-span-5 space-y-4 text-right">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">تحديث مستمر ⏱️</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">نتيجة الصف الثالث <br />الإعدادي برقم الجلوس</h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">اختر محافظتك من القائمة بالأسفل، ثم اكتب رقم جلوسك واضغط على "عرض النتيجة".</p>
          </div>
          <div className="lg:col-span-7 w-full">
            <SearchForm selectedGov={activeGov} govStatus={activeStatus} apiUrl={API_BASE_URL} />
          </div>
        </div>

        {/* سيكشن المحافظات */}
        <div id="govs-section" className="space-y-4" dir="rtl">
          <div className="border-r-4 border-blue-600 pr-3 text-right">
            <h3 className="text-lg font-black text-slate-900">نتائج المحافظات</h3>
            <p className="text-xs text-slate-500">اختر محافظتك لتجهيز نظام الفحص الفوري</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {governorates.map((gov, idx) => (
              <div 
                key={idx} 
                onClick={() => handleGovClick(gov.name, gov.status)}
                className={`bg-white border rounded-2xl p-4 text-center transition-all cursor-pointer shadow-sm hover:shadow-md group ${activeGov === gov.name ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300'}`}
              >
                <p className={`font-bold text-sm ${activeGov === gov.name ? 'text-blue-600' : 'text-slate-700 group-hover:text-blue-600'}`}>نتيجة {gov.name}</p>
                <span className="text-[11px] text-slate-500 block mt-1.5 bg-slate-50 py-1 rounded-lg border border-slate-100">{gov.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* الإحصائيات والتوقعات */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" dir="rtl">
          <div className="lg:col-span-8 space-y-4 text-right">
            <div className="border-r-4 border-emerald-500 pr-3">
              <h3 className="text-lg font-black text-slate-900">توقعات التنسيق 2026</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREPARATORY_EXPECTATIONS.map((track, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-md">
                  <span className="text-xs font-bold bg-slate-50 px-2.5 py-1 rounded-lg text-blue-600 border border-slate-100">{track.category}</span>
                  <div className="space-y-2 pt-1">
                    {track.tracking.map((f, i) => (
                      <div key={i} className="text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <p className="font-semibold text-slate-700">{f.faculty}</p>
                        <p className="font-mono text-emerald-600 text-[11px] mt-0.5">{f.expected}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4 text-right">
            <div className="border-r-4 border-purple-500 pr-3">
              <h3 className="text-lg font-black text-slate-900">نسب النجاح السنوية</h3>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden text-xs shadow-md">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-3">العام الدراسي</th>
                    <th className="p-3">نسبة النجاح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {STATS_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold">{row.year}</td>
                      <td className="p-3 font-mono text-blue-600">{row.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* سيكشن التقارير والأخبار */}
        <div id="articles-section" className="space-y-4" dir="rtl">
          <div className="border-r-4 border-blue-500 pr-3 text-right">
            <h3 className="text-lg font-black text-slate-900">أحدث الأخبار والتقارير</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <article key={article.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between hover:border-blue-400 transition-all text-right">
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">{article.tag}</span>
                  <h4 className="font-bold text-sm md:text-base text-slate-800">{article.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{article.desc}</p>
                </div>
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                  <span>{article.date}</span>
                  <button onClick={() => setSelectedArticle(article)} className="text-blue-600 font-bold hover:underline">تفاصيل التقرير الكامل ←</button>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
      
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 space-y-4 relative text-right" dir="rtl">
            <button onClick={() => setSelectedArticle(null)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center">✕</button>
            <h2 className="text-xl font-black text-slate-900 pt-2">{selectedArticle.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedArticle.content}</p>
          </div>
        </div>
      )}

      {/* 👑 الفوتر الاحترافي للأستاذ أحمد منجد */}
      <footer id="developer-footer" className="bg-white border-t border-slate-200 mt-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-100 pb-6">
            <div className="text-center md:text-right space-y-1">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Platform Developer</p>
              <h4 className="text-lg font-black text-slate-800 tracking-tight font-sans">Ahmed Monged</h4>
              <p className="text-xs text-slate-500 font-bold font-sans">Fullstack Developer</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/ahmed.monged.0/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 border border-[#1877F2]/10 text-[#1877F2] px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="font-sans pt-0.5">Facebook</span>
              </a>
              <a href="https://wa.me/201148220836" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/10 text-[#25D366] px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.704 1.456h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="font-sans pt-0.5">WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="text-center text-slate-400 text-xs font-medium">
            <p>© 2026 جميع الحقوق محفوظة لمنصة درجاتي التعليمية.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}