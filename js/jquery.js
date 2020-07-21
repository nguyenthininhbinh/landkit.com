const fa_bars = $(".fa-bars");
const fa_times = $(".fa-times");
const toggleMenu = $(".toggle-menu");
const over = $("body.over");
const collapseMenu = $(".toggle-list-text");

//hien togglemenu

fa_bars.click(function () {
  toggleMenu.addClass("show");
  over.addClass("overflow");
});

//an togglemenu
fa_times.click(function () {
  toggleMenu.removeClass("show");
  over.addClass("overflow");
});

const menus = $(".toggle-menu-dropdown");
const downs = $(".fa-angle-down");

menus.click(function () {
  collapseMenu.not($(this).find(".toggle-list-text")).removeClass("show");
  downs.not($(this).find(".fa-angle-down")).addClass("show");
  $(this).find(".toggle-list-text").toggleClass("show");
  $(this).find(".fa-angle-down").toggleClass("show");
});

//form
const validateform = (e) => {
  e.preventDefault();
  const name = $("[name='name']").val();
  const email = $("[name='email']").val();
  const password = $("[name='password']").val();

  const fName = $("#card_name");
  const fEmail = $("#card_email");
  const fPassword = $("#card_password");

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (name === "") {
    fName.text("Name can't be blank");
    return false;
  }

  if (email === "") {
    fEmail.text("Email can't be blank");
    fName.text("");
    return false;
  } else {
    if (!email.match(mailFormat)) {
      fEmail.text("Email address is not valid");
      fName.text("");
      return false;
    }
  }

  if (password === "") {
    fPassword.text("Password can't be blank");
    fName.text("");
    fEmail.text("");
    return false;
  } else {
    if (password.length <= 8) {
      fPassword.text("Password must be at least 8 characters long");
      fName.text("");
      fEmail.text("");
      return false;
    }
  }
  fPassword.text("");

  // $("[name='form-download']").trigger("reset");
  console.log(name, email, password);
  // return false;
};

//slideshow
const slideshow = () => {
  const arrowLeft = $(".slick-prev");
  const arrowRight = $(".slick-next");

  const slickTrack = $(".wrapperCustomer");
  const slickSlice = $(".contentCustomer");
  const slickDots = $(".slick-dots li");

  const btn = $(".slick-dots button");

  const slickList = $(".slick-list");

  let eleIsClicked = 0;

  let count = 1;
  let time = 4000;
  let stateTranslateOfSlickTrack = true;
  let v_interval = "";

  // Arrow left
  arrowLeft.click((e) => {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      commonFuncBothArrows(true, false, e);
      run_setInterval();
    }
  });

  // Arrow right
  arrowRight.click((e) => {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      commonFuncBothArrows(false, true, e);
      run_setInterval();
    }
  });

  function commonFuncBothArrows(arrowL, arrowR, e) {
    e.preventDefault();
    stateTranslateOfSlickTrack = false;
    if (arrowL) {
      if (count <= 0) {
        return;
      }
    } else {
      if (arrowR) {
        if (count >= slickSlice.length - 1) {
          return;
        }
      }
    }
    slickDots.eq(count - 1).removeClass("slick-active");
    slickTrack.css("transition", "transform 0.5s ease-in-out");
    count = arrowL ? --count : ++count;
    slickTrack.css(
      "transform",
      `translateX(${-slickSlice[0].clientWidth * count}px)`
    );
    eleIsClicked = count - 1;
    switch (count) {
      case 0:
        slickDots.eq(slickDots.length - 1).addClass("slick-active");
        break;
      case slickSlice.length - 1:
        slickDots.eq(0).addClass("slick-active");
        break;
      default:
        slickDots.eq(count - 1).addClass("slick-active");
        break;
    }
  }

  btn.click(function () {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      slickTrack.css("transition", `transform 0.5s ease-in-out`);
      count = Number($(this).text());
      slickDots.eq(eleIsClicked).removeClass("slick-active");
      slickDots.eq(count - 1).addClass("slick-active");
      slickTrack.css(
        "transform",
        `translateX(${-slickSlice[0].clientWidth * count}px)`
      );
      eleIsClicked = count - 1;
      run_setInterval();
    }
  });

  const run_setInterval = () => {
    v_interval = setInterval(() => {
      slickDots.eq(count - 1).removeClass("slick-active");
      slickTrack.css("transition", "transform 0.5s ease-in-out");
      slickTrack.css(
        "transform",
        `translateX(${-slickSlice[0].clientWidth * ++count}px)`
      );
      eleIsClicked = count - 1;
      if (count === slickSlice.length - 1) {
        slickDots.eq(0).addClass("slick-active");
      } else {
        slickDots.eq(count - 1).addClass("slick-active");
      }
    }, time);
  };

  run_setInterval();

  const run_clearInterval = () => {
    clearInterval(v_interval);
  };

  slickTrack.on("transitionend", () => {
    stateTranslateOfSlickTrack = true;
    let nameClassSlickSlide = slickSlice.eq(count).attr("id");
    if (
      nameClassSlickSlide === "lastClone" ||
      nameClassSlickSlide === "firstClone"
    ) {
      slickTrack.css("transition", "none");
      count =
        nameClassSlickSlide === "lastClone"
          ? slickSlice.length - 2
          : nameClassSlickSlide === "firstClone"
          ? 1
          : count;
      eleIsClicked = count - 1;
      slickTrack.css(
        "transform",
        `translateX(-${slickSlice[0].clientWidth * count}px)`
      );
    }
  });

  slickList.mousemove(() => {
    run_clearInterval();
  });
  slickList.mouseout(() => {
    run_setInterval();
  });
};

slideshow();
