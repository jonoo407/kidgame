# Creature Builder Tests

This directory contains tests for the Creature Builder application to ensure rendering works correctly.

## Test Files

### `render-test.html`
A browser-based visual test that can be opened directly in a browser. It tests:
- PartsManager and Creature instantiation
- Part retrieval (heads, bodies, etc.)
- Creature rendering with head and body
- Part positioning and transforms
- Color application
- Empty creature handling

**Usage:** Open `tests/render-test.html` in a web browser.

### `simple-test.js`
A Node.js-based test script that can be run from the command line.

**Usage:** 
```bash
npm test
```

### `creature.test.js`
Jest-based tests (requires Jest setup).

**Usage:**
```bash
npm run test:jest
```

## Test Coverage

The tests verify:
1. ✅ Head and body parts render correctly
2. ✅ All parts are positioned correctly (head at top, body center, legs bottom)
3. ✅ Colors are applied correctly (currentColor is replaced)
4. ✅ SVG extraction works properly
5. ✅ Missing parts are handled gracefully
6. ✅ Empty creatures render valid SVG

## Running Tests

### Quick Visual Test
Open `tests/render-test.html` in your browser to see visual rendering tests.

### Command Line Tests
```bash
# Run simple Node.js tests
npm test

# Run Jest tests (if configured)
npm run test:jest
```

## Fixes Applied

### Bug Fix: Part Property Mapping
**Issue:** Head and body weren't showing up because the builder was setting `parts.heads` and `parts.bodies`, but the renderer was checking for `parts.head` and `parts.body`.

**Fix:** Added proper mapping in `selectPart()` function to map part types correctly:
- `heads` → `head`
- `bodies` → `body`
- `arms` → `arms`
- `legs` → `legs`
- `accessories` → `accessory`

This ensures that when parts are selected, they're stored with the correct property names that the renderer expects.
