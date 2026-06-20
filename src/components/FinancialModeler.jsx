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

const defaultInventory = [
  { id: '1', name: 'Coca-Cola Original (300ml Can)', category: 'Drinks', cost: 12.50, price: 20.00, volume: 40, enabled: true },
  { id: '2', name: 'Valpré Still Water (500ml Bottle)', category: 'Drinks', cost: 7.50, price: 15.00, volume: 30, enabled: true },
  { id: '3', name: 'Red Bull Energy Drink (250ml Can)', category: 'Drinks', cost: 18.50, price: 35.00, volume: 20, enabled: true },
  { id: '4', name: 'Lipton Peach Iced Tea (300ml Can)', category: 'Drinks', cost: 13.00, price: 22.00, volume: 20, enabled: true },
  { id: '5', name: 'Steri Stumpie Flavoured Milk (350ml)', category: 'Drinks', cost: 14.50, price: 25.00, volume: 20, enabled: true },
  { id: '6', name: 'Simba Chips (36g)', category: 'Chips', cost: 7.70, price: 15.00, volume: 30, enabled: true },
  { id: '7', name: "Lay's Lightly Salted (36g)", category: 'Chips', cost: 8.00, price: 15.00, volume: 30, enabled: true },
  { id: '8', name: 'Doritos Sweet Chilli Pepper (45g)', category: 'Chips', cost: 8.50, price: 16.00, volume: 25, enabled: true },
  { id: '9', name: 'Safari Peanuts & Raisins (50g)', category: 'Snacks', cost: 8.50, price: 16.00, volume: 25, enabled: true },
  { id: '10', name: 'Beef Biltong Snack Pack (35g)', category: 'Snacks', cost: 22.00, price: 40.00, volume: 15, enabled: true },
  { id: '11', name: 'Cadbury Lunch Bar (48g)', category: 'Chocolates', cost: 9.50, price: 18.00, volume: 20, enabled: true },
  { id: '12', name: 'Nestlé Bar One (50g)', category: 'Chocolates', cost: 10.50, price: 20.00, volume: 20, enabled: true },
  { id: '13', name: 'Jungle Oats Energy Bar (40g)', category: 'Chocolates', cost: 9.00, price: 18.00, volume: 20, enabled: true },
  { id: '14', name: 'Maynards Jelly Tots (100g)', category: 'Sweets', cost: 16.00, price: 28.00, volume: 15, enabled: true },
  { id: '15', name: 'Cadbury Dairy Milk Slab (80g)', category: 'Chocolates', cost: 18.50, price: 30.00, volume: 15, enabled: true },
  { id: '16', name: 'Panado Pain Tablets (2-Pack Foil)', category: 'Essentials', cost: 5.00, price: 12.00, volume: 20, enabled: true },
  { id: '17', name: 'Twinsaver Pocket Tissues', category: 'Essentials', cost: 4.50, price: 10.00, volume: 20, enabled: true },
  { id: '18', name: 'Universal Charging Cable (USB-C)', category: 'Essentials', cost: 35.00, price: 80.00, volume: 5, enabled: true },
  { id: '19', name: 'Zam-Buk Herbal Ointment (7g)', category: 'Essentials', cost: 15.00, price: 30.00, volume: 10, enabled: true },
  { id: '20', name: 'Hand Sanitizer (50ml)', category: 'Essentials', cost: 12.00, price: 25.00, volume: 15, enabled: true },
];

export default function FinancialModeler() {
  // --- FLEET SETTINGS ---
  const [machines, setMachines] = useState(4);
  const [machineCapex, setMachineCapex] = useState(25000);

  // --- DYNAMIC INVENTORY ---
  const [inventory, setInventory] = useState(defaultInventory);
  
  // Add item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Drinks');
  const [newItemCost, setNewItemCost] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemVol, setNewItemVol] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

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
  const [fuelBase, setFuelBase] = useState(200); // R
  const [adminMisc, setAdminMisc] = useState(0); // R

  // --- CALCULATIONS ---
  const weeksPerMonth = 4.33;

  // Inventory logic
  const handleInventoryChange = (id, field, value) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeInventoryItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemCost || !newItemPrice || !newItemVol) return;
    
    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCat,
      cost: Number(newItemCost),
      price: Number(newItemPrice),
      volume: Number(newItemVol),
      enabled: true
    };
    
    setInventory([...inventory, newItem]);
    setNewItemName('');
    setNewItemCost('');
    setNewItemPrice('');
    setNewItemVol('');
  };

  // Fleet Totals (Monthly)
  const activeItems = inventory.filter(i => i.enabled);
  
  const monthlyRevenuePerMachine = activeItems.reduce((sum, item) => sum + (item.price * item.volume * weeksPerMonth), 0);
  const monthlyGrossProfitPerMachine = activeItems.reduce((sum, item) => sum + ((item.price - item.cost) * item.volume * weeksPerMonth), 0);
  
  const totalMonthlyRevenue = monthlyRevenuePerMachine * machines;
  const totalMonthlyGrossProfit = monthlyGrossProfitPerMachine * machines;
  const totalMonthlyCOGS = totalMonthlyRevenue - totalMonthlyGrossProfit;

  // Overhead Calculations (Monthly Fleet Total)
  const totalElectricity = electricity * machines;
  const totalInsurance = insurance * machines;
  const totalMaintenance = maintenance * machines;
  
  // Fuel scales sub-linearly
  const totalFuel = fuelBase * weeksPerMonth * (1 + (machines - 1) * 0.25);
  const totalAdminMisc = adminMisc * machines;
  
  // Rent
  const totalRent = rentType === 'commission' 
    ? totalMonthlyRevenue * (commissionRate / 100) 
    : fixedRent * machines;

  // Payment Fees
  const cashlessRevenue = totalMonthlyRevenue * (cashlessRatio / 100);
  const totalTransactionFees = cashlessRevenue * (nayaxFeeRate / 100);
  const totalNayaxSub = nayaxSub * machines;
  const totalPaymentFees = totalTransactionFees + totalNayaxSub;

  const totalOverheads = totalElectricity + totalInsurance + totalMaintenance + totalFuel + totalRent + totalPaymentFees + totalAdminMisc;

  const netProfit = totalMonthlyGrossProfit - totalOverheads;
  const annualProfit = netProfit * 12;
  const totalCapex = machineCapex * machines;
  const paybackMonths = netProfit > 0 ? (totalCapex / netProfit).toFixed(1) : '∞';

  return (
    <>
    <div className="animate-fade-in financial-layout">
      
      {/* LEFT CONTENT AREA */}
      <div className="financial-main">
        


        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          
          {/* TOP CONTROLS */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Fleet Definition */}
        <div className="glass-panel" style={{ flex: '1 1 300px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>1. Fleet Scale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Number of Machines</label>
                <span style={{ fontWeight: 'bold' }}>{machines} Units</span>
              </div>
              <input type="range" min="1" max="50" value={machines} onChange={(e) => setMachines(Number(e.target.value))} className="interactive-slider" style={{ width: '100%', marginTop: '0.5rem' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Total vending units deployed.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg CapEx Per Machine (R)</div>
              <input type="number" value={machineCapex} onChange={(e) => setMachineCapex(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Upfront cost per machine.</div>
            </div>
          </div>
        </div>

        {/* Contracts & Payments */}
        <div className="glass-panel" style={{ flex: '1 1 300px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>2. Contracts & Payments</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {/* Rent Toggle */}
            <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setRentType('commission')} className={`tab-button ${rentType === 'commission' ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Commission %</button>
                <button onClick={() => setRentType('fixed')} className={`tab-button ${rentType === 'fixed' ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Fixed Rent</button>
              </div>
              <div style={{ flex: 1 }}>
                {rentType === 'commission' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Landlord Cut:</span>
                    <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="number-input" style={{ width: '80px' }} /> %
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Flat Rent:</span>
                    R <input type="number" value={fixedRent} onChange={(e) => setFixedRent(Number(e.target.value))} className="number-input" style={{ width: '100px' }} /> /mo
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Location placement fee.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nayax R/mo</div>
              <input type="number" value={nayaxSub} onChange={(e) => setNayaxSub(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Monthly card reader fee.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nayax Fee %</div>
              <input type="number" value={nayaxFeeRate} onChange={(e) => setNayaxFeeRate(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Bank transaction fee.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cashless %</div>
              <input type="number" value={cashlessRatio} onChange={(e) => setCashlessRatio(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Est. card vs cash usage.</div>
            </div>
          </div>
        </div>

        {/* Comprehensive Overheads */}
        <div className="glass-panel" style={{ flex: '1 1 300px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>3. Fixed & Variable Overheads</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Electricity (R)</div>
              <input type="number" value={electricity} onChange={(e) => setElectricity(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Avg monthly power.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Insurance (R)</div>
              <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Avg monthly policy.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Maintenance (R)</div>
              <input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Expected repairs.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fuel Base (R)</div>
              <input type="number" value={fuelBase} onChange={(e) => setFuelBase(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Transport/logistics.</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Admin/Misc (R)</div>
              <input type="number" value={adminMisc} onChange={(e) => setAdminMisc(Number(e.target.value))} className="number-input" style={{ width: '100%' }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Software/Accounting.</div>
            </div>
          </div>
        </div>

      </div>

      {/* DYNAMIC PRODUCT BASKET */}
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Dynamic Product Inventory (Per Machine)</h3>
          <div>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="number-input" style={{ padding: '0.3rem', fontSize: '0.9rem' }}>
              <option value="All">All Categories</option>
              <option value="Drinks">Drinks</option>
              <option value="Chips">Chips</option>
              <option value="Snacks">Snacks</option>
              <option value="Chocolates">Chocolates</option>
              <option value="Sweets">Sweets</option>
              <option value="Essentials">Essentials</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {inventory
            .filter(item => filterCategory === 'All' || item.category === filterCategory)
            .map(item => {
            const margin = ((item.price - item.cost) / item.price) * 100;
            const isGoodMargin = margin >= 40;

            let colorHex = 'var(--text-primary)';
            if (item.category === 'Drinks') colorHex = '#3b82f6';
            if (item.category === 'Chips') colorHex = '#f59e0b';
            if (item.category === 'Snacks') colorHex = '#d97706';
            if (item.category === 'Chocolates') colorHex = '#8b5cf6';
            if (item.category === 'Sweets') colorHex = '#ec4899';
            if (item.category === 'Essentials') colorHex = '#10b981';

            return (
              <div key={item.id} className={`product-card ${item.enabled ? '' : 'disabled'}`}>
                
                <button 
                  onClick={() => removeInventoryItem(item.id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', zIndex: 2, padding: '0 0.2rem' }}
                  title="Remove Item"
                >
                  &times;
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingRight: '1rem', position: 'relative', zIndex: 1 }}>
                  <h4 style={{ color: colorHex, margin: 0, fontSize: '1.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                  <input type="checkbox" checked={item.enabled} onChange={(e) => handleInventoryChange(item.id, 'enabled', e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cost (R)</span>
                    <input type="number" step="0.1" value={item.cost} onChange={(e) => handleInventoryChange(item.id, 'cost', Number(e.target.value))} className="number-input" style={{ width: '80px', padding: '0.2rem 0.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Retail (R)</span>
                    <input type="number" step="0.5" value={item.price} onChange={(e) => handleInventoryChange(item.id, 'price', Number(e.target.value))} className="number-input" style={{ width: '80px', padding: '0.2rem 0.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekly Vol</span>
                    <input type="number" value={item.volume} onChange={(e) => handleInventoryChange(item.id, 'volume', Number(e.target.value))} className="number-input" style={{ width: '80px', padding: '0.2rem 0.5rem' }} />
                  </div>

                  <div style={{ borderTop: '1px dashed var(--glass-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500 }}>
                    <span>Gross Margin</span>
                    <span style={{ color: isGoodMargin ? 'var(--accent-success)' : '#ef4444' }}>{margin.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* ADD NEW PRODUCT FORM */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>+ Add Custom Product</h4>
          <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Product Name</label>
              <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} className="number-input" style={{ width: '100%', textAlign: 'left', padding: '0.5rem' }} placeholder="e.g. Steri Stumpie" required />
            </div>
            <div style={{ width: '120px', flex: '1 1 120px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Category</label>
              <select value={newItemCat} onChange={e => setNewItemCat(e.target.value)} className="number-input" style={{ width: '100%', padding: '0.5rem' }}>
                <option value="Drinks">Drinks</option>
                <option value="Chips">Chips</option>
                <option value="Snacks">Snacks</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Sweets">Sweets</option>
                <option value="Essentials">Essentials</option>
              </select>
            </div>
            <div style={{ width: '90px', flex: '1 1 90px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Cost (R)</label>
              <input type="number" step="0.1" value={newItemCost} onChange={e => setNewItemCost(e.target.value)} className="number-input" style={{ width: '100%', padding: '0.5rem' }} required />
            </div>
            <div style={{ width: '90px', flex: '1 1 90px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Price (R)</label>
              <input type="number" step="0.5" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} className="number-input" style={{ width: '100%', padding: '0.5rem' }} required />
            </div>
            <div style={{ width: '90px', flex: '1 1 90px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Vol/Wk</label>
              <input type="number" value={newItemVol} onChange={e => setNewItemVol(e.target.value)} className="number-input" style={{ width: '100%', padding: '0.5rem' }} required />
            </div>
            <button type="submit" className="tab-button active" style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold', flex: '1 1 auto', background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.background='#2563eb'} onMouseOut={(e)=>e.currentTarget.style.background='var(--accent-blue)'}>Add Item</button>
          </form>
        </div>

      </div>
        </div>
      </div>

      {/* RIGHT FIXED PANEL -> NOW STICKY SIDEBAR */}
      <div className="financial-sidebar">
        {/* MASTER P&L */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Fleet Profit & Loss (Monthly)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gross Revenue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>R {totalMonthlyRevenue.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Total COGS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ef4444' }}>- R {totalMonthlyCOGS.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gross Profit</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-success)' }}>R {totalMonthlyGrossProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Operating Expenses (OpEx)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Location Rent</span>
              <span>R {totalRent.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Nayax & Bank Fees</span>
              <span>R {totalPaymentFees.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Electricity</span>
              <span>R {totalElectricity.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Fuel / Logistics</span>
              <span>R {totalFuel.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Insurance & Maint.</span>
              <span>R {(totalInsurance + totalMaintenance).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Admin & Misc</span>
              <span>R {totalAdminMisc.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', fontWeight: 'bold', color: '#ef4444' }}>
              <span>Total Overheads</span>
              <span>R {totalOverheads.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '2px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Monthly Net Profit</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: netProfit > 0 ? 'var(--accent-success)' : '#ef4444' }}>
              R {netProfit.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Annual Run Rate: <strong>R {annualProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Capital Expenditure (CapEx)</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span>Total Fleet Cost:</span>
              <span style={{ fontWeight: 'bold' }}>R {totalCapex.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span>ROI Payback:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {paybackMonths} Months
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
    </>
  );
}
