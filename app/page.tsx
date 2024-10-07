'use client';

import { useEffect, useState } from "react";
import EmotionResultBox from "./components/EmotionResult";
import ResultDetailBox from "./components/ResultDetailBox";
import { predictEmotion, predictFallacy } from "./api/AxiosApi";
import FallacyResultBox from "./components/FallacyResult";
import { IEmoPredProps } from "./types/IEmoPredProps";
import { IFallacyPredProps } from "./types/IFallacyPredProps";
import ResetButton from "./components/ResetButton";
import { SearchBox } from "./components/SearchBox";

export default function Home() {
  const [isAnalyzeRequested, setAnalyzeRequested] = useState<boolean>(false);
  const [isEmotionRequested, setEmotionRequested] = useState<boolean>(false);
  const [isFallacyRequested, setFallacyRequested] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const [emotionDataAndError, setEmotionDataAndError] = useState<[IEmoPredProps[], boolean]>([[], false]);
  const [fallacyDataAndError, setFallacyDataAndError] = useState<[IFallacyPredProps[], boolean]>([[], false]);

  // Fetch emotion analysis
  useEffect(() => {
    if (isAnalyzeRequested && isEmotionRequested) {
      predictEmotion(prompt).then((data) => {
        setEmotionDataAndError(data);
        (data[0] as IEmoPredProps[]).sort((da, db) => da.percentage - db.percentage).reverse();
        console.log('Emotion data:', data);
      }).catch((error) => {
        console.error('Error fetching emotion data:', error);
        setEmotionDataAndError([[], true]); // Set error status
      });
    }

    // Fetch fallacy analysis
    if (isAnalyzeRequested && isFallacyRequested) {
      predictFallacy(prompt).then((data) => {
        setFallacyDataAndError(data);
        (data[0] as IFallacyPredProps[]).sort((da, db) => da.percentage - db.percentage).reverse();
        console.log('Fallacy data:', data);
      }).catch((error) => {
        console.error('Error fetching fallacy data:', error);
        setFallacyDataAndError([[], true]); // Set error status
      });
    }
    
    // Clean up
    return () => {
      setEmotionDataAndError([[], false]);
      setFallacyDataAndError([[], false]);
    };
  }, [isAnalyzeRequested, isEmotionRequested, isFallacyRequested, prompt]);

  // Reset all states
  const resetAll = () => {
    setAnalyzeRequested(false);
    setFallacyRequested(false);
    setEmotionRequested(false);
    setPrompt("");
    setEmotionDataAndError([[], false]);
    setFallacyDataAndError([[], false]);
  };

  return (
    <main className="my-[2vw] w-[96vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw] flex flex-col justify-center m-auto gap-4">
      <SearchBox
        isAnalyzeRequested={isAnalyzeRequested}
        setAnalyzeRequested={setAnalyzeRequested}
        isEmotionRequested={isEmotionRequested}
        setEmotionRequested={setEmotionRequested}
        isFallacyRequested={isFallacyRequested}
        setFallacyRequested={setFallacyRequested}
        prompt={prompt}
        setPrompt={setPrompt}
        resetAll={resetAll}
      />

      {isAnalyzeRequested &&
        <ResultDetailBox
        dataEmotion={emotionDataAndError[0]}
        errorEmotion={emotionDataAndError[1]}
        dataFallacy={fallacyDataAndError[0]}
        errorFallacy = {fallacyDataAndError[1]}
      />
      }
      {/* แสดงผล EmotionDetailBox และ EmotionResultBox */}
      {isAnalyzeRequested && isEmotionRequested && (
        <>
          
          <EmotionResultBox
            data={emotionDataAndError[0]}
            error={emotionDataAndError[1]}
          />
        </>
      )}

    {isAnalyzeRequested && isFallacyRequested &&
      
      <FallacyResultBox data = {fallacyDataAndError[0]} error = {fallacyDataAndError[1]}/>
       
    }

      <ResetButton resetAll={resetAll} />
    </main>
  );
}
