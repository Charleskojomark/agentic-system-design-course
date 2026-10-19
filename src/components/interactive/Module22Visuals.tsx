import React, { useState } from 'react';
import { Truck, CloudRain, Anchor, Database, ShieldCheck, CheckCircle2, AlertOctagon, ArrowRight, Clock, DollarSign, Send, FileCode } from 'lucide-react';

export const LogisticsMultiAgentCommandCenter: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<number>(0);

  const agents = [
    {
      name: 'Disruption Detection Agent',
      icon: CloudRain,
      role: 'Continuous Telemetry Polling & Normalization',
      tools: ['Tomorrow.io FleetIQ REST API', 'Portcast Port Congestion API', 'project44 Exception Feed', 'Deduplication Engine'],
      input: 'Scheduled 10-minute cron trigger',
      output: 'Confirmed DisruptionEvent (ID, Location, Severity 8.4/10, Type: Severe Weather)',
      desc: 'Polls external risk intelligence sources, filters minor turbulence, and normalizes disparate schemas into standardized event records.',
    },
    {
      name: 'Shipment Identification Agent',
      icon: Database,
      role: 'Impact Analysis across Transit Legs',
      tools: ['SAP TM Read API (Multi-Leg Parameterized Query)'],
      input: 'Confirmed DisruptionEvent record',
      output: 'Array of 34 Affected Shipment IDs with cargo class, SLA limits, and transit waypoints',
      desc: 'Queries SAP TM across all intermediate transit waypoints to find cargo that would otherwise be missed if checking only origin/destination.',
    },
    {
      name: 'Option Generation Router',
      icon: Truck,
      role: 'Concurrent Subagent Dispatch & Compliance Whitelist',
      tools: ['project44 Carrier Availability API', 'Approved-Carrier SQL Database (Hazardous/Refrigerated)', 'Parallel Container Workers'],
      input: 'List of 34 impacted shipments',
      output: 'Top-3 viable reroute options per shipment, strictly filtered to approved carrier list',
      desc: 'Spawns 34 isolated worker subagents running in parallel. Pre-filters carriers against certification whitelists before scoring.',
    },
    {
      name: 'Recommendation Agent',
      icon: DollarSign,
      role: 'Financial Cost-Benefit Calculus & Packaging',
      tools: ['Contracted Rate Tables', 'Customer SLA Penalty Calculator'],
      input: 'Ranked candidate routes + delayed path estimates',
      output: 'Plain-language decision package sorted by urgency and net savings',
      desc: 'Calculates additional reroute freight costs against delayed path breach penalties, formatting an executive package for human dispatchers.',
    },
    {
      name: 'Execution Agent',
      icon: ShieldCheck,
      role: 'Human Gate & Cryptographic Write Dispatch',
      tools: ['SAP TM Write REST API', 'project44 Dispatch Notification API', 'Append-Only Audit Ledger'],
      input: 'Approved recommendation package + Coordinator Digital Signature',
      output: 'SAP TM Booking Update Confirmation + project44 Carrier Manifest + Immutable Audit Record',
      desc: 'Halts execution until explicit human authorization is received. Executes transactional ERP update and records non-repudiable audit logs.',
    },
  ];

  const current = agents[selectedAgent];
  const Icon = current.icon;

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Logistics Multi-Agent Topology</h3>
            <p className="text-xs text-slate-400">Inspect the 5 specialized agents coordinating shipment rerouting</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {agents.map((ag, idx) => {
          const AgIcon = ag.icon;
          return (
            <button
              key={ag.name}
              onClick={() => setSelectedAgent(idx)}
              className={`p-2.5 rounded-2xl border text-left transition ${
                selectedAgent === idx
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold">0{idx + 1}</span>
                <AgIcon className="w-4 h-4 opacity-75" />
              </div>
              <div className="text-xs font-semibold truncate">{ag.name.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white">{current.name}</span>
          </div>
          <span className="text-xs font-mono text-slate-400">{current.role}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="font-mono text-[10px] text-slate-400 uppercase font-bold">Input Payload:</div>
            <div className="text-slate-200 font-mono text-[11px]">{current.input}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="font-mono text-[10px] text-amber-400 uppercase font-bold">Output Artifact:</div>
            <div className="text-slate-200 font-mono text-[11px]">{current.output}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1.5">
          <div className="font-mono text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>MCP Tool Contract Attachments</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {current.tools.map(t => (
              <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SAPTMApprovalGateSimulator: React.FC = () => {
  const [decision, setDecision] = useState<'pending' | 'approved' | 'escalated' | 'deferred'>('pending');
  const [coordinatorId, setCoordinatorId] = useState('COORD-8842-JONES');

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">SAP TM Human-in-the-Loop Gateway</h3>
            <p className="text-xs text-slate-400">Simulate dispatcher review and cryptographic authorization before production write</p>
          </div>
        </div>
      </div>

      {/* Disruption Alert Summary */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
            <CloudRain className="w-4 h-4 text-amber-400" />
            <span>Disruption Alert: Port of Savannah Tropical Storm Watch</span>
          </span>
          <span className="font-mono text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
            Severity 8.6 / 10
          </span>
        </div>
        <p className="text-slate-200 leading-relaxed">
          Portcast predicts berth delay of 72+ hours at Savannah Terminal. SAP TM identifies <strong>Load #US-GA-9418</strong> carrying temperature-controlled pharmaceuticals en route.
        </p>
      </div>

      {/* Decision Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/30 space-y-2">
          <div className="text-rose-400 font-bold font-mono uppercase">Option A: Maintain Current Route</div>
          <div className="space-y-1 text-slate-300">
            <div>• Projected Delay: <strong className="text-rose-300">76 Hours</strong></div>
            <div>• Additional Freight Cost: $0</div>
            <div>• SLA Late Penalty: <strong className="text-rose-300">-$18,500</strong></div>
            <div>• Spoilage Risk: Critical (Refrigeration battery threshold exceeded)</div>
          </div>
          <div className="p-2 rounded bg-rose-950/30 text-[10px] text-rose-300 font-mono">
            Net Financial Loss: -$18,500 + Cargo Claim
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/40 space-y-2">
          <div className="text-emerald-400 font-bold font-mono uppercase">Option B: Divert to Charleston Hub (AI Recommended)</div>
          <div className="space-y-1 text-slate-300">
            <div>• Projected Delay: <strong className="text-emerald-300">4 Hours</strong> (Within SLA grace window)</div>
            <div>• Alternative Carrier: SwiftTrans ColdChain (Approved Whitelist)</div>
            <div>• Reroute Expedite Fee: -$1,450</div>
            <div>• SLA Late Penalty: $0</div>
          </div>
          <div className="p-2 rounded bg-emerald-950/30 text-[10px] text-emerald-300 font-mono">
            Net Savings vs Delay: +$17,050
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-slate-400">Logged Coordinator Identity:</span>
          <span className="font-mono text-amber-400 font-bold">{coordinatorId}</span>
        </div>

        {decision === 'pending' ? (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setDecision('approved')}
              className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Write to SAP TM</span>
            </button>
            <button
              onClick={() => setDecision('escalated')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 border border-white/10 transition"
            >
              Escalate to Regional Director
            </button>
            <button
              onClick={() => setDecision('deferred')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-400 border border-white/10 transition"
            >
              Defer Action
            </button>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {decision === 'approved' && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SAP TM Write Transaction Committed (200 OK)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Load #US-GA-9418 rerouted to Charleston Hub. Carrier notification dispatched via project44 EDI feed.
                </p>
                <div className="font-mono text-[10px] text-slate-400 pt-1">
                  Audit Hash: 0x8f2d...c39a | Signature: {coordinatorId} | Timestamp: {new Date().toISOString()}
                </div>
              </div>
            )}
            {decision === 'escalated' && (
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200">
                Package dispatched to Regional Director Priority Queue. Notification SMS sent.
              </div>
            )}
            {decision === 'deferred' && (
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-white/10 text-xs text-slate-300">
                Package held open in dispatch queue. Next weather check scheduled in 10 minutes.
              </div>
            )}
            <button
              onClick={() => setDecision('pending')}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 underline"
            >
              Reset Simulation State
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
