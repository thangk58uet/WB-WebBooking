
export function getMessageCodeError(err) {
  const code = JSON.parse(err['_body']).resultCode;

  switch (code) {
    // user
    case '400.051' : return 'Mật khẩu không hợp lệ';
    case '400.055' : return 'Email đã được sử dụng';
    case '400.056' : return 'Không tìm thấy email';
    case '400.058' : return 'Tên người dùng đã được sử dụng';
    case '400.059' : return 'Một người dùng mới bắt buộc phải có tên đăng nhập';
    case '400.060' : return 'Cập nhật thông tin không thành công';
    case '400.061' : return 'Sai tên đăng nhập hoặc mật khẩu';
    case '400.062' : return 'Số thẻ đã được sử dụng';
    case '401.001' : return 'Tên người dùng hoặc mật khẩu sai';


    // reservation
    case '400.200' : return 'Đặt tour không thành công';
    case '400.202' : return 'Bạn không đủ tiền. Vui lòng nạp thêm tiền vào tài khoản!';
    case '400.203' : return 'Tour này đã có người đặt trước đó. Vui lòng thử lại!';
    case '400.204' : return 'Thiếu địa chỉ liên hệ';
    case '400.207' : return 'Chọn phụ kiện không hợp lệ';



    // comment
    case '400.352' : return 'Hình ảnh bình luận không hợp lệ';

    // case '400.' : return '';
    default: return 'Đã có lỗi xảy ra!';
  }
}

