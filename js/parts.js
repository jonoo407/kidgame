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

    // Create SVG for head - improved with facial features and gradients
    createHeadSVG(style) {
        const defs = '<defs><radialGradient id="headGrad" cx="45%" cy="35%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.7"/></radialGradient><filter id="headShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dx="1" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
        
        const svgs = {
            round: defs + '<circle cx="50" cy="50" r="38" fill="url(#headGrad)" filter="url(#headShadow)"/><ellipse cx="50" cy="48" rx="36" ry="34" fill="currentColor" opacity="0.9"/><circle cx="38" cy="42" r="6" fill="#fff"/><circle cx="62" cy="42" r="6" fill="#fff"/><circle cx="38" cy="42" r="4" fill="#333"/><circle cx="62" cy="42" r="4" fill="#333"/><ellipse cx="50" cy="58" rx="8" ry="6" fill="#333" opacity="0.6"/><path d="M42,58 Q50,62 58,58" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
            square: defs + '<rect x="12" y="12" width="76" height="76" rx="12" ry="12" fill="url(#headGrad)" filter="url(#headShadow)"/><rect x="14" y="14" width="72" height="72" rx="10" fill="currentColor" opacity="0.95"/><circle cx="35" cy="40" r="7" fill="#fff"/><circle cx="65" cy="40" r="7" fill="#fff"/><circle cx="35" cy="40" r="5" fill="#333"/><circle cx="65" cy="40" r="5" fill="#333"/><rect x="38" y="58" width="24" height="4" rx="2" fill="#333" opacity="0.7"/><path d="M38,60 Q50,65 62,60" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
            triangle: defs + '<polygon points="50,15 88,82 12,82" fill="url(#headGrad)" filter="url(#headShadow)"/><polygon points="50,17 85,80 15,80" fill="currentColor" opacity="0.9"/><circle cx="40" cy="45" r="6" fill="#fff"/><circle cx="60" cy="45" r="6" fill="#fff"/><circle cx="40" cy="45" r="4" fill="#333"/><circle cx="60" cy="45" r="4" fill="#333"/><path d="M45,65 Q50,70 55,65" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
            star: defs + '<polygon points="50,8 58,32 82,32 64,48 72,72 50,58 28,72 36,48 18,32 42,32" fill="url(#headGrad)" filter="url(#headShadow)"/><polygon points="50,10 57,30 80,30 63,45 70,68 50,55 30,68 37,45 20,30 43,30" fill="currentColor" opacity="0.9"/><circle cx="42" cy="38" r="5" fill="#fff"/><circle cx="58" cy="38" r="5" fill="#fff"/><circle cx="42" cy="38" r="3.5" fill="#333"/><circle cx="58" cy="38" r="3.5" fill="#333"/><path d="M45,52 Q50,56 55,52" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
            hexagon: defs + '<polygon points="50,12 78,28 78,72 50,88 22,72 22,28" fill="url(#headGrad)" filter="url(#headShadow)"/><polygon points="50,14 75,28 75,72 50,85 25,72 25,28" fill="currentColor" opacity="0.9"/><circle cx="40" cy="42" r="6" fill="#fff"/><circle cx="60" cy="42" r="6" fill="#fff"/><circle cx="40" cy="42" r="4" fill="#333"/><circle cx="60" cy="42" r="4" fill="#333"/><ellipse cx="50" cy="58" rx="8" ry="5" fill="#333" opacity="0.6"/><path d="M42,58 Q50,62 58,58" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
            diamond: defs + '<polygon points="50,12 88,50 50,88 12,50" fill="url(#headGrad)" filter="url(#headShadow)"/><polygon points="50,14 85,50 50,85 15,50" fill="currentColor" opacity="0.9"/><circle cx="42" cy="42" r="5" fill="#fff"/><circle cx="58" cy="42" r="5" fill="#fff"/><circle cx="42" cy="42" r="3.5" fill="#333"/><circle cx="58" cy="42" r="3.5" fill="#333"/><path d="M45,58 Q50,62 55,58" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
            cloud: defs + '<path d="M25,50 Q15,38 25,28 Q38,15 50,28 Q62,15 75,28 Q85,38 75,50 Q85,62 75,72 Q62,85 50,72 Q38,85 25,72 Q15,62 25,50 Z" fill="url(#headGrad)" filter="url(#headShadow)"/><path d="M27,50 Q18,40 27,30 Q38,18 50,30 Q62,18 73,30 Q82,40 73,50 Q82,60 73,70 Q62,82 50,70 Q38,82 27,70 Q18,60 27,50 Z" fill="currentColor" opacity="0.9"/><circle cx="40" cy="42" r="5" fill="#fff"/><circle cx="60" cy="42" r="5" fill="#fff"/><circle cx="40" cy="42" r="3.5" fill="#333"/><circle cx="60" cy="42" r="3.5" fill="#333"/><path d="M42,58 Q50,62 58,58" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
            robot: defs + '<rect x="16" y="16" width="68" height="68" rx="6" fill="url(#headGrad)" filter="url(#headShadow)"/><rect x="18" y="18" width="64" height="64" rx="5" fill="currentColor" opacity="0.95"/><rect x="25" y="28" width="12" height="12" rx="2" fill="#4a90e2"/><rect x="63" y="28" width="12" height="12" rx="2" fill="#4a90e2"/><circle cx="31" cy="34" r="3" fill="#fff"/><circle cx="69" cy="34" r="3" fill="#fff"/><rect x="32" y="58" width="36" height="6" rx="3" fill="#666"/><rect x="35" y="60" width="30" height="2" fill="#999"/><circle cx="40" cy="48" r="2" fill="#666"/><circle cx="50" cy="48" r="2" fill="#666"/><circle cx="60" cy="48" r="2" fill="#666"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for body - improved with gradients and details
    createBodySVG(style) {
        const defs = '<defs><radialGradient id="bodyGrad" cx="50%" cy="40%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.75"/></radialGradient><filter id="bodyShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/><feOffset dx="1" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
        
        const svgs = {
            round: defs + '<ellipse cx="50" cy="50" rx="33" ry="43" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><ellipse cx="50" cy="48" rx="31" ry="41" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="35" rx="12" ry="8" fill="currentColor" opacity="0.3"/><ellipse cx="50" cy="65" rx="15" ry="10" fill="currentColor" opacity="0.2"/>',
            oval: defs + '<ellipse cx="50" cy="50" rx="38" ry="48" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><ellipse cx="50" cy="48" rx="36" ry="46" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="32" rx="14" ry="9" fill="currentColor" opacity="0.3"/><ellipse cx="50" cy="68" rx="18" ry="12" fill="currentColor" opacity="0.2"/>',
            square: defs + '<rect x="17" y="7" width="66" height="86" rx="16" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><rect x="19" y="9" width="62" height="82" rx="14" fill="currentColor" opacity="0.95"/><rect x="28" y="20" width="44" height="6" rx="3" fill="currentColor" opacity="0.3"/><rect x="30" y="70" width="40" height="8" rx="4" fill="currentColor" opacity="0.2"/>',
            heart: defs + '<path d="M50,32 C50,22 40,17 35,22 C30,17 20,22 20,32 C20,37 25,42 35,52 L50,67 L65,52 C75,42 80,37 80,32 C80,22 70,17 65,22 C60,17 50,22 50,32 Z" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><path d="M50,33 C50,23 41,18 36,23 C31,18 22,23 22,33 C22,38 27,43 36,52 L50,65 L64,52 C73,43 78,38 78,33 C78,23 69,18 64,23 C59,18 50,23 50,33 Z" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="42" rx="8" ry="6" fill="currentColor" opacity="0.3"/>',
            diamond: defs + '<polygon points="50,12 85,50 50,88 15,50" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><polygon points="50,14 82,50 50,85 18,50" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="38" rx="10" ry="6" fill="currentColor" opacity="0.3"/><ellipse cx="50" cy="62" rx="12" ry="8" fill="currentColor" opacity="0.2"/>',
            cloud: defs + '<path d="M27,50 Q17,40 27,32 Q38,22 50,32 Q62,22 73,32 Q83,40 73,50 Q83,60 73,68 Q62,78 50,68 Q38,78 27,68 Q17,60 27,50 Z" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><path d="M29,50 Q20,42 29,34 Q39,24 50,34 Q61,24 71,34 Q80,42 71,50 Q80,58 71,66 Q61,76 50,66 Q39,76 29,66 Q20,58 29,50 Z" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="42" rx="12" ry="8" fill="currentColor" opacity="0.25"/>',
            robot: defs + '<rect x="22" y="12" width="56" height="76" rx="9" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><rect x="24" y="14" width="52" height="72" rx="7" fill="currentColor" opacity="0.95"/><rect x="32" y="28" width="14" height="14" rx="2" fill="#4a90e2"/><rect x="54" y="28" width="14" height="14" rx="2" fill="#4a90e2"/><circle cx="39" cy="35" r="3" fill="#fff"/><circle cx="61" cy="35" r="3" fill="#fff"/><rect x="37" y="52" width="26" height="6" rx="3" fill="#666"/><rect x="40" y="54" width="20" height="2" fill="#999"/><rect x="42" y="68" width="16" height="18" rx="4" fill="#333"/><rect x="45" y="71" width="10" height="12" rx="2" fill="#555"/><circle cx="48" cy="77" r="2" fill="#888"/>',
            octagon: defs + '<polygon points="50,12 73,22 83,45 73,68 50,78 27,68 17,45 27,22" fill="url(#bodyGrad)" filter="url(#bodyShadow)"/><polygon points="50,14 71,23 80,45 71,66 50,75 29,66 20,45 29,23" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="38" rx="10" ry="6" fill="currentColor" opacity="0.3"/><ellipse cx="50" cy="62" rx="12" ry="8" fill="currentColor" opacity="0.2"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.round}</svg>`;
    }

    // Create SVG for arms - improved with more natural shapes and details
    createArmSVG(style) {
        const defs = '<defs><linearGradient id="armGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.8"/></linearGradient><filter id="armShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/><feOffset dx="1" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
        
        const svgs = {
            simple: defs + '<path d="M12,22 Q8,25 12,28 L12,75 Q8,78 12,80 L20,80 Q24,78 20,75 L20,28 Q24,25 20,22 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><path d="M72,22 Q68,25 72,28 L72,75 Q68,78 72,80 L80,80 Q84,78 80,75 L80,28 Q84,25 80,22 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><ellipse cx="16" cy="25" rx="4" ry="3" fill="currentColor" opacity="0.6"/><ellipse cx="84" cy="25" rx="4" ry="3" fill="currentColor" opacity="0.6"/><ellipse cx="16" cy="50" rx="3" ry="2" fill="currentColor" opacity="0.4"/><ellipse cx="84" cy="50" rx="3" ry="2" fill="currentColor" opacity="0.4"/>',
            wavy: defs + '<path d="M12,22 Q18,38 15,52 Q12,68 18,78" stroke="url(#armGrad)" stroke-width="13" fill="none" stroke-linecap="round" filter="url(#armShadow)"/><path d="M88,22 Q82,38 85,52 Q88,68 82,78" stroke="url(#armGrad)" stroke-width="13" fill="none" stroke-linecap="round" filter="url(#armShadow)"/><circle cx="15" cy="37" r="5" fill="currentColor" opacity="0.5"/><circle cx="85" cy="37" r="5" fill="currentColor" opacity="0.5"/><circle cx="15" cy="60" r="4" fill="currentColor" opacity="0.4"/><circle cx="85" cy="60" r="4" fill="currentColor" opacity="0.4"/>',
            strong: defs + '<path d="M7,17 Q3,20 7,23 L7,82 Q3,85 7,87 L23,87 Q27,85 23,82 L23,23 Q27,20 23,17 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><path d="M77,17 Q73,20 77,23 L77,82 Q73,85 77,87 L93,87 Q97,85 93,82 L93,23 Q97,20 93,17 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><ellipse cx="15" cy="30" rx="6" ry="4" fill="currentColor" opacity="0.5"/><ellipse cx="85" cy="30" rx="6" ry="4" fill="currentColor" opacity="0.5"/><ellipse cx="15" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.4"/><ellipse cx="85" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.4"/>',
            tentacle: defs + '<path d="M12,22 Q16,32 14,42 Q12,52 16,62 Q12,72 18,78" stroke="url(#armGrad)" stroke-width="15" fill="none" stroke-linecap="round" filter="url(#armShadow)"/><path d="M88,22 Q84,32 86,42 Q88,52 84,62 Q88,72 82,78" stroke="url(#armGrad)" stroke-width="15" fill="none" stroke-linecap="round" filter="url(#armShadow)"/><circle cx="14" cy="42" r="7" fill="currentColor" opacity="0.7"/><circle cx="86" cy="42" r="7" fill="currentColor" opacity="0.7"/><circle cx="15" cy="62" r="5" fill="currentColor" opacity="0.6"/><circle cx="85" cy="62" r="5" fill="currentColor" opacity="0.6"/><circle cx="14" cy="32" r="4" fill="currentColor" opacity="0.5"/><circle cx="86" cy="32" r="4" fill="currentColor" opacity="0.5"/>',
            wing: defs + '<path d="M12,32 Q5,48 10,65 Q18,58 22,48 Q18,38 12,32 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><path d="M88,32 Q95,48 90,65 Q82,58 78,48 Q82,38 88,32 Z" fill="url(#armGrad)" filter="url(#armShadow)"/><path d="M12,32 Q8,40 10,48 Q12,55 15,58" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><path d="M88,32 Q92,40 90,48 Q88,55 85,58" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><ellipse cx="16" cy="48" rx="3" ry="2" fill="currentColor" opacity="0.3"/><ellipse cx="84" cy="48" rx="3" ry="2" fill="currentColor" opacity="0.3"/>',
            robot: defs + '<rect x="7" y="22" width="16" height="63" rx="5" fill="url(#armGrad)" filter="url(#armShadow)"/><rect x="77" y="22" width="16" height="63" rx="5" fill="url(#armGrad)" filter="url(#armShadow)"/><rect x="10" y="27" width="10" height="7" rx="2" fill="#333"/><rect x="80" y="27" width="10" height="7" rx="2" fill="#333"/><circle cx="16" cy="52" r="5" fill="#333"/><circle cx="84" cy="52" r="5" fill="#333"/><rect x="12" y="45" width="8" height="2" rx="1" fill="#666"/><rect x="80" y="45" width="8" height="2" rx="1" fill="#666"/><rect x="12" y="60" width="8" height="2" rx="1" fill="#666"/><rect x="80" y="60" width="8" height="2" rx="1" fill="#666"/>',
            floating: defs + '<circle cx="17" cy="32" r="11" fill="url(#armGrad)" opacity="0.75" filter="url(#armShadow)"/><circle cx="25" cy="52" r="9" fill="url(#armGrad)" opacity="0.85" filter="url(#armShadow)"/><circle cx="22" cy="72" r="7" fill="url(#armGrad)" opacity="0.95" filter="url(#armShadow)"/><circle cx="83" cy="32" r="11" fill="url(#armGrad)" opacity="0.75" filter="url(#armShadow)"/><circle cx="75" cy="52" r="9" fill="url(#armGrad)" opacity="0.85" filter="url(#armShadow)"/><circle cx="78" cy="72" r="7" fill="url(#armGrad)" opacity="0.95" filter="url(#armShadow)"/><circle cx="17" cy="32" r="4" fill="currentColor" opacity="0.3"/><circle cx="83" cy="32" r="4" fill="currentColor" opacity="0.3"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for legs - improved with better anatomy and details
    createLegSVG(style) {
        const defs = '<defs><linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.75"/></linearGradient><filter id="legShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dx="1" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
        
        const svgs = {
            simple: defs + '<path d="M27,52 Q25,55 27,58 L27,95 Q25,98 27,100 L35,100 Q37,98 35,95 L35,58 Q37,55 35,52 Z" fill="url(#legGrad)" filter="url(#legShadow)"/><path d="M62,52 Q60,55 62,58 L62,95 Q60,98 62,100 L70,100 Q72,98 70,95 L70,58 Q72,55 70,52 Z" fill="url(#legGrad)" filter="url(#legShadow)"/><ellipse cx="31" cy="55" rx="3" ry="2" fill="currentColor" opacity="0.5"/><ellipse cx="69" cy="55" rx="3" ry="2" fill="currentColor" opacity="0.5"/><ellipse cx="31" cy="75" rx="2.5" ry="1.5" fill="currentColor" opacity="0.4"/><ellipse cx="69" cy="75" rx="2.5" ry="1.5" fill="currentColor" opacity="0.4"/>',
            bent: defs + '<path d="M27,52 Q28,62 30,72 Q27,82 30,92 Q27,98 32,100" stroke="url(#legGrad)" stroke-width="13" fill="none" stroke-linecap="round" filter="url(#legShadow)"/><path d="M73,52 Q72,62 70,72 Q73,82 70,92 Q73,98 68,100" stroke="url(#legGrad)" stroke-width="13" fill="none" stroke-linecap="round" filter="url(#legShadow)"/><circle cx="30" cy="72" r="5" fill="currentColor" opacity="0.5"/><circle cx="70" cy="72" r="5" fill="currentColor" opacity="0.5"/><ellipse cx="31" cy="62" rx="3" ry="2" fill="currentColor" opacity="0.4"/><ellipse cx="69" cy="62" rx="3" ry="2" fill="currentColor" opacity="0.4"/>',
            hoof: defs + '<path d="M27,52 Q25,55 27,58 L27,90 Q25,93 27,95 L35,95 Q37,93 35,90 L35,58 Q37,55 35,52 Z" fill="url(#legGrad)" filter="url(#legShadow)"/><path d="M62,52 Q60,55 62,58 L62,90 Q60,93 62,95 L70,95 Q72,93 70,90 L70,58 Q72,55 70,52 Z" fill="url(#legGrad)" filter="url(#legShadow)"/><ellipse cx="31" cy="92" rx="11" ry="6" fill="url(#legGrad)" filter="url(#legShadow)"/><ellipse cx="69" cy="92" rx="11" ry="6" fill="url(#legGrad)" filter="url(#legShadow)"/><ellipse cx="31" cy="90" rx="9" ry="4" fill="currentColor" opacity="0.8"/><ellipse cx="69" cy="90" rx="9" ry="4" fill="currentColor" opacity="0.8"/><path d="M22,92 Q31,88 31,92 Q31,96 22,96" fill="currentColor" opacity="0.6"/><path d="M78,92 Q69,88 69,92 Q69,96 78,96" fill="currentColor" opacity="0.6"/>',
            robot: defs + '<rect x="24" y="52" width="16" height="48" rx="5" fill="url(#legGrad)" filter="url(#legShadow)"/><rect x="60" y="52" width="16" height="48" rx="5" fill="url(#legGrad)" filter="url(#legShadow)"/><rect x="27" y="92" width="10" height="8" rx="2" fill="#333"/><rect x="63" y="92" width="10" height="8" rx="2" fill="#333"/><circle cx="32" cy="72" r="4" fill="#333"/><circle cx="68" cy="72" r="4" fill="#333"/><rect x="28" y="65" width="8" height="2" rx="1" fill="#666"/><rect x="64" y="65" width="8" height="2" rx="1" fill="#666"/><rect x="28" y="80" width="8" height="2" rx="1" fill="#666"/><rect x="64" y="80" width="8" height="2" rx="1" fill="#666"/><ellipse cx="32" cy="56" rx="3" ry="2" fill="#333" opacity="0.5"/><ellipse cx="68" cy="56" rx="3" ry="2" fill="#333" opacity="0.5"/>',
            tentacle: defs + '<path d="M27,52 Q30,68 28,82 Q25,95 30,100" stroke="url(#legGrad)" stroke-width="15" fill="none" stroke-linecap="round" filter="url(#legShadow)"/><path d="M73,52 Q70,68 72,82 Q75,95 70,100" stroke="url(#legGrad)" stroke-width="15" fill="none" stroke-linecap="round" filter="url(#legShadow)"/><circle cx="28" cy="68" r="7" fill="currentColor" opacity="0.7"/><circle cx="72" cy="68" r="7" fill="currentColor" opacity="0.7"/><circle cx="29" cy="82" r="5" fill="currentColor" opacity="0.6"/><circle cx="71" cy="82" r="5" fill="currentColor" opacity="0.6"/><circle cx="28" cy="58" r="4" fill="currentColor" opacity="0.5"/><circle cx="72" cy="58" r="4" fill="currentColor" opacity="0.5"/>',
            wheel: defs + '<circle cx="32.5" cy="75" r="19" fill="url(#legGrad)" stroke="#333" stroke-width="2.5" filter="url(#legShadow)"/><circle cx="32.5" cy="75" r="11" fill="#333"/><circle cx="67.5" cy="75" r="19" fill="url(#legGrad)" stroke="#333" stroke-width="2.5" filter="url(#legShadow)"/><circle cx="67.5" cy="75" r="11" fill="#333"/><circle cx="32.5" cy="75" r="6" fill="#666"/><circle cx="67.5" cy="75" r="6" fill="#666"/><path d="M32.5,69 L32.5,81 M26.5,75 L38.5,75" stroke="#999" stroke-width="1.5"/><path d="M67.5,69 L67.5,81 M61.5,75 L73.5,75" stroke="#999" stroke-width="1.5"/>',
            floating: defs + '<circle cx="32" cy="62" r="9" fill="url(#legGrad)" opacity="0.75" filter="url(#legShadow)"/><circle cx="33" cy="82" r="7" fill="url(#legGrad)" opacity="0.85" filter="url(#legShadow)"/><circle cx="32" cy="95" r="5" fill="url(#legGrad)" opacity="0.95" filter="url(#legShadow)"/><circle cx="68" cy="62" r="9" fill="url(#legGrad)" opacity="0.75" filter="url(#legShadow)"/><circle cx="67" cy="82" r="7" fill="url(#legGrad)" opacity="0.85" filter="url(#legShadow)"/><circle cx="68" cy="95" r="5" fill="url(#legGrad)" opacity="0.95" filter="url(#legShadow)"/><circle cx="32" cy="62" r="3" fill="currentColor" opacity="0.3"/><circle cx="68" cy="62" r="3" fill="currentColor" opacity="0.3"/>'
        };
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svgs[style] || svgs.simple}</svg>`;
    }

    // Create SVG for accessories - improved with more detail and gradients
    createAccessorySVG(style) {
        const defs = '<defs><linearGradient id="accGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.85"/></linearGradient><radialGradient id="accGradRad" cx="50%" cy="30%"><stop offset="0%" stop-color="currentColor" stop-opacity="1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.7"/></radialGradient><filter id="accShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/><feOffset dx="0" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
        
        const svgs = {
            hat: defs + '<path d="M22,32 L50,22 L78,32 L78,42 L22,42 Z" fill="url(#accGrad)" filter="url(#accShadow)"/><path d="M24,34 L50,24 L76,34 L76,40 L24,40 Z" fill="currentColor" opacity="0.95"/><rect x="32" y="42" width="36" height="8" rx="2" fill="url(#accGrad)" filter="url(#accShadow)"/><rect x="34" y="44" width="32" height="4" fill="currentColor" opacity="0.95"/><ellipse cx="50" cy="26" rx="2" ry="1" fill="currentColor" opacity="0.6"/><path d="M28,36 Q50,28 72,36" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>',
            crown: defs + '<path d="M32,42 L38,18 L42,26 L46,18 L50,28 L54,18 L58,26 L62,18 L68,42 L68,52 L32,52 Z" fill="url(#accGradRad)" filter="url(#accShadow)"/><path d="M34,44 L39,20 L42,27 L46,20 L50,29 L54,20 L57,27 L61,20 L66,44 L66,50 L34,50 Z" fill="currentColor" opacity="0.95"/><circle cx="42" cy="23" r="2" fill="#FFD700" opacity="0.8"/><circle cx="50" cy="25" r="2" fill="#FFD700" opacity="0.8"/><circle cx="58" cy="23" r="2" fill="#FFD700" opacity="0.8"/><path d="M38,20 L42,24 M46,20 L50,24 M54,20 L58,24" stroke="#FFD700" stroke-width="1" opacity="0.6"/>',
            wings: defs + '<path d="M12,50 Q18,28 28,48 Q20,68 12,50 Z" fill="url(#accGradRad)" filter="url(#accShadow)"/><path d="M88,50 Q82,28 72,48 Q80,68 88,50 Z" fill="url(#accGradRad)" filter="url(#accShadow)"/><path d="M14,50 Q19,35 25,48 Q21,62 14,50" fill="currentColor" opacity="0.9"/><path d="M86,50 Q81,35 75,48 Q79,62 86,50" fill="currentColor" opacity="0.9"/><path d="M16,50 Q20,40 23,48" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><path d="M84,50 Q80,40 77,48" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><ellipse cx="20" cy="45" rx="2" ry="1.5" fill="currentColor" opacity="0.3"/><ellipse cx="80" cy="45" rx="2" ry="1.5" fill="currentColor" opacity="0.3"/>',
            glasses: defs + '<rect x="17" y="37" width="23" height="18" rx="4" fill="none" stroke="url(#accGrad)" stroke-width="3.5" filter="url(#accShadow)"/><rect x="60" y="37" width="23" height="18" rx="4" fill="none" stroke="url(#accGrad)" stroke-width="3.5" filter="url(#accShadow)"/><line x1="40" y1="46" x2="60" y2="46" stroke="url(#accGrad)" stroke-width="3.5" filter="url(#accShadow)"/><line x1="12" y1="46" x2="17" y2="46" stroke="url(#accGrad)" stroke-width="3.5" filter="url(#accShadow)"/><line x1="83" y1="46" x2="88" y2="46" stroke="url(#accGrad)" stroke-width="3.5" filter="url(#accShadow)"/><circle cx="28.5" cy="46" r="6" fill="currentColor" opacity="0.1"/><circle cx="71.5" cy="46" r="6" fill="currentColor" opacity="0.1"/><circle cx="28.5" cy="46" r="3" fill="currentColor" opacity="0.15"/><circle cx="71.5" cy="46" r="3" fill="currentColor" opacity="0.15"/>',
            bowtie: defs + '<path d="M42,52 L50,47 L58,52 L58,62 L50,57 L42,62 Z" fill="url(#accGradRad)" filter="url(#accShadow)"/><circle cx="42" cy="57" r="7" fill="url(#accGradRad)" filter="url(#accShadow)"/><circle cx="58" cy="57" r="7" fill="url(#accGradRad)" filter="url(#accShadow)"/><path d="M44,54 L50,49 L56,54 L56,60 L50,55 L44,60 Z" fill="currentColor" opacity="0.95"/><circle cx="42" cy="57" r="5" fill="currentColor" opacity="0.95"/><circle cx="58" cy="57" r="5" fill="currentColor" opacity="0.95"/><circle cx="50" cy="52" r="2" fill="currentColor" opacity="0.6"/><path d="M42,57 Q50,52 58,57" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>',
            cape: defs + '<path d="M50,22 L32,50 L32,88 L50,78 L68,88 L68,50 Z" fill="url(#accGrad)" filter="url(#accShadow)"/><path d="M50,24 L35,50 L35,85 L50,76 L65,85 L65,50 Z" fill="currentColor" opacity="0.95"/><path d="M50,24 L45,40 L50,50 L55,40 Z" fill="currentColor" opacity="0.7"/><path d="M38,55 Q50,60 62,55" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/><path d="M36,70 Q50,75 64,70" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/><ellipse cx="50" cy="45" rx="3" ry="2" fill="currentColor" opacity="0.4"/>',
            halo: defs + '<path d="M32,27 Q50,17 68,27" stroke="url(#accGrad)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#accShadow)"/><path d="M34,27 Q50,19 66,27" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.95"/><circle cx="50" cy="27" r="3" fill="url(#accGradRad)"/><circle cx="50" cy="27" r="1.5" fill="currentColor" opacity="0.8"/><circle cx="38" cy="27" r="1" fill="currentColor" opacity="0.5"/><circle cx="62" cy="27" r="1" fill="currentColor" opacity="0.5"/>',
            antenna: defs + '<line x1="50" y1="7" x2="50" y2="27" stroke="url(#accGrad)" stroke-width="3.5" stroke-linecap="round" filter="url(#accShadow)"/><circle cx="50" cy="7" r="6" fill="url(#accGradRad)" filter="url(#accShadow)"/><circle cx="50" cy="7" r="4" fill="currentColor" opacity="0.95"/><circle cx="50" cy="7" r="2.5" fill="#333"/><circle cx="50" cy="7" r="1" fill="#666"/><circle cx="48" cy="5" r="1" fill="currentColor" opacity="0.4"/><circle cx="52" cy="5" r="1" fill="currentColor" opacity="0.4"/>'
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

