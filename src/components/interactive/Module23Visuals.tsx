import React, { useState } from 'react';
import { Stethoscope, Cpu, Activity, CheckCircle2, Edit3, ShieldAlert, FileText, ArrowRight, Sparkles, Layers } from 'lucide-react';

export const ClinicalCodingQLoRAStudio: React.FC = () => {
  const [loraRank, setLoraRank] = useState<number>(16);
  const [method, setMethod] = useState<'qlora' | 'full'>('qlora');

  const baseParams = 8; // 8 Billion parameters
  const trainablePct = method === 'qlora' ? (loraRank * 0.003).toFixed(3) : '100.00';
  const vramRequired = method === 'qlora' ? (12 + loraRank * 0.1).toFixed(1) : '164.0';

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-pink-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">QLoRA Clinical Adaptation Mechanics</h3>
            <p className="text-xs text-slate-400">Compare parameter-efficient adaptation memory and rank configurations</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setMethod('qlora')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              method === 'qlora' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            QLoRA (4-bit + LoRA)
          </button>
          <button
            onClick={() => setMethod('full')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              method === 'full' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Parameter Fine-Tuning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase">GPU VRAM Required</div>
          <div className="text-2xl font-extrabold text-pink-400 font-mono">{vramRequired} GB</div>
          <p className="text-[11px] text-slate-400">
            {method === 'qlora'
              ? 'Fits comfortably on a single on-prem enterprise GPU (e.g. NVIDIA A10G or L4).'
              : 'Requires a multi-GPU cluster ($100k+ datacenter hardware), violating hospital IT budgets.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Trainable Parameters</div>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">{trainablePct}%</div>
          <p className="text-[11px] text-slate-400">
            {method === 'qlora'
              ? 'Freezes 99.9% of foundation weights, preventing catastrophic forgetting of medical grammar.'
              : 'Updates all 8 billion parameters, risking severe overfitting on individual doctor shorthand.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Adapter Artifact Size</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {method === 'qlora' ? `${(loraRank * 5).toFixed(0)} MB` : '16,000 MB (16 GB)'}
          </div>
          <p className="text-[11px] text-slate-400">
            {method === 'qlora'
              ? 'Lightweight adapter weights can be refreshed annually when billing codes update.'
              : 'Massive model weights must be re-deployed completely.'}
          </p>
        </div>
      </div>

      {method === 'qlora' && (
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 font-bold uppercase">
              LoRA Rank Factor ($r$): <span className="text-pink-400">{loraRank}</span>
            </span>
            <span className="text-slate-400">Higher rank = more expressive capacity, slightly higher VRAM</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            step="4"
            value={loraRank}
            onChange={e => setLoraRank(Number(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>$r=4$ (Minimal)</span>
            <span>$r=16$ (Recommended for Clinical Extraction)</span>
            <span>$r=64$ (High expressive capacity)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const EpicEHRCoderReviewInterface: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string | null>('icd1');
  const [confirmedCodes, setConfirmedCodes] = useState<string[]>([]);

  const clinicalNote = [
    { id: 'sent1', text: 'Patient is a 58-year-old male presenting for routine follow-up of essential hypertension and longstanding type 2 diabetes mellitus.' },
    { id: 'sent2', text: 'Blood pressure today is elevated at 148/92 mmHg despite current lisinopril therapy.' },
    { id: 'sent3', text: 'HbA1c remains suboptimally controlled at 8.4%; adjusting metformin regimen.' },
    { id: 'sent4', text: 'During encounter, patient also complained of severe right knee arthralgia; performed diagnostic arthrocentesis with corticosteroid joint injection.' },
    { id: 'sent5', text: 'Total face-to-face physician time was 40 minutes addressing complex multimorbidity.' },
  ];

  const suggestedCodes = [
    {
      id: 'icd1',
      type: 'ICD-10 (Diagnosis)',
      code: 'E11.65',
      desc: 'Type 2 diabetes mellitus with hyperglycemia',
      evidenceSentences: ['sent1', 'sent3'],
      confidence: '98%',
    },
    {
      id: 'icd2',
      type: 'ICD-10 (Diagnosis)',
      code: 'I10',
      desc: 'Essential (primary) hypertension',
      evidenceSentences: ['sent1', 'sent2'],
      confidence: '99%',
    },
    {
      id: 'cpt1',
      type: 'CPT (Procedure)',
      code: '99214 - 25',
      desc: 'Office visit, established patient, Level 4 (with Modifier -25 for significant separate E/M)',
      evidenceSentences: ['sent4', 'sent5'],
      confidence: '94%',
    },
    {
      id: 'cpt2',
      type: 'CPT (Procedure)',
      code: '20610',
      desc: 'Arthrocentesis, aspiration and/or injection, major joint (knee)',
      evidenceSentences: ['sent4'],
      confidence: '97%',
    },
  ];

  const activeSuggestion = suggestedCodes.find(c => c.id === selectedCode);

  const toggleConfirm = (codeId: string) => {
    if (confirmedCodes.includes(codeId)) {
      setConfirmedCodes(confirmedCodes.filter(c => c !== codeId));
    } else {
      setConfirmedCodes([...confirmedCodes, codeId]);
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-pink-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Epic EHR Coder Review Gate</h3>
            <p className="text-xs text-slate-400">Click suggested codes to see verbatim phrase attribution in the physician chart</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Claim Status:</span>
          <span className={`px-2 py-0.5 rounded-full font-bold ${
            confirmedCodes.length === suggestedCodes.length
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            {confirmedCodes.length}/{suggestedCodes.length} Codes Confirmed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Clinical Note Pane */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-pink-400" />
              <span>Epic Chart: Dr. Henderson (Internal Med)</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">ID: ENC-2026-9041</span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-1.5 font-serif pt-1">
            {clinicalNote.map(sent => {
              const isHighlighted = activeSuggestion?.evidenceSentences.includes(sent.id);
              return (
                <span
                  key={sent.id}
                  className={`inline transition-all duration-200 rounded px-1 py-0.5 ${
                    isHighlighted
                      ? 'bg-pink-500/30 text-white font-medium ring-1 ring-pink-400/50 shadow-sm'
                      : 'text-slate-300'
                  }`}
                >
                  {sent.text}{' '}
                </span>
              );
            })}
          </div>

          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-slate-400 font-mono">
            Highlighted sentences indicate active AI textual evidence attribution.
          </div>
        </div>

        {/* AI Suggested Codes Pane */}
        <div className="space-y-2">
          {suggestedCodes.map(sc => {
            const isSelected = selectedCode === sc.id;
            const isConfirmed = confirmedCodes.includes(sc.id);

            return (
              <div
                key={sc.id}
                onClick={() => setSelectedCode(sc.id)}
                className={`p-3 rounded-2xl border text-xs transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-pink-950/40 border-pink-500 text-white shadow-md'
                    : 'bg-black/40 border-white/5 text-slate-300 hover:bg-white/[0.02]'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-pink-400">{sc.code}</span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase bg-white/5 px-1.5 py-0.2 rounded">
                      {sc.type}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Conf: {sc.confidence}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">{sc.desc}</div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleConfirm(sc.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition shrink-0 ${
                    isConfirmed
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                  }`}
                >
                  {isConfirmed ? '✓ Confirmed' : 'Confirm'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {confirmedCodes.length === suggestedCodes.length && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-emerald-300">Certified Coder Review Complete</div>
              <p className="text-[11px] text-slate-300">
                All 4 codes approved with verified phrase attributions. Claim signed and cleared for insurance submission with 95%+ first-pass probability.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-lg shadow-emerald-500/25">
            Submit Claim
          </button>
        </div>
      )}
    </div>
  );
};
