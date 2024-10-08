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

const fallacyDetail = {
  ad_hominem: {
    detail: "This fallacy occurs frequently in discussions or debates where the argument shifts from addressing the actual issue to attacking the person making the argument. Common in political debates.",
    pic: "/pics/AdHominem.jpg"
  },
  appeal_to_emotion: {
    detail: "This fallacy involves manipulating the audience's emotions—such as fear, sympathy, or anger—to sway their opinion, without providing logical reasoning or evidence to support the argument.",
    pic: "/pics/Appeal_to_Emotion.jpg"
  },
  ad_populum: {
    detail: "This fallacy occurs when someone claims something is true or right simply because many people believe it or because it is popular. Often seen in advertising and political speeches.",
    pic: "/pics/Ad_Populum.jpg"
  },
  false_dilemma: {
    detail: "This fallacy presents only two options as if they are the only possibilities, when in reality, there may be other alternatives. Often used in political or marketing strategies.",
    pic: "/pics/False_dilemma.jpg"
  },
  false_causality: {
    detail: "This fallacy occurs when someone incorrectly links two events as cause and effect, even though there is no clear relationship between them. Often found in misleading arguments or articles.",
    pic: "/pics/false_causality.jpg"
  },
};

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
          <section className="picWrapper min-w-full md:min-w-[50%] h-[40vh]">
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
            <p className = "text-[--secondary]">{data[3]?.fallacy} at {data[3]?.percentage}%</p>
            <p className = "text-[--secondary]">{data[4]?.fallacy} at {data[4]?.percentage}%</p>

          </section>
        </section>
      </section>

    </section>
  )
}
