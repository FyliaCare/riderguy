# Quick Reference Guide - Optimized Components

## SEO Component

### Usage
```tsx
import { SEOHead } from '@/components/seo-head';

<SEOHead
  title="Page Title"
  description="Description for search engines"
  keywords={['keyword1', 'keyword2']}
  canonicalPath="/page-path"
/>
```

---

## UI Components

### StatCard
Display key metrics with gradients and icons.

```tsx
import { StatCard } from '@/components/ui/cards';
import { DollarSign } from 'lucide-react';

<StatCard
  label="Total Earnings"
  value="GH₵7,456.20"
  change="+15.2%"
  trend="up"
  icon={DollarSign}
  color="green"
/>
```

**Colors:** `green`, `blue`, `purple`, `orange`, `pink`, `red`  
**Trends:** `up`, `down`

---

### MetricCard
Simple metric display without gradients.

```tsx
import { MetricCard } from '@/components/ui/cards';

<MetricCard
  label="Deliveries Today"
  value="12"
  subValue="3 pending"
/>
```

---

### PageHeader
Consistent page headers.

```tsx
import { PageHeader } from '@/components/ui/cards';

<PageHeader
  title="Dashboard"
  subtitle="Track your performance and earnings"
/>
```

---

### Badge
Status indicators.

```tsx
import { Badge } from '@/components/ui/cards';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>
<Badge variant="default">Normal</Badge>
```

---

### ProgressBar
Visual progress indicators.

```tsx
import { ProgressBar } from '@/components/ui/cards';

<ProgressBar 
  progress={75} 
  color="green" 
  size="md" 
/>
```

**Colors:** `green`, `blue`, `purple`, `yellow`  
**Sizes:** `sm`, `md`, `lg`

---

### EmptyState
User-friendly empty states.

```tsx
import { EmptyState } from '@/components/ui/cards';
import { Package } from 'lucide-react';

<EmptyState
  icon={Package}
  title="No deliveries yet"
  description="Start accepting orders to see them here"
/>
```

---

### LoadingSkeleton
Loading placeholders.

```tsx
import { LoadingSkeleton } from '@/components/ui/cards';

<LoadingSkeleton count={3} />
```

---

## Utility Functions

### Currency Formatting
```tsx
import { formatCurrency } from '@/lib/utils';

formatCurrency(1234.56); // "GH₵1,234.56"
```

### Date & Time
```tsx
import { formatDate, formatTime, formatRelativeTime } from '@/lib/utils';

formatDate(new Date()); // "Nov 23, 2024"
formatTime(new Date()); // "2:30 PM"
formatRelativeTime(new Date()); // "Just now"
```

### Phone Numbers
```tsx
import { formatPhoneNumber, validatePhoneNumber } from '@/lib/utils';

formatPhoneNumber('0241234567'); // "+233 24 123 4567"
validatePhoneNumber('+233241234567'); // true
```

### Validation
```tsx
import { validateEmail } from '@/lib/utils';

validateEmail('user@example.com'); // true
```

### Data Manipulation
```tsx
import { groupBy, sortBy, unique, calculatePercentage } from '@/lib/utils';

// Group array by key
const grouped = groupBy(riders, 'status');

// Sort array
const sorted = sortBy(riders, 'rating', 'desc');

// Remove duplicates
const uniqueIds = unique([1, 2, 2, 3]);

// Calculate percentage
calculatePercentage(75, 100); // 75
```

### Status Colors
```tsx
import { getStatusColor } from '@/lib/utils';

getStatusColor('active'); // "green"
getStatusColor('pending'); // "yellow"
getStatusColor('failed'); // "red"
```

### Text Truncation
```tsx
import { truncate } from '@/lib/utils';

truncate('This is a long text', 10); // "This is a..."
```

---

## Loading States

Loading components are automatically used by Next.js. Create `loading.tsx` in route folders:

```tsx
// app/dashboard/my-page/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-64 bg-gray-100 rounded"></div>
    </div>
  );
}
```

---

## Error Boundary

Wrap your app sections:

```tsx
import ErrorBoundary from '@/components/error-boundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## Web Vitals

Add to root layout:

```tsx
import { WebVitals } from '@/components/web-vitals';

export default function RootLayout({ children }) {
  return (
    <>
      <WebVitals />
      {children}
    </>
  );
}
```

---

## PWA Shortcuts

Users can quickly access these via long-press:
- Dashboard
- Deliveries  
- Earnings
- Schedule
- Training
- Welfare

---

## Common Patterns

### Page with SEO + Loading
```tsx
'use client';

import { SEOHead } from '@/components/seo-head';
import { PageHeader } from '@/components/ui/cards';

export default function MyPage() {
  return (
    <>
      <SEOHead
        title="My Page"
        description="Page description"
        keywords={['keyword1', 'keyword2']}
        canonicalPath="/my-page"
      />
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          title="My Page"
          subtitle="Page subtitle"
        />
        {/* Content */}
      </div>
    </>
  );
}
```

### Stats Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard label="Stat 1" value="100" icon={Icon1} color="green" />
  <StatCard label="Stat 2" value="200" icon={Icon2} color="blue" />
  <StatCard label="Stat 3" value="300" icon={Icon3} color="purple" />
  <StatCard label="Stat 4" value="400" icon={Icon4} color="orange" />
</div>
```

### List with Empty State
```tsx
{items.length === 0 ? (
  <EmptyState
    icon={Package}
    title="No items"
    description="Items will appear here"
  />
) : (
  <div className="space-y-4">
    {items.map(item => (
      <div key={item.id}>{/* Item content */}</div>
    ))}
  </div>
)}
```

---

## Performance Tips

1. **Use loading.tsx** for automatic loading states
2. **Import icons individually** from lucide-react
3. **Use StatCard/MetricCard** instead of custom cards
4. **Apply SEOHead** to all pages
5. **Use utility functions** from lib/utils.ts
6. **Leverage badges** for status indicators
7. **Add proper keywords** for SEO
8. **Use formatCurrency** for all money values
9. **Use formatPhoneNumber** for phone numbers
10. **Wrap risky components** in ErrorBoundary

---

## File Locations

```
apps/rider-pwa/
├── src/
│   ├── components/
│   │   ├── seo-head.tsx          # SEO component
│   │   ├── error-boundary.tsx    # Error handling
│   │   ├── web-vitals.tsx        # Performance tracking
│   │   └── ui/
│   │       └── cards.tsx         # UI components
│   ├── lib/
│   │   ├── seo.ts               # SEO utilities
│   │   └── utils.ts             # Helper functions
│   └── app/
│       └── dashboard/
│           ├── loading.tsx       # Dashboard loading
│           └── **/loading.tsx    # Page-specific loading
└── public/
    └── manifest.json             # PWA manifest
```

---

## Support

For questions or issues:
1. Check OPTIMIZATION_SUMMARY.md for detailed docs
2. Review existing implementations in dashboard pages
3. Refer to component JSDoc comments in source files

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✅
