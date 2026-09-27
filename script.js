// دالة موحدة لإظهار وإخفاء محتوى "اقرأ المزيد" مع إمكانية التبديل (Toggle)
function toggleContent(elementId) {
  const content = document.getElementById(elementId);
  if (!content) return;

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

// إدارة قائمة التفاعلات والمبادرات الرقمية + البحث + الثيم + اللغة
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("Btn10");
  const list = document.getElementById("myList");
  const input = document.getElementById("myInput");
  const msg = document.getElementById("message");

  // حفظ القائمة في LocalStorage
  let savedList = JSON.parse(localStorage.getItem("myPlatforms") || "[]");
  function saveList(){ localStorage.setItem("myPlatforms", JSON.stringify(savedList)); }

  function renderList(lang){
    if(!list) return;
    list.innerHTML="";
    savedList.forEach((text, index)=>{
      const li=document.createElement("li");
      li.textContent=text;
      const deleteBtn=document.createElement("button");
      deleteBtn.textContent = lang==="ar"? "حذف" : "Delete";
      deleteBtn.className="deleteBtn";
      deleteBtn.style.marginRight="10px";
      deleteBtn.onclick=()=>{ savedList.splice(index,1); saveList(); renderList(lang); };
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  // قاموس ترجمة الـ li اللي مفيهاش data-en
  const liDict = {
    "الإتاحة المفتوحة": "Open access to all resources",
    "الربط بالمناهج": "Linked with school curricula",
    "دعم البحث العلمي": "Supporting scientific research",
    "البنية التحتية": "Digital infrastructure for schools",
    "توزيع التابلت": "School tablet distribution",
    "مراكز التصحيح": "Electronic correction centers",
    "قنوات مدرستنا": "Madrasetna channels",
    "منصة البث المباشر": "Live broadcast platform",
    "تطبيق مدرستنا بلس": "Madrasetna Plus App",
    "الشراكة مع القطاع الخاص": "Partnership with private sector",
    "التخصصات الحديثة": "Modern specializations",
    "الشهادات الدولية": "International certificates",
    "الخدمات الحكومية": "Government services",
    "الدفع الإلكتروني": "Electronic payment",
    "الربط والشفافية": "Integration & transparency",
    "مركز السيطرة": "Unified command & control center",
    "انتقال الحكومة الذكية": "Smart government transition",
    "مراكز البيانات": "Data centers",
    "السيادة الرقمية": "Digital sovereignty",
    "تحليل البيانات الضخمة": "Big data analytics",
    "دعم الابتكار": "Supporting innovation",
    "أبرز المميزات": "Key Features",
    "تفاصيل المنظومة": "System Details",
    "شبكة التعلم التفاعلي": "Interactive Learning Network",
    "تحول التعليم الفني": "Technical Education Transformation",
    "خدمات التوثيق": "Documentation Services",
    "البنية الرقمية": "Digital Infrastructure",
    "الأهمية الاستراتيجية": "Strategic Importance"
  };

  // احفظ النص العربي الأصلي لكل li مرة واحدة
  document.querySelectorAll("ul li").forEach(li=>{
    if(!li.getAttribute("data-original-ar") && li.innerText.trim()){
      li.setAttribute("data-original-ar", li.innerText.trim());
    }
  });

  if (button && list && input) {
    renderList(localStorage.getItem("lang")||"ar");
    button.addEventListener("click", () => {
      const text = input.value.trim();
      const currentLang = localStorage.getItem("lang")||"ar";
      if (text === "") {
        if (msg) {
          msg.innerText = currentLang==="ar"? "يرجى كتابة اسم المنصة أو المبادرة الرقمية أولاً." : "Please enter a platform name first.";
          msg.style.color = "#1d4ecd";
        }
        return;
      }
      if (msg) msg.innerText = "";
      savedList.push(text);
      saveList();
      renderList(currentLang);
      input.value = "";
    });
  }

  // ========== 1. كود البحث ==========
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const searchResult = document.getElementById("searchResult");

  function searchPlatform() {
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();
    if (!searchResult) return;

    if (query === "") {
      searchResult.innerText = "اكتب اسم المنصة أولاً";
      searchResult.style.color = "#d9534f";
      return;
    }

    const platforms = {
      "بنك المعرفة": "A1", "ekb": "A1", "المعرفة": "A1", "knowledge": "A1",
      "الامتحانات": "A2", "التابلت": "A2", "تابلت": "A2", "exams": "A2",
      "مدرستنا": "A3", "قنوات البث": "A3", "madrasetna": "A3",
      "التكنولوجيا التطبيقية": "A4", "الذكاء الاصطناعي": "A4", "المدارس": "A4", "applied": "A4",
      "مصر الرقمية": "A5", "بوابة مصر": "A5", "الخدمات الحكومية": "A5", "digital": "A5",
      "العاصمة الادارية": "A6", "العاصمة": "A6", "المدن الذكية": "A6", "capital": "A6",
      "البيانات": "A7", "الحوسبة السحابية": "A7", "pccc": "A7", "data": "A7",
      "رواد مصر": "cards", "الكارت الموحد": "cards", "الطوارئ": "cards", "حصص مصر": "cards", "الفاتورة": "cards", "الاشبال": "cards", "براعم": "cards"
    };

    let foundId = null;
    for (let key in platforms) {
      if (query.includes(key) || key.includes(query)) {
        foundId = platforms[key];
        break;
      }
    }

    if (foundId) {
      const target = document.getElementById(foundId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const originalBorder = target.style.border;
        target.style.border = "3px solid #00008B";
        target.style.boxShadow = "0 0 25px rgba(0,0,139,0.4)";
        searchResult.innerText = "✅ تم العثور على المنصة وتم الانتقال إليها";
        searchResult.style.color = "#00008B";
        setTimeout(() => {
          target.style.border = originalBorder;
          target.style.boxShadow = "";
        }, 3000);
      }
    } else {
      searchResult.innerText = "❌ لم يتم العثور على منصة بهذا الاسم، جرب كلمة أخرى";
      searchResult.style.color = "#d9534f";
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", searchPlatform);
  }
  if (searchInput) {
    searchInput.addEventListener("keypress", function(e) {
      if (e.key === 'Enter') {
        searchPlatform();
      }
    });
  }

  // ========== 2. كود تغيير الثيم ==========
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeToggle) themeToggle.innerText = "☀️ الوضع الفاتح";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark? "dark" : "light");
      themeToggle.innerText = isDark? "☀️ الوضع الفاتح" : "🌙 الوضع الداكن";
    });
  }

  // ========== 3. كود تغيير اللغة - يترجم كله حتى الـ li ==========
  const langToggle = document.getElementById("langToggle");
  let currentLang = localStorage.getItem("lang") || "ar";

  function applyLanguage(lang) {
    // 1- العناصر اللي عندها data-ar / data-en
    document.querySelectorAll("[data-ar]").forEach(el => {
      const arText = el.getAttribute("data-ar");
      const enText = el.getAttribute("data-en");
      if (lang === "ar" && arText) {
        el.innerText = arText;
      } else if (lang === "en" && enText) {
        el.innerText = enText;
      }
    });

    // 2- ترجمة كل الـ li حتى اللي مفيهاش data-en
    document.querySelectorAll("ul li[data-original-ar]").forEach(li=>{
      const original = li.getAttribute("data-original-ar");
      if(lang==="ar"){
        li.childNodes[0].textContent = original;
        if(li.childNodes[0].textContent.trim()==="") li.textContent = original;
        // رجع زر الحذف لو موجود
        if(!li.querySelector(".deleteBtn") && li.closest("#myList")==null){
           // مش قائمة المتابعة
        }
        // لو النص الأصلي لسه موجود كامل
        if(li.textContent.includes("...") || li.getAttribute("data-original-ar")){
          // حاول ترجع النص الأصلي كامل لو هو li عادي مش قائمة المتابعة
          if(!li.closest("#myList")){
            // استرجع النص الأصلي قبل زر الحذف
            const btn = li.querySelector(".deleteBtn");
            if(btn){
              li.childNodes[0].textContent = original;
            } else {
              li.innerText = original;
            }
          }
        }
      } else {
        // انجليزي - دور في القاموس
        let translated = null;
        // لو عنده data-en مباشر
        const directEn = li.getAttribute("data-en");
        if(directEn){ translated = directEn; }
        else {
          for(let arKey in liDict){
            if(original.includes(arKey)){
              translated = liDict[arKey];
              // لو فيه... كملها
              if(original.includes("...")) translated += "...";
              break;
            }
          }
        }
        if(translated){
          // حافظ على زر الحذف
          const btn = li.querySelector(".deleteBtn");
          if(btn){
            li.childNodes[0].textContent = translated + " ";
          } else {
            li.innerText = translated;
          }
        }
      }
    });

    // 3- ترجمة الـ placeholder والـ value
    const myInputPh = document.getElementById("myInput");
    if(myInputPh){
      myInputPh.placeholder = lang==="ar"? "أدخل اسم المنصة أو المبادرة الرقمية" : "Enter platform or initiative name";
    }
    const searchPh = document.getElementById("searchInput");
    if(searchPh){
      searchPh.placeholder = lang==="ar"? "مثال: بنك المعرفة، مصر الرقمية..." : "Ex: EKB, Digital Egypt...";
    }
    const sub = document.getElementById("submit");
    const res = document.getElementById("reset");
    if(sub) sub.value = lang==="ar"? "إرسال" : "Send";
    if(res) res.value = lang==="ar"? "إعادة ضبط" : "Reset";

    document.body.dir = lang === "ar"? "rtl" : "ltr";
    document.body.style.textAlign = lang === "ar"? "right" : "left";

    if (langToggle) {
      langToggle.innerText = lang === "ar"? "English" : "العربية";
    }
    localStorage.setItem("lang", lang);
    renderList(lang);
  }

  applyLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "ar"? "en" : "ar";
      applyLanguage(currentLang);
    });
  }
});

// دالة التحقق الإضافية لحقل الإدخال (الكود القديم)
function checkInput() {
  const inputEl = document.getElementById("myInput");
  if (!inputEl) return;
  const f1 = inputEl.value.trim();
  const msg = document.getElementById("message");
  if (f1 === "") {
    if (msg) {
      msg.innerText = "يرجى كتابة اسم المنصة أو المبادرة الرقمية أولاً.";
      msg.style.color = "#1d4ecd";
    }
  }
}
