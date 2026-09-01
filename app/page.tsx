'use client';

import {
  Activity,
  BarChart3,
  Brain,
  ChevronRight,
  Flame,
  Goal,
  Heart,
  Home,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { calculatePrediction, confidenceScore, percent, type Prediction } from '@/lib/prediction';

type Match = {
  id: number;
  home: string;
  away: string;
  time: string;
  league: string;
  tag: 'Tippmix' | 'Top liga' | 'Magyar';
  xg: [number, number];
  form: [string, string];
  pick: string;
  dataQuality: number;
};

type EnrichedMatch = Match & { prediction: Prediction; confidence: number };

const matches: Match[] = [
  { id: 1, home: 'Arsenal', away: 'Fulham', time: '20:45', league: 'Premier League', tag: 'Tippmix', xg: [2.04, 0.81], form: ['GY · GY · D · GY · GY', 'V · D · GY · V · D'], pick: 'Hazai győzelem', dataQuality: 0.92 },
  { id: 2, home: 'Inter', away: 'Torino', time: '21:00', league: 'Serie A', tag: 'Tippmix', xg: [2.19, 0.69], form: ['GY · GY · GY · D · GY', 'D · V · D · GY · V'], pick: 'Over 1.5', dataQuality: 0.95 },
  { id: 3, home: 'Dortmund', away: 'Mainz', time: '18:30', league: 'Bundesliga', tag: 'Top liga', xg: [1.88, 1.21], form: ['GY · V · GY · GY · D', 'D · GY · V · D · GY'], pick: 'BTTS – Igen', dataQuality: 0.86 },
  { id: 4, home: 'Ferencváros', away: 'Paks', time: '19:30', league: 'NB I', tag: 'Magyar', xg: [1.76, 1.14], form: ['GY · D · GY · GY · V', 'GY · V · D · GY · D'], pick: 'Over 2.5', dataQuality: 0.82 },
  { id: 5, home: 'Real Sociedad', away: 'Getafe', time: '21:30', league: 'La Liga', tag: 'Top liga', xg: [1.42, 0.57], form: ['D · GY · D · V · GY', 'V · D · V · D · GY'], pick: 'BTTS – Nem', dataQuality: 0.88 },
];

const enriched: EnrichedMatch[] = matches.map((match) => {
  const prediction = calculatePrediction(match.xg[0], match.xg[1]);
  return { ...match, prediction, confidence: confidenceScore(prediction, match.dataQuality) };
});

const navItems = [
  [Home, 'Mai meccsek'],
  [Flame, 'Top jelzések'],
  [Trophy, 'Ligák'],
  [Search, 'Meccskereső'],
  [Brain, 'AI modell'],
  [BarChart3, 'Teljesítmény'],
  [Heart, 'Kedvencek'],
  [Settings, 'Beállítások'],
] as const;

function Confidence({ value }: { value: number }) {
  const hot = value >= 85;
  return (
    <span className={`confidence ${hot ? 'hot' : ''}`}>
      {hot ? <Flame size={14} /> : <ShieldCheck size={14} />} {value}
    </span>
  );
}

function MatchCard({ match, onOpen, favorite, onFavorite }: { match: EnrichedMatch; onOpen: () => void; favorite: boolean; onFavorite: () => void }) {
  const p = match.prediction;
  const btts = percent(p.bttsYes);
  return (
    <article className="match-card">
      <div className="match-top">
        <div><span className="time">{match.time}</span><span className="league">{match.league}</span></div>
        <div className="top-actions">
          <span className="tag"><Star size={12} fill="currentColor" />{match.tag}</span>
          <button className={`favorite ${favorite ? 'active' : ''}`} onClick={onFavorite} aria-label="Kedvenc"><Heart size={16} fill={favorite ? 'currentColor' : 'none'} /></button>
        </div>
      </div>
      <div className="teams"><strong>{match.home}</strong><span>–</span><strong>{match.away}</strong></div>
      <div className="prediction-row">
        <div><small>MODELL VÁRHATÓ EREDMÉNY</small><b>{p.predictedScore[0]}–{p.predictedScore[1]}</b></div>
        <div className="probabilities">
          {[['1', p.homeWin], ['X', p.draw], ['2', p.awayWin]].map(([label, value]) => (
            <span key={String(label)}><i>{label}</i><b>{percent(Number(value))}%</b></span>
          ))}
        </div>
      </div>
      <div className="market-row">
        <span>BTTS <b>{btts >= 50 ? 'IGEN' : 'NEM'} {btts >= 50 ? btts : 100 - btts}%</b></span>
        <span>O2.5 <b>{percent(p.over25)}%</b></span>
        <Confidence value={match.confidence} />
      </div>
      <button className="detail-btn" onClick={onOpen}>Részletes elemzés <ChevronRight size={16} /></button>
    </article>
  );
}

function Detail({ match, onClose }: { match: EnrichedMatch; onClose: () => void }) {
  const p = match.prediction;
  const matrix = p.matrix.filter((cell) => cell.home <= 4 && cell.away <= 4);
  const matrixValue = (home: number, away: number) => percent(matrix.find((c) => c.home === home && c.away === away)?.probability ?? 0);
  const topProb = Math.max(p.homeWin, p.draw, p.awayWin);
  const dominant = topProb === p.homeWin ? `${match.home} győzelme` : topProb === p.awayWin ? `${match.away} győzelme` : 'a döntetlen';

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true">
      <div className="detail-panel">
        <button className="close" onClick={onClose} aria-label="Bezárás"><X /></button>
        <div className="detail-heading"><span>{match.league} · {match.time}</span><h2>{match.home} <em>–</em> {match.away}</h2></div>
        <div className="hero-prediction">
          <div><small>POISSON / xG EREDMÉNY-ELŐREJELZÉS</small><strong>{p.predictedScore[0]}–{p.predictedScore[1]}</strong><p>Várható gól: <b>{p.expectedHome.toFixed(2)}</b> – <b>{p.expectedAway.toFixed(2)} xG</b></p></div>
          <Confidence value={match.confidence} />
        </div>
        <div className="detail-grid">
          <section className="panel">
            <h3>1X2 valószínűség</h3>
            {[[`1 — ${match.home}`, p.homeWin], ['X — Döntetlen', p.draw], [`2 — ${match.away}`, p.awayWin]].map(([label, value]) => (
              <div className="bar" key={String(label)}><span>{label}</span><div><i style={{ width: `${percent(Number(value))}%` }} /></div><b>{percent(Number(value))}%</b></div>
            ))}
          </section>
          <section className="panel">
            <h3>Gólpiacok</h3>
            <div className="market-list"><p>Over 1.5 <b>{percent(p.over15)}%</b></p><p>Over 2.5 <b>{percent(p.over25)}%</b></p><p>Over 3.5 <b>{percent(p.over35)}%</b></p><p>BTTS – Igen <b>{percent(p.bttsYes)}%</b></p></div>
          </section>
          <section className="panel wide">
            <h3>Pontos eredménymátrix</h3>
            <div className="matrix">
              <div />{[0,1,2,3,4].map((away) => <b key={`a-${away}`}>{match.away} {away}</b>)}
              {[0,1,2,3,4].flatMap((home) => [
                <b key={`h-${home}`}>{match.home} {home}</b>,
                ...[0,1,2,3,4].map((away) => { const v = matrixValue(home, away); return <span key={`${home}-${away}`} className={v >= 10 ? 'peak' : ''}>{v}%</span>; }),
              ])}
            </div>
            <p className="hint">Legvalószínűbb: {p.topScores.slice(0,3).map((s) => <b key={`${s.home}-${s.away}`}>{s.home}–{s.away} ({percent(s.probability)}%) </b>)}</p>
          </section>
          <section className="panel wide reason"><Brain /><div><h3>Miért ezt jósolja a modell?</h3><p>A jelenlegi xG-bemenetek alapján {dominant} a legvalószínűbb kimenet. A modell külön Poisson-eloszlással számolja a két csapat góljait, majd az eredménymátrixból vezeti le az 1X2, BTTS és gólpiaci valószínűségeket. Ez a v0.2-ben már ugyanabból a központi számításból származik, nem külön beírt értékekből.</p></div></section>
          <section className="panel wide"><h3>Aktuális forma</h3><div className="forms"><p><b>{match.home}</b><span>{match.form[0]}</span></p><p><b>{match.away}</b><span>{match.form[1]}</span></p></div></section>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [filter, setFilter] = useState('Összes');
  const [selected, setSelected] = useState<EnrichedMatch | null>(null);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => enriched.filter((m) => {
    const filterOk = filter === 'Összes' || filter === 'Ma' || (filter === 'Tippmix' && m.tag === 'Tippmix') || (filter === 'Top liga' && m.tag === 'Top liga') || (filter === 'Magyar' && m.tag === 'Magyar') || (filter === 'BL/EL' && /Champions|Europa|BL|EL/.test(m.league));
    const q = query.trim().toLocaleLowerCase('hu-HU');
    const queryOk = !q || `${m.home} ${m.away} ${m.league}`.toLocaleLowerCase('hu-HU').includes(q);
    return filterOk && queryOk;
  }), [filter, query]);

  const strongest = [...enriched].sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div><Activity /></div><span>Match<b>IQ</b></span><small>v0.2</small></div>
        <nav>{navItems.map(([Icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><Icon size={19}/><span>{label}</span>{index === 1 && <i>{strongest.length}</i>}</button>)}</nav>
        <div className="model-status"><span/><div><b>Prediction Core aktív</b><small>Poisson + xG · v0.2</small></div></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="mobile-brand"><Activity/><b>MatchIQ</b></div>
          <div className="live"><span/> 24 élő mérkőzés</div>
          <button className="search" onClick={() => setShowSearch((v) => !v)}><Search size={17}/> Meccs vagy csapat keresése...</button>
          <div className="date-pill">2026. SZEPTEMBER 1. · KEDD</div>
        </header>
        <div className="page">
          {showSearch && <div className="search-box"><Search size={18}/><input autoFocus placeholder="Arsenal, NB I, Serie A..." value={query} onChange={(e) => setQuery(e.target.value)} /><button onClick={() => {setQuery('');setShowSearch(false);}}><X size={17}/></button></div>}
          <div className="title-row"><div><p className="eyebrow">NAPI MODELLKÖZPONT · V0.2</p><h1>Mai mérkőzések</h1><p>Adatvezérelt előrejelzések közös Poisson/xG számításból.</p></div><div className="accuracy"><Goal/><div><small>MODELL STÁTUSZ</small><b>Prediction Core</b></div></div></div>
          <div className="filters">{['Összes','Tippmix','Top liga','Magyar','BL/EL','Ma','Holnap'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <section className="signals"><div className="section-heading"><div><Flame/><span><b>Mai legerősebb modelljelzések</b><small>A confidence score alapján rendezve</small></span></div><p>Nem garantált tippek</p></div><div className="signal-grid">{strongest.map((m, i) => <button onClick={() => setSelected(m)} className="signal" key={m.id}><span className="rank">0{i+1}</span><div><b>{m.home} – {m.away}</b><small>{m.league} · {m.time}</small></div><span className="pick">{m.pick}</span><strong>{Math.max(percent(m.prediction.homeWin), percent(m.prediction.draw), percent(m.prediction.awayWin))}%</strong><Confidence value={m.confidence}/><ChevronRight/></button>)}</div></section>
          <div className="list-heading"><div><h2>Összes mérkőzés</h2><span>{filtered.length} mérkőzés</span></div><small>A csapatadatok továbbra is tesztadatok; a valószínűségek már számítottak.</small></div>
          <div className="match-grid">{filtered.map((m) => <MatchCard key={m.id} match={m} onOpen={() => setSelected(m)} favorite={favorites.includes(m.id)} onFavorite={() => setFavorites((f) => f.includes(m.id) ? f.filter((id) => id !== m.id) : [...f, m.id])}/>)}</div>
        </div>
        <nav className="mobile-nav">{navItems.slice(0,5).map(([Icon,label],i) => <button className={i===0?'active':''} key={label}><Icon/><span>{label.split(' ')[0]}</span></button>)}</nav>
      </section>
      {selected && <Detail match={selected} onClose={() => setSelected(null)}/>} 
    </main>
  );
}

