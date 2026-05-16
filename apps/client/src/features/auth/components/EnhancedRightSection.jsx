import { useState, useEffect } from 'react';
import { Store, Star, Users, TrendingUp, ShieldCheck } from 'lucide-react';

const EnhancedRightSection = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const FEATURE_PREVIEWS = [
    {
      icon: <Store className="h-16 w-16 text-blue-400" />,
      title: 'Discover Trusted Stores',
      description:
        'Explore verified stores with detailed information, ratings, and customer reviews to make better decisions.',
      stats: '1000+ stores listed',
    },
    {
      icon: <Star className="h-16 w-16 text-[#6e3ef3]" />,
      title: 'Rate & Review Experiences',
      description:
        'Share your shopping experience by rating stores and helping others find the best services nearby.',
      stats: '50K+ ratings submitted',
    },
    {
      icon: <Users className="h-16 w-16 text-purple-400" />,
      title: 'Role-Based Platform',
      description:
        'Secure access for admins, store owners, and users with personalized dashboards and management tools.',
      stats: 'Multi-role access',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % FEATURE_PREVIEWS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative m-2 hidden overflow-hidden rounded-xl bg-muted bg-cover bg-center lg:block"
      style={{ backgroundImage: "url('src/assets/auth.jpg')" }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="flex h-full flex-col bg-gradient-to-br from-black/70 via-black/60 to-black/70 p-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute right-16 bottom-32 h-24 w-24 animate-pulse rounded-full bg-purple-500/10 blur-lg delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 h-16 w-16 animate-pulse rounded-full bg-green-500/10 blur-md delay-2000"></div>
        </div>

        {/* Enhanced feature preview section */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="max-w-lg space-y-8 text-center">
            {/* Feature showcase with smooth transitions */}
            <div className="transform transition-all duration-700 ease-in-out">
              <div className="mb-8 flex justify-center">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  {FEATURE_PREVIEWS[currentStage].icon}
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-200">
                    {FEATURE_PREVIEWS[currentStage].stats}
                  </span>
                </div>

                <h2 className="text-3xl leading-tight font-bold text-white">
                  {FEATURE_PREVIEWS[currentStage].title}
                </h2>

                <p className="mx-auto max-w-md text-lg leading-relaxed text-blue-100/90">
                  {FEATURE_PREVIEWS[currentStage].description}
                </p>
              </div>
            </div>

            {/* Enhanced feature indicators */}
            <div className="flex justify-center space-x-3">
              {FEATURE_PREVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStage(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentStage
                      ? 'h-3 w-8 bg-gradient-to-r from-blue-400 to-purple-400'
                      : 'h-3 w-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced stats section */}
        <div className="relative z-10 mt-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                4.9★
              </div>
              <div className="text-sm font-medium text-blue-200/80">
                Average Ratings
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-gradient-to-r from-[#490cf1] to-[#9297f4] bg-clip-text text-3xl font-bold text-transparent">
                1K+
              </div>
              <div className="text-sm font-medium text-blue-200/80">
                Stores Listed
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-3xl font-bold text-transparent">
                25K+
              </div>
              <div className="text-sm font-medium text-blue-200/80">
                Platform Users
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 border-t border-white/20 pt-6">
            <div className="flex items-center justify-center space-x-6 text-xs text-blue-200/70">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span>Secure Authentication</span>
              </div>

              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified Reviews</span>
              </div>

              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span>Role-Based Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRightSection;
