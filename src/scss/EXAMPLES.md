# SCSS Examples Cookbook

Copy-pasteable examples that exercise the main features available from `@scss/`.

Prereq in your entry file:

```scss
// scss/main.scss
@use './index' as *;
@include emit-theme-css-variables(':root', light);
@include emit-theme-css-variables('[data-theme="dark"]', dark);
```

## Theme usage and toggling

SCSS

```scss
.card {
    background: color(surface);
    color: color(text-primary);
    border: 1px solid color(border);
}

.btn-primary {
    background: color(primary);
    color: color(primary-contrast);
}
```

HTML + JS

```html
<button id="theme-toggle" class="btn btn-secondary">Toggle theme</button>
<script>
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', 'dark');
    });
    // Or with multiple toggles: document.querySelectorAll('[data-theme-toggle]')
</script>
```

Override brand tokens

```scss
// brand.scss
@use './variables/colors' with (
    $primary-500: #6e56cf,
    $primary-600: #5746a6
);
@use './index' as *;
```

## Responsive helpers

SCSS

```scss
.hero {
    padding: $spacing-6;
    @include respond-to('md') {
        padding: $spacing-8;
    }
    @include respond-to('lg') {
        padding: $spacing-12;
    }
}
```

HTML (utility variants)

```html
<div class="d-grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card">A</div>
    <div class="card">B</div>
    <div class="card">C</div>
    <div class="md:col-span-full card">Full width on md+</div>
    <!-- md:*, lg:*, xl:*, xxl:* variants are available for all utilities -->
    <!-- xs is the default mobile base; use classes without prefix for xs -->
</div>
```

## Flex utilities (with responsive variants)

```html
<div class="d-flex items-center justify-between">
    <span>Left</span>
    <span>Right</span>
</div>

<div class="d-flex md:flex-row flex-column items-center gap-4">
    <button class="btn btn-primary">One</button>
    <button class="btn btn-secondary">Two</button>
</div>

<div class="d-flex flex-wrap gap-4">
    <div class="flex-1 card">Grow</div>
    <div class="flex-none card" style="width: 220px;">Fixed</div>
</div>
```

Supported: `.d-flex`, `.d-inline-flex`, direction (`.flex-row`, `.flex-column`, reverses), wrapping, justify (`.justify-*`), align items/self (`.items-*`, `.self-*`), flex/grow/shrink/basis, order, helpers (`.flex-center`, `.flex-between`, etc.). Prefix with `sm:`, `md:`, `lg:`, `xl:`, `xxl:` for respond-tos.

## Grid utilities

```html
<div class="d-grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card md:col-span-2">Span 2</div>
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card md:col-span-full">Full row</div>
</div>

<div class="d-grid grid-cols-auto-fit gap-4">
    <div class="card">Auto-fit 1</div>
    <div class="card">Auto-fit 2</div>
    <div class="card">Auto-fit 3</div>
</div>
```

Supported: `.d-grid`, `.grid-cols-1..12`, `.grid-rows-1..12`, `.grid-cols-auto-fit`, `.grid-cols-auto-fill`, spans `.col-span-*|full`, `.row-span-*|full`, flows, gaps `.gap-*`, `.gap-x-*`, `.gap-y-*`, place/justify/align utilities. Responsive variants as above.

## Common utilities

```html
<p class="text-center text-info">Informational text</p>
<div class="position-relative w-100 min-height-40">
    <button class="btn btn-primary float-right cPointer mar-top-20">Action</button>
</div>
<div class="mar-bottom-20 pad-top-20 pad-bottom-20">
    <div class="card max-width--570">Constrained card</div>
</div>
```

Includes: `.text-center`, `.text-right`, `.text-success|danger|warning|info`, `.position-relative`, `.cPointer`, `.float-right`, `.non-visible`, sizing (`.w-100`, `min-width-*`, `max-width--570`, `.h-100`, `.max-h-100`, `.min-h100`, `.min-height-40`), spacing (`.mar-*`, `.pad-*`), flex width (`.flex-100`, `.flex-50`).

## Components

Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
```

Card

```html
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">Body</div>
    <div class="card-footer">Footer</div>
</div>
```

Form

```html
<div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input class="form-input" id="email" placeholder="you@example.com" />
</div>
```

Table

```html
<div class="table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Alice</td>
                <td>Engineer</td>
            </tr>
            <tr>
                <td>Bob</td>
                <td>Designer</td>
            </tr>
        </tbody>
    </table>
</div>
```

Modal

```html
<button id="open-modal" class="btn btn-primary">Open modal</button>
<div id="demo-modal" class="modal">
    <div class="modal-dialog">
        <div class="modal-header">
            <h4 class="h4 mar-bottom-0">Modal title</h4>
            <button id="close-modal" class="btn btn-secondary">Close</button>
        </div>
        <div class="modal-body">Content</div>
        <div class="modal-footer">
            <button class="btn btn-secondary">Cancel</button>
            <button class="btn btn-primary">Save</button>
        </div>
    </div>
</div>
<script>
    const modal = document.getElementById('demo-modal');
    document.getElementById('open-modal').onclick = () => modal.classList.add('show');
    document.getElementById('close-modal').onclick = () => modal.classList.remove('show');
</script>
```

Navbar (mobile + desktop)

```html
<nav class="navbar">
    <div class="navbar-container">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggle" data-target="#nav">
            <span class="navbar-toggle-icon"></span>
        </button>
        <div id="nav" class="navbar-collapse">
            <ul class="navbar-nav">
                <li><a class="nav-link active" href="#">Home</a></li>
                <li><a class="nav-link" href="#">Docs</a></li>
                <li><a class="nav-link" href="#">About</a></li>
            </ul>
        </div>
    </div>
</nav>
<script>
    document.querySelectorAll('.navbar-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.querySelector(btn.getAttribute('data-target'));
            target.classList.toggle('show');
        });
    });
</script>
```

## Mixins: vendor, motion, and utilities

```scss
// Sticky header
.header {
    @include sticky(0);
}

// Smooth hover
.link {
    @include transition(color $transition-base);
    @include hover {
        color: color(link-hover);
    }
}

// Transform utility
.badge:hover {
    @include transform(scale(1.03));
}

// Focus ring
.input:focus {
    @include focus-visible {
        outline: 2px solid color(primary);
    }
}

// Reduced motion fallback
@include reduced-motion {
    * {
        @include transition(none);
        animation: none;
    }
}

// High contrast override
@include high-contrast {
    .btn-primary {
        box-shadow: none;
    }
}

// Print styles
@include print {
    .navbar,
    .modal {
        display: none !important;
    }
}
```

## Fonts: roles and faces

```scss
@use './fonts' as *;

body {
    @include font-family-role('primary', 300, normal);
}
.h1 {
    @include font-family-role('heading', 700, normal);
}
```

## respond-tos reference

```scss
// variables/_respond-tos.scss
$respond-tos: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    xxl: 1400px,
) !default;
```

Use with `@include respond-to("md")` and utility prefixes like `md:flex-row`.

---

For deeper API docs, see `scss/README.md`.
