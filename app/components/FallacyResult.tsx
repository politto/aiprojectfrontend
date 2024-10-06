import React from 'react'
import { IFallacyPredProps } from '../types/IFallacyPredProps'
import Banner from './Banner'
import Image from 'next/image'
import { PieChart } from './PieChart'
type Props = {
    data: IFallacyPredProps[]
    error: boolean
}

const mockData = [
   {
  fallacy: "appeal_to_emotion",
  percentage: 80,
  words: 800
},{
  fallacy: "false_dilemma",
  percentage: 8,
  words: 64
},{
  fallacy: "false_casuality",
  percentage: 6,
  words: 3
},{
  fallacy: "appeal_to_authority",
  percentage: 3,
  words: 3
},{
  fallacy: "ad_hominem",
  percentage: 3,
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
    detail: "เป็นการโจมตี โดยไปเน้นที่ตัวบุคคลผู้ที่โต้แย้งด้วย แทนที่จะเป็นเหตุผลจากหัวข้อที่กำลังจะโต้แย้ง หรือพูดถึง การกล่าวโจมตีบุคลากรทางการแพทย์ที่สนับสนุนการฉีดวัคซีนว่า ได้รับเงินค่าโฆษณาประชาสัมพันธ์มาจากบริษัทยาและเวชภัณฑ์รายใหญ่\n credit: BBC",
    pic: "/pics/ad_hominem.jpg"
  },
  ad_populum: {
    detail: "เป็นการใช้เหตุผลว่า ถ้ามีคนมากมายเชื่อว่าเป็นเช่นนั้น ก็คงจะถูกต้อง หรือถูกต้องที่สุด เช่น มีแต่คนเชื่อว่าพรรคการเมืองหนึ่งดี เพราะมีคนเลือกเยอะ พรรคการเมืองนั้นก็จะต้องดีไปด้วย",
    pic: "/pics/ad_populum.jpg"
  },
  appeal_to_emotion: {
    detail: "เป็นการใช้ความรู้สึกของผู้ฟัง ช่วยโน้มน่าวให้สิ่งที่ผู้สื่อความจะสื่อถูกคล้อยตามโดยผู้รับสื่อ เช่น อากาศร้อนๆอย่างนี้นะครับ เฉาก๊วยสักถ้วยชื่นใจ แม้อากาศไม่ร้อนก็ทานกันได้นะครับ เฉาก๊วยชากังราวนั้นทานได้ทุกฤดูกาลนะครับ ",
    pic: "/pics/images.jpeg"
  },
  false_casuality: {
    detail: "เป็นการที่เมื่อเหตุการณ์หนึ่ง เกิดก่อนเหตุการณ์หนึ่ง แล้วจึงอุปมาไปว่า เหตุการหนึ่ง จะเป็นสาเหตุของอีกเหตุการณ์หนึ่งเสมอ เช่น ได้ไปเล่นกับเจได แมวของอาจารย์บิีก ก่อนสอบวิชา Machine learning แล้วจึงด่วนสรุปว่า ถ้าไปเล่นกับเจได แมวของอาจารย์บิีก แล้วจะได้เกรดA วิชา Machine learning",
    pic: "/pics/false_casuality.jpg"
  },
  false_dilemma: {
    detail: "เป็นการด่วนคิดไปเองว่า สิ่งที่กำลังกล่าวถึงนั้น จะมีแค่ 2 ทางเลือกเท่านั้น ทั้งที่ความจริงมันไม่ใช่ เช่น เทรนด์ความรักที่หลายหลากหลาย จะมีแค่ความรักระหว่างชายกับชาย หรือ ความรักระหว่างหญิงกับหญิงเท่านั้น แม้ที่จริงแล้ว ความรักระกว่างชายกับหญิงก็ถือเป็นหนึ่งในความหลายหลายทางความรักเช่นกัน",
    pic: "/pics/false_dilemma.jpg"
  },
  
}

export default function FallacyResultBox({data, error}: Props) {
  console.log(data)
  if (data.length == 0) { data = mockData }

  const chartData: ChartData[] = [];
  data.map((item) => {
    chartData.push({
      "id": item.fallacy,
      "label": item.fallacy,
      "value": item.percentage,
      "color": "hsl(200, 100%, 50%)"
    })
  })

  return (
    <section className="">

      
      {/* <Banner></Banner> */}
      <section className="montserrat flex flex-col justify-center py-[2em] px-[1em] md:px-10 bg-white rounded-[3em] gap-4">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[--primary] to-[--secondary] text-transparent bg-clip-text">Logical Fallacy Prediction</h2>
        <p className="text-2xl text-gray-600 text-[#F03F83] font-semibold">Overview</p>
        
        <section className = "flex flex-col md:flex-row">
          <section className="picWrapper min-w-full md:min-w-[50%] h-[50vh]">
            

            <PieChart data={chartData}></PieChart>
          </section>
          <section className="">
            <h3 className = "text-2xl font-bold text-[--primary]">Predicted class :</h3>
            <p className = "text-4xl font-semibold bg-gradient-to-r from-[--ternary] to-[--secondary] text-transparent bg-clip-text my-2">{data[0].fallacy}</p>
            <p className = "text-large font-semibold bg-gradient-to-r from-[--ternary] to-[--secondary] text-transparent bg-clip-text">with {data[0].percentage}% propability</p>
            <p className = "mt-5">followed by</p>
            <p className = "text-[--secondary]">{data[1].fallacy} at {data[1].percentage}%</p>
            <p className = "text-[--secondary]">{data[2]?.fallacy} at {data[2]?.percentage}%</p>
            <br></br><br></br><br></br>
            <p>{data[0].fallacy} - {fallacyDetail[data[0].fallacy].detail}</p>

          </section>
        </section>



        
      </section>

    </section>
  )
}