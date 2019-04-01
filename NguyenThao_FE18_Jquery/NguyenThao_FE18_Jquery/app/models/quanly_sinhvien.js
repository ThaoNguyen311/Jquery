function DanhSachSinhVien(listSinhVien) {
    this.dsSinhVien = listSinhVien || [];
    /**
     * Mục đích: Lấy ra vị trí sinh viên trong mảng
     * Tham số; maSV
     * return: 
     *      - i: tìm thấy vị trí
     *      - -1: không tìm thấy vị trí
     */
    this.LayViTri = function (maSV) {
        var sinhVien;
        for (let i = 0; i < this.dsSinhVien.length; i++) {
            sinhVien = this.dsSinhVien[i];
            if (sinhVien.maSV === maSV) {
                return i
            }
        }
        return -1;
    }
    /**
     * Mục đích: Tạo mã sinh viên tự động tăng dần
     */
    this.TaoMaSinhVien = function () {
        var MSSVMax = 0;
        var MSNew;
        for (let i = 0; i < this.dsSinhVien.length; i++) {
            var MSSV = parseInt( this.dsSinhVien[i].maSV.split('SV00')[1]);
            if (MSSV > MSSVMax) {
                MSSVMax = MSSV;
            }
        }
        // Tạo mã auto
        if (this.dsSinhVien.length == 0) {
            MSNew = 1;
        }
        else {
            MSNew = MSSVMax + 1;
        }
        return MSNew;
    }
    /**
     * Mục đích: Thêm mới một sinh viên
     * Tham số: nguoiDung
     */
    this.ThemSinhVien = function (sinhVien) {
        this.dsSinhVien.push(sinhVien);
    }
    /**
     * Mục Đích: Xóa một sinh viên trong dánh sách 
     */
    this.XoaSinhVien = function (maSV) {
        var index = this.LayViTri(maSV);
        if (index > -1) {
            this.dsSinhVien.splice(index, 1);
        }
    }
    /**
     * Mục đích: lấy sinh viên theo mã
     */
    this.LaySinhVienTheoMa = function(maSV){
        var sinhvien = null;
        for (let i =0; i<this.dsSinhVien.length; i++){
            sinhvien = this.dsSinhVien[i];
            if (sinhvien.maSV === maSV){
                return sinhvien
            }
        }
        return sinhvien
    }
    /**
     * Cập nhật thông tin sinh viên
     */
    this.SuaTTSinhVien = function (sinhVien) {
        var index = this.LayViTri(sinhVien.maSV);
        if(index > -1){
            this.dsSinhVien[index].maSV = sinhVien.maSV;
            this.dsSinhVien[index].hoTen = sinhVien.hoTen;
            this.dsSinhVien[index].tuoi = sinhVien.tuoi;
            this.dsSinhVien[index].email = sinhVien.email;
            this.dsSinhVien[index].soDT = sinhVien.soDT;
            this.dsSinhVien[index].diemToan = sinhVien.diemToan;
            this.dsSinhVien[index].diemLy = sinhVien.diemLy;
            this.dsSinhVien[index].diemHoa = sinhVien.diemHoa
        }
    }
    /**
     * Mục đích: Sắp xếp danh sách sinh viên tăng dần, giảm dần
     */
    this.SapXepDSGiam = function () {
        this.dsSinhVien.sort(function (a, b) {
            if (a.maSV < b.maSV) {
                return 1;
            }
            if (a.maSV > b.maSV) {
                return -1;
            }
            return 0;
        });       
    }
    this.SapXepDSTang = function () {
        this.dsSinhVien.sort(function (a, b) {
            if (a.maSV > b.maSV) {
                return 1;
            }
            if (a.maSV < b.maSV) {
                return -1;
            }
            return 0;
        });      
    }
    /**
     * Mục đích: Tìm kiếm sinh viên theo Tên hoặc email
     * Tham số:
     *      - key: dữ liệu tìm kiếm
     */
    this.TimNhanVien = function(key){
        var mangKQ = [];
        var sinhvien;
        this.dsSinhVien.map(function(item){
            if ((item.hoTen.toLowerCase().indexOf(key.toLowerCase())> -1)|| (item.hoTen.toLowerCase().indexOf(key.toLowerCase())> -1) )    {
                sinhvien = item;
                mangKQ.push(sinhvien);
            }        
        })      
        return mangKQ;
    }
}