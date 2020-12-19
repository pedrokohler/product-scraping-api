const parseParamUrl = (paramURL) => {
  const url = new URL(paramURL);
  const href = url.href;
  const storeName = url.hostname.match(/^(www.)?([^\.]*)\./)[2];
  const productId = url.pathname;

  return {
    url: href,
    storeName,
    productId
  }
}

module.exports = {
  parseParamUrl
}