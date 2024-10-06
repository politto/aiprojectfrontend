import React from 'react';
import { IEmoPredProps } from '../types/IEmoPredProps';

type Props = {
    data: IEmoPredProps[];
    error: boolean;
};

// mockData ที่ใช้ในการแสดงข้อมูลอารมณ์
const mockData: IEmoPredProps[] = [
  { emotion: "joy", percentage: 50, words: 800 },
  { emotion: "surprise", percentage: 20, words: 64 },
  { emotion: "love", percentage: 15, words: 3 },
  { emotion: "fear", percentage: 10, words: 3 },
  { emotion: "anger", percentage: 5, words: 3 },
  { emotion: "sadness", percentage: 0, words: 0 }
];

// รายละเอียดของอารมณ์แต่ละประเภท
const emotionDetail = {
  joy: {
    detail: (percentage: number) => `Joy has a percentage of ${percentage}% with a feeling of great pleasure and happiness.`,
    pic: "/images/joy.png"
  },
  surprise: {
    detail: (percentage: number) => `Surprise has a percentage of ${percentage}% with a feeling of astonishment or shock.`,
    pic: "/images/surprise.png"
  },
  love: {
    detail: (percentage: number) => `Love has a percentage of ${percentage}% with a deep feeling of affection and care.`,
    pic: "/images/love.png"
  },
  fear: {
    detail: (percentage: number) => `Fear has a percentage of ${percentage}% with a feeling of being afraid or anxious.`,
    pic: "/images/fear.png"
  },
  anger: {
    detail: (percentage: number) => `Anger has a percentage of ${percentage}% with a strong feeling of annoyance or displeasure.`,
    pic: "/images/anger.png"
  },
  sadness: {
    detail: (percentage: number) => `Sadness has a percentage of ${percentage}% with a feeling of sorrow or unhappiness.`,
    pic: "/images/sadness.png"
  },
};

const EmotionDetailBox = ({ data, error }: Props) => {
    // ใช้ mockData ถ้าไม่มีข้อมูลจาก API
    const emotionData = data.length > 0 ? data : mockData;
    const primaryEmotion = emotionData[0]?.emotion.toLowerCase() || 'joy';
    const emotionPercentage = emotionData[0]?.percentage || 0;

    const emotionDetailData = emotionDetail[primaryEmotion] || emotionDetail['joy']; // เลือกข้อมูลของอารมณ์นั้น ๆ

    return (
        <section className="bg-white rounded-3xl shadow-md p-8 my-4">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Emotion analysis result
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8">
                {/* รูปภาพของอารมณ์ */}
                <div className="flex justify-center items-center w-full md:w-1/3">
                    <img 
                        src={emotionDetailData.pic} 
                        alt={primaryEmotion} 
                        className="w-64 h-auto" 
                    />
                </div>

                {/* ข้อมูลของอารมณ์ */}
                <div className="flex flex-col justify-center items-center md:items-start w-full md:w-2/3 mt-4 md:mt-0">
                    <h3 className="text-3xl font-bold text-pink-500">
                      {primaryEmotion.charAt(0).toUpperCase() + primaryEmotion.slice(1)}
                    </h3>
                    <p className="text-xl text-gray-700 mt-2">Results from the analysis</p>
                    <p className="text-lg text-gray-600 mt-4 text-center md:text-left">
                        {/* ใช้ฟังก์ชันเพื่อแสดงรายละเอียดโดยอิงตาม percentage */}
                        {emotionDetailData.detail(emotionPercentage)}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EmotionDetailBox;
