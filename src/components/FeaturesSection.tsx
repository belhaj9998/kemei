import { Sparkles, Battery, Droplets, Settings, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "تنظيف عميق",
    description: "يزيل الرؤوس السوداء والشوائب من أعماق المسام"
  },
  {
    icon: Battery,
    title: "شحن USB",
    description: "بطارية قابلة للشحن بكابل USB عملي وسريع"
  },
  {
    icon: Droplets,
    title: "تقنية الشفط",
    description: "قوة شفط متعددة المستويات لتناسب جميع أنواع البشرة"
  },
  {
    icon: Settings,
    title: "6 رؤوس",
    description: "ستة رؤوس مختلفة لجميع احتياجات العناية بالبشرة"
  },
  {
    icon: Zap,
    title: "سهل الاستخدام",
    description: "تصميم مريح وخفيف الوزن للاستخدام اليومي"
  },
  {
    icon: Heart,
    title: "آمن للبشرة",
    description: "لا يسبب أي أذى أو تهيج للبشرة الحساسة"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-card relative overflow-hidden" dir="rtl">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-light/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-light/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold">
            المميزات
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-foreground">
            لماذا <span className="text-gradient">Kemei KM-1871</span>؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            جهاز متكامل للعناية بالبشرة مع أحدث التقنيات
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
