import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      //se tiver avatar precisa deletar o arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); //juntar o path do upload com o nome do arquivo para pegar o caminho comlpeto
      //Neste caso estamos verificando se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); //trabalhar com arquivos é asincrono. fs é uma lib nativa para mexer com arquivos.

      if (userAvatarFileExists) {
        await fs.promises.rm(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
