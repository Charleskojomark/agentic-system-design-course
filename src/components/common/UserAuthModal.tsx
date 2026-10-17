import React, { useState } from 'react';
import { User, Database, CheckCircle2, RefreshCw, X, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const UserAuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { username, syncStatus, loginUser, syncNow, progress } = useProgress();
  const [inputUsername, setInputUsername] = useState(username);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    setLoading(true);
    setStatusMsg(null);
    const res = await loginUser(inputUsername);
    setLoading(false);

    if (res.success) {
      setStatusMsg({
        text: res.isNew
          ? `Welcome @${inputUsername.trim()}! New profile initialized & synced to Neon DB.`
          : `Welcome back @${inputUsername.trim()}! Progress restored from Neon DB.`,
        type: 'success',
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setStatusMsg({
        text: 'Could not connect to Neon DB. Operating in local mode.',
        type: 'error',
      });
    }
  };

  const handleManualSync = async () => {
    setLoading(true);
    await syncNow();
    setLoading(false);
    setStatusMsg({ text: 'Progress synced to Neon PostgreSQL!', type: 'success' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Neon DB Cloud Sync</h3>
              <p className="text-[11px] text-slate-400">Serverless PostgreSQL persistence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Active Status Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Active Learner:</span>
              <strong className="text-white font-mono text-xs flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                @{username}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
              <span className="text-slate-400 font-mono">Database Status:</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                syncStatus === 'synced'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : syncStatus === 'syncing'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {syncStatus === 'synced' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Neon DB Synced</span>
                  </>
                ) : syncStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    <span>Offline (Local)</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-slate-400 font-mono text-[11px]">
              <span>Saved Stats:</span>
              <span>{progress.xp} XP • {progress.completedModules.length}/7 Mods Cleared</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-400 mb-1.5">
                Switch or Login with Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="enter_username (e.g. charles)"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                No password required! Simply enter your username to retrieve or save your progress.
              </p>
            </div>

            {statusMsg && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{statusMsg.text}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={loading || !inputUsername.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                <span>Log In & Load Progress</span>
              </button>

              <button
                type="button"
                onClick={handleManualSync}
                disabled={loading}
                title="Force sync current progress to Neon DB"
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
