const ftext = document.querySelector(".from-text");
const totext = document.querySelector(".from-to");
const selecttag = document.querySelectorAll("select");
const exchangeicon = document.querySelector(".exchange");
let translatebtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");
selecttag.forEach(tag => {
    for (const code in languages) {
        // let default_lang;
        // if(id==0 && code=='en-GB'){
        //     default_lang="selected";
        // }
        // else if(id==1 && code=='hi-IN'){
        //     default_lang="selected";
        // }

        let option = `<option value="${code}">${languages[code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);//adding all options inside select tag


    }
});

exchangeicon.addEventListener("click", () => {
    //swapping text
    let temp = ftext.value;
    ftext.value = totext.value;
    totext.value = temp;
    //swapping select val
    let tlang = selecttag[0].value;
    selecttag[0].value = selecttag[1].value;
    selecttag[1].value = tlang;
});

translatebtn.addEventListener("click", () => {
    let text = ftext.value,
        translatefrom = selecttag[0].value,
        translateto = selecttag[1].value;
    let apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
    
    fetch(apiurl).then(res => res.json()).then(data => {
        console.log(data);
        totext.value = data.responseData.translatedText;
        console.log(text, translatefrom, translateto);

    });
   

});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(ftext.value);

            }
            else {
                navigator.clipboard.writeText(totext.value);
            }
        }
        else {
            let pronounce;
            if (target.id == "from"){
                pronounce=new SpeechSynthesisUtterance(ftext.value);
                pronounce.lang=selecttag[0].value;
            }
            else{
                pronounce=new SpeechSynthesisUtterance(totext.value);
                pronounce.lang=selecttag[1].value;
            }
            speechSynthesis.speak(pronounce);

            
        }
    });
})
