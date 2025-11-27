
import React, { useState } from 'react';

export default function CopilotSidebar({ caseId }: { caseId?: string }) {
  const [messages, setMessages] = useState<string[]>([
    'BW Nexus Copilot — live strategic assistant',
    'Click an option to auto-insert content into your canvas.'
  ]);
  const [loading, setLoading] = useState(false);

  function append(s:string){ setMessages(prev => [...prev, s]); }

  async function runOption(id:string) {
    setLoading(true);
    append('Requesting: ' + id + '...');
    try {
      const res = await fetch('http://localhost:5002/api/option-action', { 
          method: 'POST', 
          headers: { 'Content-Type':'application/json' }, 
          body: JSON.stringify({ optionId: id, caseId, contextText: `Case:${caseId || 'demo'}` }) 
      });
      const j = await res.json();
      const text = j.insertedText 
        ? (typeof j.insertedText === 'string' ? j.insertedText.slice(0,300) : JSON.stringify(j.insertedText).slice(0,300)) 
        : JSON.stringify(j);
      
      append('Result: ' + text);
    } catch (e) {
      append('Error: ' + String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-80 p-4 border-l border-gray-200 bg-white h-full flex flex-col">
      <h4 className="font-bold text-slate-900 mb-4">Copilot</h4>
      <div className="flex-1 overflow-y-auto bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 text-xs space-y-2 font-mono text-slate-600">
        {messages.map((m,i) => <div key={i}>{m}</div>)}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button 
            onClick={() => runOption('clarify')} 
            disabled={loading}
            className="px-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded text-xs font-bold text-slate-700 disabled:opacity-50"
        >
            Clarify
        </button>
        <button 
            onClick={() => runOption('partners')} 
            disabled={loading}
            className="px-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded text-xs font-bold text-slate-700 disabled:opacity-50"
        >
            Partners
        </button>
        <button 
            onClick={() => runOption('risk')} 
            disabled={loading}
            className="px-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded text-xs font-bold text-slate-700 disabled:opacity-50"
        >
            Quick Risk
        </button>
      </div>
    </div>
  );
}
