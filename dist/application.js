define("application",["./util"],function(a){var b=a("./util"),c=document.getElementById("hello-seajs");c.style.color=b.randomColor(),window.setInterval(function(){c.style.color=b.randomColor()},1500)});