$(function(){
  var $input = $('input[type="text"]'),
      $list = $('ol'),
      $total = $('.total'),
      $remain = $('.remain');

  $(document).on('submit', 'form', onFormSubmit);
  $(document).on('change', 'input[type="checkbox"]', onChangeCheckbox);
  $(document).on('click', 'a', onClickDelete);

  updateCounts();

  function onFormSubmit(event) {
    event.preventDefault();

    var data = {
      title: $input.val()
    };

    $input.val('');

    if (data.title !== '') {
      var item = renderItem(data);
      appendItem(item);
    }
  }

  function onChangeCheckbox(event) {
    $chk = $(event.currentTarget);
    $chk.parent('li').toggleClass('completed');
    updateCounts();
  }

  function onClickDelete(event) {
    event.preventDefault();
    $a = $(event.currentTarget);

    removeItem($a.parent('li'));
  }

  function renderItem(data) {
    return $('<li><input type="checkbox"> ' + data.title + ' <a href="#">[x]</a></li>');
  }

  function appendItem(item) {
    $list.append(item);
    updateCounts();
  }

  function removeItem(item) {
    item.remove();
    updateCounts();
  }

  function updateCounts() {
    $total.html(getTotalCount());
    $remain.html(getRemainCount());
  }

  function getTotalCount() {
    return $('input[type="checkbox"]').length;
  }

  function getRemainCount() {
    return $('input[type="checkbox"]:not(:checked)').length;
  }
});
