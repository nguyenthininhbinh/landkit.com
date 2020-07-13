//Toggle menu trên header
  const showToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.add("show");
  const over = document.getElementById("over");
  over.classList.add("overflow");
};
  const hiddenToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.remove("show");
  const over = document.getElementById("over");
  over.classList.remove("overflow");

};

 function dropdown(id){
    var element = document.getElementById("list_"+id);
    element.classList.add("show");
    if(element.style.display == 'block')  
      element.style.display = 'none';
    else 
      element.style.display = 'block';
    
 };
 
 



 
 






