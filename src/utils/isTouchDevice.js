const isTouchDevice = () => {
  return window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
};

export default isTouchDevice;
