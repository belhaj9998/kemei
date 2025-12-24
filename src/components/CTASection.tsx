import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-foreground relative overflow-hidden" dir="rtl">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(340_75%_55%/0.15),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(330_80%_50%/0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              عرض محدود
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-5xl font-black text-primary-foreground leading-tight">
            احصل على بشرة نقية
            <br />
            <span className="text-primary">اليوم!</span>
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            اطلب جهاز Kemei KM-1871 الآن واستمتع ببشرة صافية ونقية من الرؤوس السوداء
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="cta"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => {
                const element = document.getElementById('order-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ShoppingCart className="w-6 h-6" />
              اطلب الآن
            </Button>
            <a
              href="https://wa.me/218920713379"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل معنا
              </Button>
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>الدعم متاح 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>شحن سريع</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
