
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Terminal, Database, Cloud, Server, Settings, Archive, Layers } from 'lucide-react';

const FeatureShowcase = () => {
  const [copiedCommands, setCopiedCommands] = useState<string[]>([]);

  const copyToClipboard = async (text: string, commandId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCommands(prev => [...prev, commandId]);
    setTimeout(() => {
      setCopiedCommands(prev => prev.filter(id => id !== commandId));
    }, 2000);
  };

  const features = [
    {
      name: "SSH Manager",
      enabled: true,
      description: "Complete SSH management: connections, keys, backups & GPG-encrypted file transfers",
      commands: ["ssh connect", "ssh keys", "ssh backup"],
      icon: <Terminal className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      name: "Docker Manager", 
      enabled: true,
      description: "Docker system management & cleanup tools",
      commands: ["docker cleanup", "docker stats"],
      icon: <Layers className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      name: "GCP Manager",
      enabled: true,
      description: "Google Cloud auth & configuration toolkit",
      commands: ["gcp auth", "gcp config"],
      icon: <Cloud className="w-6 h-6" />,
      color: "bg-orange-500"
    },
    {
      name: "Coolify Manager",
      enabled: true,
      description: "Control Coolify instances via REST API",
      commands: ["coolify deploy", "coolify status"],
      icon: <Server className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      name: "Setup Manager",
      enabled: true,
      description: "Dev environment setup & config profiles",
      commands: ["setup env", "setup profile"],
      icon: <Settings className="w-6 h-6" />,
      color: "bg-cyan-500"
    },
    {
      name: "Misc Manager",
      enabled: true,
      description: "DB backups, CSV processing & app deployment",
      commands: ["backup-db", "deploy-app", "process-csv"],
      icon: <Archive className="w-6 h-6" />,
      color: "bg-yellow-500"
    },
    {
      name: "Kubernetes Manager",
      enabled: false,
      description: "Kubernetes context switching & cluster mgmt",
      commands: ["kctx switch", "kctx list"],
      icon: <Database className="w-6 h-6" />,
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Powerful Modules 
            <span className="block text-3xl text-green-400 font-normal mt-2">
              (Enable Any Combo)
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each module is purpose-built for specific workflows. Mix and match to create your perfect CLI experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.name}
              className={`group relative bg-gray-800 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                feature.enabled 
                  ? 'border-green-500/30 hover:border-green-500/50' 
                  : 'border-gray-600 hover:border-gray-500 opacity-75'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`${feature.color} p-2 rounded-lg text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                  </div>
                  
                  <Badge 
                    variant={feature.enabled ? "default" : "secondary"}
                    className={`${
                      feature.enabled 
                        ? 'bg-green-500 text-black hover:bg-green-600' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {feature.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Commands */}
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-3 font-medium">Key Commands:</div>
                <div className="space-y-2">
                  {feature.commands.map((command, cmdIndex) => {
                    const commandId = `${feature.name}-${cmdIndex}`;
                    const isCopied = copiedCommands.includes(commandId);
                    
                    return (
                      <div 
                        key={cmdIndex}
                        className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
                      >
                        <code className="text-green-400 font-mono text-sm">
                          maxcli {command}
                        </code>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-gray-700"
                          onClick={() => copyToClipboard(`maxcli ${command}`, commandId)}
                        >
                          {isCopied ? (
                            <Check size={12} className="text-green-400" />
                          ) : (
                            <Copy size={12} className="text-gray-400" />
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Disabled overlay */}
              {!feature.enabled && (
                <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-sm text-gray-400">Disabled by default</div>
                    <Button 
                      size="sm" 
                      className="mt-3 bg-green-500 hover:bg-green-600 text-black"
                    >
                      Enable Module
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Module Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-gray-800 rounded-xl border border-gray-700 px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">6</div>
              <div className="text-sm text-gray-400">Enabled</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">1</div>
              <div className="text-sm text-gray-400">Disabled</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-400">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
