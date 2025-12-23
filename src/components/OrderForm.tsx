import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, User, Phone, MapPin } from "lucide-react";

const OrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Only allow digits, max 10 characters, must start with 09
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else if (name === 'city') {
      // Only allow Arabic/English letters and spaces
      const lettersOnly = value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    <section id="order-form" className="py-20 bg-gradient-to-b from-rose-50 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              اطلب الآن
            </h2>
            <p className="text-muted-foreground text-lg">
              املأ البيانات التالية وسنتواصل معك لتأكيد الطلب
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-rose-100">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-500" />
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 text-right bg-background/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 rounded-xl"
                  dir="rtl"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-500" />
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="09XXXXXXXX"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 text-right bg-background/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 rounded-xl"
                  dir="rtl"
                />
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  المدينة
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="أدخل اسم مدينتك"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-12 text-right bg-background/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 rounded-xl"
                  dir="rtl"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="cta"
                size="xl"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    جاري الإرسال...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    إرسال الطلب
                  </span>
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            🔒 بياناتك آمنة ولن يتم مشاركتها مع أي طرف ثالث
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
