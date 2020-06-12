const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// type methods
TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fulltxt = this.words[current];

  //   check if deleting
  if (this.isDeleting) {
    //   remove a char
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    //   add a char
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }
  //   insert in element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  let initialtypeSpeed = 300;
  if (this.isDeleting) {
    initialtypeSpeed /= 2;
  }

  //   if word is complete
  if (!this.isDeleting && this.txt === fulltxt) {
    //   pause at end
    initialtypeSpeed = this.wait;

    // set selete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //   move to next word
    this.wordIndex++;
    // pause before start typing
    initialtypeSpeed = 500;
  }

  setTimeout(() => this.type(), initialtypeSpeed);
};

// init on dom load

document.addEventListener("DOMContentLoaded", init);

// init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //   init typewriter
  new TypeWriter(txtElement, words, wait);
}

// smooth scrolling

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});
$.getJSON("https://api.github.com/users/prawesshh/repos", function (data) {
  var items = [];
  console.log(data);
  $.each(data, function (key, val) {
    // items.push("<li id='" + key + "'>" + val.name + "</li>");
    items.push(
      "<div class='item'><h3>" +
        val.name +
        "</h3 >  <img src='https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' alt='repo link' /><br /><div class='overlay'><a href='" +
        val.clone_url +
        "' target='_blank'>View Repo</a></div></div >"
    );
  });
  console.log(items);
  $(".lists").append(items);
});
