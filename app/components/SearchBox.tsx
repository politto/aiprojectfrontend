import { MouseEventHandler, useEffect, useState } from "react";
import { Icon_Bad, Icon_DownArrow, Icon_Emotion, Icon_RightArrow } from "./Icons";
import ResetButton from "./ResetButton";
import Banner from "./Banner";

type ISearch = {
    isAnalyzeRequested: boolean;
    setAnalyzeRequested: (isAnalyzeRequested: boolean) => void;
    isEmotionRequested: boolean;
    setEmotionRequested: (isEmotionRequested: boolean) => void;
    isFallacyRequested: boolean;
    setFallacyRequested: (isFallacyRequested: boolean) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    resetAll: () => void;
}

export const SearchBox = ({isAnalyzeRequested, setAnalyzeRequested, isEmotionRequested, setEmotionRequested, isFallacyRequested, setFallacyRequested, prompt, setPrompt, resetAll} : ISearch) => {

    
    const handlePromptChange = (event: any) => {

        setPrompt(event.target.value)
        // if (isAnalyzeRequested) resetAll()
    }

    const handleAnalyzeClick = (event: any) => {
        if (!validatePrompt(prompt, setPrompt)) return 
        if (isEmotionRequested || isFallacyRequested) setAnalyzeRequested(true)
        else setAnalyzeRequested(false)
    }

    const validatePrompt = (prompt: string, setPrompt: (prompt: string) => void) => {
        // I want some pattern matching
    
        if (!prompt.match(/^[a-zA-Z0-9\s.?!-,()]+$/)) {
          alert("You are Please enter a valid prompt with english language only and not with any spacial character");
          setPrompt("");
          return false;
        }
        // console.log("validate passed")
        return true;
      }
    return (
        <section>
        <Banner></Banner>
        <section className="flex flex-col justify-center py-[2em] px-[1em] md:px-10 bg-white rounded-bl-[3em] rounded-br-[3em] gap-4">
            <section className = "">
                <header className = "text-center text-5xl font-semibold montserrat py-10">
                Logical Fallacy & Emotion detection Model
                </header>
            </section>
            <section className = "flex flex-col gap-4 bg-gradient-to-b from-[#F392B7] to-[#AA70C3] py-[2em] px-[1em] md:px-[2em] rounded-3xl">
                <textarea
                    placeholder="Enter text paragraph here..."
                    className="rounded-xl w-full athiti p-2 h-[200px]"
                    value = {prompt}
                    onChange={handlePromptChange}
                    // onBlur={handlePromptChange}
                ></textarea>
                <section className="flex justify-center gap-4 text-black font-semibold text-xl flex-col md:flex-row">

                    <button className= {isFallacyRequested? 
                    "  py-2 px-4 rounded-lg inline-flex items-center gap-2 w-full justify-center bg-gradient-to-b from-[#5F63CE] to-[#7BC8FF] min-w-[14em]" 
                    : 
                    "  py-2 px-4 rounded-lg inline-flex items-center gap-2 w-full justify-center bg-white min-w-[14em]"}
                        onClick={() => {
                            setFallacyRequested(!isFallacyRequested)
                            setAnalyzeRequested(false)
                        }}
                        >
                    
                        logical fallacy analysis
                        <Icon_Bad></Icon_Bad>
                    </button>
                    <button className= {isEmotionRequested? "k  py-2 px-4 rounded inline-flex items-center gap-2 w-full justify-center bg-[--secondary]" : "k  py-2 px-4 rounded-lg inline-flex items-center gap-2 w-full justify-center bg-white"}
                        onClick={() => {
                            setEmotionRequested(!isEmotionRequested)
                            setAnalyzeRequested(false)
                        }}
                        >
                    
                        Emotion
                        <Icon_Emotion></Icon_Emotion>
                    </button>
                    <button className= {!isAnalyzeRequested? "k  py-2 px-4 rounded-lg inline-flex items-center gap-2 w-full justify-center bg-[--ternary]" : "k  py-2 px-4 rounded-lg inline-flex items-center gap-2 w-full justify-center bg-[--accent]"}
                        onClick={handleAnalyzeClick}
                        >
                    
                        {!isAnalyzeRequested? "Analyze this" : "result below"}
                        {!isAnalyzeRequested? <Icon_RightArrow/> : <Icon_DownArrow/>}
                    </button>


                </section>
            </section>
            <section className="center text-center pt-8">
                <p>This web application is in a part of Artificial Intelligence Subject in CSKMITL’s curriculum.</p>
            </section>
            


        </section>
        </section>
    );
}
