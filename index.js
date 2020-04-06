const fs        = require('fs');
const request   = require('request');
const crypto    = require('crypto');
const FormData  = require('form-data');
const axios     = require('axios');

const filePath      = 'D:\\Projetos\\CriptografiaJulioCesar\\answer.json';
const token         = '2d6acf07e89ebdca9587ef97cf7a7e747a399b06';
const hostname      = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`;
const hostSendFile  = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`;

 
const decript = (textEncript, qtd) => {
    
    const charsSet      = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];    
    const especialChar  = [' ', '.', ',', '-'];
    var textAux         = '';
    for(let i = 0, n = textEncript.length; i < n; i++){
        let charAux = textEncript[i];
        const indexEspecial = especialChar.indexOf(charAux);

        if(indexEspecial === -1){
            var indexFind = charsSet.indexOf(charAux) ;
            var indexDecript = indexFind - qtd;
            if (indexDecript < 0){
                indexDecript = indexDecript + 26;
            }
            charAux = charsSet[indexDecript];
        }
        textAux += charAux;
    }
    return textAux;
}


const createFile = (value, filePath) =>{
    fs.writeFile(filePath, value, (err)=>{
        if(err) throw err;
    });
}

const sendFile = (file, host)=>{
    let form = new FormData();
    const answer = fs.createReadStream(file);
    form.append('answer', answer);
    axios.create({headers: form.getHeaders()})                  
                  .post(host, form)
                  .then(response => {console.log(response.data)})
                  .catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        console.log(error.message.data); 
                    });   
}

const processReturn = (body)=>{
    let codenation = body;

    createFile(JSON.stringify(body), filePath);
    
    codenation                      = body;
    codenation.decifrado            = decript(codenation.cifrado, codenation.numero_casas);
    codenation.resumo_criptografico = crypto.createHash('sha1').update(codenation.decifrado).digest('hex');
    
    createFile(JSON.stringify(codenation), filePath);
    
    sendFile(filePath, hostSendFile);
}

request.get(hostname, (error, response, body)=>{
    if(error){
        console.error(error);
        return;
    }

    var retorno = body;
    processReturn(JSON.parse(retorno));
});