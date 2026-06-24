import React from 'react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const mainSubjects = result.grades.filter(g => 
    !g.subject.includes('الدينية') && !g.subject.includes('الفنية') && !g.subject.includes('الحاسب الآلي') && !g.subject.includes('المعتمد')
  );

  const extraSubjects = result.grades.filter(g => 
    g.subject.includes('الدينية') || g.subject.includes('الفنية') || g.subject.includes('الحاسب الآلي')
  );

  const totalScoreOnly = result.total.split('/')[0].trim();

  return (
    <div className="mt-6 space-y-6 animate-fadeIn text-right" dir="rtl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">{result.name}</h3>
          <div className="flex gap-2 text-xs font-bold">
            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg">الحالة: {result.status}</span>
            <span className="bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-lg">الفصل الدراسي الثاني</span>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-slate-50 border border-slate-200 p-4 rounded-xl w-full md:w-auto justify-between md:justify-start whitespace-nowrap">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">النسبة المئوية</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tight">{result.percentage}</span>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">المجموع الكلي</span>
            <div className="flex items-baseline gap-1 font-mono text-slate-800" style={{ direction: 'ltr' }}>
              <span className="text-2xl font-black text-slate-900">{totalScoreOnly}</span>
              <span className="text-slate-400 font-normal text-sm">/</span>
              <span className="text-slate-500 text-sm font-bold">280</span>
            </div>
          </div>
        </div>
      </div>

      {mainSubjects.length > 0 && (
        <div className="space-y-3">
          <div className="border-r-4 border-blue-600 pr-2">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider">مواد تضاف للمجموع</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mainSubjects.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm hover:border-blue-500 hover:shadow transition-all">
                <span className="text-xs font-bold text-slate-800">{item.subject}</span>
                <div className="font-mono text-xs font-bold bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-slate-600 whitespace-nowrap">
                  <span className="text-blue-600 font-black text-sm">{item.score}</span>
                  <span className="text-slate-300 mx-1">/</span>
                  <span>{item.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {extraSubjects.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="border-r-4 border-slate-400 pr-2">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">مواد لا تضاف للمجموع</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {extraSubjects.map((item, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-200/70 p-4 rounded-xl flex justify-between items-center shadow-sm">
                <span className="text-xs font-bold text-slate-500">{item.subject}</span>
                <div className="font-mono text-xs font-bold bg-white border border-slate-100 px-2.5 py-1 rounded-lg text-slate-400 whitespace-nowrap">
                  <span className="text-slate-600 font-bold">{item.score}</span>
                  <span className="text-slate-300 mx-1">/</span>
                  <span>{item.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}