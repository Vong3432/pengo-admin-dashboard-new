import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { barChartOptions } from "variables/charts";


const BarChart: React.FC<{ data: [] }> = ({ data }) => {

  const [chartData, setChartData] = useState<any>([])
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData((prev: any) => [{
      name: "Commission",
      data
    }])
    setChartOptions({ ...barChartOptions, })
  }, [])

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  )
}

export default BarChart
