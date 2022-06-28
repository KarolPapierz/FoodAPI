function getInputValue(){
    const query = document.getElementById("search").value
    window.location = document.URL+"api/"+query
}