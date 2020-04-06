# DESCRIPTOGRAFIA DE JULIO CESAR #

**PROJETO CRIADO PARA O DESAFIO DA [CODENATION.DEV](https://www.codenation.dev/aceleradev/react-online-1/)**

O projeto consiste em acessar uma [api](https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=) via get, passando um token no queryparameters, pegar o json retornado, salvar em um arquivo.
Abrir o arquivo, descriptografar o valor da propriedade *cifrado*, usando o algoritmo de julio cesar,
passando como parâmetro o número de casas, propriedade *numero_casas* para descriptograr.
Como texto descriptografado, aplicar um hash no texto usando o algoritmo sha1 e guardar o valor na propriedade *resumo_criptografico*
salvar no arquivo chamado *answer.json* e enviar para a [API](https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=), passando um token como parametro, via metodo POST. O retorno dessa chamada seria um json simples contendo o paramtro score com o percentual de acerto do desafio, que no meu caso, foi 100% :)

## Tecnologias Utilizadas: ##
*   JavaScript
*   NodeJs
*   Axios
*   form-data
*   Crypto
