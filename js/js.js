//Toggle menu trên header
const showToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.add("show");
  const over = document.getElementById("over");
  over.classList.add("overflow");
};
const hiddenToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.remove("show");
  const over = document.getElementById("over");
  over.classList.remove("overflow");
};
const dropdown = (id) => {
  const element = document.getElementById("list_" + id);
  element.classList.add("show");
  if (element.style.display == "block") element.style.display = "none";
  else element.style.display = "block";
};

// function dropdown(id) {
//   var element = document.getElementById("list_" + id);
//   element.classList.add("show");
//   if (element.style.display == "block") element.style.display = "none";
//   else element.style.display = "block";
// }
const validateform = (event) => {
  event.preventDefault();
  const name = document.myForm.name.value;
  const email = document.myForm.email.value;
  const password = document.myForm.password.value;

  const fName = document.getElementById("card_name");
  const fEmail = document.getElementById("card_email");
  const fPassword = document.getElementById("card_password");

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (name === "") {
    fName.innerHTML = "Name can't be blank";
    return false;
  }
  if (email === "") {
    fEmail.innerHTML = "Email can't be blank";
    fName.innerHTML = "";
    return false;
  } else {
    if (!email.match(mailFormat)) {
      fEmail.innerHTML = "Email address is not valid";
      fName.innerHTML = "";
      return false;
    }
  }
  if (password === "") {
    fPassword.innerHTML = "Password can't be blank";
    fName.innerHTML = "";
    fEmail.innerHTML = "";
    return false;
  } else {
    if (password.length <= 8) {
      fPassword.innerHTML = "Password must be at least 8 characters long";
      fName.innerHTML = "";
      fEmail.innerHTML = "";
      return false;
    }
  }
  fPassword.innerHTML = "";
  console.log(name, email, password);
  return false;
};

//slideshow
const slideshow = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const arrowLeft = document.querySelector(".slick-prev");
    const arrowRight = document.querySelector(".slick-next");

    const slickTrack = document.querySelector(".wrapperCustomer");
    const slickSlice = document.querySelectorAll(".contentCustomer");
    const slickDots = document.querySelectorAll(".slick-dots li");

    const btn = document.querySelectorAll(".slick-dots button");
    let eleIsClicked = 0; // vị trí của button được click

    let count = 1;
    let time = 4000;
    // lấy giá trị dịch chuyển bằng width của .slick-slice đang chứa ảnh
    let size = slickSlice[0].clientWidth;

    // Dùng để kiểm tra xem user đang ở trong tab chứa web page của mình hay user đang ở tab khác
    let stateTab = true;

    // Kiểm tra xem .slick-track ( chứa tất cả các ảnh) đã dịch chuyển xong chưa
    let stateTranslateOfSlickTrack = true;

    // Dùng để lưu giá trị setInterval
    let v_interval = "";

    // Tạo hàm chạy setInterval,
    const run_setInterval = () => {
      v_interval = setInterval(() => {
        slickDots[count - 1].classList.remove("slick-active");
        slickTrack.style.transition = "transform 0.5s ease-in-out";
        slickTrack.style.transform = `translate3d(${
          -slickSlice[0].clientWidth * ++count
        }px,0px,0px)`;
        eleIsClicked = count - 1;
        if (count === slickSlice.length - 1) {
          slickDots[0].classList.add("slick-active");
        } else {
          slickDots[count - 1].classList.add("slick-active");
        }
      }, time);
    };

    const run_clearInterval = () => {
      clearInterval(v_interval);
    };

    //Thêm sự kiện click cho arrow left và arrow right,
    arrowLeft.addEventListener("click", function (e) {
      if (stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(true, false, e); // Hàm xử lý chung cho cả arrow left và right và tham số đầu là arrow left đc click, tham số 2 là arrow right đc click
        run_setInterval();
      }
    });
    arrowRight.addEventListener("click", function (e) {
      if (stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(false, true, e);
        run_setInterval();
      }
    });

    const commonFuncBothArrows = (arrowL, arrowR, e) => {
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
      slickDots[count - 1].classList.remove("slick-active"); // Xóa .slick-active trên li trước đó khi click arrow left or right or cả left và right liên tục
      slickTrack.style.transition = `transform 0.5s ease-in-out`;
      count = arrowL ? --count : ++count; // kiểm tra nếu arrowLeft đc click thì giảm biến đếm cout và ngược lại
      slickTrack.style.transform = `translate3d(${
        -slickSlice[0].clientWidth * count
      }px,0px,0px)`;
      eleIsClicked = count - 1; // lưu biến đếm để xem dấu chấm ( button ) thứ mấy mà cũng đc active khi user click vào arrow left or right
      switch (count) {
        case 0: // nếu biến đếm = 0 tức là carousel đang ở ảnh đầu tiên thì active dấu chấm cuối cùng
          slickDots[slickDots.length - 1].classList.add("slick-active");
          break;
        case slickSlice.length - 1: // carousel đang ở ảnh cuối cùng thì active cho dấu chấm đầu tiên
          slickDots[0].classList.add("slick-active");
          break;
        default:
          slickDots[count - 1].classList.add("slick-active");
          break;
      }
    };
    //số lần carousel nó thực hiện translateX.
    btn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (stateTranslateOfSlickTrack) {
          // Chỉ đuợc thực thi khi carousel đã thực hiện translate xong.
          run_clearInterval();
          slickTrack.style.transition = `transform 0.5s ease-in-out`;
          count = Number(elem.textContent);
          slickDots[eleIsClicked].classList.remove("slick-active");
          slickDots[count - 1].classList.add("slick-active");
          slickTrack.style.transform = `translate3d(${
            -slickSlice[0].clientWidth * count
          }px,0px,0px)`;
          eleIsClicked = count - 1;
          run_setInterval();
        }
      });
    });

    //Thêm sự kiện transitionend cho div mà nó thực hiện việc translateX.
    slickTrack.addEventListener("transitionend", () => {
      stateTranslateOfSlickTrack = true;
      let nameClassSlickSlide = slickSlice[count].id;
      if (
        nameClassSlickSlide === "lastClone" ||
        nameClassSlickSlide === "firstClone"
      ) {
        slickTrack.style.transition = `none`;
        count =
          nameClassSlickSlide === "lastClone"
            ? slickSlice.length - 2
            : nameClassSlickSlide === "firstClone"
            ? 1
            : count;
        eleIsClicked = count - 1;
        slickTrack.style.transform = `translateX(-${
          slickSlice[0].clientWidth * count
        }px)`;
      }
    });
  });
};
slideshow();
