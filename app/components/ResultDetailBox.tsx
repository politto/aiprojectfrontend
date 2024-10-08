import React from 'react';
import { IEmoPredProps } from '../types/IEmoPredProps';
import { IFallacyPredProps } from '../types/IFallacyPredProps';

type Props = {
    dataFallacy: IFallacyPredProps[];
    errorFallacy: boolean;
    dataEmotion: IEmoPredProps[];
    errorEmotion: boolean;
};

// mockData ของอารมณ์ (Emotion Mock Data)
const mockData: IEmoPredProps[] = [
  { emotion: "joy", percentage: 20, words: 800 },
  { emotion: "surprise", percentage: 20, words: 64 },
  { emotion: "love", percentage: 15, words: 3 },
  { emotion: "fear", percentage: 10, words: 3 },
  { emotion: "anger", percentage: 5, words: 3 },
  { emotion: "sadness", percentage: 0, words: 0 }
];

// mockData ของ fallacy
const mockData2: IFallacyPredProps[] = [
  { fallacy: "ad_hominem", percentage: 32, words: 800 },
  { fallacy: "circular_explanation", percentage: 28, words: 64 },
  { fallacy: "false_dilemma", percentage: 20, words: 3 },
  { fallacy: "fallacy_of_explanation", percentage: 10, words: 3 },
  { fallacy: "red_herring", percentage: 5, words: 3 }
];

// รายละเอียดของอารมณ์แต่ละประเภท
const emotionDetail = {
  joy: {
    detail: (percentage: number) => `Joy has a percentage of ${percentage}% with a feeling of great pleasure and happiness.`,
    pic: "/pics/joy.png"
  },
  surprise: {
    detail: (percentage: number) => `Surprise has a percentage of ${percentage}% with a feeling of astonishment or shock.`,
    pic: "/pics/surprise.png"
  },
  love: {
    detail: (percentage: number) => `Love has a percentage of ${percentage}% with a deep feeling of affection and care.`,
    pic: "/pics/love.png"
  },
  fear: {
    detail: (percentage: number) => `Fear has a percentage of ${percentage}% with a feeling of being afraid or anxious.`,
    pic: "/pics/fear.png"
  },
  anger: {
    detail: (percentage: number) => `Anger has a percentage of ${percentage}% with a strong feeling of annoyance or displeasure.`,
    pic: "/pics/anger.png"
  },
  sadness: {
    detail: (percentage: number) => `Sadness has a percentage of ${percentage}% with a feeling of sorrow or unhappiness.`,
    pic: "/pics/sadness.png"
  },
};

// รายละเอียดของ fallacy แต่ละประเภท
const fallacyDetail = {
  ad_hominem: {
    detail: "This fallacy occurs frequently in discussions or debates where the argument shifts from addressing the actual issue to attacking the person making the argument. Common in political debates.",
    pic: "/pics/AdHominem.jpg"
  },
  appeal_to_emotion: {
    detail: "This fallacy involves manipulating the audience's emotions—such as fear, sympathy, or anger—to sway their opinion, without providing logical reasoning or evidence to support the argument.",
    pic: "/pics/Appeal_to_Emotion.jpg"
  },
  ad_populum: {
    detail: "This fallacy occurs when someone claims something is true or right simply because many people believe it or because it is popular. Often seen in advertising and political speeches.",
    pic: "/pics/Ad_Populum.jpg"
  },
  false_dilemma: {
    detail: "This fallacy presents only two options as if they are the only possibilities, when in reality, there may be other alternatives. Often used in political or marketing strategies.",
    pic: "/pics/False_dilemma.jpg"
  },
  false_causality: {
    detail: "This fallacy occurs when someone incorrectly links two events as cause and effect, even though there is no clear relationship between them. Often found in misleading arguments or articles.",
    pic: "/pics/false_causality.jpg"
  },
};

const ResultDetailBox = ({ dataEmotion, errorEmotion, dataFallacy, errorFallacy }: Props) => {
    // ใช้ mockData และ mockData2 ถ้าไม่มีข้อมูลจาก API
    const emotionData = dataEmotion.length > 0 ? dataEmotion : mockData;
    const fallacyData = dataFallacy.length > 0 ? dataFallacy : mockData2;

    if (fallacyData.length == 0 || emotionData.length == 0) return null; // ตรวจสอบว่าข้อมูลไม่ว่างเปล่า

    let primaryEmotion = emotionData[0].emotion.toLowerCase();
    let emotionPercentage = emotionData[0].percentage || 0;
    let emotionDetailData = emotionDetail[primaryEmotion];

    return (
      <section className="bg-white rounded-3xl shadow-md p-8 flex flex-col lg:flex-row gap-4">
    {/* ฝั่ง fallacy */}
    {
      fallacyData.length > 0 &&
      <section className="flex-1 flex flex-col justify-start items-center self-center">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text" style={{ lineHeight: '1.5', overflow: 'visible' }}>
            Fallacy analysis result
        </h2>

        <div className="flex flex-col justify-center items-center mt-8 gap-4">
            {/* รูปภาพของ fallacy */}
            <div className="w-full flex justify-center items-center">
                <img 
                    src={fallacyDetail[fallacyData[0].fallacy].pic} 
                    alt={fallacyData[0].fallacy} 
                    className="w-2/3 h-auto object-contain mt-4" 
                />
            </div>

            {/* ข้อมูลของ fallacy */}
            <div className="flex flex-col justify-center items-center w-full mt-4 text-center">
                <h3 className="text-3xl font-bold text-pink-500" style={{ lineHeight: '1.5', overflow: 'visible' }}>
                  {fallacyData[0].fallacy}
                </h3>
                <p className="montserrat text-lg text-gray-600 mt-2" style={{ lineHeight: '1.5' }}>
                    {fallacyDetail[fallacyData[0].fallacy].detail}
                </p>
            </div>
        </div>
      </section>
    }

    {/* ฝั่งอารมณ์ */}
    {
      emotionData.length > 0 &&
      <section className="flex-1 flex flex-col justify-start items-center self-center">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text my-8" style={{ lineHeight: '1.5', overflow: 'visible' }}>
            Emotion analysis result
        </h2>
        <div className="flex flex-col justify-center items-center mt-8 gap-4">
          <div className="w-full flex justify-center items-center">
            <img 
                src={emotionDetailData.pic} 
                alt={primaryEmotion} 
                className="w-2/3 h-auto object-contain mt-4" 
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full mt-4 text-center">
            <h3 className="text-3xl font-bold text-pink-500" style={{ lineHeight: '1.5', overflow: 'visible' }}>
              {primaryEmotion.charAt(0).toUpperCase() + primaryEmotion.slice(1)}
            </h3>
            <p className="text-xl text-gray-700 mt-2" style={{ lineHeight: '1.5' }}>Results from the analysis</p>
            <p className="text-lg text-gray-600 mt-4 text-center" style={{ lineHeight: '1.5' }}>
              {emotionDetailData.detail(emotionPercentage)}
            </p>
          </div>
        </div>
      </section>
    }
</section>
    );
};

export default ResultDetailBox;
