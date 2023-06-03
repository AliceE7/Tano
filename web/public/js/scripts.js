setInterval(() => {
  var css =
    "text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 40px;";
  console.log(`%cUpdated --- ${Date.now()}`, css);
}, 1000);
