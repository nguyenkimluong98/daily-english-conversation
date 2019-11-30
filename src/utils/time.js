export const unixTime = () => {
  const now = (Date.now() / 1000) | 0;
  return now;
};
