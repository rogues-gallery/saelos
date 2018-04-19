export const svgToImage = svg => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.height = img.height;
    canvas.width = img.width;
    context.drawImage(img, 0, 0);

    convert(canvas);
  };

  img.src = `'data:image/svg+xml;charset-utf-8,${encodeURIComponent(
    svg.outerHTML
  )}`;
};

const convert = canvas => {
  var image = new Image();
  image.onload = function() {
    image.setAttribute("height", image.height * 0.3);
    image.setAttribute("width", image.width * 0.3);
    window.document.body.appendChild(image);
  };

  image.src = canvas.toDataURL();
};
