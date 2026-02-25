import { useRef } from "react";

export default function TopBar({ dark, onToggleTheme, allGroups, selectedGroup, onGroupChange, statusMsg, onFileLoad }) {
  const fileRef = useRef();
  const bg2    = dark ? "bg-[#161b22]" : "bg-white";
  const border = dark ? "border-[#30363d]" : "border-slate-200";
  const text   = dark ? "text-slate-200" : "text-slate-800";
  const muted  = dark ? "text-slate-500" : "text-slate-400";

  return (
    <div className={`h-14 ${bg2} border-b-2 ${border} flex items-center px-5 gap-3.5 flex-shrink-0 z-[100] shadow-sm`}>
      <div className="w-[34px] h-[34px] bg-blue-600 rounded-[9px] flex items-center justify-center text-white text-[17px] flex-shrink-0 select-none">⚡</div>
      <span className={`font-bold text-[15px] tracking-tight ${text}`}>Flash Production</span>
      <div className={`w-px h-[22px] ${dark ? "bg-slate-700" : "bg-slate-200"}`} />
      <span className={`text-[11px] font-medium ${muted}`}>Activité :</span>
      <select
        className={`${dark ? "bg-[#21262d] border-[#30363d] text-slate-200" : "bg-slate-100 border-slate-200 text-slate-800"} border rounded-lg px-3 py-1.5 text-[12px] font-medium cursor-pointer outline-none min-w-[150px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
        value={selectedGroup}
        onChange={(e) => onGroupChange(e.target.value)}
      >
        <option value="">— Tous —</option>
        {allGroups.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>
      <span className={`text-[11px] font-normal ${muted}`}>{statusMsg}</span>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className={`w-9 h-9 rounded-lg border cursor-pointer flex items-center justify-center text-[16px] transition-all ${dark ? "bg-[#21262d] border-[#30363d] hover:border-blue-400 hover:bg-[#1c2d50]" : "bg-slate-100 border-slate-200 hover:border-blue-500 hover:bg-blue-50"}`}
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => fileRef.current.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white border-none px-4 py-2 rounded-lg text-[12px] cursor-pointer font-semibold flex items-center gap-1.5 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Charger CSV
        </button>
        <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={(e) => { onFileLoad(e.target.files[0]); e.target.value = ""; }} />
      </div>
    </div>
  );
}
