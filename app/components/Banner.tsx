import React from 'react'

type Props = {}

export default function Banner({}: Props) {
  return (
    <section className="bg-gradient-to-r from-[#F03F83] to-[#8963B8] h-[8vh] rounded-tl-[3em] rounded-tr-[3em] flex justify-end p-8 items-center">
            <p className = "athiti text-xl text-white">Made by <b>Alexa</b></p>
        </section>
  )
}