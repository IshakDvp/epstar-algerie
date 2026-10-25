const sectorDefaults=[
 {key:"pharmacies",image:"/images/pharmacy-3d.png",ar:["صيدلية أو صيدلية شبه طبية","كاونترات، رفوف، مخازن ومساحات استشارة"],fr:["Pharmacie ou parapharmacie","Comptoirs, rayonnages, réserves et espaces conseil"],en:["Pharmacy or parapharmacy","Counters, shelving, storage and consultation areas"]},
 {key:"bureaux",image:"/images/office-3d.png",ar:["مكاتب ومساحات عمل","استقبال، مكاتب، اجتماعات وتخزين"],fr:["Bureaux et espaces de travail","Accueil, bureaux, réunion et rangement"],en:["Offices and workspaces","Reception, desks, meeting and storage"]},
 {key:"commerces",image:"/images/shop-3d.png",ar:["محل أو مساحة بيع","عرض المنتجات، كاشير، إضاءة وهوية"],fr:["Commerce ou espace de vente","Présentation, caisse, éclairage et identité"],en:["Retail or sales space","Displays, cash desk, lighting and identity"]},
 {key:"chambres",image:"/images/bedroom-3d.png",ar:["غرفة نوم أو دولاب","سرير، Dressing وتخزين حسب المقاس"],fr:["Chambre ou dressing","Lit, dressing et rangement sur mesure"],en:["Bedroom or wardrobe","Bed, wardrobe and made-to-measure storage"]}
] as const;

export const fitoutSectorKeys=["pharmacies","bureaux","commerces","chambres"] as const;
export const fitoutDefaults={copy:{
fr:{...{"title":"Démarrer un projet d’aménagement","heading":"Quel espace souhaitez-vous aménager ?","intro":"Choisissez votre secteur pour passer directement à la demande d’étude.","general":"Vous avez plusieurs espaces ?","generalButton":"Demander une étude globale","steps":["Choisissez l’espace","Décrivez le besoin","Envoyez la demande"],"startButton":"Commencer","stepsLabel":"Project steps"},sectors:sectorDefaults.map(s=>[...s.fr])},
ar:{...{"title":"ابدأ مشروع تجهيز","heading":"ما هي المساحة التي تريد تجهيزها؟","intro":"اختر المجال لنأخذك مباشرة إلى طلب دراسة المشروع.","general":"لديك عدة مساحات؟","generalButton":"اطلب دراسة شاملة","steps":["اختر المساحة","أخبرنا بالاحتياجات","أرسل الطلب"],"startButton":"ابدأ الطلب","stepsLabel":"مراحل المشروع"},sectors:sectorDefaults.map(s=>[...s.ar])},
en:{...{"title":"Start a fit-out project","heading":"What space would you like to fit out?","intro":"Choose a sector and go directly to the project study request.","general":"More than one space?","generalButton":"Request an overall study","steps":["Choose the space","Describe your needs","Send request"],"startButton":"Start request","stepsLabel":"Project steps"},sectors:sectorDefaults.map(s=>[...s.en])},
},images:{pharmacies:"/images/pharmacy-3d.png",bureaux:"/images/office-3d.png",commerces:"/images/shop-3d.png",chambres:"/images/bedroom-3d.png"}};
export type FitoutContent=typeof fitoutDefaults;
