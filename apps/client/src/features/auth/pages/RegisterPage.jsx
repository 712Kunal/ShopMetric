import { Store } from 'lucide-react';

import { SignupForm } from '@/features/auth/components/signup-form';
import EnhancedRightSection from '@/features/auth/components/EnhancedRightSection';

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-7">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Store size={15} className="text-primary-foreground" />
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">
              ShopMetric
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-11/12">
            <SignupForm />
          </div>
        </div>
      </div>
      <EnhancedRightSection />
    </div>
  );
}
