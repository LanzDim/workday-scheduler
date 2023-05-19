const localeSettings = {};
dayjs.locale(localeSettings);

const currentHour = dayjs().format('H');

const updateHourlyColors = () => {
  $('.time-block').each(function() {
    const blockHour = parseInt(this.id);
    $(this).toggleClass('past', blockHour < currentHour);
    $(this).toggleClass('present', blockHour === currentHour);
    $(this).toggleClass('future', blockHour > currentHour);
  });
};

const saveTextEntry = () => {
  $('.saveBtn').on('click', function() {
    const key = $(this).parent().attr('id');
    const value = $(this).siblings('.description').val();
    localStorage.setItem(key, value);
  });
};

const refreshHourlyColors = () => {
  $('.time-block').each(function() {
    const blockHour = parseInt(this.id);
    $(this).removeClass('past present future')
      .addClass(blockHour === currentHour ? 'present' : blockHour < currentHour ? 'past' : 'future');
  });
};

const updateTimeDisplay = () => {
  const dateElement = $('#date');
  const timeElement = $('#time');
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text(currentDate);
  timeElement.text(currentTime);
};

const initializePage = () => {
  updateHourlyColors();
  saveTextEntry();
  refreshHourlyColors();
  updateTimeDisplay();
};

$(function () {
  initializePage();
  setInterval(updateTimeDisplay, 1000);
});