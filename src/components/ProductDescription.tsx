interface ProductDescriptionItem {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

interface ProductDescriptionProps {
  title: string;
  items: ProductDescriptionItem[];
  features?: Array<{ icon: string; label: string; text: string }>;
}

export default function ProductDescription({
  title,
  items,
  features,
}: ProductDescriptionProps) {
  return (
    <div className="space-y-8">
      {/* What's Included Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
        <h3 className="text-2xl font-black text-[#303854] mb-8 text-center">{title}</h3>

        <div className="flex flex-row gap-4 md:gap-8 justify-center">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center flex-1">
              <div className={`w-20 h-20 md:w-24 md:h-24 ${item.bgColor} rounded-2xl flex items-center justify-center text-4xl md:text-5xl mb-3 md:mb-4 shadow-md`}>
                {item.icon}
              </div>
              <h4 className="font-black text-[#303854] text-xs md:text-sm mb-1 md:mb-2">{item.title}</h4>
              <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      {features && features.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center text-center bg-gradient-to-b from-green-50 to-green-50/40 border border-green-200 rounded-xl px-3 md:px-4 py-3 md:py-4 hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-2xl md:text-3xl mb-2">{feature.icon}</span>
              <h4 className="font-black text-green-900 text-xs md:text-sm mb-1">{feature.label}</h4>
              <p className="text-[10px] md:text-xs text-green-700">{feature.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
