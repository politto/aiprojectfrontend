import React from 'react'

type Props = {
    data: string
    error: boolean
}

export default function EmotionResultBox({data, error}: Props) {
  return (
    <section className="flex flex-col justify-center p-10 bg-white rounded-xl gap-4">

        <p>data: {data}</p>
        <p>error: {error == true? "true": "false"}</p>

    </section>
  )
}