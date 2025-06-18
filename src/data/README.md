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
  name: 'Your Module Manager',           // Display name
  description: 'What your module does',  // Brief description
  enabled: true,                         // Whether it's currently available
  defaultEnabled: true,                  // Default state in toggle demo
  commands: [                           // Key commands this module provides
    'your-module command1',
    'your-module command2'
  ],
  icon: <YourIcon className="w-6 h-6" />, // React icon component
  color: 'bg-your-color',               // Tailwind background color class
  category: 'your-category',            // Optional grouping category
}
```

## 🎨 Available Icon Components

Import icons from `lucide-react`:

```typescript
import { YourIcon } from 'lucide-react';
```

## 🎨 Available Colors

Use any Tailwind CSS background color class:

-   `bg-green-500`, `bg-blue-500`, `bg-purple-500`
-   `bg-orange-500`, `bg-cyan-500`, `bg-yellow-500`
-   `bg-red-500`, `bg-pink-500`, `bg-indigo-500`

## 📋 Categories

Optional categories for grouping modules:

-   `infrastructure` - SSH, networking, servers
-   `containers` - Docker, Kubernetes
-   `cloud` - GCP, AWS, Azure
-   `deployment` - CI/CD, hosting platforms
-   `development` - Dev tools, setup
-   `utilities` - General purpose tools

## 🔄 Automatic Updates

Once you add a module to the `MODULES` array, it will automatically appear in:

1. **ModularitySpotlight Component** - Interactive toggle demo
2. **FeatureShowcase Component** - Feature cards with commands
3. **Module Statistics** - Enabled/disabled counts

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
  name: 'Performance Manager',
  description: 'System monitoring and performance optimization tools',
  enabled: true,
  defaultEnabled: false,
  commands: ['perf monitor', 'perf optimize', 'perf report'],
  icon: <Zap className="w-6 h-6" />,
  color: 'bg-pink-500',
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
