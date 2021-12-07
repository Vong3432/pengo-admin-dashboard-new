import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from "variables/charts";

const LineChart = ({
  data
}: {
  data: []
}) => {

  const [chartData, setChartData] = useState<any>([])
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData((prev: any) => [{
      name: "Booking",
      data
    }])
    setChartOptions({ ...lineChartOptions, })
  }, [])

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  )
}

export default LineChart

