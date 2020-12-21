# Scraping de dados de produtos

App criado a partir das instruções contidas [aqui](https://gist.github.com/lricoy/c50dbd2ae8bc110db82f34d00727cb2b).

As lojas selecionadas foram Amazon, Zattini e Magazine Luiza. Foram escolhidos MongoDB para persistência de dados, axios e cheerio para scraping de dados, jest para testes e express para o servidor.

## Instalação

Clone o repositório e instale as dependências
```
git clone https://github.com/pedrokohler/product-scraping-api.git
yarn install
```

Antes de iniciar o aplicativo você deve criar um arquivo .env na pasta raiz da aplicação com a seguinte chave
```
MONGO_CONNECTION_STRING=
```

Que é a string de conexão de um banco de dados MongoDB com permissão de escrita e leitura. Os dados serão salvos no banco referente à string.

## Uso

Para enviar uma URL é necessário fazer o encoding da URL antes (URL encoded), uma vez que será enviada pela própria URL.

Exemplo de código para encoding da URL:
```
const url = "https://www.zattini.com.br/slip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004";
const encodedUrl = encodeURIComponent(url);
// resulta em: https%3A%2F%2Fwww.zattini.com.br%2Fslip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004
```

Exemplo de chamada para a API:
```
curl --location --request GET 'http://localhost:3000/product/https%3A%2F%2Fwww.zattini.com.br%2Fslip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004'
```

Resposta da chamada acima:

```
{
    "title": "Slip On Santa Lolla Caixa Alta Feminino - Bege",
    "image": "https://static.zattini.com.br/produtos/slip-on-santa-lolla-caixa-alta-feminino/04/H08-2438-004/H08-2438-004_zoom1.jpg?ts=1608444435&ims=544x",
    "price": 99.99,
    "description": "Aposte no esitlo do Slip On Santa Lolla Caixa Alta Feminino e passe a temporada com todo o estilo. Ver mais.",
    "url": "https://www.zattini.com.br/slip-on-santa-lolla-caixa-alta-feminino-bege-H08-2438-004"
}
```

### Servidor de desenvolvimento

```bash
  node src/index.js
```

Você poderá utilizar o servidor de desenvolvimento a partir de `localhost:3000`.