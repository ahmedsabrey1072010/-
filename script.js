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

  if (button && list && input) {
    button.addEventListener("click", () => {
      const text = input.value.trim();
      if (text === "") {
        if (msg) {
          msg.innerText = "يرجى كتابة اسم المنصة أو المبادرة الرقمية أولاً.";
          msg.style.color = "#1d4ecd";
        }
        return;
      }
      if (msg) msg.innerText = "";
      const li = document.createElement("li");
      li.textContent = text;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "حذف";
      deleteBtn.className = "deleteBtn";
      deleteBtn.style.marginRight = "10px";
      deleteBtn.onclick = () => li.remove();
      li.appendChild(deleteBtn);
      list.appendChild(li);
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

  // ========== 3. كود تغيير اللغة ==========
  const langToggle = document.getElementById("langToggle");
  let currentLang = localStorage.getItem("lang") || "ar";

  function applyLanguage(lang) {
    document.querySelectorAll("[data-ar]").forEach(el => {
      const arText = el.getAttribute("data-ar");
      const enText = el.getAttribute("data-en");
      if (lang === "ar" && arText) {
        el.innerText = arText;
      } else if (lang === "en" && enText) {
        el.innerText = enText;
      }
    });

    document.body.dir = lang === "ar"? "rtl" : "ltr";
    document.body.style.textAlign = lang === "ar"? "right" : "left";

    if (langToggle) {
      langToggle.innerText = lang === "ar"? "English" : "العربية";
    }
    localStorage.setItem("lang", lang);
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
