const logoImg = document.getElementById("topbar-logo");
const resContainer = document.getElementById("res-container");
const queryInfoContainer = document.getElementById("query-info-container");
const queryTitle = document.getElementById("query-title");
const queryResCount = document.getElementById("query-res-count");

const icons = {
    release: '<svg class="octicon octicon-release"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 000-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"></path></svg>',
    star: '<svg aria-hidden="true" class="octicon octicon-star" role="img" viewBox="0 0 14 16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>',
    fork: '<svg class="octicon octicon-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>',
    branch: '<svg class="octicon octicon-branch"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 00-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 00-1-3.72C.88 1 0 1.89 0 3a2 2 0 001 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>'
};

const mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const escapeString = function (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const addClasses = function(element, classArr) {
    classArr.forEach((current) => {
        element.classList.add(current);
    })
}

logoImg.src = mobileCheck() === true ? "images/icon.webp" : "images/logo.webp";

$(window).on("scroll", function () {
  if (Math.round($(window).scrollTop()) > 400) {
    $("#topbar").removeClass("topbar-noscroll");
    $("#topbar").addClass("topbar-scroll");
  } else {
    $("#topbar").removeClass("topbar-scroll");
    $("#topbar").addClass("topbar-noscroll");
  }
});

$.ajax({
  method: "POST",
  url: "/fetch",
  data: {
    query: escapeString(query),
  },
  beforeSend: function () {
    let stringLength = mobileCheck() === true ? 12 : 25;
    queryTitle.innerHTML =
      queryTitle.innerHTML.length < stringLength
        ? queryTitle.innerHTML
        : `${queryTitle.innerHTML.substring(0, stringLength)}...`;
    resContainer.innerHTML = `<div class="loader"><span>{</span> Loading <span>}</span></div>`;
  },
  success: function (dataReceived) {
    console.log(dataReceived);
    resContainer.innerHTML = "";
    queryResCount.innerHTML = `${dataReceived.length} Result${
      dataReceived.length > 1 ? "s" : ""
    }`;
    queryInfoContainer.style.display = "block";
    for (let currentChunk of dataReceived) {
      let res = document.createElement("div");
      res.className = "res";

      let pfBtn = document.createElement('button');
      addClasses(pfBtn, ['res-el', 'res-pf-tag', 'res-tag']);
      currentChunk.platform === "GitHub" ? pfBtn.classList.add('res-gh-tag'): pfBtn.classList.add('res-gl-tag');
      pfBtn.textContent = currentChunk.platform;

      let title = document.createElement('p');
      addClasses(title, ['res-el', 'res-title']);
      title.textContent = currentChunk.name;

      let subtitle = document.createElement('p');
      addClasses(subtitle, ['res-el', 'res-sub']);
      subtitle.textContent = `${currentChunk.link} > ${currentChunk.sub}`;

      let mainAnchor = document.createElement('a');
      mainAnchor.href = currentChunk.url;
      mainAnchor.className = 'res-link';
      mainAnchor.appendChild(title);
      mainAnchor.appendChild(subtitle);

      let desc = document.createElement('p');
      addClasses(desc, ['res-el', 'res-desc']);
      desc.textContent = currentChunk.desc.length > 500 ? `${currentChunk.desc.substring(0, 500)}...` : currentChunk.desc;

      let tagContainer = document.createElement('div');
      tagContainer.className = 'res-data-tag-container';

      for(let tag of currentChunk.tags) {
          let tagBtn = document.createElement('button');
          addClasses(tagBtn, ['res-tag', 'res-data-tag']);
          
          if(tag.icon) {
              tagBtn.innerHTML = `${icons[tag.type]} ${tag.content}`
          } else {
              tagBtn.textContent = tag.content;
          }

          tagContainer.appendChild(tagBtn);
      }

      res.appendChild(pfBtn);
      res.appendChild(mainAnchor);
      currentChunk.desc ? res.appendChild(desc) : true;
      res.appendChild(tagContainer);
      resContainer.appendChild(res);
    }
  },
  error: function (err) {
    resContainer.innerHTML = "";
    snackbarController(err.responseText);
  },
});


