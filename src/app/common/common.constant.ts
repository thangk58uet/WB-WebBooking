
export function getMessageCodeError(err) {
  const code = JSON.parse(err['_body']).code;

  switch (code) {
    // user
    case '400.051' : return 'Mật khẩu không hợp lệ';
    case '400.052' : return 'Không thể tìm thấy người dùng';
    case '400.053' : return 'Không tìm thấy người dùng cho khóa kích hoạt này';
    case '400.054' : return 'Không tìm thấy người dùng hiện tại';
    case '400.055' : return 'Email đã được sử dụng';
    case '400.056' : return 'Không tìm thấy email';
    case '400.057' : return 'Không tìm thấy người dùng nào';
    case '400.058' : return 'Tên người dùng đã được sử dụng';
    case '400.059' : return 'Một người dùng mới bắt buộc phải có tên đăng nhập';
    case '400.060' : return 'Cập nhật người dùng không thành công';
    case '400.061' : return 'Thông tin không hợp lệ';
    case '400.062' : return 'Số thẻ đã được sử dụng';
    case '401.001' : return 'Tên người dùng hoặc mật khẩu sai';

    // boat
    case '400.100' : return 'Không tìm thấy loại thuyền';
    case '400.101' : return 'Không tìm thấy thuyền';

    // image
    case '400.150' : return 'Không thể tải lên hình ảnh';
    case '400.151' : return 'Hình ảnh trùng lặp';
    case '404.001' : return 'Không tìm thấy hình ảnh';

    // reservation
    case '400.200' : return 'Đặt phòng không thành công';
    case '400.201' : return 'Không thể đặt trước với tư cách là QUẢN TRỊ';
    case '400.202' : return 'Người dùng không có đủ tiền';
    case '400.203' : return 'Thời gian đặt trước đã được bảo lưu';
    case '400.204' : return 'Đặt chỗ nhưng thiếu địa chỉ liên hệ';
    case '400.205' : return 'Giá chưa được giải quyết';
    case '400.207' : return 'Chọn phụ kiện không hợp lệ';

    // tour
    case '400.250' : return 'Không tìm thấy Tour';

    // boat-type-tour
    case '400.300' : return 'Không tìm thấy Tour';
    case '400.301' : return 'Tour không thể được nhân đôi';

    // comment
    case '400.350' : return 'Bình luận không tìm thấy';
    case '400.351' : return 'Bình luận đích (thuyền, tin tức) không hợp lệ';
    case '400.352' : return 'Hình ảnh bình luận không hợp lệ';

    // menu
    case '400.400' : return 'Không tìm thấy menu';
    case '400.401' : return 'Menu thiếu cấp';
    case '400.402' : return 'Menu thiếu parentId';
    case '400.403' : return 'Lỗi di chuyển menu';

    // case '400.' : return '';
  }
}

