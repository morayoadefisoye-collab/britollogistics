import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Custom hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    whatWeSell: 'What We Sell',
    wholesale: 'Wholesale',
    testimonials: 'Testimonials',
    contact: 'Contact',
    cart: 'Cart',
    checkout: 'Checkout',
    trackOrder: 'Track Order',
    wishlist: 'Wishlist',
    
    // Authentication
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    loginSubtitle: 'Welcome back! Please sign in to your account.',
    signupSubtitle: 'Create a new account to get started.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    enterFirstName: 'Enter your first name',
    enterLastName: 'Enter your last name',
    enterEmail: 'Enter your email address',
    enterPhone: 'Enter your phone number',
    enterAddress: 'Enter your address',
    enterPassword: 'Enter your password',
    createAccount: 'Create Account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    loading: 'Loading...',
    
    // Product Actions
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    viewDetails: 'View Details',
    viewGallery: 'View Gallery',
    selectSize: 'Select Size',
    selectColor: 'Select Color',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    
    // Product Features
    returnGuarantee: '30-day return guarantee',
    premiumQuality: 'Premium quality materials',
    
    // Stock Status
    inStock: 'In Stock',
    lowStock: 'Only {count} left!',
    outOfStock: 'Out of Stock',
    available: '{count} available',
    
    // Size Guide
    sizeGuide: 'Size Guide',
    bust: 'Bust (inches)',
    waist: 'Waist (inches)',
    hips: 'Hips (inches)',
    close: 'Close',
    
    // Categories
    allCategories: 'All',
    ladiesFashion: "Ladies' Fashion",
    mensFashion: "Men's Fashion",
    childrensWear: "Children's Wear",
    ladiesAccessories: "Ladies' Accessories",
    mensAccessories: "Men's Accessories",
    household: 'Household',
    goldAccessories: 'Gold Accessories',
    featuredCollection: 'Featured Collection',
    
    // Search & Filter
    searchProducts: 'Search products...',
    category: 'Category',
    featured: 'Featured',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    noResults: 'No products found matching your criteria',
    
    // Hero Section
    heroTitle: 'Everything You\'ll Ever Need',
    heroSubtitle: 'Quality products, trusted service, unbeatable prices',
    
    // Product Modal
    selectSizeColor: 'Select Size & Color',
    addToWishlist: 'Add to Wishlist',
    shareProduct: 'Share Product',
    
    // Wishlist
    myWishlist: 'My Wishlist',
    emptyWishlist: 'Your wishlist is empty',
    emptyWishlistMessage: 'Start adding products you love to your wishlist!',
    continueShopping: 'Continue Shopping',
    clearWishlist: 'Clear Wishlist',
    confirmClearWishlist: 'Are you sure you want to clear your entire wishlist?',
    removeFromWishlist: 'Remove from Wishlist',
    addedOn: 'Added on',
    wishlistFor: 'Wishlist for',
    addAllToCart: 'Add All to Cart',
    confirmAddAllToCart: 'All items added to cart! Clear wishlist?',
    items: 'items',
    
    // Reviews
    customerReviews: 'Customer Ratings',
    writeReview: 'Rate Product',
    rateProduct: 'Rate Product',
    rateThisProduct: 'Rate This Product',
    yourRating: 'Your Rating',
    rating: 'Rating',
    star: 'star',
    stars: 'stars',
    submitRating: 'Submit Rating',
    cancel: 'Cancel',
    basedOnReviews: 'Based on {count} ratings',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    highestRated: 'Highest Rated',
    lowestRated: 'Lowest Rated',
    mostHelpful: 'Most Helpful',
    helpful: 'Helpful',
    report: 'Report',
    reported: 'Reported',
    verifiedPurchase: 'Verified Purchase',
    deleteReview: 'Delete Rating',
    noRatingsYet: 'No ratings yet',
    beFirstToRate: 'Be the first to rate this product',
    loginToReview: 'Please login to rate this product',
    reviewSubmitted: 'Rating submitted successfully!',
    
    // Gallery
    photos: 'photos',
    
    // Colors
    green: 'Green',
    cream: 'Cream',
    white: 'White',
    red: 'Red',
    purple: 'Purple',
    black: 'Black',
    blue: 'Blue',
    pink: 'Pink',
    
    // Color Descriptions
    colorDescriptions: {
      green: 'Forest Green - Rich and elegant',
      cream: 'Ivory Cream - Classic and timeless',
      white: 'Pure White - Clean and sophisticated',
      red: 'Crimson Red - Bold and striking',
      purple: 'Royal Purple - Luxurious and unique'
    },
    
    // Size Badges
    mostPopular: 'Most Popular',
    bestSeller: 'Best Seller',
    limitedStock: 'Limited Stock',
    
    // Language Selector
    language: 'Language',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    arabic: 'العربية',
    chinese: '中文'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    whatWeSell: 'Ce que nous vendons',
    wholesale: 'Vente en gros',
    testimonials: 'Témoignages',
    contact: 'Contact',
    cart: 'Panier',
    checkout: 'Commande',
    trackOrder: 'Suivre la commande',
    wishlist: 'Liste de souhaits',
    
    // Authentication
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    loginSubtitle: 'Bon retour ! Veuillez vous connecter à votre compte.',
    signupSubtitle: 'Créez un nouveau compte pour commencer.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    enterFirstName: 'Entrez votre prénom',
    enterLastName: 'Entrez votre nom',
    enterEmail: 'Entrez votre adresse email',
    enterPhone: 'Entrez votre numéro de téléphone',
    enterAddress: 'Entrez votre adresse',
    enterPassword: 'Entrez votre mot de passe',
    createAccount: 'Créer un compte',
    noAccount: "Vous n'avez pas de compte ?",
    haveAccount: 'Vous avez déjà un compte ?',
    loading: 'Chargement...',
    
    // Product Actions
    addToCart: 'Ajouter au panier',
    buyNow: 'Acheter maintenant',
    viewDetails: 'Voir les détails',
    viewGallery: 'Voir la galerie',
    selectSize: 'Choisir la taille',
    selectColor: 'Choisir la couleur',
    quantity: 'Quantité',
    price: 'Prix',
    total: 'Total',
    
    // Product Features
    returnGuarantee: 'Garantie de retour de 30 jours',
    premiumQuality: 'Matériaux de qualité premium',
    
    // Stock Status
    inStock: 'En stock',
    lowStock: 'Plus que {count} disponible!',
    outOfStock: 'Rupture de stock',
    available: '{count} disponible',
    
    // Size Guide
    sizeGuide: 'Guide des tailles',
    bust: 'Poitrine (pouces)',
    waist: 'Taille (pouces)',
    hips: 'Hanches (pouces)',
    close: 'Fermer',
    
    // Categories
    allCategories: 'Tout',
    ladiesFashion: 'Mode Femme',
    mensFashion: 'Mode Homme',
    childrensWear: 'Vêtements Enfants',
    ladiesAccessories: 'Accessoires Femme',
    mensAccessories: 'Accessoires Homme',
    household: 'Maison',
    goldAccessories: 'Accessoires en Or',
    featuredCollection: 'Collection Vedette',
    
    // Search & Filter
    searchProducts: 'Rechercher des produits...',
    category: 'Catégorie',
    featured: 'Vedette',
    priceLowToHigh: 'Prix: Bas à Élevé',
    priceHighToLow: 'Prix: Élevé à Bas',
    noResults: 'Aucun produit trouvé correspondant à vos critères',
    
    // Hero Section
    heroTitle: 'Tout ce dont vous aurez jamais besoin',
    heroSubtitle: 'Produits de qualité, service de confiance, prix imbattables',
    
    // Product Modal
    selectSizeColor: 'Choisir Taille et Couleur',
    addToWishlist: 'Ajouter à la liste de souhaits',
    shareProduct: 'Partager le produit',
    
    // Wishlist
    myWishlist: 'Ma liste de souhaits',
    emptyWishlist: 'Votre liste de souhaits est vide',
    emptyWishlistMessage: 'Commencez à ajouter des produits que vous aimez à votre liste de souhaits !',
    continueShopping: 'Continuer les achats',
    clearWishlist: 'Vider la liste',
    confirmClearWishlist: 'Êtes-vous sûr de vouloir vider toute votre liste de souhaits ?',
    removeFromWishlist: 'Retirer de la liste',
    addedOn: 'Ajouté le',
    wishlistFor: 'Liste de souhaits pour',
    addAllToCart: 'Tout ajouter au panier',
    confirmAddAllToCart: 'Tous les articles ajoutés au panier ! Vider la liste ?',
    items: 'articles',
    
    // Reviews
    customerReviews: 'Notes clients',
    writeReview: 'Noter le produit',
    rateProduct: 'Noter le produit',
    rateThisProduct: 'Notez ce produit',
    yourRating: 'Votre note',
    rating: 'Note',
    star: 'étoile',
    stars: 'étoiles',
    submitRating: 'Soumettre la note',
    cancel: 'Annuler',
    basedOnReviews: 'Basé sur {count} notes',
    sortBy: 'Trier par',
    newest: 'Plus récent',
    oldest: 'Plus ancien',
    highestRated: 'Mieux noté',
    lowestRated: 'Moins bien noté',
    mostHelpful: 'Plus utile',
    helpful: 'Utile',
    report: 'Signaler',
    reported: 'Signalé',
    verifiedPurchase: 'Achat vérifié',
    deleteReview: 'Supprimer la note',
    noRatingsYet: 'Aucune note pour le moment',
    beFirstToRate: 'Soyez le premier à noter ce produit',
    loginToReview: 'Veuillez vous connecter pour noter ce produit',
    reviewSubmitted: 'Note soumise avec succès !',
    
    // Gallery
    photos: 'photos',
    
    // Colors
    green: 'Vert',
    cream: 'Crème',
    white: 'Blanc',
    red: 'Rouge',
    purple: 'Violet',
    black: 'Noir',
    blue: 'Bleu',
    pink: 'Rose',
    
    // Color Descriptions
    colorDescriptions: {
      green: 'Vert Forêt - Riche et élégant',
      cream: 'Crème Ivoire - Classique et intemporel',
      white: 'Blanc Pur - Propre et sophistiqué',
      red: 'Rouge Cramoisi - Audacieux et frappant',
      purple: 'Violet Royal - Luxueux et unique'
    },
    
    // Size Badges
    mostPopular: 'Plus Populaire',
    bestSeller: 'Meilleure Vente',
    limitedStock: 'Stock Limité',
    
    // Language Selector
    language: 'Langue',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    arabic: 'العربية',
    chinese: '中文'
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    whatWeSell: 'Lo que vendemos',
    wholesale: 'Mayoreo',
    testimonials: 'Testimonios',
    contact: 'Contacto',
    cart: 'Carrito',
    checkout: 'Pagar',
    
    // Product Actions
    addToCart: 'Añadir al carrito',
    buyNow: 'Comprar ahora',
    viewDetails: 'Ver detalles',
    viewGallery: 'Ver galería',
    selectSize: 'Seleccionar talla',
    selectColor: 'Seleccionar color',
    quantity: 'Cantidad',
    price: 'Precio',
    total: 'Total',
    
    // Product Features
    returnGuarantee: 'Garantía de devolución de 30 días',
    premiumQuality: 'Materiales de calidad premium',
    
    // Stock Status
    inStock: 'En stock',
    lowStock: '¡Solo quedan {count}!',
    outOfStock: 'Agotado',
    available: '{count} disponible',
    
    // Size Guide
    sizeGuide: 'Guía de tallas',
    bust: 'Busto (pulgadas)',
    waist: 'Cintura (pulgadas)',
    hips: 'Caderas (pulgadas)',
    close: 'Cerrar',
    
    // Categories
    allCategories: 'Todo',
    ladiesFashion: 'Moda Femenina',
    mensFashion: 'Moda Masculina',
    childrensWear: 'Ropa Infantil',
    ladiesAccessories: 'Accesorios Femeninos',
    mensAccessories: 'Accesorios Masculinos',
    household: 'Hogar',
    goldAccessories: 'Accesorios de Oro',
    featuredCollection: 'Colección Destacada',
    
    // Search & Filter
    searchProducts: 'Buscar productos...',
    category: 'Categoría',
    featured: 'Destacado',
    priceLowToHigh: 'Precio: Menor a Mayor',
    priceHighToLow: 'Precio: Mayor a Menor',
    noResults: 'No se encontraron productos que coincidan con sus criterios',
    
    // Hero Section
    heroTitle: 'Todo lo que necesitarás',
    heroSubtitle: 'Productos de calidad, servicio confiable, precios inmejorables',
    
    // Product Modal
    selectSizeColor: 'Seleccionar Talla y Color',
    addToWishlist: 'Añadir a favoritos',
    shareProduct: 'Compartir producto',
    
    // Wishlist
    myWishlist: 'Mi lista de deseos',
    emptyWishlist: 'Tu lista de deseos está vacía',
    emptyWishlistMessage: '¡Comienza a agregar productos que te gusten a tu lista de deseos!',
    continueShopping: 'Continuar comprando',
    clearWishlist: 'Limpiar lista',
    confirmClearWishlist: '¿Estás seguro de que quieres limpiar toda tu lista de deseos?',
    removeFromWishlist: 'Quitar de la lista',
    addedOn: 'Agregado el',
    wishlistFor: 'Lista de deseos para',
    addAllToCart: 'Agregar todo al carrito',
    confirmAddAllToCart: '¡Todos los artículos agregados al carrito! ¿Limpiar lista?',
    items: 'artículos',
    
    // Reviews
    customerReviews: 'Calificaciones de clientes',
    writeReview: 'Calificar producto',
    rateProduct: 'Calificar producto',
    rateThisProduct: 'Califica este producto',
    yourRating: 'Tu calificación',
    rating: 'Calificación',
    star: 'estrella',
    stars: 'estrellas',
    submitRating: 'Enviar calificación',
    cancel: 'Cancelar',
    basedOnReviews: 'Basado en {count} calificaciones',
    sortBy: 'Ordenar por',
    newest: 'Más reciente',
    oldest: 'Más antiguo',
    highestRated: 'Mejor calificado',
    lowestRated: 'Peor calificado',
    mostHelpful: 'Más útil',
    helpful: 'Útil',
    report: 'Reportar',
    reported: 'Reportado',
    verifiedPurchase: 'Compra verificada',
    deleteReview: 'Eliminar calificación',
    noRatingsYet: 'Aún no hay calificaciones',
    beFirstToRate: 'Sé el primero en calificar este producto',
    loginToReview: 'Por favor inicia sesión para calificar este producto',
    reviewSubmitted: '¡Calificación enviada exitosamente!',
    
    // Gallery
    photos: 'fotos',
    
    // Colors
    green: 'Verde',
    cream: 'Crema',
    white: 'Blanco',
    red: 'Rojo',
    purple: 'Morado',
    black: 'Negro',
    blue: 'Azul',
    pink: 'Rosa',
    
    // Color Descriptions
    colorDescriptions: {
      green: 'Verde Bosque - Rico y elegante',
      cream: 'Crema Marfil - Clásico y atemporal',
      white: 'Blanco Puro - Limpio y sofisticado',
      red: 'Rojo Carmesí - Audaz y llamativo',
      purple: 'Morado Real - Lujoso y único'
    },
    
    // Size Badges
    mostPopular: 'Más Popular',
    bestSeller: 'Más Vendido',
    limitedStock: 'Stock Limitado',
    
    // Language Selector
    language: 'Idioma',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    arabic: 'العربية',
    chinese: '中文'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'حولنا',
    whatWeSell: 'ما نبيعه',
    wholesale: 'الجملة',
    testimonials: 'الشهادات',
    contact: 'اتصل بنا',
    cart: 'السلة',
    checkout: 'الدفع',
    
    // Product Actions
    addToCart: 'أضف إلى السلة',
    buyNow: 'اشتري الآن',
    viewDetails: 'عرض التفاصيل',
    viewGallery: 'عرض المعرض',
    selectSize: 'اختر المقاس',
    selectColor: 'اختر اللون',
    quantity: 'الكمية',
    price: 'السعر',
    total: 'المجموع',
    
    // Product Features
    returnGuarantee: 'ضمان الإرجاع لمدة 30 يوماً',
    premiumQuality: 'مواد عالية الجودة',
    
    // Stock Status
    inStock: 'متوفر',
    lowStock: 'باقي {count} فقط!',
    outOfStock: 'نفد المخزون',
    available: '{count} متوفر',
    
    // Size Guide
    sizeGuide: 'دليل المقاسات',
    bust: 'الصدر (بوصة)',
    waist: 'الخصر (بوصة)',
    hips: 'الوركين (بوصة)',
    close: 'إغلاق',
    
    // Categories
    allCategories: 'الكل',
    ladiesFashion: 'أزياء السيدات',
    mensFashion: 'أزياء الرجال',
    childrensWear: 'ملابس الأطفال',
    ladiesAccessories: 'إكسسوارات السيدات',
    mensAccessories: 'إكسسوارات الرجال',
    household: 'المنزل',
    goldAccessories: 'إكسسوارات ذهبية',
    featuredCollection: 'المجموعة المميزة',
    
    // Search & Filter
    searchProducts: 'البحث عن المنتجات...',
    category: 'الفئة',
    featured: 'مميز',
    priceLowToHigh: 'السعر: من الأقل للأعلى',
    priceHighToLow: 'السعر: من الأعلى للأقل',
    noResults: 'لم يتم العثور على منتجات تطابق معاييرك',
    
    // Hero Section
    heroTitle: 'كل ما ستحتاجه',
    heroSubtitle: 'منتجات عالية الجودة، خدمة موثوقة، أسعار لا تقاوم',
    
    // Product Modal
    selectSizeColor: 'اختر المقاس واللون',
    addToWishlist: 'أضف للمفضلة',
    shareProduct: 'شارك المنتج',
    
    // Wishlist
    myWishlist: 'قائمة أمنياتي',
    emptyWishlist: 'قائمة أمنياتك فارغة',
    emptyWishlistMessage: 'ابدأ بإضافة المنتجات التي تحبها إلى قائمة أمنياتك!',
    continueShopping: 'متابعة التسوق',
    clearWishlist: 'مسح القائمة',
    confirmClearWishlist: 'هل أنت متأكد من أنك تريد مسح قائمة أمنياتك بالكامل؟',
    removeFromWishlist: 'إزالة من القائمة',
    addedOn: 'أضيف في',
    wishlistFor: 'قائمة أمنيات لـ',
    addAllToCart: 'أضف الكل للسلة',
    confirmAddAllToCart: 'تمت إضافة جميع العناصر للسلة! مسح القائمة؟',
    items: 'عناصر',
    
    // Reviews
    customerReviews: 'تقييمات العملاء',
    writeReview: 'قيم المنتج',
    rateProduct: 'قيم المنتج',
    rateThisProduct: 'قيم هذا المنتج',
    yourRating: 'تقييمك',
    rating: 'التقييم',
    star: 'نجمة',
    stars: 'نجوم',
    submitRating: 'إرسال التقييم',
    cancel: 'إلغاء',
    basedOnReviews: 'بناءً على {count} تقييم',
    sortBy: 'ترتيب حسب',
    newest: 'الأحدث',
    oldest: 'الأقدم',
    highestRated: 'الأعلى تقييماً',
    lowestRated: 'الأقل تقييماً',
    mostHelpful: 'الأكثر فائدة',
    helpful: 'مفيد',
    report: 'إبلاغ',
    reported: 'تم الإبلاغ',
    verifiedPurchase: 'شراء موثق',
    deleteReview: 'حذف التقييم',
    noRatingsYet: 'لا توجد تقييمات بعد',
    beFirstToRate: 'كن أول من يقيم هذا المنتج',
    loginToReview: 'يرجى تسجيل الدخول لتقييم هذا المنتج',
    reviewSubmitted: 'تم إرسال التقييم بنجاح!',
    
    // Gallery
    photos: 'صور',
    
    // Colors
    green: 'أخضر',
    cream: 'كريمي',
    white: 'أبيض',
    red: 'أحمر',
    purple: 'بنفسجي',
    black: 'أسود',
    blue: 'أزرق',
    pink: 'وردي',
    
    // Color Descriptions
    colorDescriptions: {
      green: 'أخضر الغابة - غني وأنيق',
      cream: 'كريمي عاجي - كلاسيكي وخالد',
      white: 'أبيض نقي - نظيف ومتطور',
      red: 'أحمر قرمزي - جريء ولافت',
      purple: 'بنفسجي ملكي - فاخر وفريد'
    },
    
    // Size Badges
    mostPopular: 'الأكثر شعبية',
    bestSeller: 'الأكثر مبيعاً',
    limitedStock: 'مخزون محدود',
    
    // Language Selector
    language: 'اللغة',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    arabic: 'العربية',
    chinese: '中文'
  },
  
  zh: {
    // Navigation
    home: '首页',
    about: '关于我们',
    whatWeSell: '我们的产品',
    wholesale: '批发',
    testimonials: '客户评价',
    contact: '联系我们',
    cart: '购物车',
    checkout: '结账',
    
    // Product Actions
    addToCart: '加入购物车',
    buyNow: '立即购买',
    viewDetails: '查看详情',
    viewGallery: '查看图库',
    selectSize: '选择尺寸',
    selectColor: '选择颜色',
    quantity: '数量',
    price: '价格',
    total: '总计',
    
    // Product Features
    returnGuarantee: '30天退货保证',
    premiumQuality: '优质材料',
    
    // Stock Status
    inStock: '有库存',
    lowStock: '仅剩{count}件！',
    outOfStock: '缺货',
    available: '有{count}件',
    
    // Size Guide
    sizeGuide: '尺寸指南',
    bust: '胸围（英寸）',
    waist: '腰围（英寸）',
    hips: '臀围（英寸）',
    close: '关闭',
    
    // Categories
    allCategories: '全部',
    ladiesFashion: '女装',
    mensFashion: '男装',
    childrensWear: '童装',
    ladiesAccessories: '女士配饰',
    mensAccessories: '男士配饰',
    household: '家居用品',
    goldAccessories: '黄金配饰',
    featuredCollection: '精选系列',
    
    // Search & Filter
    searchProducts: '搜索产品...',
    category: '类别',
    featured: '精选',
    priceLowToHigh: '价格：从低到高',
    priceHighToLow: '价格：从高到低',
    noResults: '未找到符合条件的产品',
    
    // Hero Section
    heroTitle: '您需要的一切',
    heroSubtitle: '优质产品，可信服务，无与伦比的价格',
    
    // Product Modal
    selectSizeColor: '选择尺寸和颜色',
    addToWishlist: '添加到心愿单',
    shareProduct: '分享产品',
    
    // Wishlist
    myWishlist: '我的心愿单',
    emptyWishlist: '您的心愿单是空的',
    emptyWishlistMessage: '开始将您喜欢的产品添加到心愿单吧！',
    continueShopping: '继续购物',
    clearWishlist: '清空心愿单',
    confirmClearWishlist: '您确定要清空整个心愿单吗？',
    removeFromWishlist: '从心愿单移除',
    addedOn: '添加于',
    wishlistFor: '心愿单为',
    addAllToCart: '全部加入购物车',
    confirmAddAllToCart: '所有商品已加入购物车！清空心愿单？',
    items: '件商品',
    
    // Reviews
    customerReviews: '客户评分',
    writeReview: '评分产品',
    rateProduct: '评分产品',
    rateThisProduct: '为此产品评分',
    yourRating: '您的评分',
    rating: '评分',
    star: '星',
    stars: '星',
    submitRating: '提交评分',
    cancel: '取消',
    basedOnReviews: '基于{count}个评分',
    sortBy: '排序方式',
    newest: '最新',
    oldest: '最旧',
    highestRated: '评分最高',
    lowestRated: '评分最低',
    mostHelpful: '最有帮助',
    helpful: '有帮助',
    report: '举报',
    reported: '已举报',
    verifiedPurchase: '已验证购买',
    deleteReview: '删除评分',
    noRatingsYet: '暂无评分',
    beFirstToRate: '成为第一个为此产品评分的人',
    loginToReview: '请登录后评分此产品',
    reviewSubmitted: '评分提交成功！',
    
    // Gallery
    photos: '张照片',
    
    // Colors
    green: '绿色',
    cream: '奶油色',
    white: '白色',
    red: '红色',
    purple: '紫色',
    black: '黑色',
    blue: '蓝色',
    pink: '粉色',
    
    // Color Descriptions
    colorDescriptions: {
      green: '森林绿 - 丰富优雅',
      cream: '象牙奶油 - 经典永恒',
      white: '纯白 - 干净精致',
      red: '深红 - 大胆醒目',
      purple: '皇家紫 - 奢华独特'
    },
    
    // Size Badges
    mostPopular: '最受欢迎',
    bestSeller: '畅销款',
    limitedStock: '库存有限',
    
    // Language Selector
    language: '语言',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    arabic: 'العربية',
    chinese: '中文'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // Set document direction for RTL languages
    document.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) {
      // Fallback to English if translation not found
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
      }
    }
    
    if (!value) return key;
    
    // Replace parameters in the string
    return Object.keys(params).reduce((str, param) => {
      return str.replace(`{${param}}`, params[param]);
    }, value);
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL: currentLanguage === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};