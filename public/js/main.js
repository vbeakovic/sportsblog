$(document).ready(() => {
  $('.category-delete').on('click', (e) => {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr('data-cat-id');
    $.ajax({
      type: 'DELETE',
      url: '/categories/delete/' + id,
      success: (response) => {
        window.location.href = '/manage/categories';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
  $('.article-delete').on('click', (e) => {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr('data-article-id');
    $.ajax({
      type: 'DELETE',
      url: '/articles/delete/' + id,
      success: (response) => {
        window.location.href = '/manage/articles';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
});
