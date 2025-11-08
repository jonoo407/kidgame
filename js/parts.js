// Creature parts data and management
class PartsManager {
    constructor() {
        this.parts = {
            heads: [
                { id: 'head1', name: 'Round Head', svg: this.createHeadSVG('round'), colorable: true, unlocked: true },
                { id: 'head2', name: 'Square Head', svg: this.createHeadSVG('square'), colorable: true, unlocked: true },
                { id: 'head3', name: 'Triangle Head', svg: this.createHeadSVG('triangle'), colorable: true, unlocked: false },
                { id: 'head4', name: 'Star Head', svg: this.createHeadSVG('star'), colorable: true, unlocked: false }
            ],
            bodies: [
                { id: 'body1', name: 'Round Body', svg: this.createBodySVG('round'), colorable: true, unlocked: true },
                { id: 'body2', name: 'Oval Body', svg: this.createBodySVG('oval'), colorable: true, unlocked: true },
                { id: 'body3', name: 'Square Body', svg: this.createBodySVG('square'), colorable: true, unlocked: false },
                { id: 'body4', name: 'Heart Body', svg: this.createBodySVG('heart'), colorable: true, unlocked: false }
            ],
            arms: [
                { id: 'arm1', name: 'Simple Arms', svg: this.createArmSVG('simple'), colorable: true, unlocked: true },
                { id: 'arm2', name: 'Wavy Arms', svg: this.createArmSVG('wavy'), colorable: true, unlocked: true },
                { id: 'arm3', name: 'Strong Arms', svg: this.createArmSVG('strong'), colorable: true, unlocked: false }
            ],
            legs: [
                { id: 'leg1', name: 'Simple Legs', svg: this.createLegSVG('simple'), colorable: true, unlocked: true },
                { id: 'leg2', name: 'Bent Legs', svg: this.createLegSVG('bent'), colorable: true, unlocked: true },
                { id: 'leg3', name: 'Hoof Legs', svg: this.createLegSVG('hoof'), colorable: true, unlocked: false }
            ],
            accessories: [
                { id: 'acc1', name: 'Hat', svg: this.createAccessorySVG('hat'), colorable: true, unlocked: true },
                { id: 'acc2', name: 'Crown', svg: this.createAccessorySVG('crown'), colorable: true, unlocked: false },
                { id: 'acc3', name: 'Wings', svg: this.createAccessorySVG('wings'), colorable: true, unlocked: false }
            ]
        };
    }

    // Get all parts of a type
    getParts(type) {
        return this.parts[type] || [];
    }

    // Get a specific part
    getPart(type, id) {
        const parts = this.getParts(type);
        return parts.find(p => p.id === id);
    }

    // Check if part is unlocked for user
    isUnlocked(partId, storage) {
        const part = this.findPart(partId);
        if (!part) return false;
        if (part.unlocked) return true;
        return storage ? storage.isPartUnlocked(partId) : false;
    }

    // Find part by ID across all types
    findPart(partId) {
        for (const type in this.parts) {
            const part = this.parts[type].find(p => p.id === partId);
            if (part) return part;
        }
        return null;
    }

    // Create SVG for head
    createHeadSVG(style) {
        const svgs = {
            round: '<circle cx="50" cy="50" r="40" fill="currentColor"/>',
            square: '<rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor"/>',
            triangle: '<polygon points="50,10 90,80 10,80" fill="currentColor"/>',
            star: '<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for body
    createBodySVG(style) {
        const svgs = {
            round: '<ellipse cx="50" cy="50" rx="35" ry="45" fill="currentColor"/>',
            oval: '<ellipse cx="50" cy="50" rx="40" ry="50" fill="currentColor"/>',
            square: '<rect x="15" y="5" width="70" height="90" rx="15" fill="currentColor"/>',
            heart: '<path d="M50,30 C50,20 40,15 35,20 C30,15 20,20 20,30 C20,35 25,40 35,50 L50,65 L65,50 C75,40 80,35 80,30 C80,20 70,15 65,20 C60,15 50,20 50,30 Z" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for arms
    createArmSVG(style) {
        const svgs = {
            simple: '<rect x="10" y="20" width="15" height="60" rx="7" fill="currentColor"/><rect x="75" y="20" width="15" height="60" rx="7" fill="currentColor"/>',
            wavy: '<path d="M10,20 Q20,40 15,60 Q10,80 20,80" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M90,20 Q80,40 85,60 Q90,80 80,80" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/>',
            strong: '<rect x="5" y="15" width="20" height="70" rx="10" fill="currentColor"/><rect x="75" y="15" width="20" height="70" rx="10" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for legs
    createLegSVG(style) {
        const svgs = {
            simple: '<rect x="25" y="50" width="15" height="50" rx="7" fill="currentColor"/><rect x="60" y="50" width="15" height="50" rx="7" fill="currentColor"/>',
            bent: '<path d="M25,50 L30,75 L25,100" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M75,50 L70,75 L75,100" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/>',
            hoof: '<rect x="25" y="50" width="15" height="45" rx="7" fill="currentColor"/><ellipse cx="32.5" cy="95" rx="10" ry="5" fill="currentColor"/><rect x="60" y="50" width="15" height="45" rx="7" fill="currentColor"/><ellipse cx="67.5" cy="95" rx="10" ry="5" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for accessories
    createAccessorySVG(style) {
        const svgs = {
            hat: '<path d="M20,30 L50,20 L80,30 L80,40 L20,40 Z" fill="currentColor"/><rect x="30" y="40" width="40" height="10" fill="currentColor"/>',
            crown: '<path d="M30,40 L40,20 L50,30 L60,20 L70,40 L70,50 L30,50 Z" fill="currentColor"/>',
            wings: '<path d="M10,50 Q20,30 30,50 Q20,70 10,50" fill="currentColor"/><path d="M90,50 Q80,30 70,50 Q80,70 90,50" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.hat}</svg>`;
    }

    // Get default colors
    getDefaultColors() {
        return [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'
        ];
    }
}

