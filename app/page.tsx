'use client'

import Image from "next/image";
import { SearchBox } from "./components/SearchBox";
import { useEffect, useState } from "react";
import EmotionResultBox from "./components/EmotionResultBox";
import { predictEmotion, predictFallacy } from "./api/AxiosApi";
import FallacyResultBox from "./components/FallacyResult";

type predictionResult = {
  predictedClass: string,
  predictedPercentate: number,
}
export default function Home() {
  const [isAnalyzeRequested, setAnalyzeRequested] = useState<boolean>(false);
  const [isEmotionRequested, setEmotionRequested] = useState<boolean>(false);
  const [isFallacyRequested, setFallacyRequested] = useState<boolean>(false);

  
  const [prompt, setPrompt] = useState<string>("");

  const [emotionDataAndError, setEmotionDataAndError] = useState<[string, boolean]>(["", false]);
  const [fallacyDataAndError, setFallacyDataAndError] = useState<[string, boolean]>(["", false]);

  useEffect(() => {
    if (isAnalyzeRequested && isEmotionRequested) {
      predictEmotion(prompt).then((data) => {
        setEmotionDataAndError(data);
        console.log(emotionDataAndError[1])
      })

    } 
    if (isAnalyzeRequested && isFallacyRequested) {
      predictFallacy(prompt).then((data) => {
        setFallacyDataAndError(data);
      })
    }
    

    
    return () => {
      
    };
  }, [isAnalyzeRequested, isEmotionRequested, isFallacyRequested]);

  return (
    <main className = "w-full md:w-[80vw] xl:w-[60vw] flex flex-col justify-center m-auto gap-4">
      <section className = "">
        <header className = "text-center text-6xl font-semibold montserrat py-10">
        Logical Fallacy & Emotion detection Model
      </header>
      </section>
      <SearchBox isAnalyzeRequested = {isAnalyzeRequested} setAnalyzeRequested={setAnalyzeRequested} isEmotionRequested= {isEmotionRequested} setEmotionRequested={setEmotionRequested} isFallacyRequested = {isFallacyRequested} setFallacyRequested = {setFallacyRequested}
      prompt={prompt}
      setPrompt={setPrompt}
       ></SearchBox>
      
      {isAnalyzeRequested && isEmotionRequested &&
      
      <EmotionResultBox data = {emotionDataAndError[0]} error = {emotionDataAndError[1]}/>
       
      }

    {isAnalyzeRequested && isFallacyRequested &&
      
      <FallacyResultBox data = {fallacyDataAndError[0]} error = {fallacyDataAndError[1]}/>
       
      }
      

    </main>
  );
}


