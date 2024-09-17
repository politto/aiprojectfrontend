import React from 'react'

type Props = {
    data: FallacyPredProps[]
    error: boolean
}

type FallacyPredProps = {
  fallacy: string,
  percentage: number
  words: number
}

export default function FallacyResultBox({data, error}: Props) {
  return (
    <section className="flex flex-col justify-center p-10 bg-white rounded-xl gap-4">

        {data &&
        <>
          <p>data: {data[0].fallacy} at {data[0].percentage}%</p>
          <p>error: {error == true? "true": "false"}</p>
        </>
        
        }

    </section>
  )
}