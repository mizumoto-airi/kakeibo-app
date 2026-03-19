//一覧リスト
function TransactionList({ transactions, onDelete }) {
  return (
    // list-groupはBootstrapのクラスでリストをキレイに表示してくれる
    <div className="card mt-4 shadow-sm">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {/* transactions配列をmapで一個ずつ取り出して表示する */}
          {transactions.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <span className={`badge me-2 ${t.type === '収入' ? 'bg-success' : 'bg-danger'}`}>{t.type}</span>
                {t.title} / {t.amount}円
              </span>
              {/* 削除ボタン。クリックしたらその行のidをonDeleteに渡す */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(t.id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TransactionList