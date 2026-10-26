export function navigationActive(href:string,pathname:string,hash:string){
 const split=href.indexOf("#");
 if(split>=0)return pathname===href.slice(0,split)&&hash===href.slice(split);
 if(href==="/")return pathname==="/"&&hash!=="#services";
 return pathname===href||pathname.startsWith(href+"/");
}
