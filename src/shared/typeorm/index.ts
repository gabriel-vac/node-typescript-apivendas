import { createConnection } from 'typeorm';

//O server.js está importando este cara, quando ser importado irá fazer a conexão
//esse metodo quando chamado procura por toda estrutura do projeto o arquivo ormconfig
createConnection();
