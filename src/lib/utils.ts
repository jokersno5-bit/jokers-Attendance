import type { AttendanceStatus, EventType } from './supabase';

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  sbl: 'SBL',
  practice_game: '練習試合',
  practice: '練習',
  other: 'その他',
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  sbl: 'bg-gold-500/20 text-gold-400',
  practice_game: 'bg-blue-500/15 text-blue-400',
  practice: 'bg-navy-700 text-navy-200',
  other: 'bg-purple-500/15 text-purple-400',
};

export const STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: '出席',
  absent: '欠席',
  late: '遅刻・早退',
  undecided: '未定',
};

export const STATUS_COLORS: Record<AttendanceStatus, { bg: string; text: string; border: string; dot: string }> = {
  present: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-500' },
  absent: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-500' },
  late: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-500' },
  undecided: { bg: 'bg-navy-700', text: 'text-navy-300', border: 'border-navy-600', dot: 'bg-navy-400' },
};

export const STATUS_ORDER: AttendanceStatus[] = ['present', 'late', 'undecided', 'absent'];

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatDateTime(dateStr: string): string {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
}

export function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr).getTime() >= Date.now();
}

export function toLocalDateTimeInput(dateStr: string): string {
  const d = new Date(dateStr);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}
