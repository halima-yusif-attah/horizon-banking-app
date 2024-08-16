import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";


function CategoryBadge({ category }: CategoryBadgeProps) {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor
  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || 
  transactionCategoryStyles.default
  
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)}/>
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
}


function TransactionsTable({ transactions }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transactions</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);

          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit'; 

          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
              } !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[10rem] pl-2">
                {/* max-w-[250px] pl-2 */}
                <div className="">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                //pl-2
                //pr-10
                //font-semibold
                className={`pl-2 pr-5 font-medium ${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2 pr-5">
                <CategoryBadge category={status} />
              </TableCell>
              {/* pl-2 pr-5 min-w-32 */}
              <TableCell className="pl-2 pr-5 min-w-[6rem]">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              {/* pl-2 pr-5 capitalize min-w-[5rem] */}
              <TableCell className="pl-2 pr-5 capitalize ">
                {t.paymentChannel}
              </TableCell>
              <TableCell className="pl-2  max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );


        })}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
