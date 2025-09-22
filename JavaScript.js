window.addEventListener("DOMContentLoaded", ()=>{
  
  showNotification("Welcome to Quick Wa Link 🖇️ ");
  loadCountryCode();
  
  // Menu toggle with aria-expanded
  document.addEventListener("click", (event) => {
    const menuBtn = document.querySelector("#menuBtn");
    const navMenu = document.querySelector("#navMenu");
  
    // When clicking the menu button
    if (event.target.closest("#menuBtn")) {
      const isOpen = navMenu.classList.toggle("open");
  
      // Update aria-expanded and aria-hidden
      menuBtn.setAttribute("aria-expanded", isOpen);
      navMenu.setAttribute("aria-hidden", !isOpen);
    }
  
    // When clicking inside navMenu but not a nav link → keep open
    else if (event.target.closest("#navMenu") && !event.target.closest(".navLinks")) {
      // Do nothing (menu stays open)
    }
  
    // Click outside → close menu
    else {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
    }
  });
  
  
  // Generating WhatsApp links 
  const waForm = document.querySelector("#waForm");
  waForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    // get form data
    const code = waForm.countryCode.value;
    const phone = waForm.phone.value.trim();
    const message = waForm.message.value.trim();
    
    if (!/^\d+$/.test(phone)) {
      showNotification("Please enter digits only, without spaces or symbols.");
      return;
    }
    
    let waLink = "";
    const fullphone = code + phone;
    if (message==="") {
      waLink = `https://wa.me/${fullphone}`;
    } else {
      waLink = `https://wa.me/${fullphone}?text=${encodeURIComponent(message)}`;
    }
    
    const linkHolder = document.querySelector("#waLink");
    linkHolder.href = waLink;
    linkHolder.textContent = waLink;
    updatePreview();
    showNotification("Link generated successfully! 🎉");
    document.getElementById("outputSection").scrollIntoView();
    waForm.reset();
  });
  
  document.getElementById("previewBtn").addEventListener("click", () => {
    updatePreview();
    document.getElementById("previewSection").scrollIntoView();
  });
  
  // Copy button logic
  const copyBtn = document.getElementById("copyBtn");
  const waLink = document.getElementById("waLink");
  copyBtn.addEventListener("click", () => {
    const link = waLink.textContent;
    if (link === "https://wa.me/") {
      alert("Generate a link first");
      return;
    }
    
    navigator.clipboard.writeText(link)
      .then(() => showNotification("Link copied successfully"))
      .catch(() => showNotification("Copy failed, please copy manually"));
  });
  
  
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 4000);
  }
  
  // Preview function 
  function updatePreview() {
    const previewTell = document.querySelector("#preview-tel")
    const previewMessage = document.querySelector("#previewMessage");
    
    const code = waForm.countryCode.value;
    const phone = waForm.phone.value.trim();
    const message = waForm.message.value.trim();
    if(phone !=="") {
      previewTell.textContent = `+${code}${phone}`;
    }
    if(message !=="") {
      previewMessage.textContent = message;
    }
  }
  
  // fetching country codes 
  function loadCountryCode() {
    fetch('codes.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.text();
        }
      })
      .then(data => {
        const options = data.match(/<option[^>]*>.*?<\/option>/gi);
        const select = waForm.countryCode;
        select.innerHTML = '';
        options.forEach(option => {
          select.insertAdjacentHTML('beforeend', option);
        });
      })
      .catch(err => {
        alert(`Failed to load country codes. ${err.message}`)
      });
  };
})