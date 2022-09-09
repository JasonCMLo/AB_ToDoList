exports.getDate = function () {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return (dateFormatted = today.toLocaleDateString("En-US", options));
};

exports.getDay = function () {
  const today = new Date();

  const options = {
    weekday: "long",
  };

  return (dateFormatted = today.toLocaleDateString("En-US", options));
};
