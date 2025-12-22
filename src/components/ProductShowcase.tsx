import productBox from "@/assets/product-box.jpg";
import { Check } from "lucide-react";

const benefits = [
  "يزيل الرؤوس السوداء بفعالية",
  "ينظف المسام بعمق",
  "يحسن ملمس البشرة",
  "سهل الحمل والسفر",
  "مناسب لجميع أنواع البشرة",
  "نتائج مرئية من أول استخدام"
];

const ProductShowcase = () => {
  return (
    <section className="py-20 lg:py-32 gradient-hero relative overflow-hidden" dir="rtl">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative flex justify-center">
            <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl" />
            <img
              src={productBox}
              alt="Kemei KM-1871 علبة المنتج"
              className="relative z-10 w-full max-w-md rounded-3xl shadow-medium hover:shadow-glow transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                المنتج الأصلي
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground">
                جودة عالية وضمان
                <br />
                <span className="text-gradient">نتائج مضمونة</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                احصل على بشرة نقية وصافية مع جهاز Kemei KM-1871 الأصلي
              </p>
            </div>

            {/* Benefits list */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft"
                >
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price tag */}
            <div className="bg-card rounded-2xl p-6 shadow-medium border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">السعر الأصلي: <span className="line-through">250 د</span></p>
                  <p className="text-3xl font-black text-gradient">199 د</p>
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold">
                  وفر 51 د
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
