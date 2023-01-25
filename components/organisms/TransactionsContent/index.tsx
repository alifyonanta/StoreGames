import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HistoryTransactionsTypes } from "../../../services/data-types";
import { getMemberTransactions } from "../../../services/member";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";

export default function TransactionsContent() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState('all');
  const getMemberTransactioAPI = useCallback(async (value: string) => {
    const response = await getMemberTransactions(value);
    if(response.error){
      toast.error(response.message)
    } else {
      //console.log('data : ', response)
      setTotal(response.data.total)
      setTransactions(response.data.data)
    }
  }, []);
  useEffect(() => {
    getMemberTransactioAPI('all');
  }, []);
  const onTabClick = (value: string) => {
    setTab(value);
    getMemberTransactioAPI(value);
  }
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            Rp {(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab onClick={() => onTabClick('all')} title="All trx" active={tab === 'all'} />
              <ButtonTab onClick={() => onTabClick('success')} title="Success" active={tab === 'success'} />
              <ButtonTab onClick={() => onTabClick('pending')} title="Pending" active={tab === 'pending'} />
              <ButtonTab onClick={() => onTabClick('failed')} title="Failed" active={tab === 'failed'} />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
              {transactions.map((transaction: HistoryTransactionsTypes) => (
                <TableRow 
                  key={transaction._id}
                  title={transaction.historyVoucherTopup.gameName} 
                  category={transaction.historyVoucherTopup.category}  item={`${transaction.historyVoucherTopup.coinQuantity} ${transaction.historyVoucherTopup.coinName }`} 
                  status={transaction.status} 
                  image={transaction.historyVoucherTopup.thumbnail} 
                  price={`Rp ${(transaction.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                  id={transaction._id}
                  />
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
