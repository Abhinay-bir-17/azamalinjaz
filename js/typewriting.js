//ES6 class
class typeWriter{
    constructor(txtElement,words,wait=3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait,10);
        this.type();
        this.isDeleting = false;
    }
    type(){
    //current index pf wprd 
    const current = this.wordIndex % this.words.length;
    // ger rhe full text of yhe current woed
     const fullTxt = this.words[current];
     
     //check if deleting
     if(this.isDeleting){
        //remove char
        this.txt = fullTxt.substring(0, this.txt.length -1);
     }
     else{
        this.txt = fullTxt.substring(0, this.txt.length +1); 
     }

    //inser txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}<span>`;        
     
    //initial type speed
     let typeSpeed = 200;

     if(this.isDeleting){
        typeSpeed /=3;
     }

     //if thee wprd is complete
     if(!this.isDeleting && this.txt === fullTxt){
        //make a pause at the end 
        typeSpeed = this.wait;
        // se delete to true
        this.isDeleting = true;
     }else if(this.isDeleting && this.txt === '' ){
        this.isDeleting = false;
        //move to next string
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;
     }

    setTimeout(()=>this.type(),typeSpeed);       
    }
}

//init on dom load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //init typewriter
    new typeWriter(txtElement,words,wait);

}
