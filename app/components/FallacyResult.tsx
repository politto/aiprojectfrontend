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

type FallacyDetail = {
  [key: string]: {
    detail: string;
    pic: string;
  };
};

const fallacyDetail: FallacyDetail = {
  ad_hominem: {
    detail: "เหตุผล: พบเจอบ่อยในบทสนทนาหรือการโต้เถียงที่มักเบี่ยงเบนประเด็นจากข้อโต้แย้งไปสู่การโจมตีบุคคลแทน เช่น ในการโต้วาทีทางการเมืองหรือสื่อสังคมออนไลน์ ตัวอย่างประโยค:\"คุณไม่ควรเชื่อสิ่งที่เขาพูด เพราะเขาไม่จบมหาวิทยาลัยเลยด้วยซ้ำ\"",
    pic: "/pics/ad_hominem.jpg"
  },
  ad_populum: {
    detail: "เหตุผล: พบบ่อยในโฆษณา การโน้มน้าวใจผ่านการกระตุ้นความรู้สึกของผู้ฟัง เช่น การใช้ภาพหรือเนื้อหาที่ทำให้รู้สึกกลัวหรือสงสารเพื่อให้ซื้อสินค้าหรือเปลี่ยนความคิด ตัวอย่างประโยค:\"หากคุณไม่ทำตามนี้ ชีวิตของคุณอาจตกอยู่ในอันตรายร้ายแรง!\"",
    pic: "/pics/ad_populum.jpg"
  },
  appeal_to_emotion: {
    detail: "เหตุผล: พบบ่อยในโฆษณา การโน้มน้าวใจผ่านการกระตุ้นความรู้สึกของผู้ฟัง เช่น การใช้ภาพหรือเนื้อหาที่ทำให้รู้สึกกลัวหรือสงสารเพื่อให้ซื้อสินค้าหรือเปลี่ยนความคิด ตัวอย่างประโยค:\"หากคุณไม่ทำตามนี้ ชีวิตของคุณอาจตกอยู่ในอันตรายร้ายแรง!\"",
    pic: "/pics/images.jpeg"
  },
  false_casuality: {
    detail: "เป็นการที่เมื่อเหตุการณ์หนึ่ง เกิดก่อนเหตุการณ์หนึ่ง แล้วจึงอุปมาไปว่า เหตุการหนึ่ง จะเป็นสาเหตุของอีกเหตุการณ์หนึ่งเสมอ",
    pic: "/pics/false_casuality.jpg"
  },
  false_dilemma: {
    detail: "เป็นการด่วนคิดไปเองว่า สิ่งที่กำลังกล่าวถึงนั้น จะมีแค่ 2 ทางเลือกเท่านั้น ทั้งที่ความจริงมันไม่ใช่",
    pic: "/pics/false_dilemma.jpg"
  },
  
}

export default function FallacyResultBox({data, error}: Props) {
  // console.log(data)
  if (data.length == 0) return;

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
          <section className="picWrapper min-w-full md:min-w-[60%] h-[50vh]">
            <p className="text-2xl text-gray-600 text-[#F03F83] font-semibold">Overview</p>
            <PieChart data={chartData}></PieChart>
          </section>
          <section className="">
            <h3 className = "text-2xl font-bold text-[--primary]">Predicted class :</h3>
            <p className = "text-4xl font-semibold bg-gradient-to-r from-[--ternary] to-[--secondary] text-transparent bg-clip-text my-2">{data[0].fallacy}</p>
            <p className = "text-large font-semibold bg-gradient-to-r from-[--ternary] to-[--secondary] text-transparent bg-clip-text">with {data[0].percentage}% propability</p>
            <p className = "mt-5">followed by</p>
            <p className = "text-[--secondary]">{data[1].fallacy} at {data[1].percentage}%</p>
            <p className = "text-[--secondary]">{data[2]?.fallacy} at {data[2]?.percentage}%</p>

          </section>
        </section>
      </section>

    </section>
  )
}
