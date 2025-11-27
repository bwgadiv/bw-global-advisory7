
import React, { useMemo } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangleIcon, GlobeIcon, Target } from './Icons';

interface ReportViewerProps {
  nsilContent: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ nsilContent }) => {
  const parsed = useMemo(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(nsilContent, "text/xml");
    
    const getText = (tag: string, parent: Element | Document = xmlDoc) => 
      parent.querySelector(tag)?.textContent || '';
    
    const getList = (tag: string, parent: Element | Document = xmlDoc) => 
      (parent.querySelector(tag)?.textContent || '').split(',').map(s => s.trim()).filter(Boolean);

    const executiveSummary = xmlDoc.querySelector('executive_summary');
    const matchScore = xmlDoc.querySelector('match_score');
    const match = xmlDoc.querySelector('match');
    const futureCast = xmlDoc.querySelector('future_cast');

    return {
      score: executiveSummary ? getText('overall_score', executiveSummary) : null,
      findings: executiveSummary ? getList('key_findings', executiveSummary) : [],
      outlook: executiveSummary ? getText('strategic_outlook', executiveSummary) : null,
      
      matchVal: matchScore ? matchScore.getAttribute('value') : null,
      matchConf: matchScore ? matchScore.getAttribute('confidence') : null,
      matchRationale: matchScore ? getText('rationale', matchScore) : null,

      partnerName: match ? match.querySelector('company_profile')?.getAttribute('name') : null,
      partnerOrigin: match ? match.querySelector('company_profile')?.getAttribute('origin') : null,
      
      scenarios: Array.from(xmlDoc.querySelectorAll('scenario')).map(s => ({
        name: s.getAttribute('name'),
        prob: s.getAttribute('probability'),
        drivers: getList('drivers', s),
        impact: getText('regional_impact', s),
        rec: getText('recommendation', s)
      }))
    };
  }, [nsilContent]);

  if (!parsed.score && !parsed.matchVal) {
    return <div className="p-4 text-slate-500 italic">Invalid or empty NSIL data.</div>;
  }

  return (
    <div className="space-y-6 font-sans text-slate-900">
      {/* Executive Summary Card */}
      {parsed.score && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GlobeIcon className="w-5 h-5 text-blue-600" /> Executive Brief
              </h3>
              <p className="text-sm text-slate-500 mt-1">NSIL Generated Strategy</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900">{parsed.score}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Score</div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
            <p className="text-sm text-slate-700 leading-relaxed italic">"{parsed.outlook}"</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Key Strategic Findings</h4>
            <ul className="space-y-2">
              {parsed.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 font-bold">•</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Match Analysis */}
      {parsed.matchVal && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" /> Target Alignment
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              parsed.matchConf === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {parsed.matchConf} Confidence
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="text-4xl font-black text-purple-700">{parsed.matchVal}%</div>
              <div className="text-xs font-bold text-purple-400 uppercase mt-1">Synergy Score</div>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{parsed.partnerName}</h4>
              <p className="text-xs text-slate-500 mb-3">{parsed.partnerOrigin}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{parsed.matchRationale}</p>
            </div>
          </div>
        </div>
      )}

      {/* Future Scenarios */}
      {parsed.scenarios.length > 0 && (
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" /> Future Cast
          </h3>
          <div className="space-y-4">
            {parsed.scenarios.map((s, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-orange-400">{s.name}</h4>
                  <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded">{s.prob}% Prob.</span>
                </div>
                <p className="text-sm text-slate-300 mb-3">{s.impact}</p>
                <div className="flex items-start gap-2 text-xs bg-orange-500/10 p-2 rounded border border-orange-500/20">
                  <AlertTriangleIcon className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-orange-200">{s.rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
