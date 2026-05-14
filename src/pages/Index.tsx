import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Все сайты", icon: "LayoutGrid" },
  { id: "top", label: "Топ сайты", icon: "Crown" },
  { id: "free", label: "Бесплатные кейсы", icon: "Gift" },
  { id: "bonus", label: "Бонус при регистрации", icon: "Zap" },
  { id: "cashback", label: "Кэшбэк", icon: "RefreshCw" },
  { id: "new", label: "Новые сайты", icon: "Sparkles" },
];

const PROMOS = [
  {
    id: 1,
    category: "top",
    brand: "DatDrop",
    logo: "🎯",
    title: "+5% к балансу при пополнении",
    code: "DATDROP5",
    discount: "+5%",
    expires: "31 мая 2026",
    rating: 4.8,
    ratingCount: 1243,
    description: "Один из крупнейших сайтов открытия кейсов. Промокод даёт +5% к любому пополнению. Работает для новых и старых игроков.",
    badge: "🔥 Горячий",
    comments: [
      { id: 1, author: "k1to_fan", text: "Реально работает, закинул 500р получил 525. Топ сайт!", date: "13 мая", rating: 5 },
      { id: 2, author: "csgo_player88", text: "Использую уже 3 месяца, код рабочий", date: "11 мая", rating: 5 },
    ],
  },
  {
    id: 2,
    category: "free",
    brand: "Key-Drop",
    logo: "🗝️",
    title: "Бесплатный кейс при регистрации",
    code: "KEYDROP_FREE",
    discount: "Free Case",
    expires: "1 июня 2026",
    rating: 4.6,
    ratingCount: 892,
    description: "Введи промокод после регистрации и получи бесплатный кейс. Шанс выпадения скинов до 1000$.",
    badge: "🎁 Фрибет",
    comments: [
      { id: 1, author: "niko_cs2", text: "Получил кейс, выпала AWP Азимов — продал за 1200р!", date: "12 мая", rating: 5 },
    ],
  },
  {
    id: 3,
    category: "bonus",
    brand: "Farmskins",
    logo: "🌿",
    title: "+10% к первому пополнению",
    code: "FARM10",
    discount: "+10%",
    expires: "15 июня 2026",
    rating: 4.4,
    ratingCount: 567,
    description: "Сайт с огромным выбором кейсов. Промокод FARM10 даёт +10% к первому депозиту. Минимальный депозит — 50 рублей.",
    badge: null,
    comments: [
      { id: 1, author: "pro_trader_cs", text: "Сайт честный, вывод работает быстро", date: "10 мая", rating: 4 },
      { id: 2, author: "skins4life", text: "Код применился, бонус пришёл сразу", date: "9 мая", rating: 5 },
    ],
  },
  {
    id: 4,
    category: "top",
    brand: "Hellcase",
    logo: "💀",
    title: "3 бесплатных кейса + бонус",
    code: "HELLCASE3",
    discount: "3 кейса",
    expires: "20 мая 2026",
    rating: 4.7,
    ratingCount: 2104,
    description: "Hellcase — один из самых популярных сайтов с кейсами КС2. По промокоду — 3 бесплатных кейса и бонус на баланс.",
    badge: "⭐ Популярный",
    comments: [
      { id: 1, author: "m4a4_enjoyer", text: "Hellcase лучший! Выбил AK Вулкан с бесплатного кейса", date: "13 мая", rating: 5 },
    ],
  },
  {
    id: 5,
    category: "cashback",
    brand: "SkinsMonkey",
    logo: "🐵",
    title: "5% кэшбэк на все открытия",
    code: "MONKEY5CB",
    discount: "5% кэшбэк",
    expires: "30 июня 2026",
    rating: 4.3,
    ratingCount: 334,
    description: "SkinsMonkey начисляет 5% кэшбэк от суммы открытых кейсов. Кэшбэк автоматически зачисляется на баланс.",
    badge: null,
    comments: [
      { id: 1, author: "caseopener2026", text: "Кэшбэк реально приходит, уже вывел несколько раз", date: "8 мая", rating: 4 },
    ],
  },
  {
    id: 6,
    category: "new",
    brand: "CaseBattle",
    logo: "⚔️",
    title: "+15% к балансу + участие в батле",
    code: "BATTLE15",
    discount: "+15%",
    expires: "10 июня 2026",
    rating: 4.5,
    ratingCount: 211,
    description: "Новый сайт с режимом батлов. Промокод даёт +15% к пополнению и доступ к эксклюзивным батлам с призовым фондом.",
    badge: "🆕 Новинка",
    comments: [],
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
            star <= (hovered || value) ? "text-primary" : "text-muted"
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
    setComments([{ id: Date.now(), author: "Ты", text: newComment, date: "сейчас", rating: newRating || 5 }, ...comments]);
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
    <div className="bg-card rounded-2xl border border-border card-hover animate-fade-in overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl w-12 h-12 flex items-center justify-center bg-secondary rounded-xl shrink-0">
              {promo.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{promo.brand}</span>
                {promo.badge && <span className="text-xs font-medium text-primary">{promo.badge}</span>}
              </div>
              <h3 className="font-semibold text-foreground leading-tight">{promo.title}</h3>
            </div>
          </div>
          <span className="shrink-0 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
            {promo.discount}
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
                Показать промокод
              </div>
            )}
          </div>
          <button
            onClick={copyCode}
            className={`shrink-0 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
              copied
                ? "bg-primary/20 text-primary"
                : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
            }`}
          >
            {copied ? "Скопировано!" : "Копировать"}
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(currentRating)} onRate={!userRating ? ratePromo : undefined} />
            <span className="text-sm font-semibold text-foreground">{currentRating}</span>
            <span className="text-xs text-muted-foreground">({ratingCount})</span>
            {userRating > 0 && <span className="text-xs text-primary font-medium">Спасибо!</span>}
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
            {comments.length > 0 ? `${comments.length} отзыв${comments.length === 1 ? "" : "а"}` : "Оставить отзыв"}
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
                placeholder="Сработал ли промокод? Поделись опытом..."
                className="w-full text-sm bg-secondary rounded-xl p-3 resize-none border border-transparent focus:border-primary focus:outline-none transition-colors min-h-[80px] placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Оценка:</span>
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

  const filtered = activeCategory === "all" ? PROMOS : PROMOS.filter((p) => p.category === activeCategory);

  const submitContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <span className="font-black text-xl text-foreground tracking-tight">PromoLand</span>
              <span className="text-xs text-primary font-medium ml-2">CS2 / CSGO</span>
            </div>
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
              <div className="inline-flex items-center gap-2 bg-secondary text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Icon name="Zap" size={14} />
                {PROMOS.length} рабочих промокодов на сегодня
              </div>
              <h1 className="text-4xl font-black text-foreground mb-3 tracking-tight leading-tight">
                Промокоды для кейс-сайтов<br />
                <span className="text-primary">CS2 и CS:GO</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Бонусы, бесплатные кейсы и надбавки к балансу на лучших сайтах. Проверено игроками.
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-8 flex-wrap">
              {[
                { label: "Сайтов", value: "6+" },
                { label: "Отзывов", value: "5 000+" },
                { label: "Обновлено", value: "Сегодня" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
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
                      : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
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
              <div className="flex-1 min-w-0">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((promo, i) => (
                      <>
                        <PromoCard key={promo.id} promo={promo} />
                        {i === 1 && (
                          <div key="ad-inline" className="md:col-span-2 rounded-2xl border-2 border-dashed border-border bg-card flex items-center justify-center py-6 px-6 gap-4 group cursor-pointer hover:border-primary transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                              <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Рекламное место</div>
                              <div className="font-semibold text-foreground text-sm">Разместить промокод вашего сайта · 728×90</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Свяжитесь с нами для размещения</div>
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
                <div className="bg-card rounded-2xl border border-border p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="TrendingUp" size={13} />
                    Топ сайты
                  </div>
                  <div className="space-y-3">
                    {PROMOS.slice(0, 4).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                        <span className="text-lg">{p.logo}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{p.brand}</div>
                          <div className="text-xs text-primary font-medium">{p.discount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-border bg-card p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-primary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Реклама</div>
                    <div className="font-semibold text-foreground text-sm mb-1">Ваш сайт здесь</div>
                    <div className="text-xs text-muted-foreground">240×300 · Свяжитесь с нами</div>
                  </div>
                  <div className="w-full h-24 rounded-xl bg-secondary/60 flex items-center justify-center text-muted-foreground text-xs">
                    240 × 300
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
            <p className="text-muted-foreground">Хотите разместить промокод своего сайта? Нашли нерабочий код? Пишите!</p>
          </div>

          {contactSent ? (
            <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center animate-scale-in">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Сообщение отправлено!</h3>
              <p className="text-muted-foreground text-sm">Ответим в течение 24 часов.</p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ник или имя</label>
                  <input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="pro_gamer"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="email@mail.ru"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Сообщение</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Хочу разместить промокод сайта / промокод не работает..."
                  rows={5}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm border border-transparent focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={submitContact}
                disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Отправить
              </button>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                <div className="text-sm font-medium text-foreground">hello@promoland.gg</div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Telegram</div>
                <div className="text-sm font-medium text-foreground">@promoland_cs</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO Text Block */}
      {activeSection === "promos" && (
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-base font-bold text-foreground mb-2">Промокоды для CS2 кейс-сайтов 2026</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PromoLand собирает актуальные промокоды для сайтов открытия кейсов CS2 и CS:GO. Бонусы при регистрации, бесплатные кейсы, надбавки к балансу и кэшбэк — всё проверено реальными игроками. Копируй промокод одним кликом и получай максимальную выгоду на DatDrop, Hellcase, Key-Drop, Farmskins и других популярных платформах.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["промокод датдроп","промокод хеллкейс","промокод кейдроп","бесплатные кейсы cs2","бонус на кейс сайт","промокод фармскинс","промокод скинсманки","cs2 кейс промокод 2026"].map((kw) => (
                <span key={kw} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full">{kw}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Banner Ad */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="rounded-2xl border-2 border-dashed border-border bg-card flex items-center justify-center py-7 px-6 gap-4 cursor-pointer hover:border-primary transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <Icon name="Megaphone" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Рекламное место</div>
            <div className="font-semibold text-foreground text-sm">Разместите промокод вашего кейс-сайта · 970×90</div>
            <div className="text-xs text-muted-foreground mt-0.5">Свяжитесь с нами через раздел Контакты</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm">🎯</span>
            </div>
            <span className="text-sm font-black text-foreground">PromoLand</span>
            <span className="text-xs text-muted-foreground">CS2 / CSGO</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 PromoLand. Промокоды проверены сообществом игроков.</p>
        </div>
      </footer>
    </div>
  );
}
