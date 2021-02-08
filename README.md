# Product data scraping

Created based on the instructions contained [here](https://gist.github.com/lricoy/c50dbd2ae8bc110db82f34d00727cb2b).

You can use the API to get information about Amazon, Zattini and Magazine Luiza products.


## Installation

Clone the repository and install the dependencies
```
git clone https://github.com/pedrokohler/product-scraping-api.git
yarn install
```

Before initializing the app, you should create a .env file in the root of the application with the following key
```
MONGO_CONNECTION_STRING=
```

Which is the connection string of a Mongo database with read and write permissions. The product data will be saved in this database.

## Usage

To send a product URL to the API it's necessary to encode it first since the product URL must sent to the API withing the URL, like the following example:

```
const url = "https://www.zattini.com.br/slip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004";
const encodedUrl = encodeURIComponent(url);
// results in: https%3A%2F%2Fwww.zattini.com.br%2Fslip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004
```

API call example:
```
curl --location --request GET 'http://localhost:3000/product/https%3A%2F%2Fwww.zattini.com.br%2Fslip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004'
```

Which resulted in the following JSON (at december 2020):

```
{
    "title": "Slip On Santa Lolla Caixa Alta Feminino - Bege",
    "image": "https://static.zattini.com.br/produtos/slip-on-santa-lolla-caixa-alta-feminino/04/H08-2438-004/H08-2438-004_zoom1.jpg?ts=1608444435&ims=544x",
    "price": 99.99,
    "description": "Aposte no esitlo do Slip On Santa Lolla Caixa Alta Feminino e passe a temporada com todo o estilo. Ver mais.",
    "url": "https://www.zattini.com.br/slip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004"
}
```

### Development Server

```bash
  node src/index.js
```

You can use the development server through `localhost:3000`.
