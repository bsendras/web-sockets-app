function createImage(layer, url, id) {
  Konva.Image.fromURL(url, (node) => {
    node.setAttrs({
      x: 50,
      y: 50,
      scaleX: 0.5,
      scaleY: 0.5,
      draggable: true,
      id: id,
    });

    layer.add(node);
  });
}

export default createImage;
