import React, { useState } from 'react';

// Format currency helper
const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  if (absValue >= 1000000000) {
    return `${isNegative ? '-' : ''}R ${(absValue / 1000000000).toFixed(1)}B`;
  }
  if (absValue >= 1000000) {
    return `${isNegative ? '-' : ''}R ${(absValue / 1000000).toFixed(1)}M`;
  }
  if (absValue >= 1000) {
    return `${isNegative ? '-' : ''}R ${(absValue / 1000).toFixed(1)}k`;
  }
  return `${isNegative ? '-' : ''}R ${absValue.toFixed(0)}`;
};

export default function FinancialModeler() {
  // --- FLEET SETTINGS ---
  const [machines, setMachines] = useState(4);
  const [machineCapex, setMachineCapex] = useState(25000);

  // --- PRODUCT MIX (Per Machine / Week) ---
  // Beverages (e.g., Coke)
  const [includeBev, setIncludeBev] = useState(true);
  const [bevCost, setBevCost] = useState(12.5);
  const [bevPrice, setBevPrice] = useState(20);
  const [bevVol, setBevVol] = useState(80);

  // Confectionery (e.g., Chocolates)
  const [includeChoc, setIncludeChoc] = useState(true);
  const [chocCost, setChocCost] = useState(16.5);
  const [chocPrice, setChocPrice] = useState(25);
  const [chocVol, setChocVol] = useState(70);

  // Healthy/Niche (e.g., Protein Bars, Biltong)
  const [includeNiche, setIncludeNiche] = useState(true);
  const [nicheCost, setNicheCost] = useState(25);
  const [nichePrice, setNichePrice] = useState(45);
  const [nicheVol, setNicheVol] = useState(30);

  // --- OVERHEADS (Monthly per Machine) ---
  const [rentType, setRentType] = useState('commission'); // 'commission' or 'fixed'
  const [commissionRate, setCommissionRate] = useState(15); // %
  const [fixedRent, setFixedRent] = useState(1500); // R
  const [nayaxSub, setNayaxSub] = useState(200); // R
  const [nayaxFeeRate, setNayaxFeeRate] = useState(3.8); // %
  const [cashlessRatio, setCashlessRatio] = useState(80); // %
  const [electricity, setElectricity] = useState(350); // R
  const [insurance, setInsurance] = useState(250); // R
  const [maintenance, setMaintenance] = useState(200); // R

  // --- CALCULATIONS ---
  const weeksPerMonth = 4.33;

  // Individual Product Profitability (Per Machine / Month)
  const bevGrossProfit = includeBev ? (bevPrice - bevCost) * bevVol * weeksPerMonth : 0;
  const chocGrossProfit = includeChoc ? (chocPrice - chocCost) * chocVol * weeksPerMonth : 0;
  const nicheGrossProfit = includeNiche ? (nichePrice - nicheCost) * nicheVol * weeksPerMonth : 0;

  const bevRevenue = includeBev ? bevPrice * bevVol * weeksPerMonth : 0;
  const chocRevenue = includeChoc ? chocPrice * chocVol * weeksPerMonth : 0;
  const nicheRevenue = includeNiche ? nichePrice * nicheVol * weeksPerMonth : 0;

  // Fleet Totals (Monthly)
  const monthlyRevenuePerMachine = bevRevenue + chocRevenue + nicheRevenue;
  const monthlyGrossProfitPerMachine = bevGrossProfit + chocGrossProfit + nicheGrossProfit;
  
  const totalMonthlyRevenue = monthlyRevenuePerMachine * machines;
  const totalMonthlyGrossProfit = monthlyGrossProfitPerMachine * machines;
  const totalMonthlyCOGS = totalMonthlyRevenue - totalMonthlyGrossProfit;

  // Overhead Calculations (Monthly Fleet Total)
  const totalElectricity = electricity * machines;
  const totalInsurance = insurance * machines;
  const totalMaintenance = maintenance * machines;
  
  // Fuel scales sub-linearly
  const totalFuel = 200 * weeksPerMonth * (1 + (machines - 1) * 0.25);
  
  // Rent
  const totalRent = rentType === 'commission' 
    ? totalMonthlyRevenue * (commissionRate / 100) 
    : fixedRent * machines;

  // Payment Fees
  const cashlessRevenue = totalMonthlyRevenue * (cashlessRatio / 100);
  const totalTransactionFees = cashlessRevenue * (nayaxFeeRate / 100);
  const totalNayaxSub = nayaxSub * machines;
  const totalPaymentFees = totalTransactionFees + totalNayaxSub;

  const totalOverheads = totalElectricity + totalInsurance + totalMaintenance + totalFuel + totalRent + totalPaymentFees;

  const netProfit = totalMonthlyGrossProfit - totalOverheads;
  const annualProfit = netProfit * 12;
  const totalCapex = machineCapex * machines;
  const paybackMonths = netProfit > 0 ? (totalCapex / netProfit).toFixed(1) : '∞';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1>Deep Financial Modeler</h1>
        <p className="subtitle">Track individual item costs, margins, and fleet ROI</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* FLEET & CAPEX */}
        <div className="glass-panel">
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Fleet Setup</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Fleet Size</span>
              <span className="pill">{machines} Units</span>
            </div>
            <input type="range" min="1" max="100" step="1" value={machines} onChange={(e) => setMachines(Number(e.target.value))} className="interactive-slider" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Hardware CapEx (Per Unit)</span>
              <span className="pill">R {machineCapex.toLocaleString()}</span>
            </div>
            <input type="range" min="10000" max="80000" step="1000" value={machineCapex} onChange={(e) => setMachineCapex(Number(e.target.value))} className="interactive-slider" />
          </div>
        </div>

        {/* OVERHEADS */}
        <div className="glass-panel">
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Monthly Overheads (Per Machine)</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Rent Model</div>
              <select value={rentType} onChange={(e) => setRentType(e.target.value)} className="number-input" style={{ width: '100%', padding: '0.5rem' }}>
                <option value="commission">Commission %</option>
                <option value="fixed">Fixed Rent</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                {rentType === 'commission' ? 'Rate (%)' : 'Amount (R)'}
              </div>
              <input type="number" value={rentType === 'commission' ? commissionRate : fixedRent} onChange={(e) => rentType === 'commission' ? setCommissionRate(Number(e.target.value)) : setFixedRent(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nayax R/mo</div>
              <input type="number" value={nayaxSub} onChange={(e) => setNayaxSub(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nayax Fee %</div>
              <input type="number" value={nayaxFeeRate} onChange={(e) => setNayaxFeeRate(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cashless %</div>
              <input type="number" value={cashlessRatio} onChange={(e) => setCashlessRatio(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

      </div>

      {/* PRODUCT BASKET */}
      <div className="glass-panel">
        <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Individual Product Economics (Per Machine)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          {/* Beverages */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', opacity: includeBev ? 1 : 0.5, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--accent-primary)', margin: 0 }}>Beverages (Cans/Bottles)</h4>
              <input type="checkbox" checked={includeBev} onChange={(e) => setIncludeBev(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Wholesale Cost (R)</span>
              <input type="number" value={bevCost} onChange={(e) => setBevCost(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Retail Price (R)</span>
              <input type="number" value={bevPrice} onChange={(e) => setBevPrice(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekly Volume</span>
              <input type="number" value={bevVol} onChange={(e) => setBevVol(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ borderTop: '1px dashed var(--glass-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500 }}>
              <span>Gross Margin</span>
              <span style={{ color: ((bevPrice - bevCost) / bevPrice) > 0.4 ? 'var(--accent-success)' : '#ef4444' }}>{(((bevPrice - bevCost) / bevPrice) * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Confectionery */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', opacity: includeChoc ? 1 : 0.5, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#a855f7', margin: 0 }}>Snacks & Confectionery</h4>
              <input type="checkbox" checked={includeChoc} onChange={(e) => setIncludeChoc(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: '#a855f7', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Wholesale Cost (R)</span>
              <input type="number" value={chocCost} onChange={(e) => setChocCost(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Retail Price (R)</span>
              <input type="number" value={chocPrice} onChange={(e) => setChocPrice(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekly Volume</span>
              <input type="number" value={chocVol} onChange={(e) => setChocVol(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ borderTop: '1px dashed var(--glass-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500 }}>
              <span>Gross Margin</span>
              <span style={{ color: ((chocPrice - chocCost) / chocPrice) > 0.4 ? 'var(--accent-success)' : '#ef4444' }}>{(((chocPrice - chocCost) / chocPrice) * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Niche */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', opacity: includeNiche ? 1 : 0.5, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#eab308', margin: 0 }}>Health & Niche (Biltong)</h4>
              <input type="checkbox" checked={includeNiche} onChange={(e) => setIncludeNiche(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: '#eab308', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Wholesale Cost (R)</span>
              <input type="number" value={nicheCost} onChange={(e) => setNicheCost(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Retail Price (R)</span>
              <input type="number" value={nichePrice} onChange={(e) => setNichePrice(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekly Volume</span>
              <input type="number" value={nicheVol} onChange={(e) => setNicheVol(Number(e.target.value))} className="number-input" style={{ width: '80px' }} />
            </div>
            <div style={{ borderTop: '1px dashed var(--glass-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500 }}>
              <span>Gross Margin</span>
              <span style={{ color: ((nichePrice - nicheCost) / nichePrice) > 0.4 ? 'var(--accent-success)' : '#ef4444' }}>{(((nichePrice - nicheCost) / nichePrice) * 100).toFixed(0)}%</span>
            </div>
          </div>

        </div>
      </div>

      {/* MASTER P&L */}
      <div className="glass-panel" style={{ background: 'linear-gradient(145deg, rgba(30,30,40,0.8), rgba(20,20,30,0.9))' }}>
        <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Fleet Profit & Loss (Monthly)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Gross Revenue</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>R {totalMonthlyRevenue.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total COGS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#ef4444' }}>- R {totalMonthlyCOGS.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Gross Profit</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-primary)' }}>R {totalMonthlyGrossProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Operating Expenses (OpEx)</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>Location Rent / Commission</span><span style={{ color: '#ef4444' }}>- R {totalRent.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>Nayax SaaS & Bank Fees</span><span style={{ color: '#ef4444' }}>- R {totalPaymentFees.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>Electricity & Utilities</span><span style={{ color: '#ef4444' }}>- R {totalElectricity.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>Insurance & Maintenance</span><span style={{ color: '#ef4444' }}>- R {(totalInsurance + totalMaintenance).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>Fuel & Logistics</span><span style={{ color: '#ef4444' }}>- R {totalFuel.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div style={{ borderTop: '1px solid var(--glass-border)', margin: '0.5rem 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 600 }}>
            <span>Net Monthly Profit</span>
            <span style={{ color: netProfit > 0 ? 'var(--accent-success)' : '#ef4444' }}>R {netProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
        </div>
      </div>

      {/* ROI */}
      <div className="grid-3 delay-1">
        <div className="metric-box">
          <div className="metric-label">Annual Net Profit</div>
          <div className="metric-value" style={{ color: annualProfit > 0 ? 'var(--accent-success)' : '#ef4444' }}>{formatCurrency(annualProfit)}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Total Fleet CapEx</div>
          <div className="metric-value">{formatCurrency(totalCapex)}</div>
        </div>
        <div className="metric-box" style={{ borderBottom: '3px solid var(--accent-primary)' }}>
          <div className="metric-label">CapEx Payback Period</div>
          <div className="metric-value">{paybackMonths} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Months</span></div>
        </div>
      </div>

    </div>
  );
}
