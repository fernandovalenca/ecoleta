const convertStringToArray = (string: String) => {
  return string.split(",").map((item) => Number(item.trim()));
};

export { convertStringToArray };
