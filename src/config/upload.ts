import multer from 'multer';
import path from 'path'; //lib do node para arquivos
import crypto from 'crypto'; //lib do node para arquivos

// dirname é variavel global da pasta
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex'); //arquivos não podem ter o mesmo nome, então é interessane mudar o nome do arquivo para algum hash

      const filename = `${fileHash}-${file.originalname}`; //este originalName ja tem a extensão

      callback(null, filename); // primeiro recebe um erro
    },
  }),
};
