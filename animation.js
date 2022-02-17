const animation = (function (window, document, gsap, undefined) {
  "use strict";

  function id(value) {
    return document.getElementById(value);
  }

  const books = id("books");
  const books1 = id("books1");
  const books2 = id("books2");
  id("books3");
  const button = id("button");
  id("button__logo");
  const container = id("container");
  const cupboard = id("cupboard");
  const flare = id("flare");
  const legal = id("legal");
  id("link");
  const logo = id("logo");
  id("overlay");
  const text = id("text");
  const text1 = id("text1");
  const text2 = id("text2");
  id("text__content");
  id("text__subtitle");
  id("text__suptitle");

  const master = gsap.timeline({
    id: "MASTER",
    repeat: -1,
    paused: true,
  });

  const SmartSplit = new (function (r, n, t) {
    function i(r, n, i) {
      if (null == r) return console.error(r + " is wrong"), t;
      i = i || {};
      var e = r.getAttribute("id"),
        s = a[e];
      (s === t || s.lines === t || s.words === t || a[e].chars === t) &&
        (s = a[e] = { lines: null, words: null, chars: null, opts: i });
      var o = h[n];
      return s[n] || o(r, s);
    }
    function e(r, n) {
      var t = r.innerHTML.replace(/<\s*br\s*>/gi, "<br>"),
        i = t.split("<br>");
      return (r.innerHTML = l(i, "<br>")), (n.lines = r.children), n.lines;
    }

    function l(r, n) {
      return (
        (n = n || ""),
        r.length < 1 ? "" : p + r.join("</div>" + n + p) + "</div>"
      );
    }
    function u(r) {
      for (var n = [], t = 0; t < r.length; t++) n[t] = r[t];
      return n;
    }
    var c = this,
      a = {},
      h = { lines: e },
      f = /(?:<\s*img[^>]*>|<\s*([\w]+)\s*[^<>]*>.*?<\s*\/\s*\1\s*?>)/g,
      p = '<div class="_i">';
    return (
      (this.lines = function (r, n) {
        return i(r, "lines", n);
      }),
      c
    );
  })(window, window.document);

  let lines = SmartSplit.lines;

  function frame(func, options) {
    if (options === undefined) options = {};

    // Timeline creating
    const tl = gsap.timeline(options);
    tl.stop = stop;

    // Mutator
    func(tl);

    // Return for master timeline
    return tl;
  }

  function createMaster() {
    master.add(frame(opening, {}), "+=0.0");
  }

  function opening(tl) {
    // https://greensock.com/docs/v3/GSAP/Timeline

    tl.addLabel("frame1", 0.0);
    tl.fromTo(
      [text, logo, books],
      1.0,
      { autoAlpha: 0, x: 0, y: 0, rotation: 0 },
      { autoAlpha: 1 },
      "frame1"
    );

    tl.to(books2, 2.0, { x: 16, y: 4, ease: "power4.in" }, "frame1+=1");
    tl.to(books1, 2.0, { x: 26, y: 8, ease: "power4.in" }, "frame1+=1"); //16 3
    tl.to(
      books2,
      1.0,
      { x: 20, y: 1, rotation: 15.2, ease: "power2.out" },
      "frame1+=3"
    );
    tl.to(
      books1,
      1.0,
      { x: 58, y: 35, rotation: 20, ease: "power2.out" },
      "frame1+=3"
    );

    tl.to([text, books], 1.0, { autoAlpha: 0 }, "frame1+=3");

    tl.addLabel("frame2", "frame1+=3");
    tl.fromTo(
      cupboard,
      1.0,
      { x: -300, autoAlpha: 1 }, // -bannerW
      { x: 0, ease: "power2.out" },
      "frame2+=1"
    );
    tl.fromTo(text1, 1.0, { autoAlpha: 0 }, { autoAlpha: 1 }, "frame2+=1");

    tl.to(cupboard, 1.0, { autoAlpha: 0 }, "frame2+=3");
    tl.to(text1, 1.0, { autoAlpha: 0 }, "frame2+=3");

    tl.addLabel("frame3", "frame2+=3");
    tl.fromTo(
      lines(text2),
      1.0,
      { autoAlpha: 0 },
      { autoAlpha: 1, stagger: 0.2, ease: "power4.out" },
      "frame3+=1"
    );
    tl.fromTo(
      button,
      1.0,
      { scale: 0.8, autoAlpha: 0 },
      { rotation: 0.01, autoAlpha: 1, scale: 1, ease: "power4.out" },
      "frame3+=2"
    );
    tl.fromTo(legal, 1.0, { autoAlpha: 0 }, { autoAlpha: 1 }, "frame3+=2");
    tl.fromTo(
      flare,
      1.0,
      { x: 0, xPercent: -120, skewX: -28 },
      { x: 100, xPercent: 100 }, //-bannerW
      "frame3+=3"
    );

    tl.to([text2, button, legal], 1.0, { autoAlpha: 0 }, "frame3+=4.5");
    tl.to(logo, 1.0, { autoAlpha: 0 }, "frame3+=4.5");
  }

  if (window.onload === null) window.onload = open;

  function open() {
    start();
  }

  function start() {
    console.info("start");

    container.style.opacity = "1";

    master.clear();
    createMaster();
    master.play(0);
  }
})(window, window.document, window.gsap);
