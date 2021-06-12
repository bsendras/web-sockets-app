import createImage from "../shapes/image.js";

function translatePosition(position, originalRes, destinationRes) {
  const x = (position.x / originalRes.width) * destinationRes.width;
  const y = (position.y / originalRes.height) * destinationRes.height;
  return { x: x, y: y };
}

function createActivity(container, client) {
  const res = {
    width: container.clientWidth,
    height: container.clientHeight,
  };

  const stage = new Konva.Stage({
    container: "activity-container", // id of container <div>
    width: res.width,
    height: res.height,
  });

  const layer = new Konva.Layer();
  createImage(layer, "src/img/rosa.png", "rosa");
  stage.add(layer);

  stage.on("mousedown", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "mousedown",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  stage.on("mousemove", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "mousemove",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  stage.on("dragstart", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "dragstart",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  stage.on("dragover", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "dragover",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  stage.on("dragmove", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "dragmove",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  stage.on("dragend", (e) => {
    const point = stage.getPointerPosition();
    const element = stage.getIntersection(point);
    client.send("atel-room", {
      id: element ? element.id : "",
      type: "dragend",
      pos: point,
      res: { width: res.width, height: res.height },
    });
  });

  client.onMessage((data) => {
    console.log(
      `received: ${data.type}, x: ${data.pos.x}, y: ${data.pos.y}, id: ${data.id}`
    );
    const element = layer.find("#" + data.id)[0];
    if (element) {
      if (
        ["dragstart", "dragmove", "dragover", "dragend"].includes(data.type)
      ) {
        const newPos = translatePosition(data.pos, data.res, res);
        element.position("newPos", newPos);
      }
    }
    layer.draw();
  });
}

export default createActivity;
