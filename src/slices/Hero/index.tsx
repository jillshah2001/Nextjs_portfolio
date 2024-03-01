"use client";

import { useEffect , useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import { Shapes } from "@/slices/Hero/Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null)

  useEffect(() =>{
    let ctx = gsap.context(() =>{
      const t1 = gsap.timeline()

      t1.fromTo(".name-animation" , 
      {
        x:-100,
        opacity: 0,
        rotate: -10,
      },
      {
        x:0,
        opacity: 1,
        rotate: 0,
        ease: "back.out(1.7)",
        duration: 1,
        transformOrigin:"left top",
        delay:0.5,
        stagger:{
          each: 0.2,
          from:"random",
        }
      } 
      
      );

      t1.fromTo(".job-title", {
        y:20,
        opacity:0,
        scale:1.2,
      }, {
        opacity:1,
        y:0,
        duration:1,
        scale:1,
        ease: "back.out(1.7)",
      })



    }, component)
    return () => ctx.revert();
    },
    []
    );


  const renderLetters = (name:KeyTextField , key:string) => {
    if (!name) return;
    return name.split("").map((letter , index) => (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ))
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="cols-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"aria-label={slice.primary.jill + " " + slice.primary.shah}>

      <span className="block text-slate-300">
        {renderLetters(slice.primary.jill,"jill")}</span>
      <span className="-mt-[.2em] block text-slate-500">
        {renderLetters(slice.primary.shah, "shah")}</span>
          </h1>
      <span className=" job-title block bg-gradient-to-tr from-blue-500 via-blue-200 to-zblue-500 bg-clip-text text-2xl font-bold
       uppercase tracking-[.2em] text-transparent opacity-1 md:text-4xl">{slice.primary.tag_line}</span>
    </div>
      </div>
    </Bounded>
  );
};

export default Hero;
