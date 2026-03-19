//グラフ
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

function Charts({ chartData }) {
  return (
    <div className="row mt-4 g-3 mb-4">
      {/* 円グラフ */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5>収支グラフ</h5>
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
              >
                {/* Cellで各ピースに色をつける */}
                <Cell fill="#28a745" />
                <Cell fill="#dc3545" />
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      {/* 棒グラフ */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5>収支棒グラフ</h5>
            <BarChart width={400} height={300} data={chartData}>
              {/* 背景の格子線 */}
              <CartesianGrid strokeDasharray="3 3" />
              {/* 横軸にname（収入・支出）を表示 */}
              <XAxis dataKey="name" />
              {/* 縦軸に金額を表示 */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                <Cell fill="#28a745" />
                <Cell fill="#dc3545" />
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
