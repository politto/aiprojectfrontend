import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { IEmoPredProps } from '../types/IEmoPredProps';

type Props = {
    data: IEmoPredProps[]
    error: boolean
}


export default function EmotionResult({data, error}: Props) {

  // console.log(data)
  const mockData = {
    emotion: ""
  }
  return (
    <section className="flex flex-col justify-center p-10 bg-white rounded-2xl gap-4">

        {data &&
        <>
        <p>data: {data[0].emotion}  at {data[0].percentage}%</p>
        <p>error: {error == true? "true": "false"}</p>
        </>
        }

    </section>
  )
}