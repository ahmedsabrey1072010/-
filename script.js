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

// إدارة قائمة التفاعلات والمبادرات الرقمية
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("Btn10");
  const list = document.getElementById("myList");
  const input = document.getElementById("myInput");
  const msg = document.getElementById("message");

  if (!button || !list || !input) return;

  button.addEventListener("click", () => {
    const text = input.value.trim();

    if (text === "") {
      msg.innerText = "يرجى كتابة اسم المنصة أو المبادرة الرقمية أولاً.";
      msg.style.color = "#1d4ecd";
      return;
    }

    // تفريغ رسالة التنبيه عند الكتابة الصحيحة
    msg.innerText = "";

    // إنشاء عنصر القائمة الجديد
    const li = document.createElement("li");
    li.textContent = text;

    // إنشاء زر الحذف داخل العنصر
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.className = "deleteBtn";
    deleteBtn.style.marginRight = "10px";
    deleteBtn.onclick = () => li.remove();

    li.appendChild(deleteBtn);
    list.appendChild(li);

    // تفريغ حقل الإدخال
    input.value = "";
  });
});

// دالة التحقق الإضافية لحقل الإدخال
function checkInput() {
  const f1 = document.getElementById("myInput").value.trim();
  const msg = document.getElementById("message");
  
  if (f1 === "") {
    msg.innerText = "يرجى كتابة اسم المنصة أو المبادرة الرقمية أولاً.";
    msg.style.color = "#1d4ecd";
  }
}
