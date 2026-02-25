import { useState, useCallback } from "react";
import TopBar    from "./components/TopBar";
import EmptyState from "./components/EmptyState";
import DataTable  from "./components/DataTable";
import Legend     from "./components/Legend";
import { parseCSV }   from "./utils/csvParser";
import { buildIndex } from "./utils/dataProcessor";

export default function App() {
  const [dark,          setDark]          = useState(false);
  const [rawData,       setRawData]       = useState([]);
  const [allGroups,     setAllGroups]     = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [collapseState, setCollapseState] = useState({});
  const [dataIdx,       setDataIdx]       = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [statusMsg,     setStatusMsg]     = useState("Aucun fichier chargé");

  const handleToggle = useCallback((key) => {
    setCollapseState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleGroupChange = useCallback((g) => {
    setSelectedGroup(g);
    setCollapseState({});
    if (rawData.length > 0) setDataIdx(buildIndex(rawData, g));
  }, [rawData]);

  const handleFileLoad = useCallback((file) => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setTimeout(() => {
        const parsed = parseCSV(ev.target.result);
        const groups = [...new Set(parsed.map((r) => r.groupe_suivi).filter(Boolean))].sort();
        const first  = groups.length > 0 ? groups[0] : "";
        setRawData(parsed);
        setAllGroups(groups);
        setSelectedGroup(first);
        setCollapseState({});
        setDataIdx(buildIndex(parsed, first));
        setStatusMsg(`${parsed.length} lignes · ${groups.length} activité(s)`);
        setLoading(false);
      }, 50);
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const bg = dark ? "bg-[#0d1117] text-slate-200" : "bg-[#f5f7fa] text-slate-800";

  return (
    <div className={`${bg} font-[Poppins,sans-serif] text-[13px] h-screen flex flex-col overflow-hidden`}>
      <TopBar
        dark={dark}
        onToggleTheme={() => setDark((v) => !v)}
        allGroups={allGroups}
        selectedGroup={selectedGroup}
        onGroupChange={handleGroupChange}
        statusMsg={statusMsg}
        onFileLoad={handleFileLoad}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {!dataIdx ? (
          <EmptyState dark={dark} />
        ) : (
          <DataTable
            dataIdx={dataIdx}
            collapseState={collapseState}
            onToggle={handleToggle}
            dark={dark}
          />
        )}
      </div>

      {dataIdx && <Legend dark={dark} />}

      {loading && (
        <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3.5 ${dark ? "bg-[#0d1117]/90" : "bg-[#f5f7fa]/90"}`}>
          <div className="w-8 h-8 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <span className={`text-[13px] font-medium ${dark ? "text-slate-500" : "text-slate-400"}`}>Traitement des données…</span>
        </div>
      )}
    </div>
  );
}
