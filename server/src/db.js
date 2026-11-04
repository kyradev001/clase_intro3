const mysql = require('mysql2/promise');

const INITIAL_HAMBURGERS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades Reales',
    specialty_badge: 'Signature Legend ★★★★★',
    specialty_level: 'Legend',
    price: 14.99,
    stock: 45,
    sales: 1420,
    calories: '890 kcal',
    cooking: 'A la leña viva de roble',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    description: 'Carne 100% Angus flameada a la leña de roble, queso cheddar añejo fundido, cebolla caramelizada al bourbon, panceta ahumada crocante y salsa secreta Real en pan brioche artesanal dorado con mantequilla.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Especialidades Reales',
    specialty_badge: 'Especial Real ★★★★☆',
    specialty_level: 'Especial',
    price: 11.50,
    stock: 60,
    sales: 1280,
    calories: '740 kcal',
    cooking: 'Smash en plancha de hierro fundido',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash premium de 110g con costra caramelizada, queso americano fundido de doble capa, pepinillos dulces encurtidos artesanalmente, finas rodajas de cebolla morada y aderezo imperial.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Especialidades Reales',
    specialty_badge: 'Especial Doble ★★★★★',
    specialty_level: 'Gourmet',
    price: 13.99,
    stock: 38,
    sales: 1150,
    calories: '960 kcal',
    cooking: 'Fuego directo con ahumado de nogal',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    description: 'Dos medallones de 160g de blend exclusivo de picaña y roast beef, queso cheddar inglés madurado, panceta glaseada en miel de maple y mermelada rústica de bacon ahumado.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades Reales',
    specialty_badge: 'Edición Especial ★★★★★',
    specialty_level: 'Edición Limitada',
    price: 15.50,
    stock: 28,
    sales: 940,
    calories: '920 kcal',
    cooking: 'Parrilla al carbón quebracho blanco',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=800&auto=format&fit=crop&q=80',
    description: 'Doble carne jugosa a la parrilla de carbón vivo, queso gouda ahumado fundente, champiñones portobello salteados al ajo negro confitado, hojas de rúcula silvestre y mayonesa suave de trufas.'
  },
  {
    id: 5,
    name: 'Classic Rapid Cheeseburger',
    category: 'Clásicas Rápidas',
    specialty_badge: 'Clásica Imperial ★★★☆☆',
    specialty_level: 'Clásica',
    price: 8.99,
    stock: 85,
    sales: 1650,
    calories: '610 kcal',
    cooking: 'Sellado rápido a la plancha a alta temperatura',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=80',
    description: 'Medallón tradicional de carne vacuna seleccionada, queso cheddar derretido al vapor, lechuga romana crocante recién cortada, tomate de huerta maduro y ketchup artesanal de tomates asados.'
  },
  {
    id: 6,
    name: 'Bacon Deluxe BBQ Smoke',
    category: 'Clásicas Rápidas',
    specialty_badge: 'Favorito del Chef ★★★★☆',
    specialty_level: 'Favorito',
    price: 12.50,
    stock: 52,
    sales: 1320,
    calories: '870 kcal',
    cooking: 'Ahumado lento y sellado a las brasas',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop&q=80',
    description: 'Medallón angus de 200g cubierto con triple panceta ahumada en madera de manzano, salsa barbacoa ahumada de la casa, aros de cebolla crocantes y queso monterey jack fundido.'
  },
  {
    id: 7,
    name: 'Crispy Royal Chicken',
    category: 'Pollo & Alternativas',
    specialty_badge: 'Especial Pollo ★★★★☆',
    specialty_level: 'Especial',
    price: 10.99,
    stock: 40,
    sales: 890,
    calories: '710 kcal',
    cooking: 'Fritura dorada a presión en aceite de oliva y girasol',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80',
    description: 'Pechuga de pollo de granja marinada durante 24 horas en suero de leche y 11 especias secretas, ensalada coleslaw fresca con manzana verde y emulsión de miel pura con mostaza dijon.'
  },
  {
    id: 8,
    name: 'Smash Avocado Truffle',
    category: 'Especialidades Reales',
    specialty_badge: 'Gourmet Selección ★★★★★',
    specialty_level: 'Gourmet',
    price: 13.50,
    stock: 34,
    sales: 780,
    calories: '780 kcal',
    cooking: 'Doble smash ultra crocante con técnica Maillard',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop&q=80',
    description: 'Doble smash patty crocante con finas láminas de palta hass fresca, alioli suave infusionado con trufa negra silvestre, cebolla morada encurtida al hibisco y brotes verdes tiernos.'
  },
  {
    id: 9,
    name: 'Spicy Fire Diablo',
    category: 'Especialidades Reales',
    specialty_badge: 'Fuego Picante ★★★★☆',
    specialty_level: 'Picante',
    price: 12.99,
    stock: 30,
    sales: 620,
    calories: '830 kcal',
    cooking: 'Parrilla viva con glaseado picante',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80',
    description: 'Blend de carne sazonada con pasta de ají panca y chipotle ahumado, rodajas de jalapeños al escabeche casero, queso pepper jack ardiente y mayo cremosa de sriracha con gotas de lima.'
  },
  {
    id: 10,
    name: 'Veggie Portobello Master',
    category: 'Pollo & Alternativas',
    specialty_badge: 'Green Gourmet ★★★★☆',
    specialty_level: 'Vegetariana',
    price: 11.99,
    stock: 25,
    sales: 490,
    calories: '520 kcal',
    cooking: 'Plancha vegetal sellada con hierbas aromáticas',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80',
    description: 'Gran sombrero de hongo Portobello entero marinado en reducción balsámica y romero fresco a la plancha, provoleta dorada crujiente, pesto rústico de albahaca y tomates secos confitados.'
  }
];

const CONSUMER_METRICS = {
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
      badgeColor: '#F59E0B',
      revenueContribution: '42%'
    },
    {
      id: 'silver',
      name: 'Clientes Recurrentes Silver ($50 - $120)',
      count: 642,
      percentage: 45,
      avgSpend: 74.20,
      ordersPerMonth: 3.1,
      badgeColor: '#94A3B8',
      revenueContribution: '38%'
    },
    {
      id: 'bronze',
      name: 'Nuevos / Ocasionales Bronze (< $50)',
      count: 501,
      percentage: 35,
      avgSpend: 26.80,
      ordersPerMonth: 1.2,
      badgeColor: '#D97706',
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

let inMemoryProducts = [...INITIAL_HAMBURGERS];
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para demostración.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    // Crear tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        specialty_badge VARCHAR(100),
        specialty_level VARCHAR(50),
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        sales INT NOT NULL DEFAULT 0,
        calories VARCHAR(50),
        cooking VARCHAR(255),
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sembrar datos iniciales si la tabla está vacía
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando 10 hamburguesas maestras Hamburger Rapid en MySQL...');
      for (const p of INITIAL_HAMBURGERS) {
        await connection.query(
          `INSERT INTO products (name, category, specialty_badge, specialty_level, price, stock, sales, calories, cooking, image, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.name, p.category, p.specialty_badge, p.specialty_level, p.price, p.stock, p.sales, p.calories, p.cooking, p.image, p.description]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    console.warn(`⚠️ [DB] Conexión directa falló: ${error.message}. Escaneando red interna...`);
    try {
      const candidates = [];
      for (let i = 2; i <= 30; i++) candidates.push(`172.18.0.${i}`);
      for (let i = 1; i <= 254; i++) candidates.push(`10.0.1.${i}`);
      candidates.push('172.18.0.1', '172.17.0.1');

      const net = require('net');
      const check = (ip) => new Promise((resolve) => {
        const s = new net.Socket();
        s.setTimeout(250);
        s.once('connect', () => { s.destroy(); resolve(ip); });
        s.once('timeout', () => { s.destroy(); resolve(null); });
        s.once('error', () => { resolve(null); });
        s.connect(3306, ip);
      });

      const found = (await Promise.all(candidates.map(check))).filter(Boolean);
      if (found.length > 0) {
        const discoveredIp = found[0];
        console.log(`🎯 [DB Discovery] ¡MySQL encontrado automáticamente en IP ${discoveredIp}! Conectando...`);
        pool = mysql.createPool({
          host: discoveredIp,
          user,
          password,
          database,
          port: 3306,
          waitForConnections: true,
          connectionLimit: 10,
          connectTimeout: 5000
        });
        const conn = await pool.getConnection();
        console.log(`✅ [DB] Conectado exitosamente a MySQL en ${discoveredIp}`);
        await conn.query(`
          CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            specialty_badge VARCHAR(100),
            specialty_level VARCHAR(50),
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL DEFAULT 0,
            sales INT NOT NULL DEFAULT 0,
            calories VARCHAR(50),
            cooking VARCHAR(255),
            image VARCHAR(500),
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        conn.release();
        isConnectedToMySQL = true;
        lastDbError = null;
        return;
      }
    } catch (discoveryErr) {
      console.warn('Error en escaneo de red:', discoveryErr.message);
    }

    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows;
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, specialty_badge, specialty_level, price, stock, image, description, calories, cooking }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  const pPrice = parseFloat(price) || 0;
  const pStock = parseInt(stock, 10) || 0;

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      `INSERT INTO products (name, category, specialty_badge, specialty_level, price, stock, sales, calories, cooking, image, description)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)`,
      [
        name,
        category || 'Especialidades Reales',
        specialty_badge || 'Especial ★★★★☆',
        specialty_level || 'Especial',
        pPrice,
        pStock,
        calories || '750 kcal',
        cooking || 'Parrilla al carbón',
        image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
        description || 'Deliciosa hamburguesa artesanal Hamburger Rapid.'
      ]
    );
    return {
      id: result.insertId,
      name,
      category: category || 'Especialidades Reales',
      specialty_badge: specialty_badge || 'Especial ★★★★☆',
      specialty_level: specialty_level || 'Especial',
      price: pPrice,
      stock: pStock,
      sales: 0,
      calories: calories || '750 kcal',
      cooking: cooking || 'Parrilla al carbón',
      image,
      description
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especialidades Reales',
    specialty_badge: specialty_badge || 'Especial ★★★★☆',
    specialty_level: specialty_level || 'Especial',
    price: pPrice,
    stock: pStock,
    sales: 0,
    calories: calories || '750 kcal',
    cooking: cooking || 'Parrilla al carbón',
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    description: description || 'Deliciosa hamburguesa artesanal Hamburger Rapid.'
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function updateProductStock(id, newStock) {
  const numId = parseInt(id, 10);
  const stockVal = parseInt(newStock, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stockVal, numId]);
  }
  const item = inMemoryProducts.find(p => p.id === numId);
  if (item) item.stock = stockVal;
  return item;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_HAMBURGERS) {
      await pool.query(
        `INSERT INTO products (name, category, specialty_badge, specialty_level, price, stock, sales, calories, cooking, image, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, p.category, p.specialty_badge, p.specialty_level, p.price, p.stock, p.sales, p.calories, p.cooking, p.image, p.description]
      );
    }
    return;
  }
  inMemoryProducts = JSON.parse(JSON.stringify(INITIAL_HAMBURGERS));
}

function getConsumerMetrics() {
  return CONSUMER_METRICS;
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'in-memory-fallback'),
    database: process.env.DB_NAME || 'hamburger_rapid_db',
    user: process.env.DB_USER || 'rapid_admin',
    productCount: inMemoryProducts.length,
    activePool: !!pool,
    lastChecked: new Date().toISOString(),
    error: lastDbError
  };
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  updateProductStock,
  deleteProduct,
  resetProducts,
  getConsumerMetrics,
  getDbStatus,
  INITIAL_HAMBURGERS
};
