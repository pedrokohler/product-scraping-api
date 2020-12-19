const getStoreFromUrl = (paramURL) => {
  const url = new URL(paramURL);
  const storeName = url.hostname.match(/^(www.)?([^.]*)\./)[2];

  return storeName;
};

module.exports = {
  getStoreFromUrl,
};
