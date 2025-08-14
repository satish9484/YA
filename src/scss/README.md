# SCSS Design System

Modern, modular Sass setup for a themeable, utility-augmented design system. Uses the Sass module system (`@use`/`@forward`), semantic design tokens, and runtime CSS variables for light/dark themes.

## Quick start

1. Entry point

```scss
// scss/main.scss
@use "./index" as *;

// Emit theme CSS variables once at startup
@include emit-theme-css-variables(":root", light);
@include emit-theme-css-variables('[data-theme="dark"]', dark);
```

2. Include built CSS in HTML

```html
<link rel="stylesheet" href="/scss/main.css" />
```

3. Toggle theme at runtime (no repainting necessary)

```js
// Toggles dark mode on <html>
document.documentElement.toggleAttribute("data-theme", "dark");
```

## Module structure

```text
scss/
  _index.scss         # Forwards all public modules
  _variable.scss      # Forwards all variables/* tokens
  _mixin.scss         # Vendor + responsive + utility mixins
  _reset.scss         # Modern reset/normalize
  _base.scss          # Base typography and element styles
  _components.scss    # Buttons, forms, cards, tables, modals
  _navigation.scss    # Navbar and responsive navigation
  _common.scss        # Lean, utility-only helpers
  flex/               # Flex utilities
    _index.scss
    _utilities.scss
  grid/               # Grid utilities
    _index.scss
    _utilities.scss
  fonts/              # Font roles, faces and helpers
    _index.scss
    _config.scss
    _faces.scss
    _helpers.scss
  variables/          # Design tokens (all with !default)
    _colors.scss
    _typography.scss
    _spacing.scss
    _borders.scss
    _shadows.scss
    _breakpoints.scss
    _layout.scss
    _zindex.scss
    _motion.scss
    _compat.scss
  main.scss           # Minimal build entry
```

Always import the system via:

```scss
@use "./index" as *;
```

## Theming and color API

- Semantic roles (examples): `primary`, `primary-contrast`, `background`, `surface`, `surface-2`, `text-primary`, `text-secondary`, `text-inverse`, `border`, `ring`, `link`, `link-hover`, `success`, `warning`, `error`, `info`, `muted`, `accent`, `accent-contrast`.
- Use `color(<role>)` anywhere CSS expects a color. This emits a CSS variable with a static fallback, enabling runtime theme switching.

Examples

```scss
.btn-primary {
  background: color(primary);
  color: color(primary-contrast);
}

body {
  color: color(text-primary);
  background: color(background);
}
```

Emit CSS variables once per theme scope

```scss
@include emit-theme-css-variables(":root", light);
@include emit-theme-css-variables('[data-theme="dark"]', dark);
```

Override theme tokens (per brand)

```scss
// In a brand entry file
@use "./variables/colors" with (
  $primary-500: #6e56cf,
  $primary-600: #5746a6
);
```

## Design tokens (variables/\*)

- Colors: full palettes (primary, neutral, semantic, accent, orange), role maps (`$theme-light`, `$theme-dark`), helpers `color()` and `emit-theme-css-variables()`.
- Typography: font sizes, weights, line-heights, responsive title map; integrates with `fonts/`.
- Spacing: consistent scale, e.g., `$spacing-0 .. $spacing-64`.
- Borders: radii and widths.
- Shadows: shadow scale (`$shadow-sm .. $shadow-2xl`).
- Breakpoints: mobile-first map used by mixins/utilities.
- Layout: container padding and max-widths.
- Z-index: layered scale.
- Motion: transition durations/easings.
- Compat: feature flags/vendor compatibility tokens.

## Breakpoints

Defined in `variables/_breakpoints.scss`:

```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
) !default;
```

Usage

```scss
@include respond-to("md") {
  /* min-width: 768px */
}
@include respond-to-max("lg") {
  /* max-width: 991px */
}
```

Responsive utility variants are generated for `sm`, `md`, `lg`, `xl`, `xxl` using the `prefix:class` pattern, e.g., `md:flex-row`, `lg:d-grid`.

## Mixins

Responsive

- `respond-to($breakpoint)` / `respond-to-max($breakpoint)`
- `responsive-font-size($element)`
- `container($max-width: null)`

Flexbox

- `flexbox`, `inline-flex`
- `flex-direction($dir)`, `flex-wrap($wrap)`
- `justify-content($value)`, `align-items($value)`, `align-self($value)`
- `flex($grow, $shrink, $basis)`, `flex-grow($n)`, `flex-shrink($n)`, `flex-basis($val)`

Grid

- `grid`, `grid-template-columns($cols)`, `grid-template-rows($rows)`
- `grid-column($start, $end?)`, `grid-row($start, $end?)`

Transforms, transitions, animation

- `transform(...)`, `transform-origin(...)`
- `transition(...)` (+ property/duration/timing/delay helpers)
- `keyframes($name)`, `animation(...)`

Visual and utility

- `box-shadow(...)`, `border-radius(...)` (+ corner helpers)
- `filter(...)`, `backdrop-filter(...)`
- `sticky($top)`, `user-select($value)`, `appearance($value)`, `touch-scroll`
- `visually-hidden`, `focus-visible`, `hover`
- `reduced-motion`, `high-contrast`, `dark-mode`, `print`
- `aspect-ratio($w, $h)`, `truncate($lines)`, `hide-text`, `clearfix`

## Utilities

Flex utilities (`flex/_utilities.scss`)

- Display: `.d-flex`, `.d-inline-flex`
- Direction: `.flex-row`, `.flex-row-reverse`, `.flex-column`, `.flex-column-reverse`
- Wrap: `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse`
- Justify: `.justify-start|end|center|between|around|evenly`
- Align items: `.items-start|end|center|baseline|stretch`
- Align self: `.self-start|end|center|baseline|stretch`
- Flex: `.flex-1|auto|initial|none`
- Grow/Shrink: `.flex-grow-0|1`, `.flex-shrink-0|1`
- Basis: `.flex-basis-auto|0|full`
- Order: `.order-first|last|none`
- Helpers: `.flex-center`, `.flex-between`, `.flex-start`, `.flex-end`, `.flex-column-center`, `.flex-column-between`
- Responsive variants: `sm:..`, `md:..`, `lg:..`, `xl:..`, `xxl:..`

Grid utilities (`grid/_utilities.scss`)

- Display: `.d-grid`
- Templates: `.grid-cols-1..12`, `.grid-rows-1..12`
- Auto: `.grid-cols-auto-fit`, `.grid-cols-auto-fill`
- Spans: `.col-span-1..12|full`, `.row-span-1..12|full`
- Flow: `.grid-flow-row|col|dense|row-dense|col-dense`
- Gaps: `.gap-{spacing}`, `.gap-x-{spacing}`, `.gap-y-{spacing}` from spacing scale
- Align/Place: `.place-content-*`, `.place-items-*`, `.justify-items-*`, `.align-items-*`
- Responsive variants as above

Common utilities (`_common.scss`)

- Text: `.text-center`, `.text-right`, status colors `.text-success|danger|warning|info`
- Position/cursor: `.position-relative`, `.cPointer`, `.float-right`, `.non-visible`
- Sizing: `.w-100`, multiple `min-width-*`, `max-width--570`, `.h-100`, `.max-h-100`, `.min-h100`, `.min-height-40`
- Spacing: multiple `.mar-*`, `.pad-*`
- Flex width helpers: `.flex-100`, `.flex-50`

## Fonts

- Configure font roles and paths in `fonts/_config.scss` via `$fonts` map and `$font-path` (defaults to `/fonts`).
- `@font-face` declarations in `fonts/_faces.scss` (e.g., Poppins, Lora) are pre-wired for `woff2`/`woff`.
- Apply logical roles with `@include font-family-role($role, $weight, $style)`.

Example

```scss
@use "./fonts" as *;

body {
  @include font-family-role("primary", 300, normal);
}
```

## Components and navigation

- Buttons: `.btn`, `.btn-primary`, `.btn-secondary` with theme-aware colors and hover/focus helpers.
- Cards: `.card`, `.card-header`, `.card-body`, `.card-footer`.
- Forms: `.form-group`, `.form-label`, `.form-input` with focus ring.
- Tables: `.table`, `.table-responsive`.
- Modals: `.modal`, `.modal-dialog`, `.modal-header|body|footer`.
- Navbar: `.navbar`, `.navbar-container`, `.navbar-brand`, `.navbar-nav`, `.nav-link`, `.navbar-toggle`, `.navbar-collapse` with mobile menu and responsive behavior.

## Usage patterns

Mobile-first

- Default styles target mobile (`xs`).
- Add breakpoint-specific overrides with `@include respond-to(...)` or utility variants like `md:flex-row`.

Theme-first

- Use semantic roles via `color(<role>)` instead of raw hex from the palette.
- Emit theme variables at root and optional dark scope.

Extending tokens

- Add/override tokens by `@use ... with (...)` in a brand entry; all tokens use `!default`.

## Browser compatibility

- Flex and grid mixins include vendor-prefixed and legacy MS syntaxes where relevant.
- Utility classes rely on these mixins for consistent cross-browser output.
- Additional helpers: `appearance`, `user-select`, `touch-scroll`, `reduced-motion`, `high-contrast`, `print`.

## Examples

Layout with grid and flex

```html
<div class="d-grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="card">
    <div class="card-header">Header</div>
    <div class="card-body d-flex flex-column gap-4">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
    </div>
  </div>
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="md:col-span-full card">Full width on md+</div>
  <div class="md:d-flex md:justify-between md:items-center">
    <span>Left</span>
    <span>Right</span>
  </div>
  }
</div>
```

Responsive in SCSS

```scss
.hero {
  padding: $spacing-6;
  @include respond-to("md") {
    padding: $spacing-8;
  }
  @include respond-to("lg") {
    padding: $spacing-12;
  }
}
```

## Conventions

- Use `@use "./index" as *;` in entry files. Avoid importing partials directly in app code.
- Use semantic roles via `color()` in components.
- Keep utilities generic; keep component-specific styles in `_components.scss`.
