import React from 'react';
import { 
  ShoppingBag, 
  Table, 
  Activity, 
  CreditCard, 
  Star, 
  Check, 
  ExternalLink,
  Code2,
  Sparkles,
  Sliders,
  CheckCircle2,
  Search,
  Filter,
  BarChart2
} from 'lucide-react';

interface ProjectMockupCanvasProps {
  type: 'ecommerce' | 'datagrid' | 'telemetry' | 'checkout';
  name: string;
}

export const ProjectMockupCanvas: React.FC<ProjectMockupCanvasProps> = ({ type, name }) => {
  if (type === 'ecommerce') {
    return (
      <div className="w-full h-48 bg-[#F4F3EF] border-b border-[#E2E2DE] p-4 flex flex-col justify-between select-none relative overflow-hidden group-hover:bg-[#EFECE6] transition-colors">
        {/* Mock Browser Header */}
        <div className="flex items-center justify-between border-b border-[#D5D3CB] pb-2 text-[10px] font-mono text-[#5A5C60]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="ml-1 text-[9px] text-[#8A8A85]">store.novalabs.io/products/aurora</span>
          </div>
          <span className="px-1.5 py-0.5 bg-white rounded-2xs text-[9px] font-bold text-[#1A1C1E] border border-[#D5D3CB]">
            Responsive PDP
          </span>
        </div>

        {/* Product Visual Mockup */}
        <div className="grid grid-cols-12 gap-3 items-center py-2">
          {/* Product Thumbnail Gallery */}
          <div className="col-span-5 bg-white border border-[#D5D3CB] rounded-xs p-2.5 flex flex-col items-center justify-center shadow-2xs">
            <div className="w-12 h-12 rounded-xs bg-[#EEF0FF] border border-[#C5CAFF] flex items-center justify-center text-[#3E51FF] mb-1.5">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1C1E] border border-white"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E51FF] border border-white"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white"></span>
            </div>
          </div>

          {/* Product Spec Details */}
          <div className="col-span-7 space-y-1.5 text-left">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-[#1A1C1E]">Aurora Studio Headset</span>
              <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1 rounded-2xs font-mono font-bold">In Stock</span>
            </div>
            <div className="text-[11px] font-bold font-mono text-[#1A1C1E]">$249.00</div>
            
            {/* Swatch Picker Mock */}
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-[#5A5C60] font-mono">Color:</span>
              <span className="text-[9px] font-bold text-[#1A1C1E]">Cosmic Black</span>
            </div>

            {/* Micro CTA */}
            <div className="h-6 bg-[#1A1C1E] text-white text-[10px] font-bold rounded-xs flex items-center justify-center gap-1">
              <span>Add to Bag</span>
              <span className="text-[9px] opacity-75">• Free Shipping</span>
            </div>
          </div>
        </div>

        {/* Footer info pill */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#5A5C60]">
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>WCAG 2.1 AA Compliant</span>
          </span>
          <span className="text-[#8A8A85]">React 18 + Tailwind</span>
        </div>
      </div>
    );
  }

  if (type === 'datagrid') {
    return (
      <div className="w-full h-48 bg-[#F4F3EF] border-b border-[#E2E2DE] p-4 flex flex-col justify-between select-none relative overflow-hidden group-hover:bg-[#EFECE6] transition-colors">
        {/* Mock Browser Header */}
        <div className="flex items-center justify-between border-b border-[#D5D3CB] pb-2 text-[10px] font-mono text-[#5A5C60]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="ml-1 text-[9px] text-[#8A8A85]">admin.novalabs.io/inventory</span>
          </div>
          <span className="px-1.5 py-0.5 bg-white rounded-2xs text-[9px] font-bold text-emerald-800 border border-[#D5D3CB]">
            500+ SKUs Sorted
          </span>
        </div>

        {/* Data Grid Mockup */}
        <div className="bg-white border border-[#D5D3CB] rounded-xs p-2 shadow-2xs space-y-1.5">
          {/* Table Search Header */}
          <div className="flex items-center justify-between text-[9px] font-mono border-b border-[#F2F1EE] pb-1">
            <div className="flex items-center gap-1 text-[#5A5C60]">
              <Search className="w-2.5 h-2.5" />
              <span>Query: "wireless" (sub-16ms)</span>
            </div>
            <span className="text-emerald-700 font-bold">14 Results</span>
          </div>

          {/* Mini Data Rows */}
          <div className="space-y-1 text-[9px] font-mono">
            <div className="flex items-center justify-between bg-[#FAF9F7] p-1 rounded-2xs border border-[#E2E2DE]">
              <span className="font-bold text-[#1A1C1E]">SKU-9021 • Aurora Pro</span>
              <span className="text-[#5A5C60]">Qty: 142</span>
              <span className="px-1 bg-emerald-100 text-emerald-900 rounded-2xs text-[8px] font-bold">Active</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded-2xs">
              <span className="font-bold text-[#1A1C1E]">SKU-8812 • Apex Mechanical</span>
              <span className="text-[#5A5C60]">Qty: 18</span>
              <span className="px-1 bg-amber-100 text-amber-900 rounded-2xs text-[8px] font-bold">Low Stock</span>
            </div>
          </div>
        </div>

        {/* Footer info pill */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#5A5C60]">
          <span className="flex items-center gap-1 text-[#1A1C1E] font-bold">
            <Table className="w-2.5 h-2.5 text-emerald-700" />
            <span>Debounce Search & Sort</span>
          </span>
          <span className="text-[#8A8A85]">TypeScript Data Table</span>
        </div>
      </div>
    );
  }

  if (type === 'telemetry') {
    return (
      <div className="w-full h-48 bg-[#1A1C1E] text-white border-b border-[#3A3C40] p-4 flex flex-col justify-between select-none relative overflow-hidden">
        {/* Mock Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#333] pb-2 text-[10px] font-mono text-[#8E9094]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[9px] text-[#CCC]">cloudscale.edge/v1/telemetry</span>
          </div>
          <span className="px-1.5 py-0.5 bg-[#2A2C30] rounded-2xs text-[9px] font-bold text-emerald-400 border border-[#444]">
            HTTP 200 OK
          </span>
        </div>

        {/* Telemetry Visual Readings */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="bg-[#24262A] p-2 rounded-xs border border-[#333]">
            <div className="text-[8px] font-mono text-[#888] uppercase">Latency</div>
            <div className="text-sm font-bold font-mono text-emerald-400">14.2ms</div>
          </div>
          <div className="bg-[#24262A] p-2 rounded-xs border border-[#333]">
            <div className="text-[8px] font-mono text-[#888] uppercase">Backoff</div>
            <div className="text-sm font-bold font-mono text-[#8898FF]">Jitter 0.4s</div>
          </div>
          <div className="bg-[#24262A] p-2 rounded-xs border border-[#333]">
            <div className="text-[8px] font-mono text-[#888] uppercase">Cache Hit</div>
            <div className="text-sm font-bold font-mono text-amber-400">99.4%</div>
          </div>
        </div>

        {/* Footer info pill */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#8E9094]">
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-2.5 h-2.5" />
            <span>Exponential Backoff Retries</span>
          </span>
          <span className="text-[#888]">REST Async/Await</span>
        </div>
      </div>
    );
  }

  // Checkout type fallback
  return (
    <div className="w-full h-48 bg-[#F4F3EF] border-b border-[#E2E2DE] p-4 flex flex-col justify-between select-none relative overflow-hidden group-hover:bg-[#EFECE6] transition-colors">
      {/* Mock Header */}
      <div className="flex items-center justify-between border-b border-[#D5D3CB] pb-2 text-[10px] font-mono text-[#5A5C60]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="ml-1 text-[9px] text-[#8A8A85]">fintech.global/checkout-engine</span>
        </div>
        <span className="px-1.5 py-0.5 bg-white rounded-2xs text-[9px] font-bold text-amber-900 border border-[#D5D3CB]">
          24/24 Unit Tests Passed
        </span>
      </div>

      {/* Checkout Logic Visual */}
      <div className="bg-white border border-[#D5D3CB] rounded-xs p-2 shadow-2xs space-y-1 text-[9px] font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[#5A5C60]">Subtotal:</span>
          <span className="font-bold text-[#1A1C1E]">$420.00</span>
        </div>
        <div className="flex items-center justify-between text-emerald-700">
          <span>Tiered Discount (SUMMER20):</span>
          <span className="font-bold">-$84.00</span>
        </div>
        <div className="flex items-center justify-between border-t border-[#F2F1EE] pt-1 text-[10px]">
          <span className="font-bold text-[#1A1C1E]">Calculated Total:</span>
          <span className="font-extrabold text-[#1A1C1E]">$336.00</span>
        </div>
      </div>

      {/* Footer info pill */}
      <div className="flex items-center justify-between text-[9px] font-mono text-[#5A5C60]">
        <span className="flex items-center gap-1 text-[#1A1C1E] font-bold">
          <CreditCard className="w-2.5 h-2.5 text-amber-700" />
          <span>Deterministic Currency Arithmetic</span>
        </span>
        <span className="text-[#8A8A85]">Jest Test Suite</span>
      </div>
    </div>
  );
};
