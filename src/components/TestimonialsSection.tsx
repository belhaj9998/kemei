import { Star } from "lucide-react";

const testimonials = [
  {
    name: "لجين عبد السلام",
    city: "طرابلس",
    rating: 5,
    comment: "بأمانة منتج كويس سهل الأستخدام وشحنه يعطل ننصح بيه 👍🏻",
  },
  {
    name: "ميار خليفة",
    city: "طرابلس",
    rating: 5,
    comment: "يهبللللل🩷",
  },
  {
    name: "رهف",
    city: "بنغازي",
    rating: 5,
    comment: "يابنات جهاز يجنن يخلي بشرة قلوي للإمانة ماتوقعتش هكي بارك الله فيكم 💖🥹",
  },
  {
    name: "أسيل محمد",
    city: "البيضاء",
    rating: 5,
    comment: "استعملته اسبوعين ونتيجة روعة ❤️",
  },
  {
    name: "رندة علي",
    city: "طرابلس",
    rating: 5,
    comment: "وصلني جهاز نفس مواصفات شكرا 🥰",
  },
  {
    name: "هدى سعد",
    city: "طرابلس",
    rating: 5,
    comment: "وصلني جهاز وتوصيل سريع شكرا للمصداقية 🤍💟",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-rose-50/50 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            آراء عملائنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            تجارب حقيقية من عملائنا الكرام الذين جربوا المنتج
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-rose-100 hover:shadow-elegant transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft border border-rose-100">
            <p className="text-3xl md:text-4xl font-black text-gradient mb-2">+500</p>
            <p className="text-muted-foreground">عميل سعيد</p>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft border border-rose-100">
            <p className="text-3xl md:text-4xl font-black text-gradient mb-2">4.9</p>
            <p className="text-muted-foreground">تقييم المنتج</p>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft border border-rose-100">
            <p className="text-3xl md:text-4xl font-black text-gradient mb-2">98%</p>
            <p className="text-muted-foreground">نسبة الرضا</p>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft border border-rose-100">
            <p className="text-3xl md:text-4xl font-black text-gradient mb-2">24h</p>
            <p className="text-muted-foreground">توصيل سريع</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
