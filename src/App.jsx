import { useState, useMemo, useRef, useCallback } from 'react'
import { TransactionProvider, useTransactions } from './TransactionContext'
import TransactionForm from './components/TransactionForm'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import Charts from './components/Charts'

export default function App() {
  return (
    <TransactionProvider>
      <Main />
    </TransactionProvider>
  )
}

function Main() {
  const { transactions, dispatch } = useTransactions()

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === '収入')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t) => t.type === '支出')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const balance = totalIncome - totalExpense

  const chartData = [
    { name: '収入', value: totalIncome },
    { name: '支出', value: totalExpense },
  ]

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id })
  }, [dispatch])

  return (
    <div className="container mt-4">
      <h1>家計簿アプリ</h1>
      <TransactionForm />
      <Summary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <Charts chartData={chartData} />
    </div>
  )
}