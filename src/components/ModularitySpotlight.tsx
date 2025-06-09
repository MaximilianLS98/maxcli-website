
import React, { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Check, X, Zap, Shield, Users } from 'lucide-react';

const ModularitySpotlight = () => {
  const [modules, setModules] = useState({
    ssh: true,
    docker: true,
    gcp: false,
    coolify: true,
    setup: false,
    misc: true,
  });

  const toggleModule = (moduleKey: string) => {
    setModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const features = [
    {
      icon: <Check className="w-5 h-5" />,
      text: "Enable/disable modules anytime",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Zero bloat – only load what you use",
      color: "text-yellow-400"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Open-source & community-driven",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-24 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
            Your CLI, Your Rules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            MaxCLI's modular architecture means you're in complete control. 
            Turn features on or off with a simple command.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Toggle Demo */}
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Module Controls</h3>
            <div className="space-y-4">
              {Object.entries(modules).map(([key, enabled]) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                    <span className="font-mono text-lg capitalize">{key} Manager</span>
                  </div>
                  
                  <Toggle 
                    pressed={enabled}
                    onPressedChange={() => toggleModule(key)}
                    className="data-[state=on]:bg-green-500 data-[state=on]:text-black"
                  >
                    {enabled ? <Check size={16} /> : <X size={16} />}
                  </Toggle>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400 mb-2">Current configuration:</div>
              <code className="text-green-400 font-mono text-sm">
                maxcli config --modules={Object.entries(modules)
                  .filter(([_, enabled]) => enabled)
                  .map(([key]) => key)
                  .join(',')}
              </code>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className={`${feature.color} bg-gray-800 p-3 rounded-lg`}>
                  {feature.icon}
                </div>
                <div>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-purple-500/10 to-green-500/10 border border-purple-500/20 rounded-xl p-6">
              <p className="text-purple-300 font-medium">
                💡 Pro Tip: Use <code className="bg-gray-800 px-2 py-1 rounded font-mono text-green-400">maxcli modules list</code> to see all available modules and their status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModularitySpotlight;
