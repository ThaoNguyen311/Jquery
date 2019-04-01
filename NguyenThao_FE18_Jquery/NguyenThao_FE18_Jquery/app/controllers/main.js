var mangSinhVien = GetLocalStore()
var qlSinhVien = new DanhSachSinhVien(mangSinhVien);
// Lấy dữ liệu từ Local Storage
LoadDuLieu();
/*--------------XỬ LÝ SỰ KIỆN---------------- */
$('#btnThemSV').click(function() {
    TaoMaSinhVien();
    $('#myModal #header-title').html('Thêm thông tin sinh viên');
    $('#btnCapNhat').hide();
});
/**
 * Xử lý thêm sinh viên
 */
$('#btnThem').click(function() {
    if (validateForm()) {
        var sinhVien = LayThongTinSinhVien();
        qlSinhVien.ThemSinhVien(sinhVien);
        TaoMaSinhVien();
        SetLocalStore(qlSinhVien.dsSinhVien);
        LoadDuLieu();
        ResetForm();
    }
});
/**
 * Xử lý xóa sinh viên
 */
$('body').delegate('.btnXoa', 'click', function() {
    var maSV = $(this).data('mssv');
    qlSinhVien.XoaSinhVien(maSV);
    SetLocalStore(qlSinhVien.dsSinhVien);
    LoadDuLieu();
});
/**
 * Hiển thị popup sửa thông tin và load dữ liệu sinh viên cần sửa vào form
 */
$('body').delegate('.btnSua', 'click', function() {
    $('#btnCapNhat').show();
    $('#btnThem').hide();
    $('#inputMaSV').attr('readonly', true);
    var maSV = $(this).data('mssv');
    var sinhvien = LayThongTinCapNhatSV(maSV);
});
/**
 * Cập nhật thông tin sinh viên
 */
$('#btnCapNhat').click(function() {
    if (validateForm()) {
        var sinhvien = LayThongTinSinhVien();
        qlSinhVien.SuaTTSinhVien(sinhvien);
        SetLocalStore(qlSinhVien.dsSinhVien);
        LoadDuLieu();
    }
});
/**
 * Sắp xếp ds sinh viên tăng,giảm dần
 */
$('#SapXepGiam').click(function() {
    qlSinhVien.SapXepDSGiam();
    SetLocalStore(qlSinhVien.dsSinhVien);
    LoadDuLieu();
    $('#SapXepGiam').css('display', 'none');
    $('#SapXepTang').css('display', 'inline-block');
});
$('#SapXepTang').click(function() {
    qlSinhVien.SapXepDSTang();
    SetLocalStore(qlSinhVien.dsSinhVien);
    LoadDuLieu();
    $('#SapXepTang').css('display', 'none');
    $('#SapXepGiam').css('display', 'inline-block');
});
/**
 * Tìm kiếm sinh viên
 */
$('#inputtimSV').keyup(function() {
    var key = $('#inputtimSV').val();
    var mangKQ = qlSinhVien.TimNhanVien(key);
    LoadDuLieu(mangKQ);
})
/*----------------ĐỊNH NGHĨA CÁC FUNCTION---------------- */
/**
 * Lấy thông tin sinh viên từ ô input
 */
function LayThongTinSinhVien() {
    var maSV = $('#inputMaSV').val();
    var hoTen = $('#inputHoTen').val();
    var tuoi = $('#inputTuoi').val();
    var email = $('#inputEmail').val();
    var soDT = $('#inputDT').val();
    var diemToan = $('#inputDiemToan').val();
    var diemLy = $('#inputDiemLy').val();
    var diemHoa = $('#inputDiemHoa').val();
    var sinhVien = new SinhVien(maSV, hoTen, tuoi, email, soDT, diemToan, diemLy, diemHoa);
    return sinhVien;
}
/**
 * Tạo mã nhân viên
 */
function TaoMaSinhVien() {
    var inputMaSV = $('#inputMaSV');
    inputMaSV.attr('readonly', true);
    inputMaSV.val('SV00' + qlSinhVien.TaoMaSinhVien());
}
/**
 * Load dữ liệu vào bảng
 */
function LoadDuLieu(mangsv) {
    // Lấy dữ liệu từ local storage
    var mangSinhVien = mangsv || GetLocalStore();
    var content = '';
    for (let i = 0; i < mangSinhVien.length; i++) {
        var maSV = mangSinhVien[i].maSV;
        var tenSV = mangSinhVien[i].hoTen;
        var tuoi = mangSinhVien[i].tuoi;
        var email = mangSinhVien[i].email;
        var soDT = mangSinhVien[i].soDT;
        var diemToan = mangSinhVien[i].diemToan;
        var diemLy = mangSinhVien[i].diemLy;
        var diemHoa = mangSinhVien[i].diemHoa;
        let sv = new SinhVien(maSV, tenSV, tuoi, email, soDT, diemToan, diemLy, diemHoa);
        // Tạo dòng
        content += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.hoTen}</td>
                <td>${sv.tuoi}</td>
                <td>${sv.email}</td>
                <td>${sv.soDT}</td>
                <td>${sv.diemToan}</td>
                <td>${sv.diemLy}</td>
                <td>${sv.diemHoa}</td>
                <td class="text-primary">${sv.TinhDiemTrungBinh()}</td>
                <td class="px-0">
                    <button class="btn btnSua p-0 px-2" data-mssv="${mangSinhVien[i].maSV}"  data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil"></i></button>
                    <button class="btn btnXoa p-0 px-2" data-mssv="${mangSinhVien[i].maSV}"><i class="fa fa-trash-o"></i></button>
                </td>
            </tr>
        `;
    }
    // Đổ dữ liệu vào table
    $('#tableDanhSachSV').html(content);
}
/**
 * Reset form về rỗng sau khi thêm
 */
function ResetForm() {
    $('#inputHoTen').val('');
    $('#inputTuoi').val('');
    $('#inputEmail').val('');
    $('#inputDT').val('');
    $('#inputDiemToan').val('');
    $('#inputDiemLy').val('');
    $('#inputDiemHoa').val('');
}
/**
 * Cập nhật thông tin sinh viên
 */
function LayThongTinCapNhatSV(maSV) {
    var sinhVien = qlSinhVien.LaySinhVienTheoMa(maSV);
    $('#inputMaSV').val(sinhVien.maSV);
    $('#inputHoTen').val(sinhVien.hoTen);
    $('#inputTuoi').val(sinhVien.tuoi);
    $('#inputEmail').val(sinhVien.email);
    $('#inputDT').val(sinhVien.soDT);
    $('#inputDiemToan').val(sinhVien.diemToan);
    $('#inputDiemLy').val(sinhVien.diemLy);
    $('#inputDiemHoa').val(sinhVien.diemHoa);
    $('#myModal #header-title').html('Sửa thông tin sinh viên');
}
/**
 * Xử lý localstore
 */
function SetLocalStore(mangSinhVien) {
    localStorage.setItem('dsSinhVien', JSON.stringify(mangSinhVien));
}

function GetLocalStore() {
    var mangSinhVien = [];
    if (localStorage.getItem('dsSinhVien') != null) {
        var chuoi = localStorage.getItem('dsSinhVien');
        mangSinhVien = JSON.parse(chuoi);
    }
    return mangSinhVien;
}

function validateForm() {
    var hasError = false;
    $('#myForm input').map(function(index, input) {
        var validation_rule = $(input).attr('validate'),
            input_name = $(input).attr('placeholder'),
            error_wrapper = "[message-for='" + $(input).attr('id') + "']",
            input_value = $(input).val();
        $(error_wrapper).text('');
        validation_rule = validation_rule.split('|');
        validation_rule.every((rule) => {
            var [valid_type, valid_value] = rule.split(':')
            switch (valid_type) {
                case 'require':
                    {
                        if (typeof input_value == 'undefined' || input_value == "") {
                            var message = `Vui Lòng Nhập ${input_name} !`;
                            $(error_wrapper).text(message);
                            hasError = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    break;
                case 'number':
                    {
                        if (isNaN(input_value)) {
                            var message = `${input_name} phải là số`;
                            $(error_wrapper).text(message);
                            hasError = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    break;
                case 'min':
                    {
                        if (parseInt(input_value)  < parseInt(valid_value)) {
                            var message = `Sinh viên phải trên ${valid_value} tuổi`;
                            $(error_wrapper).text(message);
                            hasError = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    break;
                case 'max':
                    {
                        if (parseInt(input_value)  > parseInt(valid_value)) {
                            var message = `Vui lòng nhập ${input_name} nhỏ hơn ${valid_value}`;
                            $(error_wrapper).text(message);
                            hasError = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    break;
                case 'email':
                    {
                        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if(!input_value.match(mailformat)){
                            var message = `${input_name} Không đúng định dạng`;
                            $(error_wrapper).text(message);
                            hasError = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    })
    return !hasError;
}