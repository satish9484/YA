# Sass Deprecation Warnings Report

## Overview

This report lists all Sass deprecation warnings found in the project during the build process. Each warning includes the file location, line number, and recommended fix.

---

## 🔴 **CRITICAL WARNINGS TO FIX**

### 1. **Strict-Unary Warning**

**File:** `src/pages/Products/ProductCatalog/ProductCatalog.module.scss`  
**Line:** 121  
**Issue:** Ambiguous unary operation  
**Current Code:**

```scss
margin: -$spacing-1 -$spacing-2;
```

**Fix Required:**

```scss
margin: (-$spacing-1) (-$spacing-2);
```

---

### 2. **Mixed-Decls Warnings (Multiple Instances)**

#### **File:** `src/components/common/Breadcrumbs/Breadcrumbs.module.scss`

**Status:** ⚠️ **PARTIALLY FIXED** - Still showing warnings

**Issues Found:**

- **Line 12:** `background-color: color(bg-primary) !important;`
- **Line 13:** `padding-top: $spacing-2 !important;`
- **Line 14:** `padding-bottom: $spacing-2 !important;`

**Root Cause:** The `@include container()` mixin expands to nested rules (media queries), and CSS declarations appear after these nested rules.

**Fix Required:** Move all declarations above the `@include container()` call:

```scss
.breadcrumbs {
    // Move ALL declarations above nested rules
    background-color: color(bg-primary) !important;
    padding-top: $spacing-2 !important;
    padding-bottom: $spacing-2 !important;

    // Then include mixins
    @include container();

    // Then media queries
    @include respond-to('sm') {
        // ...
    }
}
```

---

## 📊 **WARNING STATISTICS**

| Warning Type   | Count | Files Affected             | Priority |
| -------------- | ----- | -------------------------- | -------- |
| `strict-unary` | 1     | ProductCatalog.module.scss | HIGH     |
| `mixed-decls`  | 15+   | Breadcrumbs.module.scss    | HIGH     |

---

## 🛠️ **FIXING STRATEGY**

### **Phase 1: Fix Strict-Unary Warning**

1. ✅ **File:** `src/pages/Products/ProductCatalog/ProductCatalog.module.scss`
2. ✅ **Line:** 121
3. ✅ **Action:** Wrap unary operations in parentheses

### **Phase 2: Fix Mixed-Decls Warnings**

1. 🔄 **File:** `src/components/common/Breadcrumbs/Breadcrumbs.module.scss`
2. 🔄 **Action:** Reorganize CSS structure to move declarations above nested rules
3. 🔄 **Verify:** Run build to confirm warnings are resolved

---

## 📝 **DETAILED WARNING LOGS**

### **Strict-Unary Warning Details:**

```
Deprecation Warning [strict-unary]: This operation is parsed as:
    -$spacing-1 - $spacing-2
but you may have intended it to mean:
    -$spacing-1 (-$spacing-2)
Add a space after - to clarify that it's meant to be a binary operation, or wrap
it in parentheses to make it a unary operation. This will be an error in future
versions of Sass.
```

### **Mixed-Decls Warning Details:**

```
Deprecation Warning [mixed-decls]: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.
```

---

## 🎯 **NEXT STEPS**

1. **Fix ProductCatalog.module.scss** - Strict-unary warning
2. **Re-examine Breadcrumbs.module.scss** - Mixed-decls warnings persist
3. **Run build again** to verify all warnings are resolved
4. **Update this report** with resolution status

---

## 📚 **REFERENCE LINKS**

- [Sass Deprecation Warnings Documentation](https://sass-lang.com/documentation/js-api/interfaces/LegacySharedOptions/)
- [Mixed-Decls Migration Guide](https://sass-lang.com/d/mixed-decls)
- [Strict-Unary Migration Guide](https://sass-lang.com/d/strict-unary)

---

**Report Generated:** $(date)  
**Build Command:** `npm run build`  
**Sass Version:** Via Vite (configured with verbose: true)
