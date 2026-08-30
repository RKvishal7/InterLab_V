import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  Shield, 
  Check, 
  ChevronRight, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Eye, 
  Sparkles,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  thumbnail: string;
  label: string;
}

const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
    label: 'Studio Angle',
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&auto=format&fit=crop&q=80',
    label: 'Side Profile',
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&auto=format&fit=crop&q=80',
    label: 'Ear Cushion Detail',
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&auto=format&fit=crop&q=80',
    label: 'Folded Carrying Case',
  },
];

const COLORS = [
  { id: 'matte-black', name: 'Matte Obsidian', hex: '#1C1C1E' },
  { id: 'lunar-white', name: 'Lunar Pearl', hex: '#F0EFE9' },
  { id: 'deep-indigo', name: 'Deep Indigo', hex: '#263459' },
  { id: 'titanium-grey', name: 'Raw Titanium', hex: '#7A7A78' },
];

export const ProductPageLivePreview: React.FC = () => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('matte-black');
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'shipping'>('overview');

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
    }, 2500);
  };

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  return (
    <div className="bg-[#EAE8E1] p-4 sm:p-6 rounded-sm border border-[#D5D3CB] space-y-4">
      {/* Top Preview Bar & Viewport Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xs border border-[#D5D3CB]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#1A1C1E]">
            Live Component Sandbox
          </span>
          <span className="text-xs text-[#8A8A85] hidden sm:inline">• Nova Labs E-Commerce Kit</span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-[#F5F4F0] p-1 rounded-xs border border-[#E5E3DC]">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2.5 py-1 text-xs font-medium rounded-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === 'desktop'
                ? 'bg-white text-[#1A1C1E] shadow-xs font-semibold'
                : 'text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            title="Desktop Viewport (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 py-1 text-xs font-medium rounded-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === 'tablet'
                ? 'bg-white text-[#1A1C1E] shadow-xs font-semibold'
                : 'text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            title="Tablet Viewport (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 py-1 text-xs font-medium rounded-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === 'mobile'
                ? 'bg-white text-[#1A1C1E] shadow-xs font-semibold'
                : 'text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            title="Mobile Viewport (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Cart Counter Simulation */}
        <div className="flex items-center gap-2">
          <div className="relative p-1.5 bg-[#F5F4F0] rounded-xs border border-[#E5E3DC] text-[#1A1C1E]">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#3E51FF] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className={`mx-auto transition-all duration-300 bg-white border border-[#D5D3CB] rounded-sm shadow-sm overflow-hidden relative ${getViewportWidth()}`}>
        {/* Mock Store Header */}
        <div className="px-4 py-3 border-b border-[#E5E3DC] bg-[#FAF9F7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#1A1C1E] text-white rounded-xs flex items-center justify-center font-mono font-bold text-[10px]">
              N
            </div>
            <span className="font-bold text-xs tracking-tight text-[#1A1C1E]">NOVA AUDIO</span>
          </div>
          <div className="text-[11px] font-mono text-[#5A5C60]">
            Free Express Shipping over $150
          </div>
        </div>

        {/* Product Component Body */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className={`grid gap-8 items-start ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
            
            {/* LEFT: Product Image Gallery */}
            <div className={`${viewportMode === 'mobile' ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
              {/* Main Image Display */}
              <div className="aspect-square bg-[#F4F3EF] rounded-sm overflow-hidden border border-[#E5E3DC] relative group">
                <img 
                  src={PRODUCT_IMAGES[activeImageIdx].url} 
                  alt={PRODUCT_IMAGES[activeImageIdx].label} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1A1C1E]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded-xs">
                  {PRODUCT_IMAGES[activeImageIdx].label}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button className="p-2 bg-white/80 backdrop-blur-xs hover:bg-white text-[#1A1C1E] rounded-full shadow-xs transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {PRODUCT_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square rounded-xs overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx 
                        ? 'border-[#3E51FF] ring-2 ring-[#3E51FF]/20 shadow-xs' 
                        : 'border-[#E5E3DC] opacity-70 hover:opacity-100 hover:border-[#8A8A85]'
                    }`}
                  >
                    <img src={img.thumbnail} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Information & Controls */}
            <div className={`${viewportMode === 'mobile' ? 'w-full' : 'lg:col-span-5'} space-y-5`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs">
                    New Release
                  </span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold ml-1 text-[#1A1C1E]">4.9</span>
                    <span className="text-[#8A8A85] ml-1">(128 reviews)</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
                  Nova Studio Pro Wireless Headphones
                </h1>
                <p className="text-xs sm:text-sm text-[#5A5C60] mt-1.5 leading-relaxed">
                  Engineered with custom 40mm beryllium drivers, active hybrid noise cancellation, and 45-hour playback for studio mixing and daily listening.
                </p>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E]">
                    $289.00
                  </span>
                  <span className="text-sm text-[#8A8A85] line-through font-mono">
                    $349.00
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                    Save $60 (17%)
                  </span>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="space-y-2 pt-2 border-t border-[#E5E3DC]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1C1E]">Finish / Color</span>
                  <span className="text-[#5A5C60] font-mono">
                    {COLORS.find(c => c.id === selectedColor)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col.id)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === col.id 
                          ? 'border-[#3E51FF] ring-2 ring-[#3E51FF]/20 scale-110' 
                          : 'border-[#D5D3CB] hover:border-[#1A1C1E]'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.id && (
                        <Check className={`w-3 h-3 ${col.hex === '#F0EFE9' ? 'text-[#1A1C1E]' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart Interaction */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D5D3CB] rounded-xs bg-[#FAF9F7]">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-bold text-[#5A5C60] hover:text-[#1A1C1E] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-bold text-[#1A1C1E] min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(10, q + 1))}
                      className="px-3 py-2 text-sm font-bold text-[#5A5C60] hover:text-[#1A1C1E] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 bg-[#1A1C1E] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs group"
                    id="preview-add-to-cart-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ${(289 * quantity).toFixed(2)}</span>
                  </button>
                </div>

                {isAddedToast && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {quantity} × Nova Studio Pro to your cart!</span>
                  </div>
                )}
              </div>

              {/* Badges / Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E5E3DC] text-[11px] text-[#5A5C60]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1A1C1E]" />
                  <span>2-Day Free Ship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#1A1C1E]" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#1A1C1E]" />
                  <span>2-Yr Warranty</span>
                </div>
              </div>

              {/* Product Tabs / Accordion */}
              <div className="pt-3 border-t border-[#E5E3DC]">
                <div className="flex border-b border-[#E5E3DC]">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 text-xs font-semibold px-2 border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-[#1A1C1E] text-[#1A1C1E]'
                        : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
                    }`}
                  >
                    Key Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 text-xs font-semibold px-2 border-b-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'border-[#1A1C1E] text-[#1A1C1E]'
                        : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
                    }`}
                  >
                    Tech Details
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 text-xs font-semibold px-2 border-b-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-[#1A1C1E] text-[#1A1C1E]'
                        : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
                    }`}
                  >
                    In The Box
                  </button>
                </div>

                <div className="pt-2 text-xs text-[#5A5C60] leading-relaxed">
                  {activeTab === 'overview' && (
                    <ul className="space-y-1">
                      <li>• 40mm Beryllium dynamic transducers (5Hz - 40kHz)</li>
                      <li>• Dual-feedforward ANC with transparency passthrough</li>
                      <li>• Bluetooth 5.3 with multipoint device switching</li>
                    </ul>
                  )}
                  {activeTab === 'specs' && (
                    <ul className="space-y-1">
                      <li>• Battery: 45 hrs (ANC on), USB-C quick charge (15m = 6 hrs)</li>
                      <li>• Weight: 268g with memory-foam ear cushions</li>
                      <li>• Codecs: LDAC, aptX Adaptive, AAC, SBC</li>
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <ul className="space-y-1">
                      <li>• Nova Studio Pro Headphones</li>
                      <li>• Magnetic Hardshell Travel Case</li>
                      <li>• 3.5mm braided aux cable & 1.2m USB-C charge cable</li>
                    </ul>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
