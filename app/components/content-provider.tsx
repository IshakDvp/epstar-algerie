"use client";
import {ContentContext,type PublicContentData} from "./use-content";
export default function ContentProvider({value,children}:{value:PublicContentData;children:React.ReactNode}){
 return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
