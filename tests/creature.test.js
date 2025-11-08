/**
 * Tests for Creature rendering
 * These tests verify that creatures render correctly with all parts visible
 */

// Load the classes - Jest's jsdom environment provides DOM globals
const fs = require('fs');
const path = require('path');

// Read the JavaScript files
const partsCode = fs.readFileSync(path.join(__dirname, '../js/parts.js'), 'utf8');
const creatureCode = fs.readFileSync(path.join(__dirname, '../js/creature.js'), 'utf8');

// Execute the code directly - classes will be defined globally
// Jest's jsdom environment provides window, document, etc.
eval(partsCode);
eval(creatureCode);

describe('Creature Rendering Tests', () => {
    let partsManager;
    let creature;

    beforeEach(() => {
        partsManager = new PartsManager();
        creature = new Creature();
    });

    test('should render a creature with head and body', () => {
        // Set up a creature with head and body
        creature.parts.head = 'head1';
        creature.parts.body = 'body1';
        creature.colors.head = '#FF6B6B';
        creature.colors.body = '#4ECDC4';

        const svg = creature.render(partsManager);
        
        // Check that SVG is generated
        expect(svg).toBeTruthy();
        expect(svg).toContain('<svg');
        expect(svg).toContain('viewBox="0 0 100 100"');
        
        // Check that head is rendered (head1 is a round head - circle)
        expect(svg).toContain('circle');
        
        // Check that body is rendered (body1 is a round body - ellipse)
        expect(svg).toContain('ellipse');
        
        // Check that colors are applied
        expect(svg).toContain('#FF6B6B');
        expect(svg).toContain('#4ECDC4');
        
        // Check that currentColor was replaced
        expect(svg).not.toContain('currentColor');
    });

    test('should render all parts in correct order', () => {
        creature.parts.head = 'head1';
        creature.parts.body = 'body1';
        creature.parts.arms = 'arm1';
        creature.parts.legs = 'leg1';
        creature.parts.accessory = 'acc1';

        const svg = creature.render(partsManager);
        
        // Extract all transform attributes to check positioning
        const transformMatches = svg.match(/transform="translate\(([^)]+)\)"/g);
        expect(transformMatches).toBeTruthy();
        expect(transformMatches.length).toBe(5); // All 5 parts
        
        // Check that transforms exist with correct positions
        // Body at 50,50 -> translate(0,0)
        expect(svg).toContain('translate(0, 0)');
        // Legs at 50,75 -> translate(0,25)
        expect(svg).toContain('translate(0, 25)');
        // Head at 50,30 -> translate(0,-20)
        expect(svg).toContain('translate(0, -20)');
        // Accessory at 50,20 -> translate(0,-30)
        expect(svg).toContain('translate(0, -30)');
    });

    test('should handle missing parts gracefully', () => {
        // Only set head, no body
        creature.parts.head = 'head1';
        creature.parts.body = null;

        const svg = creature.render(partsManager);
        
        // Should still render SVG
        expect(svg).toBeTruthy();
        expect(svg).toContain('<svg');
        
        // Should contain head (circle) but not body (ellipse)
        expect(svg).toContain('circle'); // head
        expect(svg).not.toContain('ellipse'); // body should not be rendered
    });

    test('should extract SVG content correctly from parts', () => {
        const part = partsManager.getPart('heads', 'head1');
        expect(part).toBeTruthy();
        expect(part.svg).toBeTruthy();
        
        // Check that part SVG contains the expected structure
        expect(part.svg).toContain('<svg');
        expect(part.svg).toContain('circle');
        expect(part.svg).toContain('currentColor');
    });

    test('should replace currentColor with actual color', () => {
        creature.parts.head = 'head1';
        creature.colors.head = '#FF0000';

        const svg = creature.render(partsManager);
        
        // Should contain the color, not currentColor
        expect(svg).toContain('#FF0000');
        expect(svg).not.toContain('currentColor');
    });

    test('should render parts with correct positioning', () => {
        creature.parts.head = 'head1';
        creature.parts.body = 'body1';
        creature.parts.legs = 'leg1';

        const svg = creature.render(partsManager);
        
        // Parse the SVG to check structure
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
        const groups = svgDoc.querySelectorAll('g[transform]');
        
        // Should have 3 groups (head, body, legs)
        expect(groups.length).toBeGreaterThanOrEqual(3);
        
        // Check transforms
        const transforms = Array.from(groups).map(g => g.getAttribute('transform'));
        
        // Body should be at center (translate(0, 0))
        expect(transforms.some(t => t && t.includes('translate(0, 0)'))).toBe(true);
        
        // Legs should be below (translate(0, 25))
        expect(transforms.some(t => t && t.includes('translate(0, 25)'))).toBe(true);
        
        // Head should be above (translate(0, -20))
        expect(transforms.some(t => t && t.includes('translate(0, -20)'))).toBe(true);
    });

    test('should handle invalid part IDs gracefully', () => {
        creature.parts.head = 'invalid_head_id';
        creature.parts.body = 'body1';

        const svg = creature.render(partsManager);
        
        // Should still render SVG
        expect(svg).toBeTruthy();
        expect(svg).toContain('<svg');
        
        // Should render body but not invalid head
        expect(svg).toContain('ellipse'); // body
    });

    test('should render empty creature as valid SVG', () => {
        // No parts set
        const svg = creature.render(partsManager);
        
        expect(svg).toBeTruthy();
        expect(svg).toContain('<svg');
        expect(svg).toContain('viewBox="0 0 100 100"');
    });

    test('should verify head and body are both rendered when set', () => {
        creature.parts.head = 'head1';
        creature.parts.body = 'body1';
        
        const svg = creature.render(partsManager);
        
        // Count circles (head) and ellipses (body)
        const circleCount = (svg.match(/<circle/g) || []).length;
        const ellipseCount = (svg.match(/<ellipse/g) || []).length;
        
        // Should have at least one circle (head) and one ellipse (body)
        expect(circleCount).toBeGreaterThan(0);
        expect(ellipseCount).toBeGreaterThan(0);
    });
});

describe('PartsManager Tests', () => {
    let partsManager;

    beforeEach(() => {
        partsManager = new PartsManager();
    });

    test('should retrieve head parts', () => {
        const heads = partsManager.getParts('heads');
        expect(heads.length).toBeGreaterThan(0);
        expect(heads[0]).toHaveProperty('id');
        expect(heads[0]).toHaveProperty('svg');
    });

    test('should retrieve body parts', () => {
        const bodies = partsManager.getParts('bodies');
        expect(bodies.length).toBeGreaterThan(0);
        expect(bodies[0]).toHaveProperty('id');
        expect(bodies[0]).toHaveProperty('svg');
    });

    test('should get specific part by ID', () => {
        const head = partsManager.getPart('heads', 'head1');
        expect(head).toBeTruthy();
        expect(head.id).toBe('head1');
        expect(head.svg).toBeTruthy();
    });

    test('should return null for invalid part ID', () => {
        const part = partsManager.getPart('heads', 'invalid_id');
        expect(part).toBeNull();
    });
});
