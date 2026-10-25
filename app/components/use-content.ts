"use client";
import {createContext,useContext} from "react";
import {defaultContact,type ContactInfo,type ContentItem} from "../content-model";
import {builtinPages} from "../page-registry";
export type PublicContentData={contact:ContactInfo;offers:ContentItem[];pages:ContentItem[]};
export const ContentContext=createContext<PublicContentData>({contact:defaultContact,offers:[],pages:builtinPages});
export function useContent(){return {...useContext(ContentContext),loaded:true};}
