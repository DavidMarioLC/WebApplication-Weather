const $tabComponent = document.querySelector("#tabs");
const $tabList = $tabComponent.querySelectorAll(".tab");
//prototype foreach

const today = new Date();

let weekday = today.getDay();

const week = [
  "Domingo", //0
  "Lunes", //1
  "Martes", //2
  "Miercoles", //3
  "Jueves", //4
  "Viernes", //5
  "Sabado", //6
];

function nextDay(day) {
  if (day === 6) {
    return 0;
  }
  return day + 1;
}

$tabList.forEach((tab, index) => {
  if (index === 0) {
    tab.textContent = "Hoy";
    weekday = nextDay(weekday);
    return false; //evitando reduncancia
  }

  tab.textContent = week[weekday];
  weekday = nextDay(weekday);
});
