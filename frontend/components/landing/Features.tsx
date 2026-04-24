// components/landing/Features.tsx
"use client";

import { Brain, Zap, Shield, Rocket, Target, Cpu } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Neural Engine',
      description: 'Llama 3.1 70B powered task decomposition and strategic prioritization.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Cerebras Speed',
      description: 'Sub-second inference for real-time task generation and organization.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption for all your strategic roadmaps and data.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Rocket,
      title: 'Deployment Ready',
      description: 'One-click migration from legacy systems to our neural protocol.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Precision Metrics',
      description: 'High-fidelity analytics to track your productivity velocity and scale.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Cpu,
      title: 'Unified Core',
      description: 'Seamlessly sync across all nodes in your distributed workspace.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section id="features" className="py-32 md:py-48 px-6 bg-[#0b0f19] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-secondary-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            Engineered for <br />
            <span className="text-transparent bg-clip-text bg-main-gradient">Extreme Productivity.</span>
          </h2>
          <p className="text-secondary-text max-w-3xl mx-auto text-xl font-medium opacity-80 leading-relaxed">
            Experience the next generation of task management with our advanced AI-first infrastructure, built for teams that demand velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-10 rounded-[2rem] bg-surface-card backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
              >
                <div className="absolute inset-0 bg-main-gradient opacity-0 group-hover:opacity-[0.02] rounded-[2rem] transition-opacity duration-500"></div>
                
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] p-4 flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:bg-white/[0.05]`}>
                    <Icon className="text-white w-full h-full" />
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-secondary-text leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>

                <div className="mt-8 pt-8 border-t border-white/[0.05] flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary-400 transition-colors">
                  System Module Active
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
