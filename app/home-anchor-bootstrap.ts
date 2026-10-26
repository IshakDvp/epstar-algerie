// Defer only the initial home Solutions hash; same-document clicks remain native.
// Without JS the original /#services link still works normally.
export const homeAnchorBootstrap=`(()=>{if(location.pathname==='/'&&location.hash==='#services'){document.documentElement.dataset.epstarAnchor='services';var u=new URL(location.href);u.hash='';history.replaceState(history.state,'',u);}})();`;
