import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, RefreshCw } from "lucide-react";

const buildingTypes = [
  { label: "Residential Bungalow", costPerSqm: 120000 },
  { label: "Duplex / 2-Storey", costPerSqm: 145000 },
  { label: "Luxury Villa / Smart Home", costPerSqm: 220000 },
  { label: "Commercial Complex", costPerSqm: 165000 },
  { label: "Warehouse / Industrial", costPerSqm: 95000 },
  { label: "Office Building", costPerSqm: 155000 },
];

const finishLevels = [
  { label: "Standard Finish", multiplier: 1.0 },
  { label: "Medium Finish", multiplier: 1.3 },
  { label: "High-End Finish", multiplier: 1.6 },
  { label: "Luxury Finish", multiplier: 2.1 },
];

const locations = [
  { label: "Lagos / Abuja", multiplier: 1.2 },
  { label: "Port Harcourt / Kano", multiplier: 1.1 },
  { label: "Other Nigerian Cities", multiplier: 1.0 },
];

function formatNaira(value: number) {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  return `₦${value.toLocaleString()}`;
}

export default function ConstructionCalculator() {
  const [buildingType, setBuildingType] = useState(0);
  const [finishLevel, setFinishLevel] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);
  const [sqm, setSqm] = useState<number>(150);
  const [floors, setFloors] = useState<number>(1);
  const [showResult, setShowResult] = useState(false);

  const baseCost = buildingTypes[buildingType].costPerSqm;
  const finish = finishLevels[finishLevel].multiplier;
  const loc = locations[locationIndex].multiplier;
  const totalSqm = sqm * floors;
  const estimate = Math.round(baseCost * finish * loc * totalSqm);
  const lowEstimate = Math.round(estimate * 0.9);
  const highEstimate = Math.round(estimate * 1.1);

  const handleCalculate = () => setShowResult(true);
  const handleReset = () => { setSqm(150); setFloors(1); setBuildingType(0); setFinishLevel(0); setLocationIndex(0); setShowResult(false); };

  return (
    <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-[#0D1B38] px-8 py-5 flex items-center gap-3">
        <Calculator size={20} className="text-[#C9A84C]" />
        <h3 className="text-white font-black text-lg">Construction Cost Calculator</h3>
        <span className="ml-auto text-xs text-white/40 bg-white/10 px-2 py-1 rounded">Estimate Only</span>
      </div>

      <div className="p-8 space-y-6">
        {/* Building Type */}
        <div>
          <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-3">Building Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {buildingTypes.map((t, i) => (
              <button
                key={t.label}
                data-testid={`calc-type-${i}`}
                onClick={() => { setBuildingType(i); setShowResult(false); }}
                className={`px-3 py-2.5 text-xs font-bold rounded border text-left transition-all duration-200 ${
                  buildingType === i
                    ? "bg-[#0D1B38] text-white border-[#0D1B38]"
                    : "bg-white text-[#0D1B38] border-gray-200 hover:border-[#C9A84C]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size & Floors */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Floor Area (sqm)</label>
            <input
              data-testid="calc-sqm"
              type="number"
              min={50} max={10000}
              value={sqm}
              onChange={(e) => { setSqm(Number(e.target.value)); setShowResult(false); }}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Number of Floors</label>
            <select
              data-testid="calc-floors"
              value={floors}
              onChange={(e) => { setFloors(Number(e.target.value)); setShowResult(false); }}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] outline-none focus:border-[#C9A84C] transition-all"
            >
              {[1,2,3,4,5,6,7,8,10,12,15,18,20].map((n) => (
                <option key={n} value={n}>{n} Floor{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Finish Level */}
        <div>
          <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-3">Finish Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {finishLevels.map((f, i) => (
              <button
                key={f.label}
                data-testid={`calc-finish-${i}`}
                onClick={() => { setFinishLevel(i); setShowResult(false); }}
                className={`px-3 py-2.5 text-xs font-bold rounded border text-center transition-all duration-200 ${
                  finishLevel === i
                    ? "bg-[#C9A84C] text-[#0D1B38] border-[#C9A84C]"
                    : "bg-white text-[#0D1B38] border-gray-200 hover:border-[#C9A84C]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-3">Project Location</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {locations.map((l, i) => (
              <button
                key={l.label}
                data-testid={`calc-location-${i}`}
                onClick={() => { setLocationIndex(i); setShowResult(false); }}
                className={`px-3 py-2.5 text-xs font-bold rounded border text-center transition-all duration-200 ${
                  locationIndex === i
                    ? "bg-[#0D1B38] text-white border-[#0D1B38]"
                    : "bg-white text-[#0D1B38] border-gray-200 hover:border-[#C9A84C]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            data-testid="btn-calculate"
            onClick={handleCalculate}
            className="flex-1 py-3.5 bg-[#0D1B38] text-white font-black rounded text-sm tracking-wide hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calculator size={16} /> Calculate Estimate
          </button>
          <button
            data-testid="btn-reset-calc"
            onClick={handleReset}
            className="px-4 py-3.5 border border-gray-200 text-[#0D1B38] rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#0D1B38] rounded-sm p-6">
                <div className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-4">Estimated Project Cost</div>
                <div className="text-4xl font-black text-white mb-1">{formatNaira(estimate)}</div>
                <div className="text-white/50 text-xs mb-4">Range: {formatNaira(lowEstimate)} – {formatNaira(highEstimate)}</div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Total Area", value: `${totalSqm.toLocaleString()} sqm` },
                    { label: "Cost/sqm", value: formatNaira(Math.round(baseCost * finish * loc)) },
                    { label: "Floors", value: `${floors}` },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded p-3 text-center">
                      <div className="text-white font-black text-sm">{s.value}</div>
                      <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  * This is a preliminary estimate based on current material and labour costs. Actual costs may vary depending on site conditions, design complexity, and market fluctuations. Get a detailed quote from our team.
                </p>

                <a
                  href="/contact"
                  data-testid="btn-get-detailed-quote"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#C9A84C] text-[#0D1B38] font-black rounded text-xs tracking-wide hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Detailed Quote <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
