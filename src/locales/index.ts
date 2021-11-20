import { locale, addLocale } from "primereact/api";

export const ruCalendarLocale = {
  firstDayOfWeek: 1,
  dayNames: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ],
  dayNamesShort: ["вск", "пон", "втр", "срд", "чет", "пят", "суб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
  today: "Сегодня",
  clear: "Очистить",
  dateFormat: "yyyy-mm-dd",
  weekHeader: "Нд",
};

addLocale("ru", ruCalendarLocale);

export const ru = locale("ru");
