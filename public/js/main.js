$(document).ready(() => {
  $('.category-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-cat-id');
    $.ajax({
      type: 'DELETE',
      url: '/categories/delete/' + id,
      success: (response) => {
        //alert('Deleting Todo');
        console.log(response);
        //$("#getCode").html(response);
        //$("#getCodeModal").modal('show');
        //window.location.href = '/manage/categories';
        //$('<div class="alert alert-success" role="alert">A simple success alert—check it out!</div>').insertAfter('div.first');
        //$('.alert').show();
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
  $('.article-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-article-id');
    $.ajax({
      type: 'DELETE',
      url: '/articles/delete/' + id,
      success: (response) => {
        //alert('Deleting Todo');
        console.log(response);
        //$("#getCode").html(response);
        //$("#getCodeModal").modal('show');
        //window.location.href = '/';
        //$('.alert').show();
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
  //$('#getCodeModal').on('hidden.bs.modal', function (e) {
  //  window.location.href = '/manage/categories';
});
// $('.alert .close').on('click', function(e) {
//     $(this).parent().hide();
//     window.location.href = '/manage/categories';
// });
