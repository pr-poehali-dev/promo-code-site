import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Все", icon: "LayoutGrid" },
  { id: "food", label: "Еда и доставка", icon: "UtensilsCrossed" },
  { id: "fashion", label: "Одежда", icon: "ShoppingBag" },
  { id: "tech", label: "Электроника", icon: "Smartphone" },
  { id: "travel", label: "Путешествия", icon: "Plane" },
  { id: "beauty", label: "Красота", icon: "Sparkles" },
  { id: "sport", label: "Спорт", icon: "Dumbbell" },
];

const PROMOS = [
  {
    id: 1,
    category: "food",
    brand: "Яндекс Еда",
    logo: "🍕",
    title: "Скидка 30% на первый заказ",
    code: "YAEДА30",
    discount: "30%",
    expires: "31 мая 2026",
    rating: 4.7,
    ratingCount: 248,
    description: "Скидка действует на первый заказ от 500 ₽ для новых пользователей.",
    comments: [
      { id: 1, author: "Марина К.", text: "Сработал! Заказала пиццу с хорошей скидкой 🎉", date: "12 мая", rating: 5 },
      { id: 2, author: "Алексей Т.", text: "Применил вчера, всё отлично работает", date: "10 мая", rating: 5 },
    ],
  },
  {
    id: 2,
    category: "tech",
    brand: "DNS",
    logo: "💻",
    title: "−5 000 ₽ на ноутбуки",
    code: "DNS5000",
    discount: "5 000 ₽",
    expires: "20 мая 2026",
    rating: 4.2,
    ratingCount: 134,
    description: "Скидка на все ноутбуки стоимостью от 40 000 ₽. Применяется при оплате онлайн.",
    comments: [
      { id: 1, author: "Дмитрий В.", text: "Взял Lenovo, скидка применилась без проблем", date: "11 мая", rating: 4 },
    ],
  },
  {
    id: 3,
    category: "fashion",
    brand: "Wildberries",
    logo: "👗",
    title: "Скидка 20% на всё",
    code: "WB20MAY",
    discount: "20%",
    expires: "25 мая 2026",
    rating: 3.9,
    ratingCount: 512,
    description: "Скидка 20% на весь ассортимент без ограничений по сумме заказа.",
    comments: [
      { id: 1, author: "Ольга М.", text: "Не получилось применить на бренд H&M", date: "13 мая", rating: 3 },
      { id: 2, author: "Светлана Р.", text: "На обычные товары работает отлично!", date: "12 мая", rating: 5 },
    ],
  },
  {
    id: 4,
    category: "travel",
    brand: "Aviasales",
    logo: "✈️",
    title: "Кэшбэк 1 500 ₽ на авиабилеты",
    code: "FLY1500",
    discount: "1 500 ₽",
    expires: "15 июня 2026",
    rating: 4.5,
    ratingCount: 89,
    description: "Кэшбэк зачисляется в течение 5 дней после покупки билета от 5 000 ₽.",
    comments: [],
  },
  {
    id: 5,
    category: "beauty",
    brand: "Л'Этуаль",
    logo: "💄",
    title: "−15% на парфюмерию",
    code: "LETUAL15",
    discount: "15%",
    expires: "30 мая 2026",
    rating: 4.8,
    ratingCount: 203,
    description: "Скидка распространяется на всю парфюмерию, включая новинки сезона.",
    comments: [
      { id: 1, author: "Анна Б.", text: "Взяла Chanel No. 5 со скидкой! Спасибо!", date: "13 мая", rating: 5 },
    ],
  },
  {
    id: 6,
    category: "sport",
    brand: "Спортмастер",
    logo: "🏋️",
    title: "Скидка 25% на кроссовки",
    code: "SPORT25",
    discount: "25%",
    expires: "5 июня 2026",
    rating: 4.3,
    ratingCount: 176,
    description: "Скидка на весь ассортимент кроссовок и спортивной обуви.",
    comments: [
      { id: 1, author: "Игорь Н.", text: "Nike купил с хорошей скидкой. Код работает!", date: "9 мая", rating: 5 },
    ],
  },
];

function StarRating({ value, onRate }: { value: number; onRate?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`transition-all text-lg leading-none ${
            star <= (hovered || value) ? "text-orange-400" : "text-gray-200"
          } ${onRate ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
          onClick={() => onRate && onRate(star)}
          disabled={!onRate}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function PromoCard({ promo }: { promo: typeof PROMOS[0] }) {
  const [copied, setCopied] = useState(false);
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(promo.comments);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(promo.rating);
  const [ratingCount, setRatingCount] = useState(promo.ratingCount);

  const copyCode = () => {
    setCodeRevealed(true);
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: "Вы",
      text: newComment,
      date: "сейчас",
      rating: newRating || 5,
    };
    setComments([comment, ...comments]);
    setNewComment("");
    setNewRating(0);
  };

  const ratePromo = (v: number) => {
    if (userRating) return;
    const newTotal = currentRating * ratingCount + v;
    const newCount = ratingCount + 1;
    setCurrentRating(Math.round((newTotal / newCount) * 10) / 10);
    setRatingCount(newCount);
    setUserRating(v);
  };

  return (
    <div className="bg-white rounded-2xl border border-border card-hover animate-fade-in overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl w-12 h-12 flex items-center justify-center bg-secondary rounded-xl shrink-0">
              {promo.logo}
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                {promo.brand}
              </div>
              <h3 className="font-semibold text-foreground leading-tight">{promo.title}</h3>
            </div>
          </div>
          <span className="shrink-0 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
            −{promo.discount}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="relative flex-1 bg-secondary rounded-xl px-4 py-3 promo-code font-semibold text-sm tracking-widest cursor-pointer border-2 border-dashed border-border hover:border-primary transition-colors overflow-hidden"
            onClick={copyCode}
          >
            <span className={`transition-all duration-300 ${codeRevealed ? "text-foreground" : "opacity-0 select-none"}`}>
              {promo.code}
            </span>
            {!codeRevealed && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                <Icon name="Eye" size={15} />
                Показать код
              </div>
            )}
          </div>
          <button
            onClick={copyCode}
            className={`shrink-0 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
              copied
                ? "bg-green-100 text-green-700"
                    : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
            }`}
          >
            {copied ? "Скопировано!" : "Скопировать"}
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(currentRating)} onRate={!userRating ? ratePromo : undefined} />
            <span className="text-sm font-semibold text-foreground">{currentRating}</span>
            <span className="text-xs text-muted-foreground">({ratingCount})</span>
            {userRating > 0 && (
              <span className="text-xs text-green-600 font-medium">Оценили!</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Calendar" size={13} />
            до {promo.expires}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Icon name="MessageCircle" size={15} />
            {comments.length > 0 ? `${comments.length} комментари${comments.length === 1 ? "й" : "я"}` : "Оставить комментарий"}
          </span>
          <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={15} />
        </button>

        {expanded && (
          <div className="px-5 pb-5 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{promo.description}</p>

            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Поделитесь опытом использования..."
                className="w-full text-sm bg-secondary rounded-xl p-3 resize-none border border-transparent focus:border-primary focus:outline-none transition-colors min-h-[80px] placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Ваша оценка:</span>
                  <StarRating value={newRating} onRate={setNewRating} />
                </div>
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Отправить
                </button>
              </div>
            </div>

            {comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="bg-secondary rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                      <span className="text-sm font-medium text-foreground">{c.author}</span>
                      <div className="flex items-center gap-2">
                        <StarRating value={c.rating} />
                        <span className="text-xs text-muted-foreground">{c.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState<"promos" | "contacts">("promos");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const filtered = activeCategory === "all"
    ? PROMOS
    : PROMOS.filter((p) => p.category === activeCategory);

  const submitContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Ticket" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">PromoHub</span>
          </div>
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveSection("promos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === "promos"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Промокоды
            </button>
            <button
              onClick={() => setActiveSection("contacts")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === "contacts"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Контакты
            </button>
          </nav>
        </div>
      </header>

      {activeSection === "promos" && (
        <>
          {/* Hero */}
          <section className="max-w-5xl mx-auto px-4 pt-12 pb-8">
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Icon name="Zap" size={14} />
                {PROMOS.length} актуальных промокодов
              </div>
              <h1 className="text-4xl font-black text-foreground mb-3 tracking-tight leading-tight">
                Лучшие промокоды<br />
                <span className="text-primary">с оценками покупателей</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Реальные скидки, проверенные сообществом. Копируй — и экономь прямо сейчас.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-white text-muted-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon name={cat.icon} size={15} />
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Promos Grid + Sidebar */}
          <section className="max-w-5xl mx-auto px-4 pb-16">
            <div className="flex gap-6 items-start">
              {/* Main grid */}
              <div className="flex-1 min-w-0">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((promo, i) => (
                      <>
                        <PromoCard key={promo.id} promo={promo} />
                        {i === 1 && (
                          <div key="ad-inline" className="md:col-span-2 rounded-2xl border-2 border-dashed border-border bg-white flex items-center justify-center py-6 px-6 gap-4 group cursor-pointer hover:border-primary transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                              <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Рекламное место</div>
                              <div className="font-semibold text-foreground text-sm">Ваш баннер здесь · 728×90</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Свяжитесь с нами для размещения рекламы</div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="font-medium">В этой категории пока нет промокодов</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0 sticky top-24">
                <div className="rounded-2xl border-2 border-dashed border-border bg-white p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-primary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Реклама</div>
                    <div className="font-semibold text-foreground text-sm mb-1">Ваш баннер</div>
                    <div className="text-xs text-muted-foreground">240×400 · Свяжитесь с нами</div>
                  </div>
                  <div className="w-full h-32 rounded-xl bg-secondary/60 flex items-center justify-center text-muted-foreground text-xs">
                    240 × 400
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-border bg-white p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-primary transition-colors group">
                  <div className="w-full h-20 rounded-xl bg-secondary/60 flex items-center justify-center text-muted-foreground text-xs">
                    240 × 200
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Реклама</div>
                    <div className="font-semibold text-foreground text-sm mb-1">Ваш баннер</div>
                    <div className="text-xs text-muted-foreground">240×200 · Свяжитесь с нами</div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </>
      )}

      {activeSection === "contacts" && (
        <section className="max-w-2xl mx-auto px-4 pt-12 pb-16 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-foreground mb-3 tracking-tight">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">Знаете крутой промокод? Нашли ошибку? Напишите нам!</p>
          </div>

          {contactSent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-scale-in">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Сообщение отправлено!</h3>
              <p className="text-muted-foreground text-sm">Мы ответим вам в течение 24 часов.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
                  <input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="ivan@mail.ru"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Сообщение</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Расскажите о промокоде или задайте вопрос..."
                  rows={5}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={submitContact}
                disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Отправить сообщение
              </button>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                <div className="text-sm font-medium text-foreground">hello@promohub.ru</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Telegram</div>
                <div className="text-sm font-medium text-foreground">@promohub_ru</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Banner Ad */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="rounded-2xl border-2 border-dashed border-border bg-white flex items-center justify-center py-7 px-6 gap-4 cursor-pointer hover:border-primary transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Рекламное место</div>
            <div className="font-semibold text-foreground text-sm">Ваш баннер здесь · 970×90</div>
            <div className="text-xs text-muted-foreground mt-0.5">Свяжитесь с нами для размещения рекламы</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Ticket" size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">PromoHub</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 PromoHub. Все промокоды проверены сообществом.</p>
        </div>
      </footer>
    </div>
  );
}