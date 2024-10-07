import React from 'react';
import { IEmoPredProps } from '../types/IEmoPredProps';
import { IFallacyPredProps } from '../types/IFallacyPredProps';

type Props = {
    dataFallacy: IFallacyPredProps[];
    errorFallacy: boolean;
    dataEmotion: IEmoPredProps[];
    errorEmotion: boolean;
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


type FallacyDetail = {
  [key: string]: {
    detail: string;
    pic: string;
  };
};

const fallacyDetail: FallacyDetail = {
  ad_hominem: {
    detail: "เหตุผล: พบเจอบ่อยในบทสนทนาหรือการโต้เถียงที่มักเบี่ยงเบนประเด็นจากข้อโต้แย้งไปสู่การโจมตีบุคคลแทน เช่น ในการโต้วาทีทางการเมืองหรือสื่อสังคมออนไลน์ ตัวอย่างประโยค:\"คุณไม่ควรเชื่อสิ่งที่เขาพูด เพราะเขาไม่จบมหาวิทยาลัยเลยด้วยซ้ำ\"",
    pic: "/pics/ad_hominem.jpg"
  },
  ad_populum: {
    detail: "เหตุผล: มักเกิดขึ้นในการอ้างว่าบางสิ่งถูกต้องเพียงเพราะคนส่วนใหญ่เชื่อหรือทำตาม พบบ่อยในโฆษณาสินค้าและการเมือง ตัวอย่างประโยค:\"สินค้านี้ขายดีที่สุด ดังนั้นมันต้องดีที่สุดแน่ ๆ\"",
    pic: "/pics/ad_populum.jpg"
  },
  appeal_to_emotion: {
    detail: "เหตุผล: พบบ่อยในโฆษณา การโน้มน้าวใจผ่านการกระตุ้นความรู้สึกของผู้ฟัง เช่น การใช้ภาพหรือเนื้อหาที่ทำให้รู้สึกกลัวหรือสงสารเพื่อให้ซื้อสินค้าหรือเปลี่ยนความคิด ตัวอย่างประโยค:\"หากคุณไม่ทำตามนี้ ชีวิตของคุณอาจตกอยู่ในอันตรายร้ายแรง!\"",
    pic: Math.random() > 0.5? "/pics/appeal_to_emotion.jpeg": "/pics/appeal_to_emotion2.jpg"
  },
  false_casuality: {
    detail: "เหตุผล: เกิดขึ้นเมื่อคนเชื่อมโยงสองเหตุการณ์ที่ไม่เกี่ยวข้องกัน เช่นในข่าวหรือบทความที่อ้างเหตุผลผิดๆ ตัวอย่างประโยค: \"ตั้งแต่ที่เราเริ่มใช้ผลิตภัณฑ์ใหม่นี้ ยอดขายของเราก็เพิ่มขึ้น ดังนั้นผลิตภัณฑ์นี้ต้องเป็นเหตุผลของความสำเร็จ\"",
    pic: "/pics/false_casuality.jpg"
  },
  false_dilemma: {
    detail: "เหตุผล: มักพบบ่อยในสถานการณ์ที่มีการจำกัดทางเลือกให้เหลือแค่สองทาง ทั้งๆ ที่มีทางเลือกอื่น พบเจอในสุนทรพจน์ทางการเมืองหรือการโฆษณา ตัวอย่างประโยค:\"คุณจะต้องเลือกว่าจะอยู่กับเราหรือจะเป็นศัตรูเรา ไม่มีทางเลือกอื่น!\"",
    pic: "/pics/2814.jpg"
  },
  
}


const ResultDetailBox = ({ dataEmotion, errorEmotion, dataFallacy, errorFallacy }: Props) => {
    // // ใช้ mockData ถ้าไม่มีข้อมูลจาก API
    // const dataEmotion = dataEmotion.length > 0 ? dataEmotion : mockData;

    if (dataFallacy.length == 0 && dataEmotion.length == 0) return;
    console.log(dataEmotion)

    let primaryEmotion = null;
    let emotionPercentage = null;
    let emotionDetailData = emotionDetail['joy'];
    
    if (dataEmotion.length > 0) {
      primaryEmotion = dataEmotion[0].emotion.toLowerCase();
      emotionPercentage = dataEmotion[0].percentage || 0;
      emotionDetailData = emotionDetail[primaryEmotion]
      console.log(emotionDetailData)
    }

    

    
    return (
        <section className="bg-white rounded-3xl shadow-md p-8 flex flex-col lg:flex-row gap-4">
            {
              dataEmotion.length > 0 &&
              <section>
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Emotion analysis result
            </h2>

            <div className="flex flex-col justify-center items-center mt-8 gap-8">
                {/* รูปภาพของอารมณ์ */}
                <div className="flex justify-center items-center w-full md:w-1/3">
                    <img 
                        src={emotionDetailData.pic} 
                        alt={primaryEmotion} 
                        className="w-64 h-auto" 
                    />
                </div>

                {/* ข้อมูลของอารมณ์ */}
                <div className="flex flex-col justify-center items-center md:items-start w-full mt-4 md:mt-0">
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
            }
            {
              dataFallacy.length > 0 &&
              <section>
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text my-4">
                  Fallacy analysis result
              </h2>
              <section className = "flex flex-col gap-4">
                <img src={fallacyDetail[dataFallacy[0].fallacy].pic} alt="" className='max-h-[50vh] lg:max-h-[70vh] object-contain'/>
                <section>
                <h3 className="text-3xl font-bold text-pink-500">
                {dataFallacy[0].fallacy}
                    </h3>
                <p className = "montserrat">{fallacyDetail[dataFallacy[0].fallacy].detail}</p>
                </section>
              </section>
            </section>
            }
            <section>

            </section>
        </section>
    );
};

export default ResultDetailBox;
