import { createContext, useContext, useReducer, useEffect } from 'react'

//コンテキスト（データの共有場所）
const TransactionContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': // 追加の処理
      return [...state, action.payload]
    case 'DELETE': // 削除の処理
      return state.filter((t) => t.id !== action.payload)
    default:
      return state
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      JSON.parse(saved).forEach((t) => {
        dispatch({ type: 'ADD', payload: t })
      })
    }
  }, [])

  useEffect(() => {
    if (transactions.length === 0) return
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  return (
    <TransactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  return useContext(TransactionContext)
}