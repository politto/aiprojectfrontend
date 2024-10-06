import React from 'react'
import { IEmoPredProps } from '../types/IEmoPredProps'
import { PieChart } from './PieChart'

type Props = {
    data: IEmoPredProps[]
    error: boolean
}

// ข้อมูล mockData ที่ใช้สำหรับฝั่ง Emotion
const mockData: IEmoPredProps[] = [
  {
   emotion: "joy",
   percentage: 50,
   words: 800
}, {
   emotion: "surprise",
   percentage: 20,
   words: 64
}, {
   emotion: "love",
   percentage: 15,
   words: 3
}, {
   emotion: "fear",
   percentage: 10,
   words: 3
}, {
   emotion: "anger",
   percentage: 5,
   words: 3
}, {
   emotion: "sadness",
   percentage: 0,
   words: 0
}
]

export default function EmotionResultBox({ data, error }: Props) {
  console.log(data)

  // ถ้าไม่มีข้อมูลใช้ mockData
  if (data.length === 0) { 
    data = mockData 
  }

  const chartData = data.map((item) => ({
    id: item.emotion,
    label: item.emotion,
    value: item.percentage,
    color: `hsl(${Math.random() * 360}, 70%, 50%)` // กำหนดสีแบบสุ่ม
  }));

  return (
    <section className="">
      <section className="montserrat flex flex-col justify-center py-[2em] px-[1em] md:px-10 bg-white rounded-[3em] gap-4">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Emotion analysis result Pie chart
        </h2>

        <section className="flex flex-col md:flex-row">
          <section className="picWrapper min-w-full md:min-w-[50%] h-[40vh]">
            <p className="text-2xl text-gray-600 text-[#F03F83] font-semibold">Overview</p>
            {/* ส่งข้อมูล chartData ไปยัง PieChart */}
            <PieChart data={chartData} />
          </section>

          <section className="flex flex-col justify-start self-start gap-6 ml-16">
            <ul className="list-none">
              {data.map((item, index) => (
                <li key={index} className="flex items-center gap-2 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: chartData[index].color }}></span>
                  <span className="text-lg font-medium">{item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1)} {item.percentage}%</span>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </section>
  )
}
