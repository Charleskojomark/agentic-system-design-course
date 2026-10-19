import React, { useState } from 'react';
import { Shield, Lock, Search, FileText, Database, Server, CheckCircle2, XCircle, ArrowRight, RefreshCw, Key } from 'lucide-react';

export const PrivateBankingRAGArchitectureWorkbench: React.FC = () => {
  const [activePipeline, setActivePipeline] = useState<'ingestion' | 'query'>('query');

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Private Banking RAG Dual Pipeline</h3>
            <p className="text-xs text-slate-400">Inspect the asynchronous ingestion pipeline vs. real-time permission-scoped query pipeline</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setActivePipeline('ingestion')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              activePipeline === 'ingestion' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Async Ingestion
          </button>
          <button
            onClick={() => setActivePipeline('query')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              activePipeline === 'query' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Real-Time Query
          </button>
        </div>
      </div>

      {activePipeline === 'ingestion' ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
              <span>01. Connectors</span>
            </div>
            <div className="text-slate-300">
              Three scheduled adapters:
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 text-[11px]">
                <li>SharePoint (Graph API)</li>
                <li>Email Archive (Headers)</li>
                <li>File Server (Crawler)</li>
              </ul>
            </div>
            <div className="p-1.5 rounded bg-emerald-950/30 text-[10px] text-emerald-300 font-mono">
              Captures file ACLs at ingest
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-sky-400 font-mono font-bold">
              <span>02. Parsing & OCR</span>
            </div>
            <div className="text-slate-300">
              Specialized preprocessing:
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 text-[11px]">
                <li>DOCX/XLSX text extract</li>
                <li>Email quote stripping</li>
                <li>Tesseract OCR for scanned PDFs</li>
              </ul>
            </div>
            <div className="p-1.5 rounded bg-sky-950/30 text-[10px] text-sky-300 font-mono">
              Strips email reply bloat
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
              <span>03. Tailored Chunking</span>
            </div>
            <div className="text-slate-300">
              Document-aware boundaries:
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 text-[11px]">
                <li>Research: Paragraph level</li>
                <li>Policies: Hierarchical clauses</li>
                <li>Memos: Header inheritance</li>
              </ul>
            </div>
            <div className="p-1.5 rounded bg-amber-950/30 text-[10px] text-amber-300 font-mono">
              Attaches ACLs to each chunk
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-400 font-mono font-bold">
              <span>04. Self-Hosted Index</span>
            </div>
            <div className="text-slate-300">
              Local GPU inference:
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 text-[11px]">
                <li>BGE-large-en embedding</li>
                <li>Qdrant HNSW vector index</li>
                <li>BM25 sparse inverted index</li>
              </ul>
            </div>
            <div className="p-1.5 rounded bg-purple-950/30 text-[10px] text-purple-300 font-mono">
              Zero outbound network egress
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
              <span>01. Auth Resolution</span>
            </div>
            <div className="text-slate-300">
              User identity validation:
              <p className="mt-1 text-slate-400 text-[11px]">
                Resolves Active Directory JWT to extract user's security groups (e.g. `tech_analyst`, `compliance`).
              </p>
            </div>
            <div className="p-1.5 rounded bg-emerald-950/30 text-[10px] text-emerald-300 font-mono">
              Identity resolved in &lt;5ms
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
              <span>02. ACL Pre-Filter</span>
            </div>
            <div className="text-slate-300">
              Vector store query filter:
              <p className="mt-1 text-slate-400 text-[11px]">
                Injects boolean payload constraint: `acl_groups IN user_groups`. Search is strictly limited to authorized vectors.
              </p>
            </div>
            <div className="p-1.5 rounded bg-amber-950/30 text-[10px] text-amber-300 font-mono">
              Zero permission leakage
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-sky-400 font-mono font-bold">
              <span>03. Hybrid Retrieval</span>
            </div>
            <div className="text-slate-300">
              Combined search scoring:
              <p className="mt-1 text-slate-400 text-[11px]">
                Dense semantic similarity + BM25 exact keyword match fused via Reciprocal Rank Fusion, then reranked.
              </p>
            </div>
            <div className="p-1.5 rounded bg-sky-950/30 text-[10px] text-sky-300 font-mono">
              Finds both concepts & tickers
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-400 font-mono font-bold">
              <span>04. Cited Generation</span>
            </div>
            <div className="text-slate-300">
              Grounded open-weight LLM:
              <p className="mt-1 text-slate-400 text-[11px]">
                Llama 3 70B runs on local GPUs, synthesizing only from retrieved context and outputting exact document citations.
              </p>
            </div>
            <div className="p-1.5 rounded bg-purple-950/30 text-[10px] text-purple-300 font-mono">
              Verifiable source trail
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DocumentLevelACLFilterSandbox: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<'analyst' | 'compliance' | 'advisor'>('analyst');
  const [query, setQuery] = useState<'m_and_a' | 'policy' | 'earnings'>('m_and_a');

  const users = {
    analyst: {
      name: 'Sarah Chen',
      role: 'Equity Research Analyst (Tech)',
      groups: ['all_staff', 'equity_research', 'tech_coverage'],
      badgeColor: 'border-sky-500 text-sky-400',
    },
    compliance: {
      name: 'Marcus Vance',
      role: 'Compliance & Regulatory Officer',
      groups: ['all_staff', 'compliance_global', 'regulatory_affairs'],
      badgeColor: 'border-emerald-500 text-emerald-400',
    },
    advisor: {
      name: 'Elena Rostova',
      role: 'Senior M&A Managing Director',
      groups: ['all_staff', 'investment_banking', 'deal_team_falcon', 'ma_partners'],
      badgeColor: 'border-purple-500 text-purple-400',
    },
  };

  const queries = {
    m_and_a: {
      text: 'What are the valuation multiples and EBITDA adjustments in Project Falcon deal memo?',
      requiredACL: ['deal_team_falcon', 'ma_partners'],
      sourceDoc: 'SharePoint / Confidential M&A / Project_Falcon_Final_Memo.docx',
      answer: 'According to Project Falcon Memo (p. 14), the agreed target multiple is 14.2x trailing EBITDA with $12.5M in pro-forma synergies.',
    },
    policy: {
      text: 'What are the quiet period disclosure restrictions under FINRA Rule 2210?',
      requiredACL: ['all_staff', 'compliance_global'],
      sourceDoc: 'SharePoint / Global Compliance / Policy_Manual_Sec_4.pdf',
      answer: 'Per Compliance Policy Section 4.2.1 citing FINRA Rule 2210, research analysts are prohibited from issuing public commentary 10 days before and after underwriting participation.',
    },
    earnings: {
      text: 'What was the cloud revenue growth rate reported in the Q3 earnings transcript for Acme Corp?',
      requiredACL: ['all_staff', 'equity_research'],
      sourceDoc: 'File Server / Scanned SEC Filings / AcmeCorp_Q3_Transcript.pdf',
      answer: 'As stated in Acme Corp Q3 Transcript (Speaker: CEO, p. 7), cloud ARR expanded 38% year-over-year to $412M.',
    },
  };

  const currentUser = users[selectedUser];
  const currentQuery = queries[query];
  const isAuthorized = currentQuery.requiredACL.some(group => currentUser.groups.includes(group));

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Document-Level ACL Security Sandbox</h3>
            <p className="text-xs text-slate-400">Test how Active Directory group pre-filtering prevents cross-department data leakage</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.keys(users) as (keyof typeof users)[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedUser(key)}
            className={`p-3.5 rounded-2xl border text-left transition ${
              selectedUser === key
                ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-slate-200">{users[key].name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${users[key].badgeColor}`}>
                {key.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">{users[key].role}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {users[key].groups.map(g => (
                <span key={g} className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-slate-400 border border-white/5">
                  {g}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Query Selector */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-slate-400 uppercase font-bold">Select Simulated Query:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(Object.keys(queries) as (keyof typeof queries)[]).map(k => (
            <button
              key={k}
              onClick={() => setQuery(k)}
              className={`p-2.5 rounded-xl border text-left text-xs transition ${
                query === k
                  ? 'bg-white/10 border-sky-400 text-sky-200 font-semibold'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] text-slate-500 uppercase">{k.replace('_', ' ')}</div>
              <div className="line-clamp-2 mt-0.5">{queries[k].text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Active Filter:</span>
            <span className="text-emerald-400 font-bold">
              `acl_groups IN [{currentUser.groups.join(', ')}]`
            </span>
          </div>
          {isAuthorized ? (
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> ACCESS PERMITTED
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              <XCircle className="w-3.5 h-3.5" /> 403 ACL BLOCKED
            </span>
          )}
        </div>

        {isAuthorized ? (
          <div className="space-y-2 animate-fade-in">
            <div className="text-xs text-slate-300 font-semibold leading-relaxed">
              {currentQuery.answer}
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-emerald-300 font-mono flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Source Verified: {currentQuery.sourceDoc}</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 space-y-1.5 animate-fade-in">
            <div className="font-bold flex items-center gap-1.5 text-rose-300">
              <Shield className="w-4 h-4 text-rose-400" />
              <span>Permission Security Boundary Enforced</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              User <strong>{currentUser.name}</strong> does not belong to authorized group{' '}
              <code className="bg-black/40 px-1 py-0.5 rounded text-rose-400 font-mono">
                {currentQuery.requiredACL.join(' or ')}
              </code>. 
              The vector search pre-filter excluded this document from the candidate graph at query time. No data or answer was derived or returned.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
