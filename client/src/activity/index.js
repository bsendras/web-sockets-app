function createActivity(container) {
  let stageWidth = container.clientWidth;
  let stageHeight = container.clientHeight;

  var stage = new Konva.Stage({
    container: "activity-container", // id of container <div>
    width: stageWidth,
    height: stageHeight,
  });

  // then create layer
  var layer = new Konva.Layer();
  stage.add(layer);

  let image = new Image();
  image.onload = (e) => {
    console.log(e);
    let rosa = new Konva.Image({
      image: image,
      x: 50,
      y: 50,
      width: e.width,
      height: e.height,
    });

    rosa.on("mousedown", (e) => {
      const point = stage.getPointerPosition();
      points[0] = point.x;
      points[1] = point.y;
    });

    layer.add(rosa);
  };

  image.src = "src/img/rosa.png";

  let image2 = new Image();
  let blanco;
  image2.onload = (e) => {
    console.log(e);
    blanco = new Konva.Image({
      image: image2,
      x: 1000,
      y: 50,
      width: e.width,
      height: e.height,
    });

    blanco.on("mousedown", (e) => {
      const point = stage.getPointerPosition();
      points[0] = point.x;
      points[1] = point.y;
    });

    layer.add(blanco);
  };

  image2.src = "src/img/blanco.png";

  var arrow = new Konva.Arrow({
    points: [],
    stroke: "red",
    strokeWidth: 8,
    lineCap: "round",
    lineJoin: "round",
  });

  layer.add(arrow);

  let points = [];

  stage.on("mousemove", (e) => {
    const point = stage.getPointerPosition();
    points[2] = point.x;
    points[3] = point.y;
    arrow.points(points);
  });

  stage.on("mouseup", (e) => {
    points = [];
    const mousePos = stage.getPointerPosition();
    const shape = stage.getIntersection(mousePos);
    console.log(shape);
  });

  // TODO: SOLUCIONAR EL RESIZE. CAMBIA MAL EL HEIGHT
  window.addEventListener("resize", (e) => {
    // vuelvo a obtener el padre del canvas para sensar el cambio
    var container = document.querySelector("#activity-container");
    // now we need to fit stage into parent
    var containerWidth = container.offsetWidth;

    // Consulto el tamaño actual del stage
    let stageWidth = stage.width();
    let stageHeight = stage.height();

    // to do this we need to scale the stage
    var scale = containerWidth / stageWidth;

    stage.width(stageWidth * scale);
    stage.height(stageHeight * scale);
    stage.scale({ x: scale, y: scale });
  });
}

export default createActivity;
