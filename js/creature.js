// Creature class and rendering
class Creature {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || 'Unnamed Creature';
        this.parts = data.parts || {
            head: null,
            body: null,
            arms: null,
            legs: null,
            accessory: null
        };
        this.colors = data.colors || {
            head: '#FF6B6B',
            body: '#4ECDC4',
            arms: '#45B7D1',
            legs: '#98D8C8',
            accessory: '#F7DC6F'
        };
        this.happiness = data.happiness || 50;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.description = data.description || '';
    }

    // Render creature to SVG
    render(partsManager) {
        const svgParts = [];
        
        // Render in order: body, legs, arms, head, accessory
        if (this.parts.body) {
            const part = partsManager.getPart('bodies', this.parts.body);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.body, 50, 50));
            }
        }
        
        if (this.parts.legs) {
            const part = partsManager.getPart('legs', this.parts.legs);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.legs, 50, 70));
            }
        }
        
        if (this.parts.arms) {
            const part = partsManager.getPart('arms', this.parts.arms);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.arms, 50, 50));
            }
        }
        
        if (this.parts.head) {
            const part = partsManager.getPart('heads', this.parts.head);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.head, 50, 25));
            }
        }
        
        if (this.parts.accessory) {
            const part = partsManager.getPart('accessories', this.parts.accessory);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.accessory, 50, 15));
            }
        }

        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">${svgParts.join('')}</svg>`;
    }

    // Render a single part with color
    renderPart(part, color, x, y) {
        if (!part || !part.svg) return '';
        
        // Replace currentColor with actual color
        let svg = part.svg.replace(/currentColor/g, color);
        
        // Wrap in group with transform
        return `<g transform="translate(${x - 50}, ${y - 50})">${svg}</g>`;
    }

    // Get data for saving
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            parts: this.parts,
            colors: this.colors,
            happiness: this.happiness,
            createdAt: this.createdAt,
            description: this.description
        };
    }

    // Create from JSON
    static fromJSON(data) {
        return new Creature(data);
    }
}

