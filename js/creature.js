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
        
        // Render in order: body (back), legs, arms, head, accessory (front)
        // Body centered vertically
        if (this.parts.body) {
            const part = partsManager.getPart('bodies', this.parts.body);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.body, 50, 50));
            }
        }
        
        // Legs at bottom
        if (this.parts.legs) {
            const part = partsManager.getPart('legs', this.parts.legs);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.legs, 50, 75));
            }
        }
        
        // Arms centered (will overlap with body, which is fine)
        if (this.parts.arms) {
            const part = partsManager.getPart('arms', this.parts.arms);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.arms, 50, 50));
            }
        }
        
        // Head at top
        if (this.parts.head) {
            const part = partsManager.getPart('heads', this.parts.head);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.head, 50, 30));
            }
        }
        
        // Accessory at very top
        if (this.parts.accessory) {
            const part = partsManager.getPart('accessories', this.parts.accessory);
            if (part) {
                svgParts.push(this.renderPart(part, this.colors.accessory, 50, 20));
            }
        }

        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">${svgParts.join('')}</svg>`;
    }

    // Render a single part with color
    renderPart(part, color, x, y) {
        if (!part || !part.svg) return '';
        
        // Extract inner SVG content (remove the outer <svg> tags)
        let svgContent = part.svg.trim();
        // Remove the opening <svg> tag and all its attributes
        svgContent = svgContent.replace(/<svg[^>]*>/i, '');
        // Remove the closing </svg> tag
        svgContent = svgContent.replace(/<\/svg>/i, '');
        
        // Replace currentColor with actual color
        svgContent = svgContent.replace(/currentColor/g, color);
        
        // Wrap in group with transform to position correctly
        // The viewBox is 0-100, so we translate to center the part at (x, y)
        // Each part is designed to be centered at (50, 50) in its own viewBox
        return `<g transform="translate(${x - 50}, ${y - 50})">${svgContent}</g>`;
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

