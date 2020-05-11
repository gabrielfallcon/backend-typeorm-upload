import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const findId = await transactionRepository.findOne(id);

    if (!findId) {
      throw new AppError('Transaction does not exist');
    }

    await transactionRepository.remove(findId);
  }
}

export default DeleteTransactionService;
