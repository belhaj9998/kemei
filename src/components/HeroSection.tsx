import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import productImage from "@/assets/product-main.png";
import { Sparkles, Zap, Shield, Send, User, Phone, MapPin, Clock, Flame, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer state - 2 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate end time (2 days from component mount)
    const endTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/webhook/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          page_url: window.location.href,
          event_time: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "تم استلام طلبك بنجاح! ✓",
          description: "سنتواصل معك قريباً لتأكيد الطلب",
        });
        setFormData({ name: "", phone: "", city: "" });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-medium/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-fuchsia/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-right animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                جديد
              </span>
              <span className="text-sm font-medium text-foreground">
                6 في 1 - تقنية متطورة
              </span>
            </div>

            {/* Brand */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                Kemei®
              </h2>
              <h1 className="text-3xl lg:text-5xl font-black text-foreground leading-tight">
                جهاز تنظيف
                <br />
                <span className="text-gradient">الرؤوس السوداء</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 lg:mr-0">
              تقنية تنظيف المسام المتطورة - لا يؤذي البشرة، سهل الاستخدام
            </p>

            {/* Features mini */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">تنظيف عميق</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">شحن USB</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">آمن للبشرة</span>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-rose-100 space-y-4">
              {/* Price Section */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">السعر الأصلي</span>
                    <p className="text-2xl font-bold text-[#1C1C1C] line-through">250 د</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-primary font-semibold">بعد التخفيض</span>
                    <p className="text-3xl font-black text-primary">199 د</p>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-foreground/90 rounded-t-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span className="text-primary-foreground text-sm font-bold">ينتهي التخفيض خلال</span>
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  </div>
                  <div className="flex justify-center gap-3">
                    <div className="bg-primary rounded-lg px-3 py-2 min-w-[50px]">
                      <span className="text-xl font-black text-primary-foreground">{timeLeft.days}</span>
                      <p className="text-xs text-primary-foreground/80">يوم</p>
                    </div>
                    <div className="bg-primary rounded-lg px-3 py-2 min-w-[50px]">
                      <span className="text-xl font-black text-primary-foreground">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <p className="text-xs text-primary-foreground/80">ساعة</p>
                    </div>
                    <div className="bg-primary rounded-lg px-3 py-2 min-w-[50px]">
                      <span className="text-xl font-black text-primary-foreground">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <p className="text-xs text-primary-foreground/80">دقيقة</p>
                    </div>
                    <div className="bg-primary rounded-lg px-3 py-2 min-w-[50px]">
                      <span className="text-xl font-black text-primary-foreground">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <p className="text-xs text-primary-foreground/80">ثانية</p>
                    </div>
                  </div>
                </div>

                {/* Free Delivery Badge */}
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-b-xl py-2 px-4">
                  <Truck className="w-5 h-5" />
                  <span className="font-bold">التوصيل مجاني</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground text-center">اطلب الآن</h3>

              <div className="grid gap-4">
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                  <Input
                    name="name"
                    type="text"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11 pr-10 text-right bg-background/50 border-rose-200 focus:border-rose-400 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-11 pr-10 text-right bg-background/50 border-rose-200 focus:border-rose-400 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                  <Input
                    name="city"
                    type="text"
                    placeholder="المدينة"
                    value={formData.city}
                    onChange={handleChange}
                    className="h-11 pr-10 text-right bg-background/50 border-rose-200 focus:border-rose-400 rounded-xl"
                    dir="rtl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    إرسال الطلب
                  </span>
                )}
              </Button>
            </form>

            {/* Model */}
            <p className="text-sm text-muted-foreground">
              موديل: <span className="font-bold text-primary">KM-1871</span>
            </p>
          </div>

          {/* Product Image */}
          <div className="relative flex justify-center items-center min-h-[400px] lg:min-h-[600px]">
            {/* Glow effect */}
            <div className="absolute w-96 h-96 lg:w-[600px] lg:h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />

            {/* Product */}
            <img
              src={productImage}
              alt="Kemei KM-1871 جهاز تنظيف الرؤوس السوداء"
              className="relative z-10 w-80 sm:w-96 lg:w-[450px] xl:w-[500px] h-auto animate-float drop-shadow-2xl object-contain"
            />

            {/* Floating badges */}
            <div className="absolute top-5 right-0 lg:top-10 lg:right-5 bg-card shadow-medium rounded-2xl px-4 py-3 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <span className="text-2xl font-black text-gradient">6 في 1</span>
            </div>

            <div className="absolute bottom-10 left-0 lg:bottom-20 lg:left-5 bg-primary text-primary-foreground shadow-glow rounded-2xl px-4 py-3 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <span className="text-sm font-bold">شحن سريع USB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
