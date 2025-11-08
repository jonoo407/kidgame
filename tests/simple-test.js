#!/usr/bin/env node
/**
 * Simple Node.js test script for creature rendering
 * Run with: node tests/simple-test.js
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

// Load and execute the code - use Function constructor to execute in global scope
const partsCode = fs.readFileSync(path.join(__dirname, '../js/parts.js'), 'utf8');
const creatureCode = fs.readFileSync(path.join(__dirname, '../js/creature.js'), 'utf8');

// Execute code - classes will be defined in global scope
const executeCode = new Function(partsCode + '\n' + creatureCode);
executeCode();

// Classes should now be available
if (typeof PartsManager === 'undefined' || typeof Creature === 'undefined') {
    console.error('ERROR: Classes not loaded. PartsManager:', typeof PartsManager, 'Creature:', typeof Creature);
    process.exit(1);
}

// Tests
console.log('🧪 Running Creature Rendering Tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(`   Error: ${error.message}`);
        failed++;
    }
}

// Test 1: PartsManager can be instantiated
test('PartsManager can be instantiated', () => {
    const pm = new PartsManager();
    if (!pm) throw new Error('PartsManager is null');
});

// Test 2: Creature can be instantiated
test('Creature can be instantiated', () => {
    const c = new Creature();
    if (!c) throw new Error('Creature is null');
});

// Test 3: Can get head part
test('Can get head part', () => {
    const pm = new PartsManager();
    const head = pm.getPart('heads', 'head1');
    if (!head) throw new Error('Head part not found');
    if (!head.svg) throw new Error('Head part has no SVG');
});

// Test 4: Can get body part
test('Can get body part', () => {
    const pm = new PartsManager();
    const body = pm.getPart('bodies', 'body1');
    if (!body) throw new Error('Body part not found');
    if (!body.svg) throw new Error('Body part has no SVG');
});

// Test 5: Can render creature with head and body
test('Can render creature with head and body', () => {
    const pm = new PartsManager();
    const creature = new Creature();
    creature.parts.head = 'head1';
    creature.parts.body = 'body1';
    creature.colors.head = '#FF6B6B';
    creature.colors.body = '#4ECDC4';
    
    const svg = creature.render(pm);
    if (!svg) throw new Error('SVG is empty');
    if (!svg.includes('<svg')) throw new Error('SVG does not contain <svg tag');
    if (!svg.includes('circle')) throw new Error('SVG does not contain circle (head)');
    if (!svg.includes('ellipse')) throw new Error('SVG does not contain ellipse (body)');
    if (!svg.includes('#FF6B6B')) throw new Error('SVG does not contain head color');
    if (!svg.includes('#4ECDC4')) throw new Error('SVG does not contain body color');
    if (svg.includes('currentColor')) throw new Error('SVG still contains currentColor');
});

// Test 6: SVG extraction works correctly
test('SVG extraction works correctly', () => {
    const pm = new PartsManager();
    const head = pm.getPart('heads', 'head1');
    const svg = head.svg;
    
    // Should contain <svg tag
    if (!svg.includes('<svg')) throw new Error('Part SVG does not contain <svg tag');
    
    // Test extraction
    let content = svg.trim();
    content = content.replace(/<svg[^>]*>/gi, '');
    content = content.replace(/<\/svg>/gi, '');
    content = content.trim();
    
    if (!content) throw new Error('Extracted content is empty');
    if (content.includes('<svg')) throw new Error('Extracted content still contains <svg tag');
});

// Test 7: Parts are positioned correctly
test('Parts are positioned correctly', () => {
    const pm = new PartsManager();
    const creature = new Creature();
    creature.parts.head = 'head1';
    creature.parts.body = 'body1';
    creature.parts.legs = 'leg1';
    
    const svg = creature.render(pm);
    
    // Check for transforms
    if (!svg.includes('translate(0, 0)')) throw new Error('Body transform not found (should be translate(0, 0))');
    if (!svg.includes('translate(0, -20)')) throw new Error('Head transform not found (should be translate(0, -20))');
    if (!svg.includes('translate(0, 25)')) throw new Error('Legs transform not found (should be translate(0, 25))');
});

// Test 8: Empty creature renders valid SVG
test('Empty creature renders valid SVG', () => {
    const pm = new PartsManager();
    const creature = new Creature();
    const svg = creature.render(pm);
    
    if (!svg) throw new Error('SVG is empty');
    if (!svg.includes('<svg')) throw new Error('SVG does not contain <svg tag');
    if (!svg.includes('viewBox="0 0 100 100"')) throw new Error('SVG does not have correct viewBox');
});

console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
