var topButton = document.getElementById("top");
var scrolled;
var timer;

var form = document.querySelector(".message__form");
var btn = form.querySelector(".message__btn");
var patternName = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
var patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/i;

var popup = document.querySelector(".modal-message");
var close = popup.querySelector(".modal-close");

//  скрипт кнопки вверх
topButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  scrolled = window.pageYOffset;
//    window.scrollTo(0,0);
  scrollToTop();
 });

function scrollToTop() {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled);
    scrolled -= 100;
    timer = setTimeout(scrollToTop, 25);
  } else {
    clearTimeout(timer);
    window.scrollTo(0,0);
  }
};

//  скрипт "плавный скроллинг по якорям"
jQuery(document).ready(function() {
  jQuery("a[href*=#nav]").click(function () {
    elementClick = jQuery(this).attr("href")
    destination = jQuery(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
    return false;
  });
});

//  скрипт валидации формы
btn.addEventListener('click', validateForm);

function validateForm(evt) {
  evt.preventDefault();

  // определение полей формы
  var name = $('#name-field');
  var email = $('#email-field');
  var mes = $('#mes-field');

  console.log(name.val());
  console.log(email.val());
  console.log(mes.val());

  // сброс отображения предыдущей валидации
  name.removeClass('message__field--error');
  email.removeClass('message__field--error');
  mes.removeClass('message__field--error');

  if(!patternName.test(name.val())) {
    console.log(name.val());
    name.addClass("message__field--error");
    name.focus();
    return false;
  }
  
  if(!patternMail.test(email.val())) {
    console.log(email.val());
    email.addClass("message__field--error");
    email.focus();
    return false;
  }

  // проверка сообщения
  if(mes.val() == ''){
    console.log(mes.val());
    mes.addClass('message__field--error');
    mes.focus();
    return false;
  }
  
  // код для отправки формы и отображения попапа 
  //form.submit();
  popup.style.display = 'block';
  return true;
}




