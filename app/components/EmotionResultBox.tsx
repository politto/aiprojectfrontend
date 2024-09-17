import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type Props = {
    data: emoPredProps[]
    error: boolean
}

type emoPredProps = {
  emotion: string,
  percentage: number,
  words: number
}

export default function EmotionResultBox({data, error}: Props) {

  const mockData = {
    emotion: ""
  }
  return (
    <section className="flex flex-col justify-center p-10 bg-white rounded-xl gap-4">

        {data &&
        <>
        <p>data: {data[0].emotion}  at {data[0].percentage}%</p>
        <p>error: {error == true? "true": "false"}</p>
        </>
        }

    </section>
  )
}