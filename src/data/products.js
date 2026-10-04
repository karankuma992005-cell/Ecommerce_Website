import { buildImages } from './images';

/**
 * Demo catalogue. Prices are in INR and the data is illustrative only.
 * Image artwork is generated in ./images.js.
 */
const make = (id, { shape, colors, ...rest }) => ({
  id,
  ...rest,
  discount: Math.round((1 - rest.price / rest.originalPrice) * 100),
  images: buildImages(shape, colors),
});

export const products = [
  make(1, {
    name: 'iPhone 17 Pro', brand: 'Apple', category: 'Smartphones', price: 134900, originalPrice: 149900,
    rating: 4.8, reviews: 2431, stock: 12, featured: true, trending: false, newest: true,
    description: 'A pro-grade smartphone with a bright ProMotion display, a fast Apple-designed chip and a triple-camera system built for photos and 4K video.',
    shape: 'phone', colors: { body: '#c9ced6', accent: '#2f5fb3' },
    specifications: { Display: '6.3-inch Super Retina XDR OLED, 120 Hz', Processor: 'Apple A19 Pro', RAM: '12 GB', Storage: '256 GB', Battery: 'All-day battery with fast charging', Camera: '48 MP triple rear camera, 18 MP front', Connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, USB-C', Warranty: '1 year manufacturer warranty' },
  }),
  make(2, {
    name: 'Samsung Galaxy S26', brand: 'Samsung', category: 'Smartphones', price: 79999, originalPrice: 94999,
    rating: 4.6, reviews: 1864, stock: 20, featured: true, trending: false, newest: true,
    description: 'A compact flagship with a vivid 120 Hz AMOLED display, on-device AI features and a versatile triple camera for everyday shooting.',
    shape: 'phone', colors: { body: '#2b2f3a', accent: '#6d4fc2' },
    specifications: { Display: '6.2-inch Dynamic AMOLED 2X, 120 Hz', Processor: 'Snapdragon 8 Elite class flagship chip', RAM: '12 GB', Storage: '256 GB', Battery: '4,000 mAh, 25 W fast charging', Camera: '50 MP triple rear camera, 12 MP front', Connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, NFC', Warranty: '1 year manufacturer warranty' },
  }),
  make(3, {
    name: 'Google Pixel 10', brand: 'Google', category: 'Smartphones', price: 79999, originalPrice: 89999,
    rating: 4.5, reviews: 932, stock: 15, featured: false, trending: true, newest: true,
    description: 'Clean Android, seven years of updates and Google AI camera tricks that make every photo look better with no effort.',
    shape: 'phone', colors: { body: '#e8eaee', accent: '#3d8b6e' },
    specifications: { Display: '6.3-inch OLED, 120 Hz', Processor: 'Google Tensor G5', RAM: '12 GB', Storage: '128 GB', Battery: 'All-day battery, fast and wireless charging', Camera: '48 MP main + 13 MP ultrawide + 10.8 MP telephoto', Connectivity: '5G, Wi-Fi 7, Bluetooth 6, NFC', Warranty: '1 year manufacturer warranty' },
  }),
  make(4, {
    name: 'MacBook Air 13" (M4)', brand: 'Apple', category: 'Laptops', price: 99900, originalPrice: 114900,
    rating: 4.9, reviews: 3120, stock: 9, featured: true, trending: false, newest: false,
    description: 'Thin, silent and fast. The M4 chip and Liquid Retina display make it the easy choice for study, work and creative projects.',
    shape: 'laptop', colors: { body: '#cfd4dc', accent: '#3b6fd8' },
    specifications: { Display: '13.6-inch Liquid Retina', Processor: 'Apple M4', RAM: '16 GB', Storage: '256 GB SSD', Battery: 'Up to 18 hours', Camera: '12 MP Center Stage', Connectivity: 'Wi-Fi 6E, Bluetooth 5.3, 2x Thunderbolt', Warranty: '1 year limited warranty' },
  }),
  make(5, {
    name: 'Dell Inspiron 15', brand: 'Dell', category: 'Laptops', price: 58990, originalPrice: 72990,
    rating: 3.9, reviews: 1245, stock: 18, featured: false, trending: true, newest: false,
    description: 'A dependable everyday laptop with a full-HD display, a fast SSD and a comfortable keyboard with numeric keypad.',
    shape: 'laptop', colors: { body: '#aab2bf', accent: '#1d4f91' },
    specifications: { Display: '15.6-inch Full HD, 120 Hz', Processor: 'Intel Core i5 13th Gen', RAM: '16 GB', Storage: '512 GB SSD', Battery: 'Up to 9 hours', Camera: '1080p FHD webcam', Connectivity: 'Wi-Fi 6, Bluetooth 5.3, HDMI, USB-C', Warranty: '1 year onsite warranty' },
  }),
  make(6, {
    name: 'HP Pavilion 14', brand: 'HP', category: 'Laptops', price: 64990, originalPrice: 79990,
    rating: 4.3, reviews: 876, stock: 14, featured: false, trending: true, newest: false,
    description: 'A light 14-inch laptop with a sharp IPS display and a metal finish, designed for students and working professionals.',
    shape: 'laptop', colors: { body: '#d9dde3', accent: '#2a7f9e' },
    specifications: { Display: '14-inch Full HD IPS', Processor: 'AMD Ryzen 7 7000 series', RAM: '16 GB', Storage: '512 GB SSD', Battery: 'Up to 10 hours', Camera: '720p HD webcam', Connectivity: 'Wi-Fi 6, Bluetooth 5.3, HDMI, USB-C', Warranty: '1 year onsite warranty' },
  }),
  make(7, {
    name: 'Sony WH-1000XM6', brand: 'Sony', category: 'Headphones', price: 39990, originalPrice: 44990,
    rating: 4.8, reviews: 1507, stock: 25, featured: true, trending: false, newest: true,
    description: 'Industry-leading noise cancelling, rich sound tuned for detail and a comfortable fit for long flights and commutes.',
    shape: 'headphones', colors: { body: '#22252b', accent: '#8a94a6' },
    specifications: { Type: 'Over-ear wireless, active noise cancelling', Drivers: '30 mm', Battery: 'Up to 30 hours with ANC on', Charging: 'USB-C fast charge', Connectivity: 'Bluetooth 5.3, multipoint, 3.5 mm cable', Microphones: 'Multiple mics for calls', Weight: 'Approx. 250 g', Warranty: '1 year manufacturer warranty' },
  }),
  make(8, {
    name: 'Apple AirPods Pro (2nd gen)', brand: 'Apple', category: 'Headphones', price: 21900, originalPrice: 26900,
    rating: 4.7, reviews: 4210, stock: 40, featured: false, trending: true, newest: false,
    description: 'Active noise cancellation, Adaptive Transparency and Personalised Spatial Audio in a pocketable MagSafe charging case.',
    shape: 'earbuds', colors: { body: '#f4f6f9', accent: '#7c8798' },
    specifications: { Type: 'In-ear wireless, active noise cancelling', Chip: 'Apple H2', Battery: 'Up to 6 hours (30 hours with case)', Charging: 'MagSafe, Qi and USB-C', Connectivity: 'Bluetooth 5.3', Resistance: 'IP54 dust, sweat and water resistant', Controls: 'Touch control on stem', Warranty: '1 year limited warranty' },
  }),
  make(9, {
    name: 'Samsung Galaxy Watch 8', brand: 'Samsung', category: 'Smart Watches', price: 32999, originalPrice: 39999,
    rating: 4.4, reviews: 688, stock: 22, featured: true, trending: false, newest: true,
    description: 'A stylish smartwatch with sleep, heart and fitness tracking, plus smart notifications that work well with Android phones.',
    shape: 'watch', colors: { body: '#32363f', accent: '#5a7bd8' },
    specifications: { Display: '1.5-inch Super AMOLED', Processor: 'Exynos W-series', Memory: '2 GB RAM + 32 GB storage', Battery: 'Up to 40 hours', Sensors: 'Heart rate, ECG, SpO2, temperature', Resistance: '5 ATM + IP68', Connectivity: 'Bluetooth 5.3, Wi-Fi, NFC', Warranty: '1 year manufacturer warranty' },
  }),
  make(10, {
    name: 'Apple Watch Series 11', brand: 'Apple', category: 'Smart Watches', price: 46900, originalPrice: 49900,
    rating: 4.7, reviews: 1320, stock: 16, featured: false, trending: true, newest: true,
    description: 'A bright always-on display, advanced health sensors and seamless pairing with iPhone make this a great daily companion.',
    shape: 'watch', colors: { body: '#d4d8de', accent: '#e07a3f' },
    specifications: { Display: 'Always-On Retina LTPO OLED', Processor: 'Apple S-series SiP', Memory: '64 GB storage', Battery: 'Up to 24 hours', Sensors: 'Heart rate, ECG, blood oxygen, temperature', Resistance: 'WR50 water resistant', Connectivity: 'Bluetooth 5.3, Wi-Fi, GPS', Warranty: '1 year limited warranty' },
  }),
  make(11, {
    name: 'Canon EOS R50 Mirrorless Camera', brand: 'Canon', category: 'Cameras', price: 67995, originalPrice: 79995,
    rating: 4.6, reviews: 541, stock: 8, featured: true, trending: false, newest: false,
    description: 'A compact mirrorless camera with fast autofocus and 4K video, ideal for vlogging and learning photography.',
    shape: 'camera', colors: { body: '#2a2d33', accent: '#b8402f' },
    specifications: { Sensor: '24.2 MP APS-C CMOS', Processor: 'DIGIC X', Video: '4K up to 30 fps', 'ISO Range': '100 - 32000', Screen: '3.0-inch vari-angle touchscreen', Lens: 'RF-S 18-45 mm kit lens', Connectivity: 'Wi-Fi, Bluetooth, USB-C', Warranty: '2 year manufacturer warranty' },
  }),
  make(12, {
    name: 'Sony ZV-E10 II Vlog Camera', brand: 'Sony', category: 'Cameras', price: 94990, originalPrice: 109990,
    rating: 4.5, reviews: 312, stock: 3, featured: false, trending: true, newest: true,
    description: 'An interchangeable-lens vlogging camera with strong autofocus, a flip-out screen and excellent built-in audio features.',
    shape: 'camera', colors: { body: '#1f2228', accent: '#4f86c6' },
    specifications: { Sensor: '26 MP APS-C Exmor R', Processor: 'BIONZ XR', Video: '4K up to 60 fps', 'ISO Range': '100 - 32000', Screen: '3.0-inch vari-angle touchscreen', Lens: 'E 16-50 mm kit lens', Connectivity: 'Wi-Fi, Bluetooth, USB-C', Warranty: '2 year manufacturer warranty' },
  }),
  make(13, {
    name: 'PlayStation 5 Slim', brand: 'Sony', category: 'Gaming', price: 49990, originalPrice: 54990,
    rating: 4.9, reviews: 2788, stock: 5, featured: true, trending: false, newest: true,
    description: 'Fast loading, 4K gaming and the DualSense controller with haptic feedback, in a slimmer console design.',
    shape: 'console', colors: { body: '#f2f4f8', accent: '#2563c9' },
    specifications: { Resolution: 'Up to 4K at 120 fps', Storage: '1 TB SSD', Drive: 'Ultra HD Blu-ray disc drive', Controller: 'DualSense wireless controller', Audio: 'Tempest 3D AudioTech', Connectivity: 'Wi-Fi 6, Bluetooth 5.1, HDMI 2.1', Included: 'Console, controller, cables', Warranty: '1 year manufacturer warranty' },
  }),
  make(14, {
    name: 'Xbox Series X', brand: 'Microsoft', category: 'Gaming', price: 49990, originalPrice: 55990,
    rating: 4.7, reviews: 1934, stock: 4, featured: false, trending: true, newest: false,
    description: 'Microsoft\'s most powerful console, with quick resume, a huge game library through Game Pass and true 4K performance.',
    shape: 'box', colors: { body: '#1c1f24', accent: '#2fa84f' },
    specifications: { Resolution: 'Up to 4K at 120 fps', Storage: '1 TB NVMe SSD', Drive: '4K Ultra HD Blu-ray drive', Controller: 'Xbox wireless controller', Audio: 'Dolby Atmos support', Connectivity: 'Wi-Fi 5, Bluetooth, HDMI 2.1', Included: 'Console, controller, cables', Warranty: '1 year manufacturer warranty' },
  }),
  make(15, {
    name: 'Keychron K8 Pro Mechanical Keyboard', brand: 'Keychron', category: 'Gaming', price: 8999, originalPrice: 11999,
    rating: 4.6, reviews: 764, stock: 30, featured: true, trending: false, newest: false,
    description: 'A wireless tenkeyless mechanical keyboard with hot-swappable switches, RGB backlight and Mac and Windows layouts.',
    shape: 'keyboard', colors: { body: '#2e333c', accent: '#8fa3c7' },
    specifications: { Layout: '87-key tenkeyless', Switches: 'Hot-swappable Gateron G Pro', Backlight: 'RGB', Battery: '4,000 mAh, up to 240 hours', Connectivity: 'Bluetooth 5.1 and USB-C wired', Compatibility: 'Windows, macOS, Linux, Android', Frame: 'Aluminium + plastic', Warranty: '1 year manufacturer warranty' },
  }),
  make(16, {
    name: 'Logitech G502 X Gaming Mouse', brand: 'Logitech', category: 'Gaming', price: 5495, originalPrice: 7295,
    rating: 4.7, reviews: 1089, stock: 0, featured: false, trending: false, newest: false,
    description: 'A precise wired gaming mouse with a 25,600 DPI sensor, hybrid optical-mechanical switches and 13 programmable controls.',
    shape: 'mouse', colors: { body: '#23262d', accent: '#3b82f6' },
    specifications: { Sensor: 'HERO 25K', DPI: 'Up to 25,600', Buttons: '13 programmable', Switches: 'LIGHTFORCE hybrid optical-mechanical', Weight: 'Approx. 89 g', Connectivity: 'USB wired', Software: 'Logitech G HUB', Warranty: '2 year manufacturer warranty' },
  }),
  make(17, {
    name: 'Anker PowerCore 20000 Power Bank', brand: 'Anker', category: 'Accessories', price: 2999, originalPrice: 3999,
    rating: 4.5, reviews: 3560, stock: 60, featured: false, trending: false, newest: false,
    description: 'A 20,000 mAh power bank that charges a phone around four times, with fast USB-C Power Delivery output.',
    shape: 'powerbank', colors: { body: '#2b3340', accent: '#38bdf8' },
    specifications: { Capacity: '20,000 mAh', Output: '20 W USB-C PD + USB-A', Input: 'USB-C', Ports: '1x USB-C, 2x USB-A', Safety: 'Surge, temperature and short-circuit protection', Weight: 'Approx. 350 g', 'Charging Cable': 'USB-C cable included', Warranty: '18 month manufacturer warranty' },
  }),
  make(18, {
    name: 'JBL Flip 6 Bluetooth Speaker', brand: 'JBL', category: 'Accessories', price: 8999, originalPrice: 11999,
    rating: 4.6, reviews: 2210, stock: 35, featured: false, trending: true, newest: false,
    description: 'A rugged portable speaker with powerful JBL Pro Sound, deep bass and IP67 water and dust protection.',
    shape: 'speaker', colors: { body: '#3b4a63', accent: '#f59e0b' },
    specifications: { Output: '30 W RMS', Drivers: 'Woofer + tweeter', Battery: 'Up to 12 hours', Charging: 'USB-C', Resistance: 'IP67 waterproof and dustproof', Connectivity: 'Bluetooth 5.1, PartyBoost', Weight: 'Approx. 550 g', Warranty: '1 year manufacturer warranty' },
  }),
  make(19, {
    name: 'Anker 7-in-1 USB-C Hub', brand: 'Anker', category: 'Accessories', price: 3999, originalPrice: 5499,
    rating: 4.4, reviews: 918, stock: 45, featured: false, trending: false, newest: false,
    description: 'Turn one USB-C port into HDMI 4K, two USB-A ports, an SD card reader and 85 W pass-through charging.',
    shape: 'hub', colors: { body: '#aab3c2', accent: '#475569' },
    specifications: { Ports: '2x USB-A, 1x USB-C data, 1x USB-C PD, HDMI, SD, microSD', Video: 'HDMI 4K at 30 Hz', 'Power Delivery': 'Up to 85 W pass-through', 'Data Speed': 'Up to 5 Gbps', Material: 'Aluminium alloy', Compatibility: 'Windows, macOS, iPadOS, Android', Cable: 'Integrated USB-C cable', Warranty: '18 month manufacturer warranty' },
  }),
  make(20, {
    name: 'Ambrane 15W Wireless Charger', brand: 'Ambrane', category: 'Accessories', price: 899, originalPrice: 1499,
    rating: 3.8, reviews: 1402, stock: 80, featured: false, trending: false, newest: false,
    description: 'A slim Qi wireless charging pad with a non-slip surface and over-heat protection for phones and earbuds.',
    shape: 'charger', colors: { body: '#2a2f38', accent: '#22c55e' },
    specifications: { Output: 'Up to 15 W', Standard: 'Qi wireless charging', Input: 'USB-C', Protection: 'Over-heat, over-current and foreign object detection', Surface: 'Non-slip silicone ring', 'Cable Length': '1 metre', Compatibility: 'Qi-enabled phones and earbuds', Warranty: '1 year manufacturer warranty' },
  }),
];

export const categories = ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Cameras', 'Gaming', 'Accessories'];

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));

const productMap = new Map(products.map((p) => [p.id, p]));

export const getProductById = (id) => productMap.get(Number(id));

export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
