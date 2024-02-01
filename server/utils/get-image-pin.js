const getImageIds = (pins, forOld) => {
  const imgPins = pins.filter((pin) => pin.type === "ImageNode");
  const imgPinsId = imgPins.map((pin) => {
    const data = forOld ? JSON.parse(pin.data) : pin.data;
    return { id: pin.id, filename: data.file };
  });
  return imgPinsId;
};

module.exports = getImageIds;
