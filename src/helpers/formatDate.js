export const formatDate = (d = new Date()) => {
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};

export const formatTime = (t = new Date()) => {
  return t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
};
