import React, { useState, useEffect } from 'react';

// Fallback initial hamburgers data
const DEFAULT_HAMBURGERS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades Reales',
    specialty_badge: '👑 Signature Legend ★★★★★',
    specialty_level: 'Legend',
    price: 14.99,
    stock: 45,
    sales: 1420,
    calories: '890 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    description: 'Carne 100% Angus flameada a la leña de roble, queso cheddar añejo fundido, cebolla caramelizada al bourbon.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Especialidades Reales',
    specialty_badge: '⭐ Especial Real ★★★★☆',
    specialty_level: 'Especial',
    price: 11.50,
    stock: 60,
    sales: 1280,
    calories: '740 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash premium con costra caramelizada, queso americano fundido y aderezo imperial.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Especialidades Reales',
    specialty_badge: '🔥 Especial Doble ★★★★★',
    specialty_level: 'Gourmet',
    price: 13.99,
    stock: 38,
    sales: 1150,
    calories: '960 kcal',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80',
    description: 'Dos medallones de 160g de blend de picaña y roast beef, queso cheddar inglés y mermelada de panceta ahumada.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades Reales',
    specialty_badge: '✨ Edición Especial ★★★★★',
    specialty_level: 'Edición Limitada',
    price: 15.50,
    stock: 28,
    sales: 940,
    calories: '920 kcal',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=400&auto=format&fit=crop&q=80',
    description: 'Doble carne a la brasa, queso gouda ahumado, champiñones salteados al ajo negro confitado y mayonesa trufada.'
  },
  {
    id: 5,
    name: 'Classic Rapid Cheeseburger',
    category: 'Clásicas Rápidas',
    specialty_badge: '🍔 Clásica Imperial ★★★☆☆',
    specialty_level: 'Clásica',
    price: 8.99,
    stock: 85,
    sales: 1650,
    calories: '610 kcal',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&auto=format&fit=crop&q=80',
    description: 'Medallón tradicional de carne vacuna seleccionada, queso cheddar derretido al vapor y ketchup artesanal.'
  },
  {
    id: 6,
    name: 'Bacon Deluxe BBQ Smoke',
    category: 'Clásicas Rápidas',
    specialty_badge: '🥓 Favorito Chef ★★★★☆',
    specialty_level: 'Favorito',
    price: 12.50,
    stock: 52,
    sales: 1320,
    calories: '870 kcal',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80',
    description: 'Medallón angus 200g cubierto con triple panceta ahumada al manzano, salsa barbacoa casera y aros de cebolla.'
  },
  {
    id: 7,
    name: 'Crispy Royal Chicken',
    category: 'Pollo & Alternativas',
    specialty_badge: '🍗 Especial Pollo ★★★★☆',
    specialty_level: 'Especial',
    price: 10.99,
    stock: 40,
    sales: 890,
    calories: '710 kcal',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk y 11 especias, rebozado crujiente, ensalada coleslaw fresca y honey mustard.'
  },
  {
    id: 8,
    name: 'Smash Avocado Truffle',
    category: 'Especialidades Reales',
    specialty_badge: '🥑 Gourmet Selección ★★★★★',
    specialty_level: 'Gourmet',
    price: 13.50,
    stock: 34,
    sales: 780,
    calories: '780 kcal',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&auto=format&fit=crop&q=80',
    description: 'Doble smash patty crocante con finas láminas de palta fresca, alioli suave de trufa negra y brotes tiernos.'
  },
  {
    id: 9,
    name: 'Spicy Fire Diablo',
    category: 'Especialidades Reales',
    specialty_badge: '🌶️ Fuego Picante ★★★★☆',
    specialty_level: 'Picante',
    price: 12.99,
    stock: 30,
    sales: 620,
    calories: '830 kcal',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=80',
    description: 'Blend sazonado al chipotle, rodajas de jalapeños en escabeche, queso pepper jack y mayo cremosa de sriracha.'
  },
  {
    id: 10,
    name: 'Veggie Portobello Master',
    category: 'Pollo & Alternativas',
    specialty_badge: '🌱 Green Gourmet ★★★★☆',
    specialty_level: 'Vegetariana',
    price: 11.99,
    stock: 25,
    sales: 490,
    calories: '520 kcal',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400&auto=format&fit=crop&q=80',
    description: 'Hongo Portobello entero a la plancha marinado al balsámico, provoleta dorada, pesto de albahaca y tomates secos.'
  }
];

// Fallback Consumer Metrics
const DEFAULT_CONSUMERS_DATA = {
  kpis: {
    totalCustomers: 1428,
    activeThisMonth: 984,
    averageTicket: 18.45,
    repeatRatePercentage: 68.2,
    customerSatisfactionRating: 4.9,
    monthlyRevenueEstimated: 42850.00
  },
  tiers: [
    {
      id: 'gold',
      name: 'Clientes Gold VIP (> $120)',
      count: 285,
      percentage: 20,
      avgSpend: 158.40,
      ordersPerMonth: 6.2,
      badgeColor: '#B45309',
      badgeBg: '#FEF3C7',
      revenueContribution: '42%'
    },
    {
      id: 'silver',
      name: 'Clientes Recurrentes Silver ($50 - $120)',
      count: 642,
      percentage: 45,
      avgSpend: 74.20,
      ordersPerMonth: 3.1,
      badgeColor: '#475569',
      badgeBg: '#E2E8F0',
      revenueContribution: '38%'
    },
    {
      id: 'bronze',
      name: 'Nuevos / Ocasionales Bronze (< $50)',
      count: 501,
      percentage: 35,
      avgSpend: 26.80,
      ordersPerMonth: 1.2,
      badgeColor: '#C2410C',
      badgeBg: '#FFEDD5',
      revenueContribution: '20%'
    }
  ],
  topConsumers: [
    {
      id: 'usr_01',
      name: 'Sofía Benítez',
      email: 'sofia.benitez@rapidburger.com',
      tier: 'Gold VIP',
      totalSpent: 268.50,
      totalOrders: 18,
      favoriteBurger: 'Rey de las Burgers',
      lastOrder: 'Hace 2 horas',
      preferredChannel: 'PWA Móvil'
    },
    {
      id: 'usr_02',
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@rapidburger.com',
      tier: 'Gold VIP',
      totalSpent: 224.00,
      totalOrders: 15,
      favoriteBurger: 'Burger Real Doble',
      lastOrder: 'Ayer 21:15',
      preferredChannel: 'PWA Móvil'
    },
    {
      id: 'usr_03',
      name: 'Mariana Rivas',
      email: 'mariana.rivas@rapidburger.com',
      tier: 'Gold VIP',
      totalSpent: 198.80,
      totalOrders: 13,
      favoriteBurger: 'Burger Doble Especial',
      lastOrder: 'Hace 1 día',
      preferredChannel: 'Web E-commerce'
    },
    {
      id: 'usr_04',
      name: 'Diego Navarro',
      email: 'diego.navarro@rapidburger.com',
      tier: 'Gold VIP',
      totalSpent: 162.50,
      totalOrders: 11,
      favoriteBurger: 'Burger Real Clásica',
      lastOrder: 'Hace 3 días',
      preferredChannel: 'PWA Móvil'
    },
    {
      id: 'usr_05',
      name: 'Valentina Castro',
      email: 'valentina.castro@rapidburger.com',
      tier: 'Silver',
      totalSpent: 134.20,
      totalOrders: 9,
      favoriteBurger: 'Bacon Deluxe BBQ Smoke',
      lastOrder: 'Hace 4 días',
      preferredChannel: 'PWA Móvil'
    },
    {
      id: 'usr_06',
      name: 'Joaquín Morales',
      email: 'joaquin.m@rapidburger.com',
      tier: 'Silver',
      totalSpent: 118.00,
      totalOrders: 8,
      favoriteBurger: 'Rey de las Burgers',
      lastOrder: 'Hace 5 días',
      preferredChannel: 'Web E-commerce'
    }
  ],
  channels: {
    pwaSharePercentage: 68,
    webSharePercentage: 32
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, burgers, consumers, database
  const [serverHealth, setServerHealth] = useState(null);
  const [burgers, setBurgers] = useState(DEFAULT_HAMBURGERS);
  const [consumerMetrics, setConsumerMetrics] = useState(DEFAULT_CONSUMERS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form state for adding new burger
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'Especialidades Reales',
    specialty_badge: 'Especial Real ★★★★☆',
    specialty_level: 'Especial',
    price: '',
    stock: '',
    description: '',
    calories: '750 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
  });

  // Fetch data on load
  const loadData = () => {
    setLoading(true);

    // Health check
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setServerHealth(data))
      .catch((err) => console.warn('API Health offline o fallback:', err));

    // Products
    fetch('/api/products')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setBurgers(resData.data);
        }
      })
      .catch((err) => console.warn('API Products offline o fallback:', err));

    // Consumer metrics
    fetch('/api/consumers/metrics')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setConsumerMetrics(resData.data);
        }
      })
      .catch((err) => console.warn('API Metrics offline o fallback:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Quick stock update
  const handleUpdateStock = (id, delta) => {
    setBurgers((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextStock = Math.max(0, (parseInt(b.stock, 10) || 0) + delta);
          // Try to patch server
          fetch(`/api/products/${id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: nextStock })
          }).catch(() => {});
          return { ...b, stock: nextStock };
        }
        return b;
      })
    );
  };

  // Add new burger submit
  const handleCreateBurger = (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) {
      alert('Nombre y precio son obligatorios.');
      return;
    }

    const payload = {
      ...newBurger,
      price: parseFloat(newBurger.price) || 9.99,
      stock: parseInt(newBurger.stock, 10) || 20,
      sales: 0
    };

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBurgers((prev) => [data.data, ...prev]);
        } else {
          setBurgers((prev) => [{ ...payload, id: Date.now() }, ...prev]);
        }
        setIsAddModalOpen(false);
        setStatusMessage('¡Hamburguesa agregada con éxito!');
        setTimeout(() => setStatusMessage(''), 3000);
      })
      .catch(() => {
        setBurgers((prev) => [{ ...payload, id: Date.now() }, ...prev]);
        setIsAddModalOpen(false);
      });
  };

  // Reset demo catalog
  const handleResetCatalog = () => {
    if (!window.confirm('¿Deseas restablecer el catálogo a las 10 hamburguesas maestras originales?')) return;
    fetch('/api/reset', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setStatusMessage(data.message || 'Catálogo restablecido.');
        loadData();
        setTimeout(() => setStatusMessage(''), 4000);
      })
      .catch(() => {
        setBurgers(DEFAULT_HAMBURGERS);
        setStatusMessage('Catálogo restablecido en modo memoria.');
        setTimeout(() => setStatusMessage(''), 4000);
      });
  };

  const filteredBurgers = burgers.filter((b) => {
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Admin Navbar */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #F59E0B, #EA580C)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem'
          }}>
            🍔
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', lineHeight: 1.1 }}>
              Hamburger Rapid &bull; Panel de Control
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#EA580C', textTransform: 'uppercase' }}>
              Operaciones Comerciales & Analítica
            </div>
          </div>
        </div>

        {/* Database Status Quick Pill & Quick Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: serverHealth?.database?.connected ? '#DCFCE7' : '#FEF3C7',
            border: `1px solid ${serverHealth?.database?.connected ? '#86EFAC' : '#FDE68A'}`,
            color: serverHealth?.database?.connected ? '#15803D' : '#B45309',
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: serverHealth?.database?.connected ? '#16A34A' : '#D97706',
              display: 'inline-block'
            }} />
            {serverHealth?.database?.mode === 'mysql' ? '🐬 MySQL Activo' : '⚡ Modo In-Memory Respaldo'}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              🌐 E-commerce
            </a>
            <a
              href="/app"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(135deg, #EA580C, #D97706)',
                border: 'none',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              📱 PWA Móvil
            </a>
          </div>
        </div>
      </header>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div style={{
          background: '#DCFCE7',
          borderBottom: '1px solid #86EFAC',
          color: '#15803D',
          padding: '8px 24px',
          fontSize: '0.88rem',
          fontWeight: '700',
          textAlign: 'center'
        }}>
          {statusMessage}
        </div>
      )}

      {/* Main Container Layout */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '1.75rem 2rem', flex: 1 }}>
        
        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {[
            { id: 'overview', icon: '📊', label: 'Resumen Ejecutivo' },
            { id: 'burgers', icon: '🍔', label: `Hamburguesas Disponibles (${burgers.length})` },
            { id: 'consumers', icon: '👥', label: 'Métricas de Consumidores por Consumo' },
            { id: 'database', icon: '🗄️', label: 'Estado de la Base de Datos' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #EA580C' : '3px solid transparent',
                background: 'transparent',
                color: activeTab === tab.id ? '#0F172A' : '#64748B',
                fontWeight: activeTab === tab.id ? '800' : '600',
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: RESUMEN EJECUTIVO & KPIS                           */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="fade-in">
            {/* KPI Cards Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '18px',
              marginBottom: '28px'
            }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                    Total Clientes
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '9999px' }}>
                    +12.4% este mes
                  </span>
                </div>
                <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', marginTop: '6px' }}>
                  {consumerMetrics.kpis.totalCustomers.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                  {consumerMetrics.kpis.activeThisMonth} consumidores activos en los últimos 30 días
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                    Ticket Promedio
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#EA580C', background: '#FFEDD5', padding: '2px 8px', borderRadius: '9999px' }}>
                    Gourmet Index
                  </span>
                </div>
                <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', marginTop: '6px' }}>
                  ${consumerMetrics.kpis.averageTicket.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                  Tasa de recompra: <strong>{consumerMetrics.kpis.repeatRatePercentage}%</strong>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                    Variantes Activas
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#2563EB', background: '#DBEAFE', padding: '2px 8px', borderRadius: '9999px' }}>
                    10 Maestras
                  </span>
                </div>
                <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', marginTop: '6px' }}>
                  {burgers.length} Variantes
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                  Stock total disponible: <strong>{burgers.reduce((acc, b) => acc + (parseInt(b.stock, 10) || 0), 0)} unidades</strong>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                    Ingresos Mensuales
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '9999px' }}>
                    ⭐ 4.9/5 Satisfacción
                  </span>
                </div>
                <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0F172A', marginTop: '6px' }}>
                  ${consumerMetrics.kpis.monthlyRevenueEstimated.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                  Canal PWA: <strong>{consumerMetrics.channels.pwaSharePercentage}%</strong> &bull; Web: <strong>{consumerMetrics.channels.webSharePercentage}%</strong>
                </div>
              </div>
            </div>

            {/* Quick Segment Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px' }}>
                  Segmentación de Clientes según Nivel de Consumo
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {consumerMetrics.tiers.map((t) => (
                    <div key={t.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '700', marginBottom: '4px' }}>
                        <span>{t.name}</span>
                        <span>{t.count} clientes ({t.percentage}%) &bull; Aporta {t.revenueContribution} de las ventas</span>
                      </div>
                      <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${t.percentage}%`,
                          background: t.id === 'gold' ? '#F59E0B' : t.id === 'silver' ? '#94A3B8' : '#EA580C',
                          borderRadius: '9999px'
                        }} />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '3px' }}>
                        Gasto promedio: <strong>${t.avgSpend.toFixed(2)}/mes</strong> &bull; Frecuencia: <strong>{t.ordersPerMonth} pedidos/mes</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick DB Info Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '14px' }}>
                  Estado Operativo & Sistema
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Motor de Base de Datos:</span>
                    <strong>{serverHealth?.database?.mode === 'mysql' ? 'MySQL Pool v8.0+' : 'In-Memory Scaffold'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Host Asignado:</span>
                    <strong>{serverHealth?.database?.host || 'Auto-fallback'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Hamburguesas Registradas:</span>
                    <strong>{burgers.length} cortes</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Top Hamburguesa Más Pedida:</span>
                    <strong style={{ color: '#EA580C' }}>Rey de las Burgers (1,420 uds)</strong>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('burgers')}
                    style={{ flex: 1, padding: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Ver Inventario
                  </button>
                  <button
                    onClick={() => setActiveTab('consumers')}
                    style={{ flex: 1, padding: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Ver Consumidores
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: LISTA DE HAMBURGUESAS DISPONIBLES                  */}
        {/* ========================================================= */}
        {activeTab === 'burgers' && (
          <div className="fade-in">
            {/* Actions Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Filtrar por nombre de burger..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    width: '260px',
                    outline: 'none'
                  }}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="Especialidades Reales">Especialidades Reales</option>
                  <option value="Clásicas Rápidas">Clásicas Rápidas</option>
                  <option value="Pollo & Alternativas">Pollo & Alternativas</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleResetCatalog}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  ↺ Restablecer Iniciales
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #EA580C, #D97706)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(234, 88, 12, 0.25)'
                  }}
                >
                  + Nueva Hamburguesa
                </button>
              </div>
            </div>

            {/* Table of Hamburgers */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '14px 18px' }}>Hamburguesa</th>
                      <th style={{ padding: '14px 14px' }}>Categoría & Nivel</th>
                      <th style={{ padding: '14px 14px' }}>Precio</th>
                      <th style={{ padding: '14px 14px' }}>Ventas</th>
                      <th style={{ padding: '14px 14px' }}>Stock Actual</th>
                      <th style={{ padding: '14px 14px' }}>Disponibilidad</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Ajustar Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map((b) => {
                      const stockNum = parseInt(b.stock, 10) || 0;
                      const isOutOfStock = stockNum <= 0;
                      const isLowStock = stockNum > 0 && stockNum < 20;

                      return (
                        <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={b.image}
                                alt={b.name}
                                style={{ width: '46px', height: '46px', borderRadius: '8px', objectFit: 'cover' }}
                              />
                              <div>
                                <strong style={{ color: '#0F172A', display: 'block', fontSize: '0.92rem' }}>
                                  {b.name}
                                </strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                                  {b.calories || '750 kcal'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '14px 14px' }}>
                            <div style={{ fontWeight: '600', color: '#334155' }}>{b.category}</div>
                            <span style={{
                              display: 'inline-block',
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              color: '#B45309',
                              background: '#FEF3C7',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              marginTop: '2px'
                            }}>
                              {b.specialty_badge || 'Especial'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 14px', fontWeight: '800', color: '#EA580C', fontSize: '1rem' }}>
                            ${parseFloat(b.price).toFixed(2)}
                          </td>

                          <td style={{ padding: '14px 14px', color: '#334155', fontWeight: '600' }}>
                            {b.sales || 0} uds
                          </td>

                          <td style={{ padding: '14px 14px', fontWeight: '800' }}>
                            <span style={{ color: isOutOfStock ? '#DC2626' : isLowStock ? '#D97706' : '#16A34A' }}>
                              {stockNum} unidades
                            </span>
                          </td>

                          <td style={{ padding: '14px 14px' }}>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '9999px',
                              background: isOutOfStock ? '#FEE2E2' : isLowStock ? '#FEF3C7' : '#DCFCE7',
                              color: isOutOfStock ? '#DC2626' : isLowStock ? '#B45309' : '#15803D'
                            }}>
                              {isOutOfStock ? '● Agotada' : isLowStock ? '● Stock Bajo' : '● Disponible'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <button
                                onClick={() => handleUpdateStock(b.id, -5)}
                                style={{
                                  background: '#F1F5F9',
                                  border: '1px solid #CBD5E1',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontWeight: '800',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                -5
                              </button>
                              <button
                                onClick={() => handleUpdateStock(b.id, 5)}
                                style={{
                                  background: '#F1F5F9',
                                  border: '1px solid #CBD5E1',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontWeight: '800',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                +5
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: MÉTRICAS DE CONSUMIDORES SEGÚN CONSUMO             */}
        {/* ========================================================= */}
        {activeTab === 'consumers' && (
          <div className="fade-in">
            {/* Header info */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A', marginBottom: '4px' }}>
                Analítica de Consumidores & Patrones de Consumo
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                Segmentación estratégica de clientes según su volumen de compra mensual, canales favoritos y hamburguesas preferidas.
              </p>
            </div>

            {/* 3 Tier Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '28px' }}>
              {consumerMetrics.tiers.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '22px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: tier.badgeBg,
                      color: tier.badgeColor
                    }}>
                      {tier.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B' }}>
                      {tier.percentage}% del total
                    </span>
                  </div>

                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', marginBottom: '4px' }}>
                    {tier.count} <span style={{ fontSize: '1rem', fontWeight: '600', color: '#64748B' }}>clientes</span>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '14px', paddingTop: '12px', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Ticket Promedio Mensual:</span>
                      <strong>${tier.avgSpend.toFixed(2)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Frecuencia de Pedidos:</span>
                      <strong>{tier.ordersPerMonth} pedidos/mes</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Aporte a Ingresos Totales:</span>
                      <strong style={{ color: '#EA580C' }}>{tier.revenueContribution}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Consumers Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
                  Ranking de Consumidores Destacados por Volumen de Compra
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B', background: '#F8FAFC', padding: '4px 10px', borderRadius: '6px' }}>
                  Ordenado por Total Gastado
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 16px' }}>Cliente</th>
                      <th style={{ padding: '12px 14px' }}>Nivel</th>
                      <th style={{ padding: '12px 14px' }}>Pedidos</th>
                      <th style={{ padding: '12px 14px' }}>Total Consumido</th>
                      <th style={{ padding: '12px 14px' }}>Hamburguesa Favorita</th>
                      <th style={{ padding: '12px 14px' }}>Canal Habitual</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Último Pedido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumerMetrics.topConsumers.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ display: 'block', color: '#0F172A' }}>{c.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{c.email}</span>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            background: c.tier.includes('Gold') ? '#FEF3C7' : '#E2E8F0',
                            color: c.tier.includes('Gold') ? '#B45309' : '#475569'
                          }}>
                            {c.tier}
                          </span>
                        </td>

                        <td style={{ padding: '12px 14px', fontWeight: '700' }}>
                          {c.totalOrders} compras
                        </td>

                        <td style={{ padding: '12px 14px', fontWeight: '900', color: '#EA580C', fontSize: '0.98rem' }}>
                          ${c.totalSpent.toFixed(2)}
                        </td>

                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#334155' }}>
                          🍔 {c.favoriteBurger}
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: c.preferredChannel.includes('PWA') ? '#FFF7ED' : '#F1F5F9',
                            color: c.preferredChannel.includes('PWA') ? '#EA580C' : '#334155'
                          }}>
                            {c.preferredChannel}
                          </span>
                        </td>

                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#64748B', fontSize: '0.78rem' }}>
                          {c.lastOrder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ESTADO DE LA BASE DE DATOS                         */}
        {/* ========================================================= */}
        {activeTab === 'database' && (
          <div className="fade-in">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <span style={{ fontSize: '2rem' }}>🗄️</span>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A' }}>
                      Diagnóstico de Conexión a Base de Datos
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      Monitor de salud para despliegues locales y contenedores Dokploy con MySQL.
                    </p>
                  </div>
                </div>

                {/* Connection Status Card */}
                <div style={{
                  background: serverHealth?.database?.connected ? '#F0FDF4' : '#FFFBEB',
                  border: `1px solid ${serverHealth?.database?.connected ? '#BBF7D0' : '#FDE68A'}`,
                  borderRadius: '12px',
                  padding: '18px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                    Estado Actual
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: serverHealth?.database?.connected ? '#15803D' : '#B45309' }}>
                    {serverHealth?.database?.mode === 'mysql' ? '🐬 Conectado a Servidor MySQL' : '⚡ Modo In-Memory Activo'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px' }}>
                    {serverHealth?.database?.mode === 'mysql'
                      ? 'La tabla `products` y los registros se sincronizan en la base de datos relacional.'
                      : 'El backend provee alta resiliencia operando con las 10 hamburguesas maestras en memoria.'}
                  </div>
                </div>

                {/* Specs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Host DB:</span>
                    <strong>{serverHealth?.database?.host || 'Local/In-Memory'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Nombre Base de Datos:</span>
                    <strong>{serverHealth?.database?.database || 'hamburger_rapid_db'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Usuario:</span>
                    <strong>{serverHealth?.database?.user || 'rapid_admin'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Tiempo Activo del Servidor (Uptime):</span>
                    <strong>{serverHealth?.uptime ? `${Math.floor(serverHealth.uptime)} segundos` : 'Activo'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Última Verificación:</span>
                    <strong>{serverHealth?.timestamp ? new Date(serverHealth.timestamp).toLocaleTimeString() : 'Ahora'}</strong>
                  </div>
                </div>

                {/* Test Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button
                    onClick={loadData}
                    style={{
                      flex: 1,
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Refrescar Diagnóstico
                  </button>
                  <button
                    onClick={handleResetCatalog}
                    style={{
                      flex: 1,
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#EA580C',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    ↺ Reiniciar Catálogo Inicial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add New Burger Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="fade-in" style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A' }}>
                + Agregar Nueva Hamburguesa
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Nombre de la Hamburguesa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Burger Imperial Trufada"
                  value={newBurger.name}
                  onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Categoría
                  </label>
                  <select
                    value={newBurger.category}
                    onChange={(e) => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="Especialidades Reales">Especialidades Reales</option>
                    <option value="Clásicas Rápidas">Clásicas Rápidas</option>
                    <option value="Pollo & Alternativas">Pollo & Alternativas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Precio USD ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="13.50"
                    value={newBurger.price}
                    onChange={(e) => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Stock Inicial (Unidades)
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={newBurger.stock}
                    onChange={(e) => setNewBurger({ ...newBurger, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Badge Nivel de Especialidad
                  </label>
                  <input
                    type="text"
                    placeholder="👑 Signature ★★★★★"
                    value={newBurger.specialty_badge}
                    onChange={(e) => setNewBurger({ ...newBurger, specialty_badge: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Descripción de Ingredientes
                </label>
                <textarea
                  rows="2"
                  placeholder="Carne Angus, queso madurado, salsas caseras..."
                  value={newBurger.description}
                  onChange={(e) => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #EA580C, #D97706)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Guardar Hamburguesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
