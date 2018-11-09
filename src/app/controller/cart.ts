import '../../assets/css/cart.css';
import { Phim } from '../models/phim';





let danhSachGioHang:Phim[] =[];

// lấy dữ liệu từ local
window.onload = () =>{
    if(localStorage.getItem('cartList')){
        danhSachGioHang=JSON.parse(localStorage.getItem('cartList'));
    }
    taoBang();
}


let taoBang = () => {
    let content = '';
    for(let i in danhSachGioHang){
        // Destructering: bốc tách dữ liệu
        let {TenPhim,HinhAnh,DanhGia,NgayKhoiChieu,MaPhim} = danhSachGioHang[i];
        // onerror: nếu bị lỗi sẽ thay thế phim bị lỗi thành ảnh trong this.src
        content +=`
        <tr>
            <td>${parseInt(i)+1}</td>
            <td>${TenPhim}</td>
            <td><img src=${HinhAnh} style="height:150px; width:100px"/></td>
            <td>${DanhGia}</td>
            <td>${NgayKhoiChieu}</td>
            <td>
            <button 
            data-maphim="${MaPhim}"
            class="btn btn-danger btnXoa">Xóa</button>
            </td>
        </tr>
        `
    }
    (<HTMLDivElement>document.getElementById('DanhSachGioHang')).innerHTML=content;
    xoaPhim('btnXoa');
}

let xoaPhim =(btnClass:string)=>{
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns){
        btn.addEventListener('click',()=>{
            let MaPhim = btn.getAttribute('data-maphim');
            let index = timPhimTheoMa(danhSachGioHang,MaPhim);
            if (index !== -1){
                danhSachGioHang.splice(index,1);
            }
            localStorage.setItem('cartList',JSON.stringify(danhSachGioHang));;
            taoBang();
        })
    }
}

let timPhimTheoMa = (movieArr:Phim[],maPhim:String) =>{
    for(let i in movieArr){
        if(movieArr[i].MaPhim === maPhim){
            return parseInt(i);
        }
    }
    return -1;
}