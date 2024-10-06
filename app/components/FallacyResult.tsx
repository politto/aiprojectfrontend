import React from 'react'
import { IFallacyPredProps } from '../types/IFallacyPredProps'
import { PieChart } from './PieChart'

type Props = {
    data: IFallacyPredProps[]
    error: boolean
}

const mockData = [
   {
      fallacy: "ad_hominem",
      percentage: 32,
      words: 800
   }, {
      fallacy: "circular_explanation",
      percentage: 28,
      words: 64
   }, {
      fallacy: "false_dilemma",
      percentage: 20,
      words: 3
   }, {
      fallacy: "fallacy_of_explanation",
      percentage: 10,
      words: 3
   }, {
      fallacy: "red_herring",
      percentage: 5,
      words: 3
   }
]

export default function FallacyResultBox({ data, error }: Props) {
  if (data.length == 0) { data = mockData }

  const chartData: ChartData[] = [];
  data.map((item) => {
    chartData.push({
      "id": item.fallacy,
      "label": item.fallacy.replace(/_/g, ' ').toUpperCase(),
      "value": item.percentage,
      "color": "hsl(200, 100%, 50%)"
    })
  })

  return (
    <section className="">

      <section className="montserrat flex flex-col justify-center py-[2em] px-[1em] md:px-10 bg-white rounded-[3em] gap-4">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Logical Fallacy Prediction Pie chart</h2>

        <section className="flex flex-col md:flex-row">
          <section className="picWrapper min-w-full md:min-w-[50%] h-[40vh]">
            <p className="text-2xl text-gray-600 text-[#F03F83] font-semibold">Overview</p>
            <PieChart data={chartData}></PieChart>
          </section>

          <section className="flex flex-col justify-center items-start gap-6 ml-16"> 
            <ul className="list-none">
              {data.map((item, index) => (
                <li key={index} className="flex items-center gap-2 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: chartData[index].color }}></span>
                  <span className="text-lg font-medium">{item.fallacy.replace(/_/g, ' ').charAt(0).toUpperCase() + item.fallacy.slice(1)} : {item.percentage}%</span>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>

    </section>
  )
}
