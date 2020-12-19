const parseParamUrl = (paramURL) => {
  const url = new URL(paramURL);
  const href = url.href;
  const storeName = url.hostname.match(/^(www.)?([^\.]*)\./)[2];

  return {
    url: href,
    storeName,
  }
}

module.exports = {
  parseParamUrl
}