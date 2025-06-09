
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Download, GitBranch, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockReleases = [
  {
    version: 'v2.0.1',
    date: '2024-06-08',
    type: 'patch',
    description: 'Bug fixes and performance improvements',
    changes: [
      'Fixed SSH key management edge cases',
      'Improved Docker container cleanup performance',
      'Updated GCP authentication flow',
      'Minor UI improvements in setup manager'
    ],
    downloads: 1247,
    isLatest: true
  },
  {
    version: 'v2.0.0',
    date: '2024-05-15',
    type: 'major',
    description: 'Major release with new modular architecture',
    changes: [
      'Complete rewrite with modular plugin system',
      'New Kubernetes Manager module',
      'Enhanced SSH Manager with GPG encryption',
      'Improved CLI performance by 40%',
      'Breaking: Configuration file format changed',
      'New interactive setup wizard'
    ],
    downloads: 5832,
    isLatest: false
  },
  {
    version: 'v1.8.3',
    date: '2024-04-22',
    type: 'patch',
    description: 'Security updates and bug fixes',
    changes: [
      'Security patch for SSH key handling',
      'Fixed Docker daemon connection issues',
      'Updated dependencies to latest versions',
      'Improved error messages across all modules'
    ],
    downloads: 2156,
    isLatest: false
  },
  {
    version: 'v1.8.0',
    date: '2024-03-10',
    type: 'minor',
    description: 'New features and improvements',
    changes: [
      'Added Coolify Manager module',
      'New CSV processing utilities in Misc Manager',
      'Enhanced backup and restore functionality',
      'Improved GCP integration with new auth methods',
      'Better error handling and logging'
    ],
    downloads: 3421,
    isLatest: false
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'major': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'minor': return 'bg-primary/20 text-primary border-primary/30';
    case 'patch': return 'bg-accent/20 text-accent border-accent/30';
    default: return 'bg-muted/20 text-muted-foreground border-muted/30';
  }
};

const Changelog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Changelog
                </h1>
                <p className="text-muted-foreground">Track MaxCLI updates and improvements</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">GitHub Releases</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {mockReleases.map((release, index) => (
            <div key={release.version} className="relative">
              {/* Timeline Line */}
              {index < mockReleases.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-border"></div>
              )}
              
              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Star size={20} className="text-primary" />
                </div>
                
                {/* Release Content */}
                <div className="flex-1 bg-card border border-border rounded-lg p-6 hover:bg-card/80 transition-colors">
                  {/* Release Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-foreground">{release.version}</h2>
                        <Badge className={`${getTypeColor(release.type)} border`}>
                          {release.type}
                        </Badge>
                        {release.isLatest && (
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-1">{release.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-primary" />
                          {new Date(release.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download size={14} className="text-primary" />
                          {release.downloads.toLocaleString()} downloads
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  {/* Changes List */}
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">What's Changed</h3>
                    <ul className="space-y-2">
                      {release.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1.5">•</span>
                          <span className={change.includes('Breaking:') ? 'text-destructive' : 'text-muted-foreground'}>
                            {change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer CTA */}
        <div className="mt-16 text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Stay Updated</h3>
          <p className="text-muted-foreground mb-4">
            Follow our GitHub repository to get notified about new releases
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">
              <GitBranch size={16} className="mr-2" />
              Watch on GitHub
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Star size={16} className="mr-2" />
              Star Repository
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Changelog;
