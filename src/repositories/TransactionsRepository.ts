/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let valueIncome = 0;
    let valueOutcome = 0;

    this.transactions.forEach(transaction => {
      if(transaction.type === "income") {
        valueIncome += transaction.value;
      } else {
        valueOutcome += transaction.value;
      }
    });

    const balance = {
      income: valueIncome,
      outcome: valueOutcome,
      total: valueIncome - valueOutcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
