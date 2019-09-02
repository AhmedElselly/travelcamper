var landing = document.querySelector(".landin-page");

var i = 0;
var images = [];
var time = 5000;

images[0] = "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
images[1] = "https://images.unsplash.com/photo-1452473767141-7c6086eacf42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80";
images[2] = "https://images.unsplash.com/photo-1482355347028-ff60443f60fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
images[3] = "https://images.unsplash.com/photo-1517823178903-501e062d9e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
images[4] = "https://images.unsplash.com/photo-1456394555490-ef1bf0aedc46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
images[5] = "https://images.unsplash.com/photo-1532032659282-dc3fe9336831?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
images[6] = "https://images.unsplash.com/photo-1508768516474-73606cb84ce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1399&q=80";


function changeImg(){
    landing.append(images[i]);
    for(var i = 0; i < images.length - 1; i++){
        images++;
    }
}