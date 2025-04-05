// run code only after all html elements are loaded
window.addEventListener('DOMContentLoaded', function () {
    // Extract canvas using its id
    var canvas = document.getElementById('myCanvas');
    // use a 2D context to draw image on this canvas:
    var context = canvas.getContext('2d');

    // create an image object & add image to canvas:
    var image = new Image();
    image.src = "logo.png";

    // When the image has loaded, draw it to the canvas
    image.onload = function () {
        // Resize canvas to match image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on canvas
        context.drawImage(image, 0, 0);
    };

    // get pixel color on moving over canvas
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect(); //to get canvas position & size
        // caluculate position of mouse relative to canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // use getImageData to retrive color of pixel at that mouse location
        const pixel = context.getImageData(x, y, 1, 1).data;
        // data array will contain rgb color values at that pixel
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        // use a fnc to convert rgb color code to hex color
        const hex = rgbToHex(r, g, b);

        // print it in the div
        showColor.innerHTML = `RGB: (${r}, ${g}, ${b}) <br> HEX: ${hex}`;
        showColor.style.backgroundColor = hex;
    });

    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x =>
            x.toString(16).padStart(2, '0')
        ).join('');
    }
});