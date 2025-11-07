import { Transaction } from "@/types/transaction-types";

export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    // <ul>
    //   {transactions?.map(t => (
    //     <li key={t._id}>
    //       {t.description} - {t.amount} {t.currency} ({new Date(t.date).toLocaleDateString()})
    //     </li>
    //   ))}
    // </ul>
    
    <div className="p-6 grid gap-10">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-2xl">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Currency</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Payment Method</th>
                <th className="text-left p-3">Account</th>
                <th className="text-left p-3">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  onClick={() => alert(`Open details for transaction with ID: ${t._id}`)}
                  className="border-b last:border-none cursor-pointer hover:bg-gray-50 transition"
                >
                  <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="p-3 max-w-[180px] truncate">{t.description}</td>
                  <td className="p-3">{t.amount}</td>
                  <td className="p-3">{t.currency}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">{t.paymentMethod}</td>
                  <td className="p-3">{t.account}</td>
                  <td className="p-3">{t.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>




//     <div className="p-6 grid gap-10">
// --- TABLE MOCKUP ---
// <div className="space-y-4">
// <h2 className="text-xl font-semibold">Table View</h2>
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white shadow rounded-2xl">
// <thead className="border-b">
// <tr>
// <th className="text-left p-3">Date</th>
// <th className="text-left p-3">Category</th>
// <th className="text-right p-3">Amount</th>
// </tr>
// </thead>
// <tbody>
// {transactions.map((t) => (
// <tr key={t._id} onClick={() => alert(`Open details for ID: ${t._id}`)} className="border-b last:border-none cursor-pointer hover:bg-gray-50 transition">
// <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
// <td className="p-3">{t.category}</td>
// <td className="p-3 text-right font-medium">
// {t.amount < 0 ? `-${Math.abs(t.amount)}` : `+${t.amount}`}
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>


//  --- CARD LIST MOCKUP ---
// <div className="space-y-4">
// <h2 className="text-xl font-semibold">Card View</h2>
// <div className="grid gap-4">
// {transactions.map((t) => (
// <div
// key={t._id}
// className="p-4 bg-white shadow rounded-2xl flex justify-between items-center"
// >
// <div>
// <div className="font-medium">{t.category}</div>
// <div className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</div>
// </div>
// <div className="font-semibold">
// {t.amount < 0 ? `-${Math.abs(t.amount)}` : `+${t.amount}`}
// </div>
// </div>
// ))}
// </div>
// </div>
  )
}