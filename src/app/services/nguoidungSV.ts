import { NguoiDung } from "../models/nguoidung";
import * as $ from "jquery";
export class NguoiDungService {

    DangKy(nguoiDung: NguoiDung) {
        return $.ajax({
            type: 'POST',
            url: 'http://sv2.myclass.vn/api/QuanLyNguoiDung/ThemNguoiDung',
            data: JSON.stringify(nguoiDung),
            contentType: 'application/json'
        })
    }

    DangNhap(taikhoan: string, matkhau: string) {
        return $.ajax({
            type: 'POST',
            url: `http://sv2.myclass.vn/api/QuanLyNguoiDung/DangNhap?taikhoan=${taikhoan}&matkhau=${matkhau}`,
            ContentType: 'application/json;charset=UTF-8'
        })
    }
}