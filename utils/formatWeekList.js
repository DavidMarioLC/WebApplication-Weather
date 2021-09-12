export function formatWeekList(data) {
  let dayList = [];
  const weekList = [];

  data.forEach((item, index) => {
    let isIqual = (index + 1) % 8;

    dayList.push(item);

    if (isIqual === 0) {
      weekList.push(dayList);
      dayList = [];
    }
  });

  return weekList;
}
