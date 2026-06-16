import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const FONNT_WEIGHTS = {
    subtitle: {min:100, max:200, default: 100},
    title: {min: 400, max: 900, default: 400}
}

const renderText = (text, className, baseWeight = 400) =>{
    return [... text].map((char, index) => (
        <span key={index} className={className} style={{fontVariationSettings: `"wght" ${baseWeight}`}}>
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if (!container) return;
    const letters = container.querySelectorAll("span");
    const {min, max, default: base} = FONNT_WEIGHTS[type]

    const animateLetters = (letter,weight,duration = 0.25) => {
        return gsap.to(letter, {
            fontVariationSettings: `"wght" ${weight}`,
            duration: duration,
            ease: "power2.out"
        })
    }

    const handleMouseMove = (event) => {
        const { left, width } = container.getBoundingClientRect();
        const mouseX = Math.min(Math.max(event.clientX - left, 0), width);
        const percentage = mouseX / width;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const letterCenter = l - left + w / 2;
            const distance = Math.abs(mouseX - letterCenter);
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetters(letter, min + (max - min) * intensity);
        })
    }

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            animateLetters(letter, base,0.3);
    }
)}

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
}
 
const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        setupTextHover(titleRef.current, "title");
        setupTextHover(subtitleRef.current, "subtitle");     
    },[])


  return <section id="welcome">
    <p ref={subtitleRef}>
        {renderText("Hey I'm Rifaz! Welcome to my", "text-3xl font-georama",200,)}
    </p>
    <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama")}
    </h1>
  </section>
}

export default Welcome