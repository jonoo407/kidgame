#!/usr/bin/env node
/**
 * Detailed verification test for creature rendering
 * Verifies that head and body actually appear in the SVG output
 */

const fs = require('fs');
const path = require('path');

// Create minimal DOM environment
global.window = {};
global.document = {
    createElement: () => ({}),
    querySelector: () => null,
    querySelectorAll: () => []
};

// Load and execute the code
const partsCode = fs.readFileSync(path.join(__dirname, '../js/parts.js'), 'utf8');
const creatureCode = fs.readFileSync(path.join(__dirname, '../js/creature.js'), 'utf8');

const vm = require('vm');
try {
    vm.runInThisContext(partsCode);
    vm.runInThisContext(creatureCode);
} catch (error) {
    eval(partsCode);
    eval(creatureCode);
}

// Fallback if classes not loaded
if (typeof PartsManager === 'undefined' || typeof Creature === 'undefined') {
    const context = { global, window: {}, document: {} };
    vm.createContext(context);
    vm.runInContext(partsCode, context);
    vm.runInContext(creatureCode, context);
    if (context.PartsManager) {
        global.PartsManager = context.PartsManager;
        global.Creature = context.Creature;
    }
}

console.log('🔍 Detailed Rendering Verification\n');
console.log('=' .repeat(60));

const partsManager = new PartsManager();

// Test 1: Verify head and body parts exist
console.log('\n1. Verifying parts exist...');
const head = partsManager.getPart('heads', 'head1');
const body = partsManager.getPart('bodies', 'body1');
console.log(`   ✅ Head part found: ${head ? 'Yes' : 'No'} (ID: ${head?.id || 'N/A'})`);
console.log(`   ✅ Body part found: ${body ? 'Yes' : 'No'} (ID: ${body?.id || 'N/A'})`);

// Test 2: Create creature with head and body
console.log('\n2. Creating creature with head and body...');
const creature = new Creature();
creature.parts.head = 'head1';
creature.parts.body = 'body1';
creature.colors.head = '#FF6B6B';
creature.colors.body = '#4ECDC4';

console.log(`   ✅ Creature parts.head = '${creature.parts.head}'`);
console.log(`   ✅ Creature parts.body = '${creature.parts.body}'`);

// Test 3: Render the creature
console.log('\n3. Rendering creature...');
const svg = creature.render(partsManager);
console.log(`   ✅ SVG generated: ${svg.length} characters`);

// Test 4: Verify SVG contains expected elements
console.log('\n4. Verifying SVG content...');
const hasCircle = svg.includes('<circle');
const hasEllipse = svg.includes('<ellipse');
const hasHeadColor = svg.includes('#FF6B6B');
const hasBodyColor = svg.includes('#4ECDC4');
const hasHeadTransform = svg.includes('translate(0, -20)');
const hasBodyTransform = svg.includes('translate(0, 0)');
const noCurrentColor = !svg.includes('currentColor');

console.log(`   ${hasCircle ? '✅' : '❌'} Contains circle (head): ${hasCircle}`);
console.log(`   ${hasEllipse ? '✅' : '❌'} Contains ellipse (body): ${hasEllipse}`);
console.log(`   ${hasHeadColor ? '✅' : '❌'} Contains head color (#FF6B6B): ${hasHeadColor}`);
console.log(`   ${hasBodyColor ? '✅' : '❌'} Contains body color (#4ECDC4): ${hasBodyColor}`);
console.log(`   ${hasHeadTransform ? '✅' : '❌'} Head positioned correctly (translate(0, -20)): ${hasHeadTransform}`);
console.log(`   ${hasBodyTransform ? '✅' : '❌'} Body positioned correctly (translate(0, 0)): ${hasBodyTransform}`);
console.log(`   ${noCurrentColor ? '✅' : '❌'} No currentColor remaining: ${noCurrentColor}`);

// Test 5: Count elements
console.log('\n5. Element counts...');
const circleCount = (svg.match(/<circle/g) || []).length;
const ellipseCount = (svg.match(/<ellipse/g) || []).length;
const groupCount = (svg.match(/<g transform/g) || []).length;

console.log(`   ✅ Circles (heads): ${circleCount}`);
console.log(`   ✅ Ellipses (bodies): ${ellipseCount}`);
console.log(`   ✅ Transform groups: ${groupCount}`);

// Test 6: Show SVG structure
console.log('\n6. SVG Structure Preview:');
const svgPreview = svg.substring(0, 500) + (svg.length > 500 ? '...' : '');
console.log('   ' + svgPreview.split('\n').join('\n   '));

// Final summary
console.log('\n' + '='.repeat(60));
const allPassed = hasCircle && hasEllipse && hasHeadColor && hasBodyColor && 
                  hasHeadTransform && hasBodyTransform && noCurrentColor &&
                  circleCount > 0 && ellipseCount > 0 && groupCount >= 2;

if (allPassed) {
    console.log('✅ ALL TESTS PASSED - Head and body are rendering correctly!');
    process.exit(0);
} else {
    console.log('❌ SOME TESTS FAILED - Please check the output above');
    process.exit(1);
}
