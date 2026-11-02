// Non-modal disclosure: normal Tab order; dismiss without stealing outside focus.
export function attachHeaderDismissal(root:HTMLElement,toggle:HTMLButtonElement,close:()=>void,doc:Document,desktop:MediaQueryList){
 const outside=(event:Event)=>{if(!root.contains(event.target as Node))close();};
 const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){event.preventDefault();close();toggle.focus({preventScroll:true});}};
 const resize=()=>{if(desktop.matches)close();};
 const capture={capture:true};
 doc.addEventListener("pointerdown",outside,capture);
 doc.addEventListener("focusin",outside);
 doc.addEventListener("keydown",escape);
 desktop.addEventListener("change",resize);
 return ()=>{doc.removeEventListener("pointerdown",outside,capture);doc.removeEventListener("focusin",outside);doc.removeEventListener("keydown",escape);desktop.removeEventListener("change",resize);};
}
