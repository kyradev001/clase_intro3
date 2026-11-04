import React, { useState, useEffect } from 'react';

// Catálogo de las 10 hamburguesas maestras de Hamburger Rapid
const INITIAL_MENU = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '👑 Signature Legend ★★★★★',
    badgeColor: '#B45309',
    badgeBg: '#FEF3C7',
    price: 14.99,
    calories: '890 kcal',
    time: '8-10 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Carne 100% Angus flameada a la leña de roble, queso cheddar añejo fundido, cebolla al bourbon y salsa real.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '⭐ Especial Real ★★★★☆',
    badgeColor: '#C2410C',
    badgeBg: '#FFEDD5',
    price: 11.50,
    calories: '740 kcal',
    time: '6-8 min',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Doble smash patty caramelizada, queso americano fundido, pepinillos dulces y aderezo imperial.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '🔥 Especial Doble ★★★★★',
    badgeColor: '#B91C1C',
    badgeBg: '#FEE2E2',
    price: 13.99,
    calories: '960 kcal',
    time: '9-11 min',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Dos medallones de 160g de picaña y roast beef, cheddar inglés, bacon glaseado en maple y mermelada de panceta.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '✨ Edición Especial ★★★★★',
    badgeColor: '#6B21A8',
    badgeBg: '#F3E8FF',
    price: 15.50,
    calories: '920 kcal',
    time: '10-12 min',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80',
    description: 'Doble carne a la brasa, queso gouda ahumado, portobellos salteados al ajo negro confitado y mayonesa trufada.'
  },
  {
    id: 5,
    name: 'Classic Rapid Cheeseburger',
    category: 'clasicas',
    categoryLabel: 'Clásicas Rápidas',
    badge: '🍔 Clásica Imperial ★★★☆☆',
    badgeColor: '#0369A1',
    badgeBg: '#E0F2FE',
    price: 8.99,
    calories: '610 kcal',
    time: '5 min',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón clásico, cheddar al vapor, lechuga crocante, tomate y ketchup artesanal de tomates asados.'
  },
  {
    id: 6,
    name: 'Bacon Deluxe BBQ Smoke',
    category: 'clasicas',
    categoryLabel: 'Clásicas Rápidas',
    badge: '🥓 Favorito Chef ★★★★☆',
    badgeColor: '#B45309',
    badgeBg: '#FEF3C7',
    price: 12.50,
    calories: '870 kcal',
    time: '7-9 min',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón angus 200g, triple panceta ahumada al manzano, salsa barbacoa casera y aros de cebolla crocantes.'
  },
  {
    id: 7,
    name: 'Crispy Royal Chicken',
    category: 'alternativas',
    categoryLabel: 'Pollo & Alternativas',
    badge: '🍗 Especial Pollo ★★★★☆',
    badgeColor: '#B45309',
    badgeBg: '#FEF3C7',
    price: 10.99,
    calories: '710 kcal',
    time: '7-8 min',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk y 11 especias, rebozado crujiente, ensalada coleslaw fresca y honey mustard.'
  },
  {
    id: 8,
    name: 'Smash Avocado Truffle',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '🥑 Gourmet Selección ★★★★★',
    badgeColor: '#15803D',
    badgeBg: '#DCFCE7',
    price: 13.50,
    calories: '780 kcal',
    time: '8-10 min',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    description: 'Doble smash crispy, láminas de palta fresca, alioli suave de trufa negra, cebolla morada y brotes tiernos.'
  },
  {
    id: 9,
    name: 'Spicy Fire Diablo',
    category: 'especiales',
    categoryLabel: 'Especialidades Reales',
    badge: '🌶️ Fuego Picante ★★★★☆',
    badgeColor: '#B91C1C',
    badgeBg: '#FEE2E2',
    price: 12.99,
    calories: '830 kcal',
    time: '7-9 min',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    description: 'Blend sazonado al chipotle, rodajas de jalapeños en escabeche, queso pepper jack fundido y mayo sriracha cítrica.'
  },
  {
    id: 10,
    name: 'Veggie Portobello Master',
    category: 'alternativas',
    categoryLabel: 'Pollo & Alternativas',
    badge: '🌱 Green Gourmet ★★★★☆',
    badgeColor: '#15803D',
    badgeBg: '#DCFCE7',
    price: 11.99,
    calories: '520 kcal',
    time: '8 min',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&auto=format&fit=crop&q=80',
    description: 'Hongo Portobello entero a la plancha con balsámico y romero, provoleta crocante, pesto de albahaca y tomates secos.'
  }
];

const OFFERS = [
  {
    id: 'off_1',
    title: 'Combo Pareja Real 👑',
    tag: '28% OFF &bull; Más Vendido',
    price: 24.99,
    originalPrice: 34.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: '2x Rey de las Burgers + 2x Porciones de Papas Rústicas con romero + 2 Bebidas artesanales.',
    badge: 'Super Ahorro'
  },
  {
    id: 'off_2',
    title: 'Happy Hour Smash Real ⚡',
    tag: '20% OFF &bull; 17:00 a 20:00',
    price: 11.99,
    originalPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Burger Real Clásica + Papas Medianas crujientes con dip de queso cheddar fundido.',
    badge: 'Flash'
  },
  {
    id: 'off_3',
    title: 'Doble Tentación Gourmet 🔥',
    tag: 'Ahorro $6.00 USD',
    price: 23.50,
    originalPrice: 29.50,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: '1x Burger Real Doble + 1x Burger Doble Especial para compartir el auténtico sabor a la leña.',
    badge: 'Especial'
  },
  {
    id: 'off_4',
    title: 'Cupón Envío Gratis: RAPIDVIP 🛵',
    tag: 'Cupón 100% Bonificado',
    price: 0,
    originalPrice: 3.50,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    description: 'Envío express sin costo en cualquier orden que supere los $20 USD. Aplica automáticamente.',
    badge: 'Cupón'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // menu, ofertas, ordenes, perfil
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Active Simulated Order State
  const [activeOrder, setActiveOrder] = useState({
    id: '#HR-8429',
    statusStep: 2, // 1: confirmado, 2: a la parrilla, 3: en camino, 4: entregado
    items: [
      { name: 'Rey de las Burgers', qty: 1, price: 14.99 },
      { name: 'Papas Rústicas Trufadas', qty: 1, price: 3.99 }
    ],
    total: 18.98,
    estimatedMinutes: 14,
    deliveryAddress: 'Av. Libertador 1250, Dpto 4B',
    driver: 'Carlos M. • Moto Honda CB125'
  });

  const [orderHistory, setOrderHistory] = useState([
    {
      id: '#HR-8102',
      date: 'Ayer, 21:14',
      itemsSummary: '1x Burger Real Doble, 1x Bebida',
      total: 15.98,
      status: 'Entregado'
    },
    {
      id: '#HR-7945',
      date: '3 de Noviembre, 13:30',
      itemsSummary: '2x Burger Real Clásica',
      total: 23.00,
      status: 'Entregado'
    }
  ]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar esta PWA: En tu navegador selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Cart operations
  const addToCart = (burger) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === burger.id);
      if (existing) {
        return prev.map((item) =>
          item.id === burger.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...burger, quantity: 1 }];
    });
  };

  const removeFromCart = (burgerId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === burgerId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === burgerId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== burgerId);
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const deliveryFee = cartSubtotal > 20 || appliedPromo?.id === 'off_4' ? 0.0 : 2.50;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Apply offer directly to cart
  const handleApplyOffer = (offer) => {
    if (offer.price === 0) {
      setAppliedPromo({ id: offer.id, discount: 2.50, label: 'Envío Gratis RAPIDVIP' });
      alert('¡Cupón de Envío Gratis aplicado con éxito a tu carrito!');
    } else {
      addToCart({
        id: `offer_${offer.id}`,
        name: offer.title,
        price: offer.price,
        image: offer.image,
        badge: offer.badge,
        badgeBg: '#FEF3C7',
        badgeColor: '#B45309'
      });
      alert(`¡${offer.title} agregado a tu orden simulada!`);
    }
    setIsCartOpen(true);
  };

  // Simulate Checkout
  const handleSimulateCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. Elige alguna hamburguesa primero.');
      return;
    }

    const newOrder = {
      id: `#HR-${Math.floor(1000 + Math.random() * 9000)}`,
      statusStep: 1, // Confirmado
      items: cart.map((c) => ({ name: c.name, qty: c.quantity, price: c.price })),
      total: cartTotal,
      estimatedMinutes: 18,
      deliveryAddress: 'Av. Libertador 1250, Dpto 4B',
      driver: 'Lucas R. • Moto Rapid Delivery #14'
    };

    setActiveOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('ordenes');

    // Simulate progress advance after 3 seconds
    setTimeout(() => {
      setActiveOrder((curr) => (curr ? { ...curr, statusStep: 2, estimatedMinutes: 15 } : curr));
    }, 3000);
  };

  // Filter burgers
  const filteredBurgers = INITIAL_MENU.filter((b) => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#FAF8F5' }}>
      
      {/* Top Mobile Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8DFD8',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🍔</span>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '900', color: '#1C1917', lineHeight: 1.1 }}>
                Hamburger Rapid
              </div>
              <div style={{ fontSize: '0.68rem', color: '#EA580C', fontWeight: '700', textTransform: 'uppercase' }}>
                📍 Av. Libertador 1250 &bull; 18 min
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.7rem',
              padding: '3px 8px',
              borderRadius: '9999px',
              fontWeight: '700',
              background: isOnline ? '#DCFCE7' : '#FEE2E2',
              color: isOnline ? '#15803D' : '#B91C1C'
            }}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>

            {cartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #EA580C, #D97706)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                🛒 {cartCount} (${cartSubtotal.toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area Based on Active Tab */}
      <main style={{ flex: 1, paddingBottom: '90px', overflowY: 'auto' }}>
        
        {/* ==================== TAB 1: MENÚ ==================== */}
        {activeTab === 'menu' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Buscar entre las 10 hamburguesas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: '12px',
                  border: '1px solid #E8DFD8',
                  background: '#FFFFFF',
                  fontSize: '0.9rem',
                  color: '#1C1917',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#A8A29E', fontSize: '1rem' }}>
                🔍
              </span>
            </div>

            {/* Category Filter Chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              {[
                { id: 'all', label: '🔥 Todas (10)' },
                { id: 'especiales', label: '👑 Especiales' },
                { id: 'clasicas', label: '🍔 Clásicas' },
                { id: 'alternativas', label: '🍗 Pollo & Veg' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: selectedCategory === cat.id ? '1px solid #1C1917' : '1px solid #E8DFD8',
                    background: selectedCategory === cat.id ? '#1C1917' : '#FFFFFF',
                    color: selectedCategory === cat.id ? '#FFFFFF' : '#57534E',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Burgers List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredBurgers.map((burger) => {
                const itemInCart = cart.find((c) => c.id === burger.id);
                return (
                  <div
                    key={burger.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E8DFD8',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      onClick={() => setSelectedBurger(burger)}
                      style={{ width: '95px', height: '95px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}
                    >
                      <img
                        src={burger.image}
                        alt={burger.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: burger.badgeBg,
                          color: burger.badgeColor
                        }}>
                          {burger.badge}
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedBurger(burger)}
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: '800',
                          color: '#1C1917',
                          lineHeight: 1.2,
                          marginBottom: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {burger.name}
                      </h3>

                      <p style={{
                        fontSize: '0.78rem',
                        color: '#78716C',
                        lineHeight: 1.3,
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {burger.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: '900', color: '#EA580C' }}>
                          ${burger.price.toFixed(2)}
                        </span>

                        {itemInCart ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              onClick={() => removeFromCart(burger.id)}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: '#F5EFEB',
                                border: '1px solid #E8DFD8',
                                color: '#1C1917',
                                fontWeight: '800',
                                cursor: 'pointer'
                              }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>
                              {itemInCart.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(burger)}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: '#EA580C',
                                border: 'none',
                                color: '#FFFFFF',
                                fontWeight: '800',
                                cursor: 'pointer'
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(burger)}
                            style={{
                              background: '#FFF7ED',
                              border: '1px solid #FFEDD5',
                              color: '#EA580C',
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: '800',
                              cursor: 'pointer'
                            }}
                          >
                            + Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: OFERTAS ==================== */}
        {activeTab === 'ofertas' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1C1917', marginBottom: '4px' }}>
                Ofertas & Combos Rapid 🔥
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#78716C' }}>
                Promociones exclusivas calculadas para tu experiencia comercial.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E8DFD8',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ position: 'relative', height: '140px', width: '100%' }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(28, 25, 23, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#FEF3C7',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px'
                    }}>
                      {offer.tag}
                    </span>
                  </div>

                  <div style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1C1917' }}>
                        {offer.title}
                      </h4>
                      <div>
                        {offer.originalPrice > 0 && (
                          <span style={{ fontSize: '0.8rem', color: '#A8A29E', textDecoration: 'line-through', marginRight: '6px' }}>
                            ${offer.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#EA580C' }}>
                          {offer.price === 0 ? 'GRATIS' : `$${offer.price.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: '#78716C', lineHeight: 1.4, marginBottom: '14px' }}>
                      {offer.description}
                    </p>

                    <button
                      onClick={() => handleApplyOffer(offer)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #EA580C, #D97706)',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '0.88rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
                      }}
                    >
                      {offer.price === 0 ? '🎁 Aplicar Cupón en Orden' : '🛒 Pedir Combo con Descuento'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ÓRDENES ==================== */}
        {activeTab === 'ordenes' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1C1917', marginBottom: '4px' }}>
                Tus Órdenes & Despacho 🛵
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#78716C' }}>
                Simulación en tiempo real del estado de cocción y entrega.
              </p>
            </div>

            {/* Active Order Card Simulation */}
            {activeOrder ? (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #FED7AA',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(234, 88, 12, 0.08)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#EA580C' }}>
                      PEDIDO ACTIVO {activeOrder.id}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      background: '#FEF3C7',
                      color: '#B45309',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: '700'
                    }}>
                      ⏱️ {activeOrder.estimatedMinutes} min
                    </span>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#1C1917' }}>
                    ${activeOrder.total.toFixed(2)}
                  </span>
                </div>

                {/* Stepper Progression */}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '10%',
                    right: '10%',
                    height: '3px',
                    background: '#F0EAE3',
                    zIndex: 0
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '10%',
                    width: `${((activeOrder.statusStep - 1) / 3) * 80}%`,
                    height: '3px',
                    background: '#EA580C',
                    zIndex: 0,
                    transition: 'width 0.4s ease'
                  }} />

                  {[
                    { step: 1, icon: '✓', label: 'Confirmado' },
                    { step: 2, icon: '🔥', label: 'Parrilla' },
                    { step: 3, icon: '🛵', label: 'En Camino' },
                    { step: 4, icon: '🎉', label: 'Entregado' }
                  ].map((s) => {
                    const isDone = activeOrder.statusStep >= s.step;
                    const isCurrent = activeOrder.statusStep === s.step;
                    return (
                      <div key={s.step} style={{ zIndex: 1, textAlign: 'center', width: '60px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: isDone ? '#EA580C' : '#FFFFFF',
                          border: isDone ? 'none' : '2px solid #E8DFD8',
                          color: isDone ? '#FFFFFF' : '#A8A29E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 6px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          boxShadow: isCurrent ? '0 0 0 4px rgba(234, 88, 12, 0.2)' : 'none'
                        }}>
                          {s.icon}
                        </div>
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: isDone ? '800' : '600',
                          color: isDone ? '#1C1917' : '#A8A29E',
                          display: 'block'
                        }}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Details Breakdown */}
                <div style={{ background: '#FAF8F5', borderRadius: '10px', padding: '12px', marginTop: '12px', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: '700', color: '#57534E', marginBottom: '4px' }}>
                    Contenido del pedido:
                  </div>
                  {activeOrder.items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#1C1917', marginBottom: '2px' }}>
                      <span>{it.qty}x {it.name}</span>
                      <span style={{ fontWeight: '700' }}>${(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #E8DFD8', marginTop: '6px', paddingTop: '6px', color: '#78716C' }}>
                    Repartidor asignado: <strong>{activeOrder.driver}</strong>
                  </div>
                </div>

                {/* Advance Simulation Step Button */}
                <button
                  onClick={() => {
                    setActiveOrder((curr) => {
                      if (!curr) return null;
                      const nextStep = curr.statusStep < 4 ? curr.statusStep + 1 : 1;
                      return {
                        ...curr,
                        statusStep: nextStep,
                        estimatedMinutes: Math.max(0, curr.estimatedMinutes - 5)
                      };
                    });
                  }}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #E8DFD8',
                    color: '#1C1917',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Avanzar Paso de la Simulación
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E8DFD8', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem' }}>📦</span>
                <p style={{ marginTop: '8px', color: '#78716C', fontSize: '0.9rem' }}>No tienes ninguna orden activa.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{ marginTop: '12px', background: '#EA580C', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Ir al Menú a Ordenar
                </button>
              </div>
            )}

            {/* History List */}
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1C1917', marginBottom: '12px' }}>
              Historial de Órdenes Anteriores
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orderHistory.map((h) => (
                <div
                  key={h.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E8DFD8',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1C1917' }}>{h.id}</span>
                      <span style={{ fontSize: '0.7rem', color: '#15803D', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                        ✓ {h.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#78716C', marginTop: '2px' }}>{h.itemsSummary}</div>
                    <div style={{ fontSize: '0.72rem', color: '#A8A29E', marginTop: '2px' }}>{h.date}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1C1917' }}>${h.total.toFixed(2)}</div>
                    <button
                      onClick={() => {
                        addToCart(INITIAL_MENU[0]);
                        setIsCartOpen(true);
                      }}
                      style={{
                        marginTop: '4px',
                        background: '#FAF8F5',
                        border: '1px solid #E8DFD8',
                        color: '#EA580C',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Repetir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PERFIL ==================== */}
        {activeTab === 'perfil' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            {/* User Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E8DFD8',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #EA580C)',
                color: 'white',
                fontSize: '1.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900'
              }}>
                🍔
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1C1917', lineHeight: 1.2 }}>
                  Gourmet Burger Lover
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#78716C', marginTop: '2px' }}>
                  cliente.vip@rapidburger.com
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  color: '#B45309',
                  background: '#FEF3C7',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  marginTop: '6px'
                }}>
                  👑 Miembro VIP Oro
                </span>
              </div>
            </div>

            {/* Burger Points Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
              border: '1px solid #FDE68A',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
                  Burger Points Acumulados
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#78350F' }}>
                  450 pts
                </div>
                <div style={{ fontSize: '0.72rem', color: '#B45309' }}>
                  Equivalente a $4.50 USD en tu próxima burger
                </div>
              </div>
              <span style={{ fontSize: '2.4rem' }}>🏆</span>
            </div>

            {/* Preferences & Quick Nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E8DFD8',
                padding: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1C1917' }}>Dirección de Entrega</div>
                  <div style={{ fontSize: '0.78rem', color: '#78716C' }}>Av. Libertador 1250, Dpto 4B</div>
                </div>
                <span style={{ color: '#EA580C', fontSize: '0.8rem', fontWeight: '700' }}>Editar</span>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E8DFD8',
                padding: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1C1917' }}>Método de Pago</div>
                  <div style={{ fontSize: '0.78rem', color: '#78716C' }}>💳 Visa terminada en 4821</div>
                </div>
                <span style={{ color: '#EA580C', fontSize: '0.8rem', fontWeight: '700' }}>Cambiar</span>
              </div>

              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    background: '#1C1917',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  📲 Instalar PWA en Pantalla de Inicio
                </button>
              )}
            </div>

            {/* Cross-layer Navigation */}
            <div style={{ borderTop: '1px solid #E8DFD8', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#A8A29E', textTransform: 'uppercase', marginBottom: '8px' }}>
                Accesos de la Plataforma
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <a
                  href="/"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8DFD8',
                    color: '#1C1917',
                    padding: '10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}
                >
                  🌐 E-commerce
                </a>
                <a
                  href="/admin"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8DFD8',
                    color: '#1C1917',
                    padding: '10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}
                >
                  ⚙️ Panel Admin
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-Up Cart Drawer Simulation */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28, 25, 23, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <div className="slide-up" style={{
            background: '#FFFFFF',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px 20px 28px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🛒</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#1C1917' }}>Tu Orden Simulada</h3>
                <span style={{ fontSize: '0.8rem', background: '#F5EFEB', padding: '2px 8px', borderRadius: '9999px', fontWeight: '800' }}>
                  {cartCount} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: '#F5EFEB',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '220px', marginBottom: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #F0EAE3'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1C1917' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#EA580C', fontWeight: '700' }}>
                      ${item.price.toFixed(2)} c/u
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        background: '#F5EFEB',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '800'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        background: '#EA580C',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '800'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Breakdown */}
            <div style={{ background: '#FAF8F5', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534E', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803D', fontWeight: '700', marginBottom: '4px' }}>
                  <span>Descuento aplicado</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534E', marginBottom: '6px' }}>
                <span>Envío Express (20 min)</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#15803D' }}>GRATIS</strong> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div style={{ borderTop: '1px solid #E8DFD8', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '900', color: '#1C1917' }}>
                <span>Total a Simular</span>
                <span style={{ color: '#EA580C' }}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Confirm Simulation Button */}
            <button
              onClick={handleSimulateCheckout}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #EA580C, #D97706)',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(234, 88, 12, 0.35)'
              }}
            >
              🍔 Confirmar y Simular Compra (${cartTotal.toFixed(2)})
            </button>
          </div>
        </div>
      )}

      {/* Quick Burger Detail Modal */}
      {selectedBurger && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28, 25, 23, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="fade-in" style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '380px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ position: 'relative', height: '180px' }}>
              <img
                src={selectedBurger.image}
                alt={selectedBurger.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedBurger(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '16px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px',
                background: selectedBurger.badgeBg,
                color: selectedBurger.badgeColor,
                display: 'inline-block',
                marginBottom: '6px'
              }}>
                {selectedBurger.badge}
              </span>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1C1917' }}>{selectedBurger.name}</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#EA580C' }}>${selectedBurger.price.toFixed(2)}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#57534E', lineHeight: 1.5, marginBottom: '14px' }}>
                {selectedBurger.description}
              </p>

              <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#78716C', marginBottom: '18px' }}>
                <div>🔥 {selectedBurger.calories}</div>
                <div>⏱️ {selectedBurger.time}</div>
                <div>🪵 Parrilla a la Leña</div>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedBurger);
                  setSelectedBurger(null);
                  setIsCartOpen(true);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #EA580C, #D97706)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                + Agregar a Mi Orden (${selectedBurger.price.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Bar (Tabs) */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: '#FFFFFF',
        borderTop: '1px solid #E8DFD8',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0 10px',
        zIndex: 90,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.05)'
      }}>
        {[
          { id: 'menu', icon: '🍔', label: 'Menú' },
          { id: 'ofertas', icon: '🔥', label: 'Ofertas' },
          { id: 'ordenes', icon: '🛵', label: 'Órdenes', badge: activeOrder ? '1' : null },
          { id: 'perfil', icon: '👤', label: 'Perfil' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                cursor: 'pointer',
                position: 'relative',
                color: isActive ? '#EA580C' : '#A8A29E',
                transition: 'color 0.2s'
              }}
            >
              <div style={{ position: 'relative' }}>
                <span style={{ fontSize: '1.3rem' }}>{tab.icon}</span>
                {tab.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-8px',
                    background: '#EA580C',
                    color: 'white',
                    fontSize: '0.62rem',
                    fontWeight: '900',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: isActive ? '800' : '600'
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
