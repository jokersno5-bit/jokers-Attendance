import { useState, type FormEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { Spade, Loader2, Mail, Lock, User, ChevronRight } from 'lucide-react';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, name);

    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/20 mb-4">
          <Spade className="w-11 h-11 text-navy-950" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          JOKERS<span className="text-gold-400 ml-1.5">出欠管理</span>
        </h1>
        <p className="text-sm text-navy-300 mt-1">チームの出欠をシンプルに</p>
      </div>

      <div className="w-full max-w-sm bg-navy-900 rounded-2xl shadow-xl border border-navy-700/50 p-8">
        <div className="flex gap-1 bg-navy-800/60 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'signin' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-navy-300 hover:text-white'
            }`}
          >
            ログイン
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'signup' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-navy-300 hover:text-white'
            }`}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-navy-200 mb-1.5">名前</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田太郎"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-navy-200 mb-1.5">メールアドレス</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="team@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-200 mb-1.5">パスワード</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6文字以上"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:from-gold-500 hover:to-gold-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {mode === 'signin' ? 'ログイン' : 'アカウント作成'}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-xs text-navy-400 text-center max-w-xs">
        アカウントを作成すると、チームメンバーとして出欠の記録ができるようになります。
      </p>
    </div>
  );
}
