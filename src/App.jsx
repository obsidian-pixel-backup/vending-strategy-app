import { useState, useEffect } from 'react';
import FinancialModeler from './components/FinancialModeler';
import { knowledgeData } from './data/knowledgeBase';
import { 
  BarChart3, 
  MapPin, 
  Settings, 
  ShieldCheck, 
  ShoppingCart, 
  TrendingUp,
  Cpu,
  Building2,
  ExternalLink,
  Check,
  ListTodo,
  Lightbulb,
  Truck,
  Brain,
  Recycle,
  Dumbbell,
  BookOpen,
  Search
} from 'lucide-react';

function Overview() {
  return (
    <div className="animate-fade-in">
      <h1>Vending Business Strategy</h1>
      <p className="subtitle">South Africa Market Blueprint & Master Encyclopedia</p>
      
      <div className="grid-2">
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', fontWeight: 400 }}>Executive Summary</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            This master application serves as the definitive command center for launching and scaling an automated retail empire in South Africa. 
            It integrates an exhaustive, AI-compiled <strong>Encyclopedia</strong> containing global hardware specifications, telemetry deep-dives, psychological consumer manipulation strategies, and expansive supplier networks. 
            Coupled with interactive financial modeling and route logistics, this blueprint ensures a data-driven, high-profit approach to the modern vending market.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* FIXED RELATIVE PATH */}
          <img src="./vending_3d.png" alt="Smart Vending Machine" className="asset-image" style={{ height: '100%' }} />
        </div>
      </div>

      <div className="grid-3 delay-1 animate-fade-in">
        <div className="stat-card glass-panel">
          <span className="stat-label">Initial Fleet</span>
          <span className="stat-value">4</span>
          <span className="stat-label" style={{ marginTop: 'auto' }}>Machines</span>
        </div>
        <div className="stat-card glass-panel">
          <span className="stat-label">Est. Capital Required</span>
          <span className="stat-value">R44k</span>
          <span className="stat-label" style={{ marginTop: 'auto' }}>Refurbished Route</span>
        </div>
        <div className="stat-card glass-panel">
          <span className="stat-label">Target Profit Margin</span>
          <span className="stat-value">25%</span>
          <span className="stat-label" style={{ marginTop: 'auto' }}>Net operating margin</span>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value) {
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  let formatted = '';
  
  if (absVal >= 1e9) {
    formatted = `${(absVal / 1e9).toFixed(1)}B`;
  } else if (absVal >= 1e6) {
    formatted = `${(absVal / 1e6).toFixed(1)}M`;
  } else if (absVal >= 1e3) {
    formatted = `${(absVal / 1e3).toFixed(1)}k`;
  } else {
    formatted = absVal.toLocaleString(undefined, {maximumFractionDigits:0});
  }
  
  return isNegative ? `- R ${formatted}` : `R ${formatted}`;
}

function Economics() {
  const [machines, setMachines] = useState(4);
  const [salesPerWeek, setSalesPerWeek] = useState(200);
  const [pricePerItem, setPricePerItem] = useState(20);
  const [costPerItem, setCostPerItem] = useState(12.5);
  
  const weeksPerMonth = 4.33;
  
  // Base calculations
  const monthlySales = salesPerWeek * weeksPerMonth * machines;
  const monthlyRevenue = monthlySales * pricePerItem;
  const monthlyCOGS = monthlySales * costPerItem;
  
  // Dynamic scaling overheads based on Agent 9 Intel
  const fuel = 200 * weeksPerMonth * (1 + (machines - 1) * 0.25);
  const electricity = 350 * machines;
  const maintenanceAndInsurance = 400 * machines;
  const commission = monthlyRevenue * 0.15;
  const admin = 500 * (1 + (machines / 10));
  
  // Payment fees: 70% cashless (Nayax is R200/mo + 3.8% fee)
  const paymentFees = (monthlyRevenue * 0.70) * 0.038 + (200 * machines);
  
  const totalOverheads = fuel + electricity + maintenanceAndInsurance + commission + admin + paymentFees;
  const netProfit = monthlyRevenue - monthlyCOGS - totalOverheads;

  // Forecasts
  const annualRevenue = monthlyRevenue * 12;
  const annualProfit = netProfit * 12;
  const machineCapex = 25000; // Estimated R25k per standard smart unit
  const totalCapex = machineCapex * machines;
  const paybackMonths = netProfit > 0 ? (totalCapex / netProfit).toFixed(1) : '∞';

  return (
    <div className="animate-fade-in">
      <h1>Financial Analytics Dashboard</h1>
      <p className="subtitle">Interactive Real-Time Fleet Projections & ROI Multipliers</p>
      
      <div className="grid-2">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontWeight: 400, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Core Variables</h3>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>Fleet Size (Machines)</span>
              <span className="pill">{machines} Units</span>
            </div>
            <input type="range" min="1" max="50" step="1" value={machines} onChange={(e) => setMachines(parseInt(e.target.value))} className="interactive-slider" style={{ margin: '0.5rem 0' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>Sales Velocity (Units/Mach/Week)</span>
              <span className="pill">{salesPerWeek} Sales</span>
            </div>
            <input type="range" min="50" max="500" step="10" value={salesPerWeek} onChange={(e) => setSalesPerWeek(parseInt(e.target.value))} className="interactive-slider" style={{ margin: '0.5rem 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Avg Price per Item (R)</div>
              <input type="number" value={pricePerItem} onChange={(e) => setPricePerItem(parseFloat(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Avg Cost (COGS) (R)</div>
              <input type="number" value={costPerItem} onChange={(e) => setCostPerItem(parseFloat(e.target.value))} className="number-input" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 400, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Monthly Cashflow</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Gross Revenue</span>
              <span>R {monthlyRevenue.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Cost of Goods (COGS)</span>
              <span style={{ color: '#ef4444' }}>- R {monthlyCOGS.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            
            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Fuel & Logistics (Scaled)</span><span>R {fuel.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Commission (15%)</span><span>R {commission.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Nayax & Bank Fees (3.8%)</span><span>R {paymentFees.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Electricity, Insur. & Maint.</span><span>R {(electricity + maintenanceAndInsurance).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>

            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '0.5rem' }}>
              <span>Net Profit (Pre-tax)</span>
              <span style={{ color: netProfit > 0 ? 'var(--accent-success)' : '#ef4444', fontWeight: 500 }}>
                R {netProfit.toLocaleString(undefined, {maximumFractionDigits:0})}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-4 delay-1 animate-fade-in">
        <div className="metric-box">
          <div className="metric-label">Annual Revenue</div>
          <div className="metric-value">{formatCurrency(annualRevenue)}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Annual Net Profit</div>
          <div className="metric-value" style={{ color: annualProfit > 0 ? 'var(--accent-success)' : '#ef4444' }}>{formatCurrency(annualProfit)}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Total CAPEX</div>
          <div className="metric-value">{formatCurrency(totalCapex)}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">ROI Payback</div>
          <div className="metric-value">{paybackMonths}</div>
          <div className="metric-label" style={{ fontSize: '0.65rem' }}>Months</div>
        </div>
      </div>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="animate-fade-in">
      <h1>Marketplace</h1>
      <p className="subtitle">Verified South African Suppliers & Models</p>
      
      <div className="grid-2">
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--accent-blue)" /> Top Vending
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            SA's leading national supplier. Great for massive route deployments and high-end hot beverage.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>Azkoyen Hot Beverage Models</li>
            <li>Evoca Group machines</li>
            <li>"Kastella" water coolers</li>
          </ul>
          <a href="https://www.topvending.co.za" target="_blank" rel="noreferrer" className="external-link">
            Visit Website <ExternalLink size={14} />
          </a>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--accent-blue)" /> Vendtec Cape Town
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Specializes in the greater Cape Town area. Excellent for rentals, parts, and localized maintenance.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>BevMax 4 (Cold drinks)</li>
            <li>Standard Snack/Combo units</li>
            <li>Refurbished stock access</li>
          </ul>
          <a href="https://www.vendteccapetown.co.za" target="_blank" rel="noreferrer" className="external-link">
            Visit Website <ExternalLink size={14} />
          </a>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--accent-blue)" /> Corporate Vending Solutions
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Based in Retreat. Offers full-service management (they stock it for you) or outright purchases/rentals.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>Fully Managed Operations</li>
            <li>Combo & Coffee machines</li>
          </ul>
          <a href="https://www.corporatevending.co.za" target="_blank" rel="noreferrer" className="external-link">
            Visit Website <ExternalLink size={14} />
          </a>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--accent-blue)" /> SINO Plant (TCN Models)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Direct supplier of factory-grade, self-service TCN machines. Best for outright purchases and industrial buyers.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>TCN ZG Smart Models</li>
            <li>Elevator delivery systems</li>
          </ul>
          <a href="https://www.sinoplant.co.za" target="_blank" rel="noreferrer" className="external-link">
            Visit Website <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function LaunchChecklist() {
  const initialTasks = [
    { id: 1, phase: 'Legal', text: 'Register private company via CIPC BizPortal (R125-R175)', checked: false },
    { id: 2, phase: 'Legal', text: 'SARS automatic tax registration & open business bank account', checked: false },
    { id: 3, phase: 'Legal', text: 'Obtain EME B-BBEE certificate (essential for corporate sites)', checked: false },
    { id: 4, phase: 'Locations', text: 'Scout high-traffic areas (gyms, hospitals, factories)', checked: false },
    { id: 5, phase: 'Locations', text: 'Negotiate and sign revenue-share agreements with property management', checked: false },
    { id: 6, phase: 'Hardware', text: 'Request quotes from SA suppliers and procure machines', checked: false },
    { id: 7, phase: 'Hardware', text: 'Arrange delivery and verify electrical/MDB compatibility', checked: false },
    { id: 8, phase: 'Nayax', text: 'Purchase Nayax VPOS Touch or Onyx reader', checked: false },
    { id: 9, phase: 'Nayax', text: 'Submit KYC onboarding (ID, CIPC, Bank) to Nayax SA', checked: false },
    { id: 10, phase: 'Nayax', text: 'Setup Nayax MoMa 2.0 App for remote telemetry', checked: false },
    { id: 11, phase: 'Operations', text: 'Open a Makro Business account for bulk wholesale pricing', checked: false },
    { id: 12, phase: 'Operations', text: 'Load machine using FIFO (First-In-First-Out) method', checked: false },
    { id: 13, phase: 'Operations', text: 'Establish weekly cleaning and coin-mech maintenance schedule', checked: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('vending_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('vending_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const completedCount = tasks.filter(t => t.checked).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="animate-fade-in">
      <h1>Launch Checklist</h1>
      <p className="subtitle">Interactive Step-by-Step Operations Tracker</p>
      
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
          <span style={{ color: 'var(--accent-success)' }}>{progressPercent}%</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`checklist-item ${task.checked ? 'checked' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="checkbox">
              {task.checked && <Check size={14} color="#000" />}
            </div>
            <div style={{ flex: 1 }}>
              <span className="pill" style={{ marginRight: '1rem', fontSize: '0.65rem' }}>{task.phase}</span>
              <span className="checklist-text">{task.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyMap() {
  return (
    <div className="animate-fade-in">
      <h1>Locations & Wholesale</h1>
      <p className="subtitle">Cape Town Strategy & Product Mix</p>
      
      <div className="grid-2">
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} color="var(--accent-blue)" /> Cape Town Hubs
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Top Vending (Pinelands)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Unit B28/29 Pinelands Business Park, New Mill Street, Pinelands, 7405.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Vendtec (Northern Suburbs)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Operating primarily from the Bellville area to service greater Cape Town.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Makro (Montague Gardens & Ottery)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Primary hubs for bulk sourcing with 2-day delivery zones.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={20} color="var(--accent-blue)" /> Optimal Product Mix
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Wholesale via Makro Business is vital for margins. Here is the highly demanded SA loadout:
          </p>
          
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{color:'var(--text-secondary)'}}>Chocolates:</strong> BarOne, Lunch Bar, Peppermint Crisp.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Savoury:</strong> Simba Chips (Smoked Beef/Chutney), Doritos, NikNaks.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Cold Drinks:</strong> Coca-Cola, Stoney Ginger Beer, Sprite, Fanta Grape.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Energy:</strong> Monster, Red Bull, Score (massive budget demand).</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Alternative:</strong> Jungle Oats bars, Biltong, Steri Stumpie.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Innovations() {
  return (
    <div className="animate-fade-in">
      <h1>Future Innovations</h1>
      <p className="subtitle">Brainstorming & Expansion Opportunities</p>
      
      <div className="grid-2">
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={20} color="var(--accent-blue)" /> The Mobile Vending Truck
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            "A Shop on Wheels." Imagine an ice-cream truck, but built entirely from high-capacity smart vending machines. 
            This truck drives around the city, parking at high-traffic pop-up zones or beaches, dispensing cold drinks, sandwiches, and snacks to people on the go.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{color:'var(--text-secondary)'}}>No fixed rent:</strong> Avoids expensive mall or hospital commissions.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Dynamic routing:</strong> Move to where the crowds are (e.g., stadium events, beach fronts on hot days).</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Power:</strong> Requires an onboard quiet generator or heavy-duty battery bank to keep the compressors running.</li>
          </ul>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} color="var(--accent-blue)" /> Event & Catering Partnerships
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            A B2B expansion strategy. Partner with local catering companies and event coordinators to deploy temporary "Pop-Up" vending banks.
          </p>
          
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{color:'var(--text-secondary)'}}>Concerts & Festivals:</strong> Massive throughput in a 48-hour window.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Corporate Events:</strong> Supply bespoke branded machines dispensing healthy snacks or corporate swag.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Logistics:</strong> Requires a heavy-duty trailer and quick-setup telemetry connections.</li>
          </ul>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={20} color="var(--accent-blue)" /> AI Predictive Restocking
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Leverage AI and weather APIs connected to your Nayax telemetry to predict spikes in demand before they happen.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{color:'var(--text-secondary)'}}>Weather Integration:</strong> Automatically trigger restock alerts for cold drinks when a heatwave is forecast.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Event Synchronization:</strong> Automatically adjust PAR levels if a major sports game is happening near a machine.</li>
          </ul>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Recycle size={20} color="var(--accent-blue)" /> Reverse Eco-Vending
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Install machines that accept empty plastic bottles and aluminum cans from consumers in exchange for digital credits.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{color:'var(--text-secondary)'}}>Corporate ESG Funding:</strong> Pitch this to large corporations who need to meet their green-initiatives and ESG scores.</li>
            <li><strong style={{color:'var(--text-secondary)'}}>Voucher System:</strong> Dispense discount codes for the cafeteria or local stores.</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Dumbbell size={20} color="var(--accent-blue)" /> Hyper-Niche Micro Markets
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Move beyond chips and sodas by deploying highly specialized machines in captive environments.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{color:'var(--text-primary)', fontSize: '0.9rem'}}>The Gym Hub</strong>
              <p style={{color:'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem'}}>Pre-workout shots, protein bars, branded towels, and padlocks.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{color:'var(--text-primary)', fontSize: '0.9rem'}}>The Tech Hub</strong>
              <p style={{color:'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem'}}>Placed in university libraries or airports. Sells chargers, earphones, and power banks.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{color:'var(--text-primary)', fontSize: '0.9rem'}}>The Beauty Hub</strong>
              <p style={{color:'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem'}}>Placed in high-end mall bathrooms. Sells emergency cosmetics, perfume, and hygiene products.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(knowledgeData.map(item => item.category))];

  const filteredData = knowledgeData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      <h1>Vending Encyclopedia</h1>
      <p className="subtitle">Exhaustive Global Knowledge Base</p>
      
      <div className="glass-panel" style={{ marginBottom: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search manufacturers, telemetry, strategies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="pill"
              style={{ 
                background: selectedCategory === cat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)', 
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredData.map(item => (
          <div key={item.id} className="glass-panel delay-1 animate-fade-in" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>{item.title}</h3>
              <span className="pill" style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)' }}>{item.category}</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {item.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ margin: 0 }}>{paragraph}</p>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No results found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="logo-text">VEND<span style={{ color: 'var(--text-muted)' }}>STRAT</span></div>
        
        <button 
          className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} /> Executive Summary
        </button>
        <button 
          className={`nav-item ${activeTab === 'economics' ? 'active' : ''}`}
          onClick={() => setActiveTab('economics')}
        >
          <TrendingUp size={18} /> Financial Model
        </button>
        <button 
          className={`nav-item ${activeTab === 'marketplace' ? 'active' : ''}`}
          onClick={() => setActiveTab('marketplace')}
        >
          <ShoppingCart size={18} /> Marketplace
        </button>
        <button 
          className={`nav-item ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          <ListTodo size={18} /> Launch Checklist
        </button>
        <button 
          className={`nav-item ${activeTab === 'strategy' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategy')}
        >
          <MapPin size={18} /> Locations & Wholesale
        </button>
        <button 
          className={`nav-item ${activeTab === 'innovations' ? 'active' : ''}`}
          onClick={() => setActiveTab('innovations')}
        >
          <Lightbulb size={18} /> Innovations
        </button>
        <button 
          className={`nav-item ${activeTab === 'knowledgebase' ? 'active' : ''}`}
          onClick={() => setActiveTab('knowledgebase')}
        >
          <BookOpen size={18} /> Encyclopedia
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'economics' && <FinancialModeler />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'checklist' && <LaunchChecklist />}
        {activeTab === 'strategy' && <StrategyMap />}
        {activeTab === 'innovations' && <Innovations />}
        {activeTab === 'knowledgebase' && <KnowledgeBase />}
      </main>
    </div>
  );
}

export default App;
