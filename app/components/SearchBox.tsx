import { MouseEventHandler, useEffect, useState } from "react";
import { Icon_Bad, Icon_DownArrow, Icon_Emotion, Icon_RightArrow } from "./Icons";

type ISearch = {
    isAnalyzeRequested: boolean;
    setAnalyzeRequested: (isAnalyzeRequested: boolean) => void;
    isEmotionRequested: boolean;
    setEmotionRequested: (isEmotionRequested: boolean) => void;
    isFallacyRequested: boolean;
    setFallacyRequested: (isFallacyRequested: boolean) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
}

export const SearchBox = ({isAnalyzeRequested, setAnalyzeRequested, isEmotionRequested, setEmotionRequested, isFallacyRequested, setFallacyRequested, prompt, setPrompt} : ISearch) => {

    
    const handlePromptChange = (event: any) => {
        setPrompt(event.target.value)
    }
    return (
        <section className="flex flex-col justify-center p-10 bg-white rounded-xl gap-4">
            <textarea
                placeholder="Enter text paragraph here..."
                className="border border-gray-300 rounded-lg w-full athiti p-2 h-[200px]"
                value = {prompt}
                onChange={handlePromptChange}
            ></textarea>
            <section className="flex justify-center gap-4">

                <button className= {isFallacyRequested? "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center bg-[--primary]" : "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center"}
                    onClick={() => {
                        setFallacyRequested(!isFallacyRequested)
                        setAnalyzeRequested(false)
                    }}
                    >
                
                    logical fallacy
                    <Icon_Bad></Icon_Bad>
                </button>
                <button className= {isEmotionRequested? "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center bg-[--secondary]" : "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center"}
                    onClick={() => {
                        setEmotionRequested(!isEmotionRequested)
                        setAnalyzeRequested(false)
                    }}
                    >
                
                    Emotion
                    <Icon_Bad></Icon_Bad>
                </button>
                <button className= {!isAnalyzeRequested? "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center bg-[--ternary]" : "border border-black text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center bg-[--accent]"}
                    onClick={() => {
                        if (isEmotionRequested || isFallacyRequested) setAnalyzeRequested(true)
                        else setAnalyzeRequested(false)}}
                    >
                
                    {!isAnalyzeRequested? "Analyze this" : "result below"}
                    {!isAnalyzeRequested? <Icon_RightArrow/> : <Icon_DownArrow/>}
                </button>


            </section>


        </section>
    );
}
