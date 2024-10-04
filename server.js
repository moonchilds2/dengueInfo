const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configurar o Multer para armazenar as fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'denuncias'); // Armazena os arquivos na pasta 'denuncias'
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Nomeia o arquivo com a data e o nome original
    }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 3000;

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com o envio do formulário
app.post('/enviar', upload.array('fotos', 10), (req, res) => {
    const dados = req.body; // Captura os dados do formulário
    const arquivos = req.files; // Captura as fotos enviadas

    // Gera um nome de arquivo baseado na data/hora
    const nomeArquivo = `denuncia_${Date.now()}.txt`;
    const caminhoArquivo = path.join(__dirname, 'denuncias', nomeArquivo);

    // Armazenar os dados da denúncia em um arquivo de texto
    const conteudo = `
    Nome: ${dados.nome}
    Bairro: ${dados.bairro}
    Endereço: ${dados.endereco}
    Descrição do Foco: ${dados.descricao}
    Arquivos Enviados: ${arquivos.map(arquivo => arquivo.filename).join(', ')}
    `;

    fs.writeFile(caminhoArquivo, conteudo, (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar os dados.');
        }
        res.send('Denúncia recebida com sucesso!');
    });
});

// Cria a pasta 'denuncias' se ela não existir
if (!fs.existsSync('denuncias')){
    fs.mkdirSync('denuncias');
}

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
