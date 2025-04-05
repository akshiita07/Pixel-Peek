const x = e.offsetX;
            const y = e.offsetY;

            // Get the pixel color at the mouse position
            const pixel = context.getImageData(x, y, 1, 1).data;
            const [r, g, b] = pixel;

            // Convert RGB to HEX
            const hex = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;