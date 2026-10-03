# Module Management System

This directory contains the centralized module management system for the MaxCLI website. This system allows you to add new CLI modules in one place and have them automatically appear across all relevant components.

## 📁 File Structure

-   `modules.tsx` - Central configuration for all CLI modules
-   `../types/modules.ts` - TypeScript interfaces for type safety

## 🚀 Adding a New Module

To add a new module to the website, simply add a new object to the `MODULES` array in `modules.tsx`:

```typescript
{
  key: 'your-module',                    // Unique identifier (kebab-case)
  moduleId: 'your_module_manager',       // Module name used by the CLI (max modules enable ...)
  name: 'Your Module Manager',           // Display name
  description: 'What your module does',  // Brief description
  enabled: true,                         // Whether it's shown on the website
  defaultEnabled: true,                  // Enabled by default in the CLI (DEFAULT_ENABLED_MODULES)
  commands: [                           // Key commands, without the leading `max`
    'your-module command1',
    'your-module command2'
  ],
  icon: <YourIcon className="w-5 h-5" />, // React icon component
  accent: 'emerald',                    // Accent color (see ACCENT_STYLES)
  category: 'utilities',                // Grouping category (used by the filter tabs)
  status: 'wip',                        // Optional: mark work-in-progress modules
}
```

## 🎨 Available Icon Components

Import icons from `lucide-react`:

```typescript
import { YourIcon } from 'lucide-react';
```

## 🎨 Available Accents

Accents map to full Tailwind class strings in `ACCENT_STYLES` (so Tailwind can detect them):

-   `emerald`, `sky`, `violet`, `orange`, `cyan`
-   `rose`, `yellow`, `indigo`, `fuchsia`

To add a new accent, extend `ModuleAccent` in `../types/modules.ts` and `ACCENT_STYLES`.

## 📋 Categories

Categories group modules in the filter tabs:

-   `infrastructure` - SSH, networking, servers
-   `containers` - Docker, Kubernetes
-   `cloud` - GCP, AWS, Azure
-   `deployment` - CI/CD, hosting platforms
-   `development` - Dev tools, setup
-   `utilities` - General purpose tools

## 🔄 Automatic Updates

Once you add a module to the `MODULES` array, it will automatically appear in:

1. **FeatureShowcase Component** - Filterable module cards with copyable commands
2. **ModularitySpotlight Component** - Install command builder (toggles + presets)
3. **HeroTerminal Component** - Animated `max modules list` output
4. **Documentation Page** - Available modules list

Presets for the install command builder live in `MODULE_PRESETS`.

## ⚡ Helper Functions

The system provides utility functions:

-   `getEnabledModules()` - Get all enabled modules
-   `getDisabledModules()` - Get all disabled modules
-   `getModulesByCategory(category)` - Filter by category
-   `getModuleByKey(key)` - Find specific module
-   `getInitialToggleState()` - Get default toggle states

## ✅ Example: Adding a New Module

```typescript
// 1. Import the icon if it's not already imported
import { Zap } from 'lucide-react';

// 2. Add to the MODULES array
{
  key: 'performance',
  moduleId: 'performance_manager',
  name: 'Performance Manager',
  description: 'System monitoring and performance optimization tools',
  enabled: true,
  defaultEnabled: false,
  commands: ['perf monitor', 'perf optimize', 'perf report'],
  icon: <Zap className="w-5 h-5" />,
  accent: 'fuchsia',
  category: 'utilities',
}
```

That's it! The new module will automatically appear across the website.

## 🔧 TypeScript Support

The system is fully typed with TypeScript interfaces. Your IDE will provide:

-   Auto-completion for module properties
-   Type checking for required fields
-   IntelliSense for available helper functions

## 📝 Best Practices

1. **Unique Keys**: Use kebab-case and ensure keys are unique
2. **Descriptive Names**: Use "Manager" suffix for consistency
3. **Clear Descriptions**: Keep under 80 characters
4. **Relevant Commands**: Show 2-4 key commands per module
5. **Appropriate Icons**: Choose icons that represent the module's purpose
6. **Consistent Colors**: Pick colors that don't clash with existing ones
