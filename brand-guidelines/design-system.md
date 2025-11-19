# TBS Digital Labs Design System

## Component Patterns

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--color-oxford-blue);
  color: var(--color-off-white);
  font-family: var(--font-body);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--color-ultramarine);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-oxford-blue);
  border: 2px solid var(--color-oxford-blue);
  font-family: var(--font-body);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.btn-secondary:hover {
  background-color: var(--color-oxford-blue);
  color: var(--color-off-white);
}
```

### Cards

#### Standard Card
```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  transition: var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

#### Feature Card
```css
.card-feature {
  background: linear-gradient(135deg, var(--color-oxford-blue), var(--color-ultramarine));
  color: var(--color-off-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
}
```

### Typography

#### Headings
```css
.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  color: var(--color-oxford-blue);
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-oxford-blue);
}

.heading-3 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-dark-grey);
}
```

#### Body Text
```css
.body-large {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-dark-grey);
}

.body-regular {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-gray-600);
}

.body-small {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-gray-500);
}
```

### Navigation

#### Main Navigation
```css
.nav-main {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.nav-link {
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-oxford-blue);
  background-color: var(--color-gray-50);
}
```

### Forms

#### Input Fields
```css
.input-field {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  transition: var(--transition-fast);
  width: 100%;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-oxford-blue);
  box-shadow: 0 0 0 3px rgba(2, 2, 43, 0.1);
}

.input-field::placeholder {
  color: var(--color-gray-400);
}
```

#### Labels
```css
.form-label {
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);
  color: var(--color-gray-700);
  margin-bottom: var(--space-2);
  display: block;
}
```

### Progress Indicators

#### Progress Bar
```css
.progress-bar {
  background-color: var(--color-gray-200);
  border-radius: var(--radius-full);
  height: var(--space-2);
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, var(--color-oxford-blue), var(--color-sage));
  height: 100%;
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}
```

#### Badge
```css
.badge {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-primary {
  background-color: var(--color-oxford-blue);
  color: var(--color-off-white);
}

.badge-success {
  background-color: var(--color-sage);
  color: var(--color-off-white);
}

.badge-warning {
  background-color: var(--color-light-magenta);
  color: var(--color-off-white);
}
```

### Layout

#### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

#### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

## Animation Guidelines

### Micro-interactions
- Button hover: 150ms ease-in-out
- Card hover: 250ms ease-in-out
- Form focus: 150ms ease-in-out

### Page Transitions
- Fade in: 300ms ease-out
- Slide up: 400ms ease-out
- Scale in: 250ms ease-out

### Loading States
- Skeleton animation: 1.5s ease-in-out infinite
- Spinner rotation: 1s linear infinite
- Progress bar fill: 500ms ease-out

## Accessibility Guidelines

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: 2px solid outline with 2px offset
- Touch targets: minimum 44px × 44px
- Keyboard navigation: all interactive elements accessible via Tab
- Screen reader support: proper ARIA labels and semantic HTML
