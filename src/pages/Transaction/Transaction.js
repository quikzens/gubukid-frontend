import React, { useEffect, useState } from 'react'
import { useAlert } from '../../contexts/AlertContext'
import { fetchData } from '../../utils/fetchData'
import DetailInvoice from './DetailInvoice/DetailInvoice'
import Modal from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'
import { BsImage, BsSearch } from 'react-icons/bs'
import './Transaction.css'

export default function Transaction() {
  const { invokeAlert } = useAlert()

  const [isDetailInvoiceActive, setDetailInvoiceActive] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transaction, setTransaction] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchTransactions = () => {
    fetchData(
      '/transactions?status=waiting-approve',
      setTransactions,
      setLoading,
      invokeAlert
    )
  }

  useEffect(() => {
    fetchTransactions()
    return () => {
      fetchTransactions(null)
    }
  }, [])

  const openDetailInvoice = async (transaction) => {
    setTransaction(transaction)
    setDetailInvoiceActive(true)
  }

  return (
    <>
      <div className="home-owner">
        <h2 className="home-owner__heading">Incoming Transaction</h2>
        {isLoading ? (
          <div className="w-100 d-flex jc-center">
            <Loading size="medium" color="gray" />
          </div>
        ) : (
          <>
            {transactions.length == 0 ? (
              <p>Belum ada transaksi</p>
            ) : (
              <>
                <table className="home-owner__table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Users</th>
                      <th>Type of Rent</th>
                      <th>Bukti Transfer</th>
                      <th>Status Payment</th>
                      <th>Action</th>
                    </tr>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{transaction.tenant_fullname}</td>
                        <td className="text-capitalize">
                          {transaction.house_type_rent}
                        </td>
                        <td>
                          <a
                            href={transaction.payment_proof}
                            target="_blank"
                            rel="noreferrer"
                            className="payment-proof"
                          >
                            <BsImage />
                          </a>
                        </td>
                        <td className={transaction.payment_status}>
                          {transaction.payment_status.replace('-', ' ')}
                        </td>
                        <td>
                          <button
                            className="home-owner__cta"
                            onClick={() => openDetailInvoice(transaction)}
                          >
                            <BsSearch />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Modal
                  isActive={isDetailInvoiceActive}
                  closeModal={() => setDetailInvoiceActive(false)}
                >
                  <DetailInvoice
                    transaction={transaction}
                    setTransaction={setTransaction}
                  />
                </Modal>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
