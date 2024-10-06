'use client'

import Image from "next/image";
import { SearchBox } from "./components/SearchBox";
import { useEffect, useState } from "react";
import EmotionResultBox from "./components/EmotionResult";
import { predictEmotion, predictFallacy } from "./api/AxiosApi";
import FallacyResultBox from "./components/FallacyResult";
import { IEmoPredProps } from "./types/IEmoPredProps";
import { IFallacyPredProps } from "./types/IFallacyPredProps";
import ResetButton from "./components/ResetButton";

export default function Home() {
  const [isAnalyzeRequested, setAnalyzeRequested] = useState<boolean>(false);
  const [isEmotionRequested, setEmotionRequested] = useState<boolean>(false);
  const [isFallacyRequested, setFallacyRequested] = useState<boolean>(false);

  
  const [prompt, setPrompt] = useState<string>("");

  const [emotionDataAndError, setEmotionDataAndError] = useState<[IEmoPredProps[], boolean]>([[], false]);
  const [fallacyDataAndError, setFallacyDataAndError] = useState<[IFallacyPredProps[], boolean]>([[], false]);

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


  const resetAll = () => {
    setAnalyzeRequested(false);
    setFallacyRequested(false);
    setEmotionRequested(false);
    setPrompt("");
  }

  return (
    <main className = "my-[2vw] w-[96vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw] flex flex-col justify-center m-auto gap-4">
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

      <ResetButton resetAll = {resetAll}/>
      

    </main>
  );
}


