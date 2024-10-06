// page.tsx

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
        console.log('Emotion data:', data);  // ล็อกข้อมูลที่ได้รับจาก API
      }).catch((error) => {
        console.error('Error fetching emotion data:', error);
        setEmotionDataAndError([[], true]); // กำหนดสถานะข้อผิดพลาดถ้าเกิด error
      });
    }

    if (isAnalyzeRequested && isFallacyRequested) {
      predictFallacy(prompt).then((data) => {
        setFallacyDataAndError(data);
        console.log('Fallacy data:', data); // ล็อกข้อมูลที่ได้รับจาก API
      }).catch((error) => {
        console.error('Error fetching fallacy data:', error);
        setFallacyDataAndError([[], true]); // กำหนดสถานะข้อผิดพลาดถ้าเกิด error
      });
    }
    
    return () => {
      // ล้างค่าข้อมูลเมื่อยกเลิกการใช้ useEffect
      setEmotionDataAndError([[], false]);
      setFallacyDataAndError([[], false]);
    };
  }, [isAnalyzeRequested, isEmotionRequested, isFallacyRequested, prompt]); // เพิ่ม prompt เพื่อให้ทำงานเมื่อ prompt เปลี่ยนแปลง

  const resetAll = () => {
    setAnalyzeRequested(false);
    setFallacyRequested(false);
    setEmotionRequested(false);
    setPrompt("");
    setEmotionDataAndError([[], false]); // ล้างข้อมูล emotion
    setFallacyDataAndError([[], false]); // ล้างข้อมูล fallacy
  }

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
      ></SearchBox>
      
      {isAnalyzeRequested && isEmotionRequested && (
        <EmotionResultBox
          data={emotionDataAndError[0]}
          error={emotionDataAndError[1]}
        />
      )}

      {isAnalyzeRequested && isFallacyRequested && (
        <FallacyResultBox
          data={fallacyDataAndError[0]}
          error={fallacyDataAndError[1]}
        />
      )}

      <ResetButton resetAll={resetAll} />
    </main>
  );
}