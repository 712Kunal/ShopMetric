import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Store,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Zap,
  ChevronDown,
} from 'lucide-react';

const Particle = ({ x, y, size, delay, duration }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={12} className="text-chart-3 fill-chart-3" />
    ))}
  </div>
);

const FadeIn = ({ children, delay = 0, y = 30, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, accent, delay }) => (
  <FadeIn delay={delay}>
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="rounded-2xl border border-border bg-card p-6 h-full
                 hover:border-ring transition-colors duration-300 group"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: accent + '22', border: `1px solid ${accent}33` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <h3 className="text-foreground font-semibold text-base mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </motion.div>
  </FadeIn>
);

const TestimonialCard = ({ name, role, text, rating, delay }) => (
  <FadeIn delay={delay}>
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
      <Stars count={rating} />
      <p className="text-muted-foreground text-sm leading-relaxed italic">
        "{text}"
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25
                        flex items-center justify-center text-primary text-xs font-bold"
        >
          {name[0]}
        </div>
        <div>
          <p className="text-foreground text-sm font-medium">{name}</p>
          <p className="text-muted-foreground text-xs">{role}</p>
        </div>
      </div>
    </div>
  </FadeIn>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                  ${scrolled ? 'border-b border-border bg-background/80 backdrop-blur-xl' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Store size={15} className="text-primary-foreground" />
          </div>
          <span className="text-foreground font-bold text-lg tracking-tight">
            ShopMetric
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Testimonials'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors px-3 py-1.5"
          >
            Sign in
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/register')}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground
                       text-sm font-medium shadow-lg hover:opacity-90 transition-opacity"
          >
            Get started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: i * 0.3,
    duration: Math.random() * 4 + 4,
  }));

  const features = [
    {
      icon: Star,
      title: 'Honest Ratings',
      accent: 'var(--chart-3)',
      delay: 0,
      desc: 'Submit ratings from 1 to 5 for any store. Modify anytime. Your voice, your experience.',
    },
    {
      icon: Store,
      title: 'Discover Stores',
      accent: 'var(--primary)',
      delay: 0.1,
      desc: 'Browse all registered stores in one place. Filter by name, address, or overall rating.',
    },
    {
      icon: TrendingUp,
      title: 'Owner Insights',
      accent: 'var(--accent)',
      delay: 0.2,
      desc: 'Store owners get a live dashboard showing who rated them and their average score.',
    },
    {
      icon: ShieldCheck,
      title: 'Role-Based Access',
      accent: 'var(--chart-2)',
      delay: 0.3,
      desc: 'Three roles — Admin, User, Store Owner — each with a tailored, secure experience.',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      accent: 'var(--chart-1)',
      delay: 0.4,
      desc: "Ratings update instantly. Owners see new reviews the moment they're submitted.",
    },
    {
      icon: MapPin,
      title: 'Location Aware',
      accent: 'var(--chart-4)',
      delay: 0.5,
      desc: 'Search stores by address. Find businesses near you with ease.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Regular Shopper',
      rating: 5,
      delay: 0,
      text: 'Finally a platform where my ratings actually matter. I love seeing my feedback reflected in store scores.',
    },
    {
      name: 'Rahul Mehta',
      role: 'Store Owner',
      rating: 5,
      delay: 0.15,
      text: 'The owner dashboard is incredibly useful. I can see exactly who rated my store and improve accordingly.',
    },
    {
      name: 'Anjali Verma',
      role: 'Platform Admin',
      rating: 5,
      delay: 0.3,
      text: 'Managing users and stores is seamless. The filtering and sorting tools save me hours every week.',
    },
  ];

  const stats = [
    { value: 10000, suffix: '+', label: 'Registered Users' },
    { value: 2500, suffix: '+', label: 'Verified Stores' },
    { value: 98000, suffix: '+', label: 'Ratings Submitted' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create your account',
      desc: 'Sign up in seconds with your name, email, and address.',
    },
    {
      num: '02',
      title: 'Browse stores',
      desc: 'Explore all registered stores on the platform.',
    },
    {
      num: '03',
      title: 'Rate your experience',
      desc: 'Submit a rating from 1–5 and help others decide.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                          rounded-full blur-[120px] opacity-20 bg-primary"
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px]
                          rounded-full blur-[100px] opacity-10 bg-accent"
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border
                       bg-card text-muted-foreground text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now live — rate any store on the platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]"
          >
            Rate stores.{' '}
            <span className="relative">
              <span className="text-primary">Share</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: 'left' }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary/50 rounded-full block"
              />
            </span>{' '}
            your truth.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ShopMetric lets you discover, rate, and review local stores. Owners
            get real insights. Shoppers get honest data.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--primary)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary
                         text-primary-foreground font-semibold text-sm shadow-xl
                         hover:opacity-90 transition-opacity"
            >
              Start rating stores <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border
                         bg-card text-foreground font-medium text-sm hover:bg-secondary
                         transition-colors"
            >
              Sign in to your account
            </motion.button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground text-xs">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown size={16} className="text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map(({ value, suffix, label }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <p className="text-4xl font-bold text-foreground mb-1">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">
            Everything you need
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for every role
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Whether you're a shopper, a store owner, or managing the platform —
            ShopMetric has you covered.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-28 bg-card border-y border-border"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">
              Simple process
            </p>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Get started in three simple steps and start contributing to your
              community.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-border" />

            {steps.map(({ num, title, desc }, i) => (
              <FadeIn key={num} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/25
                               flex items-center justify-center mb-5 relative z-10"
                  >
                    <span className="text-primary font-bold text-lg">
                      {num}
                    </span>
                  </motion.div>
                  <h3 className="text-foreground font-semibold mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">
            What people say
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Loved by users
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            From shoppers to store owners to admins — see what the community
            thinks.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 px-6">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="max-w-4xl mx-auto rounded-3xl border border-border bg-card
                       p-14 text-center relative overflow-hidden"
          >
            {/* Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
            />
            <div className="relative z-10">
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-4">
                Ready to start?
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Your ratings shape
                <br />
                the community.
              </h2>
              <p className="text-muted-foreground text-base mb-10 max-w-lg mx-auto">
                Join ShopMetric today. Rate stores, help others, and make your
                experience count.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: '0 0 40px var(--primary)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/register')}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary
                             text-primary-foreground font-semibold text-sm shadow-xl"
                >
                  Create free account <ArrowRight size={15} />
                </motion.button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3.5 rounded-xl border border-border text-foreground
                             font-medium text-sm hover:bg-secondary transition-colors"
                >
                  Sign in instead
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-card">
        <div
          className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row
                        items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Store size={11} className="text-primary-foreground" />
            </div>
            <span className="text-foreground font-semibold text-sm">
              ShopMetric
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} ShopMetric. Built for the community.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
