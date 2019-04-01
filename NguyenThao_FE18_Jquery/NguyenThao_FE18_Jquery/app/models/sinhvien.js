function SinhVien(maSV, hoTen, tuoi, email, soDT, diemToan, diemLy, diemHoa) {
    this.maSV = maSV;
    this.hoTen = hoTen;
    this.tuoi = tuoi;
    this.email = email;
    this.soDT = soDT;
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
}
SinhVien.prototype.TinhDiemTrungBinh = function () {
    var diemTB = ((parseFloat(this.diemToan) + parseFloat(this.diemLy) +
    parseFloat(this.diemHoa)) / 3).toFixed(2);
    return diemTB;
}