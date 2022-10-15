document.addEventListener('DOMContentLoaded', (event) => { 
  // addEventListener() - attaches an event handler to a document.
  // 'DOMContentLoaded' the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures <img> and stylesheets may not yet have loaded.

    var sourceElement = null;
    
    function startDrag(event) {
      sourceElement = this;
      // dataTransfer object is used to hold the data that is being dragged during a drag and drop operation.
      // effectAllowed - provides all of the types of operations that are possible.
      // setData - if data for the type doesn't exist it's added at the end, if data for the type already exists thr existing data is replaced in the same position.
      // innerHTML - gets or sets the HTML or XML markup contained within the element.
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function dragOver(event) {
      if (event.preventDefault) {
        // preventDefault() - tells the user agent that if the event doesn't get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault();
      }
      // dropEffect - Gets the type of drag-and-drop operation currently selected or sets the operation to a new type. 
      event.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function dropElement(event) {
      if (event.stopPropagation) {
        event.stopPropagation(); // stops the browser from redirecting.
      }
      
      if (sourceElement != this) {
        sourceElement.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');
      }
      
      return false;
    }
    
    // querySelectorAll() - returns a static NodeList representing a list of the document's elements that match the specified group of selectors.
    let items = document.querySelectorAll('.container .box');
    items.forEach(function(item) {
      item.addEventListener('dragstart', startDrag, false);
      item.addEventListener('dragover', dragOver, false);
      item.addEventListener('drop', dropElement, false);
    });
});