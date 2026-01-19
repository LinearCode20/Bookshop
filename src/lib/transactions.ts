// lib/transactions.ts
import db from "./db";

interface Transaction {
  transaction_id: string;
  stripe_transaction_id: string;
  status: string;
  download_expiry: string;
  created_at: string;
}

export async function saveTransaction(transaction: Transaction) {
  // const sql = `
  //   INSERT INTO transactions
  //   (transaction_id, stripe_transaction_id, status, download_expiry, created_at)
  //   VALUES (?, ?, ?, ?, ?)
  // `;

  // const values = [
  //   transaction.transaction_id,
  //   transaction.stripe_transaction_id,
  //   transaction.status,
  //   transaction.download_expiry,
  //   transaction.created_at,
  // ];

  // await db.execute(sql, values);
}

export async function updateTransactionStatus(
  transactionId: string,
  status: string,
  stripeTransactionId?: string
) {
  // const sql = `
  //   UPDATE transactions
  //   SET status = ?, stripe_transaction_id = ?
  //   WHERE transaction_id = ?
  // `;

  // await db.execute(sql, [
  //   status,
  //   stripeTransactionId ?? null,
  //   transactionId,
  // ]);
}

