document.addEventListener('DOMContentLoaded', (event) => { 
    var sourceElement = null;
    
    function startDrag(event) {
      sourceElement = this;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function dragOver(event) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      event.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function dropElement(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      
      if (sourceElement != this) {
        sourceElement.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');
      }
      
      return false;
    }
    
    let items = document.querySelectorAll('.container .box');
    items.forEach(function(item) {
      item.addEventListener('dragstart', startDrag, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', dropElement, false);
    });
});