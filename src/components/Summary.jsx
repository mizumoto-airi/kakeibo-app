//合計・残高
function Summary({ totalIncome, totalExpense, balance }) {
  return (
    <div className="row mt-4 g-3">
      {/* 収入・支出・残高を表示する */}
      <div className="col-md-4">
        <div className="card border-success">
          <div className="card-body text-success">
            <p className="card-text fw-bold">収入合計：{totalIncome}円</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card border-danger">
          <div className="card-body text-danger">
            <p className="card-text fw-bold">支出合計：{totalExpense}円</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card border-primary">
          <div className="card-body text-primary">
            <p className="card-text fw-bold">残高：{balance}円</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary