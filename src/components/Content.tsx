import { Button } from "@kinachan/shirayuri";
import { useEffect, useRef, useState } from "react";
import mermaid from 'mermaid';
import { useRouter } from "next/router";

export default function Content({content}: Partial<{content: string}>) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    mermaid.initialize({
      theme: 'default',
    });
    mermaid.contentLoaded();
    
    if (!window.location.hash) return;
    setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.substring(1));
      const element = document.getElementById(id);
  
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }    
    }, 500);
    

  }, [content]);


  return (
    <>
      <div 
        ref={ref}
        className="content"
        dangerouslySetInnerHTML={{
        __html: content ?? '',
      }}>
      </div>
      <Button
        isCircle
        className={'floating-bottom-button'}
        icon={'fa fa-arrow-circle-up'}
        tooltipPosition='left'
        tooltipText='一番上に戻る'
        onClick={(e) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  )


}