// Creature parts data and management
class PartsManager {
    constructor() {
        this.parts = {
            heads: [
                { id: 'head1', name: 'Round Head', svg: this.createHeadSVG('round'), colorable: true, unlocked: true },
                { id: 'head2', name: 'Square Head', svg: this.createHeadSVG('square'), colorable: true, unlocked: true },
                { id: 'head3', name: 'Triangle Head', svg: this.createHeadSVG('triangle'), colorable: true, unlocked: false },
                { id: 'head4', name: 'Star Head', svg: this.createHeadSVG('star'), colorable: true, unlocked: false },
                { id: 'head5', name: 'Hexagon Head', svg: this.createHeadSVG('hexagon'), colorable: true, unlocked: true },
                { id: 'head6', name: 'Diamond Head', svg: this.createHeadSVG('diamond'), colorable: true, unlocked: true },
                { id: 'head7', name: 'Cloud Head', svg: this.createHeadSVG('cloud'), colorable: true, unlocked: false },
                { id: 'head8', name: 'Robot Head', svg: this.createHeadSVG('robot'), colorable: true, unlocked: false }
            ],
            bodies: [
                { id: 'body1', name: 'Round Body', svg: this.createBodySVG('round'), colorable: true, unlocked: true },
                { id: 'body2', name: 'Oval Body', svg: this.createBodySVG('oval'), colorable: true, unlocked: true },
                { id: 'body3', name: 'Square Body', svg: this.createBodySVG('square'), colorable: true, unlocked: false },
                { id: 'body4', name: 'Heart Body', svg: this.createBodySVG('heart'), colorable: true, unlocked: false },
                { id: 'body5', name: 'Diamond Body', svg: this.createBodySVG('diamond'), colorable: true, unlocked: true },
                { id: 'body6', name: 'Cloud Body', svg: this.createBodySVG('cloud'), colorable: true, unlocked: false },
                { id: 'body7', name: 'Robot Body', svg: this.createBodySVG('robot'), colorable: true, unlocked: false },
                { id: 'body8', name: 'Octagon Body', svg: this.createBodySVG('octagon'), colorable: true, unlocked: false }
            ],
            arms: [
                { id: 'arm1', name: 'Simple Arms', svg: this.createArmSVG('simple'), colorable: true, unlocked: true },
                { id: 'arm2', name: 'Wavy Arms', svg: this.createArmSVG('wavy'), colorable: true, unlocked: true },
                { id: 'arm3', name: 'Strong Arms', svg: this.createArmSVG('strong'), colorable: true, unlocked: false },
                { id: 'arm4', name: 'Tentacle Arms', svg: this.createArmSVG('tentacle'), colorable: true, unlocked: true },
                { id: 'arm5', name: 'Wing Arms', svg: this.createArmSVG('wing'), colorable: true, unlocked: false },
                { id: 'arm6', name: 'Robot Arms', svg: this.createArmSVG('robot'), colorable: true, unlocked: false },
                { id: 'arm7', name: 'Floating Arms', svg: this.createArmSVG('floating'), colorable: true, unlocked: false }
            ],
            legs: [
                { id: 'leg1', name: 'Simple Legs', svg: this.createLegSVG('simple'), colorable: true, unlocked: true },
                { id: 'leg2', name: 'Bent Legs', svg: this.createLegSVG('bent'), colorable: true, unlocked: true },
                { id: 'leg3', name: 'Hoof Legs', svg: this.createLegSVG('hoof'), colorable: true, unlocked: false },
                { id: 'leg4', name: 'Robot Legs', svg: this.createLegSVG('robot'), colorable: true, unlocked: true },
                { id: 'leg5', name: 'Tentacle Legs', svg: this.createLegSVG('tentacle'), colorable: true, unlocked: false },
                { id: 'leg6', name: 'Wheel Legs', svg: this.createLegSVG('wheel'), colorable: true, unlocked: false },
                { id: 'leg7', name: 'Floating Legs', svg: this.createLegSVG('floating'), colorable: true, unlocked: false }
            ],
            accessories: [
                { id: 'acc1', name: 'Hat', svg: this.createAccessorySVG('hat'), colorable: true, unlocked: true },
                { id: 'acc2', name: 'Crown', svg: this.createAccessorySVG('crown'), colorable: true, unlocked: false },
                { id: 'acc3', name: 'Wings', svg: this.createAccessorySVG('wings'), colorable: true, unlocked: false },
                { id: 'acc4', name: 'Glasses', svg: this.createAccessorySVG('glasses'), colorable: true, unlocked: true },
                { id: 'acc5', name: 'Bow Tie', svg: this.createAccessorySVG('bowtie'), colorable: true, unlocked: true },
                { id: 'acc6', name: 'Cape', svg: this.createAccessorySVG('cape'), colorable: true, unlocked: false },
                { id: 'acc7', name: 'Halo', svg: this.createAccessorySVG('halo'), colorable: true, unlocked: false },
                { id: 'acc8', name: 'Antenna', svg: this.createAccessorySVG('antenna'), colorable: true, unlocked: false }
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
            star: '<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor"/>',
            hexagon: '<polygon points="50,10 80,25 80,75 50,90 20,75 20,25" fill="currentColor"/>',
            diamond: '<polygon points="50,10 90,50 50,90 10,50" fill="currentColor"/>',
            cloud: '<path d="M30,50 Q20,40 30,30 Q40,20 50,30 Q60,20 70,30 Q80,40 70,50 Q80,60 70,70 Q60,80 50,70 Q40,80 30,70 Q20,60 30,50 Z" fill="currentColor"/>',
            robot: '<rect x="15" y="15" width="70" height="70" rx="5" fill="currentColor"/><circle cx="35" cy="40" r="8" fill="#333"/><circle cx="65" cy="40" r="8" fill="#333"/><rect x="30" y="60" width="40" height="8" rx="2" fill="#333"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for body
    createBodySVG(style) {
        const svgs = {
            round: '<ellipse cx="50" cy="50" rx="35" ry="45" fill="currentColor"/>',
            oval: '<ellipse cx="50" cy="50" rx="40" ry="50" fill="currentColor"/>',
            square: '<rect x="15" y="5" width="70" height="90" rx="15" fill="currentColor"/>',
            heart: '<path d="M50,30 C50,20 40,15 35,20 C30,15 20,20 20,30 C20,35 25,40 35,50 L50,65 L65,50 C75,40 80,35 80,30 C80,20 70,15 65,20 C60,15 50,20 50,30 Z" fill="currentColor"/>',
            diamond: '<polygon points="50,10 85,50 50,90 15,50" fill="currentColor"/>',
            cloud: '<path d="M25,50 Q15,40 25,30 Q35,20 50,30 Q60,20 75,30 Q85,40 75,50 Q85,60 75,70 Q60,80 50,70 Q35,80 25,70 Q15,60 25,50 Z" fill="currentColor"/>',
            robot: '<rect x="20" y="10" width="60" height="80" rx="8" fill="currentColor"/><rect x="30" y="25" width="15" height="15" rx="2" fill="#333"/><rect x="55" y="25" width="15" height="15" rx="2" fill="#333"/><rect x="35" y="50" width="30" height="8" rx="2" fill="#333"/><rect x="40" y="65" width="20" height="20" rx="3" fill="#333"/>',
            octagon: '<polygon points="50,10 75,20 85,45 75,70 50,80 25,70 15,45 25,20" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for arms
    createArmSVG(style) {
        const svgs = {
            simple: '<rect x="10" y="20" width="15" height="60" rx="7" fill="currentColor"/><rect x="75" y="20" width="15" height="60" rx="7" fill="currentColor"/>',
            wavy: '<path d="M10,20 Q20,40 15,60 Q10,80 20,80" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M90,20 Q80,40 85,60 Q90,80 80,80" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/>',
            strong: '<rect x="5" y="15" width="20" height="70" rx="10" fill="currentColor"/><rect x="75" y="15" width="20" height="70" rx="10" fill="currentColor"/>',
            tentacle: '<path d="M10,20 Q15,35 12,50 Q10,65 15,80" stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M90,20 Q85,35 88,50 Q90,65 85,80" stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="12" cy="50" r="6" fill="currentColor"/><circle cx="88" cy="50" r="6" fill="currentColor"/>',
            wing: '<path d="M10,30 Q5,50 10,70 Q20,60 25,50 Q20,40 10,30" fill="currentColor"/><path d="M90,30 Q95,50 90,70 Q80,60 75,50 Q80,40 90,30" fill="currentColor"/>',
            robot: '<rect x="5" y="20" width="18" height="65" rx="4" fill="currentColor"/><rect x="77" y="20" width="18" height="65" rx="4" fill="currentColor"/><rect x="8" y="25" width="12" height="8" rx="2" fill="#333"/><rect x="80" y="25" width="12" height="8" rx="2" fill="#333"/><circle cx="14" cy="50" r="4" fill="#333"/><circle cx="86" cy="50" r="4" fill="#333"/>',
            floating: '<circle cx="15" cy="30" r="12" fill="currentColor" opacity="0.7"/><circle cx="25" cy="50" r="10" fill="currentColor" opacity="0.8"/><circle cx="20" cy="70" r="8" fill="currentColor"/><circle cx="85" cy="30" r="12" fill="currentColor" opacity="0.7"/><circle cx="75" cy="50" r="10" fill="currentColor" opacity="0.8"/><circle cx="80" cy="70" r="8" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for legs
    createLegSVG(style) {
        const svgs = {
            simple: '<rect x="25" y="50" width="15" height="50" rx="7" fill="currentColor"/><rect x="60" y="50" width="15" height="50" rx="7" fill="currentColor"/>',
            bent: '<path d="M25,50 L30,75 L25,100" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M75,50 L70,75 L75,100" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/>',
            hoof: '<rect x="25" y="50" width="15" height="45" rx="7" fill="currentColor"/><ellipse cx="32.5" cy="95" rx="10" ry="5" fill="currentColor"/><rect x="60" y="50" width="15" height="45" rx="7" fill="currentColor"/><ellipse cx="67.5" cy="95" rx="10" ry="5" fill="currentColor"/>',
            robot: '<rect x="22" y="50" width="18" height="50" rx="4" fill="currentColor"/><rect x="60" y="50" width="18" height="50" rx="4" fill="currentColor"/><rect x="25" y="90" width="12" height="10" rx="2" fill="#333"/><rect x="63" y="90" width="12" height="10" rx="2" fill="#333"/><circle cx="31" cy="70" r="3" fill="#333"/><circle cx="69" cy="70" r="3" fill="#333"/>',
            tentacle: '<path d="M25,50 Q30,70 28,90 Q25,100 30,100" stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M75,50 Q70,70 72,90 Q75,100 70,100" stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="28" cy="70" r="6" fill="currentColor"/><circle cx="72" cy="70" r="6" fill="currentColor"/>',
            wheel: '<circle cx="32.5" cy="75" r="20" fill="currentColor" stroke="#333" stroke-width="3"/><circle cx="32.5" cy="75" r="12" fill="#333"/><circle cx="67.5" cy="75" r="20" fill="currentColor" stroke="#333" stroke-width="3"/><circle cx="67.5" cy="75" r="12" fill="#333"/>',
            floating: '<circle cx="30" cy="60" r="10" fill="currentColor" opacity="0.7"/><circle cx="32" cy="80" r="8" fill="currentColor" opacity="0.8"/><circle cx="30" cy="95" r="6" fill="currentColor"/><circle cx="70" cy="60" r="10" fill="currentColor" opacity="0.7"/><circle cx="68" cy="80" r="8" fill="currentColor" opacity="0.8"/><circle cx="70" cy="95" r="6" fill="currentColor"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for accessories
    createAccessorySVG(style) {
        const svgs = {
            hat: '<path d="M20,30 L50,20 L80,30 L80,40 L20,40 Z" fill="currentColor"/><rect x="30" y="40" width="40" height="10" fill="currentColor"/>',
            crown: '<path d="M30,40 L40,20 L50,30 L60,20 L70,40 L70,50 L30,50 Z" fill="currentColor"/>',
            wings: '<path d="M10,50 Q20,30 30,50 Q20,70 10,50" fill="currentColor"/><path d="M90,50 Q80,30 70,50 Q80,70 90,50" fill="currentColor"/>',
            glasses: '<rect x="15" y="35" width="25" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><rect x="60" y="35" width="25" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><line x1="40" y1="45" x2="60" y2="45" stroke="currentColor" stroke-width="3"/><line x1="10" y1="45" x2="15" y2="45" stroke="currentColor" stroke-width="3"/><line x1="85" y1="45" x2="90" y2="45" stroke="currentColor" stroke-width="3"/>',
            bowtie: '<path d="M40,50 L50,45 L60,50 L60,60 L50,55 L40,60 Z" fill="currentColor"/><circle cx="40" cy="55" r="8" fill="currentColor"/><circle cx="60" cy="55" r="8" fill="currentColor"/>',
            cape: '<path d="M50,20 L30,50 L30,90 L50,80 L70,90 L70,50 Z" fill="currentColor"/>',
            halo: '<path d="M30,25 Q50,15 70,25" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="50" cy="25" r="2" fill="currentColor"/>',
            antenna: '<line x1="50" y1="5" x2="50" y2="25" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="5" r="6" fill="currentColor"/><circle cx="50" cy="5" r="3" fill="#333"/>'
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

