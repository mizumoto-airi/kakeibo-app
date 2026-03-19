//入力フォーム
import { useState, useRef, useCallback } from 'react'
import { useTransactions } from '../TransactionContext'

function TransactionForm() {
  // 入力フォームの状態管理（文字を管理するから空文字が初期値）
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('支出')

  // タイトル入力欄への「参照」を入れる変数（最初はまだどこも参照していないのでnull）
  const titleRef = useRef(null)

  // useContextからtransactionsを更新するdispatchを取得
  const { dispatch } = useTransactions()

  // ボタンを押したらデータ追加する関数
  // useCallbackで関数をキャッシュ（title,amount,type,dispatchが変わったときだけ再生成）
  const handleAdd = useCallback(() => {
    // 新しい取引データをオブジェクトとして作る
    // オブジェクト＝関連するデータをまとめて入れる箱。{ キー: 値, キー: 値 } という形
    const newTransaction = {
      id: Date.now(), // 今この瞬間の時刻を数字にしたもの。かぶらないIDとして使う
      title: title,   // オブジェクトのキー名：useStateで管理している変数
      amount: Number(amount), // 計算するときに文字だと困るのでNumber()で数字に変換
      type: type,
    }

    // useReducerのdispatchでADD命令を送る
    // payloadは命令と一緒に渡すデータ
    dispatch({ type: 'ADD', payload: newTransaction })

    // 追加したあとに入力欄を空にリセットする
    setTitle('')
    setAmount('')
    setType('支出')

    // タイトルの入力欄に自動でフォーカスする（useRefのDOM操作）
    titleRef.current.focus()
  }, [title, amount, type, dispatch])

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">タイトル</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="食費"
              ref={titleRef}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">金額</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
              />
              <span className="input-group-text">円</span>
            </div>
          </div>

          <div className="col-md-2">
            <label className="form-label">種類</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="支出">支出</option>
              <option value="収入">収入</option>
            </select>
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleAdd}>
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionForm