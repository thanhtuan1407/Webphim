import '../../assets/css/index.css';
import { PhimService } from '../services/phimsv';
import { Phim } from '../models/phim';
import { NguoiDung } from '../models/nguoidung';
import { NguoiDungService } from '../services/nguoidungSV';
import swal from 'sweetalert2';

// let:phạm vi sử dụng, hoạt động nhỏ(trong ngoặc nhọn) hơn var
// const:hằng số(kiểu dữ liệu ko đổi)

// khởi tạo instant từ lớp nguoidungSV
const NguoiDungSV = new NguoiDungService();
// khởi tạo instant từ lớp phimSV
const phimSV = new PhimService();

let DanhSachPhim = [];
let danhSachGioHang = [];

window.onload = function () {
    phimSV.layDanhSachPhim().done(function (res) {
        DanhSachPhim = res;
        renderMovieItem();
    }).fail(function (err) {
        console.log(err);
    })

    getUser();
}

let renderMovieItem = () => {
    let content = '';
    for (let movie of DanhSachPhim) {
        // Destructering: bốc tách dữ liệu
        let { MaPhim, TenPhim, Trailer, HinhAnh, MoTa, MaNhom, NgayKhoiChieu, DanhGia } = movie
        // onerror: nếu bị lỗi sẽ thay thế phim bị lỗi thành ảnh trong this.src
        content += `
        <div class="col-sm-6 col-md-3 text-center">
        <div class="movie__item">
            <img src="${HinhAnh}" onerror="this.onerror===null;this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAC1CAMAAABCrku3AAAAY1BMVEXt7e1XV1dSUlLx8fHz8/Pr6+t7e3u0tLRZWVlcXFy6urqBgYHCwsJUVFTKysr19fWRkZGlpaVOTk7S0tLl5eXe3t7ExMTMzMxmZmZzc3PY2NiMjIysrKxwcHCioqKXl5dGRkZOMxcSAAADq0lEQVR4nO3b23abMBAFUMFIgBFC5m7u/f+v7AjirDSNk7w0aTtnJyzHdh7MWaMbyEoBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8M+i7P8Bfyhg+Pv43js9IipD45zMnTEaRpFzOhqQ/FIKRhorkQ1ZYtYQ2pNPaORe/w8WZ/u5P+vUodS6LIxc94DIXXfx3f8qvF3IZi/yx7eKk5mI9jzcP+EFyLo/GG+6AyovQdhQ7+844TGLrJY5tOG8y3TnHo/vyIDwYklsvseVxmNp9nSf9HI3hthWqiHORWy8hl+1HVs/nRMWEXPKzaqTnom2cuRuFpVCIhfJbR6FgpOfiU1fXlT/bEOnp5tKjTUnPxVC/5eZcIXI0ll9tj/eF58JF4rk+qNnDHK/g2b9rjveF52L0uYxcf9hWT2sdZfF8DN/Sc1GajtlvFO/mGkdZFmWhIUnPRfli4VZ0i11UJ7HjWKJ40chFmbmu6MqDNbcgDoX7F5e0hFwaxz1KuBDDoWRcL1nmLv2Ri+h1gLaOu5aXV6QyzkkbLbtedFm7Onp5+bJ2fLRE5U1yLiq9vrLzMZehXkS3I9Ke/MubI8dT6ddfSHMwv17ADPeV+DU/3ITWi3NjXxT8+8r5Sl9dYpm58Nz2kj3Co7bU+yQxz1TCLO4tYTITCe1fngrjbVlYKMnMpXaP7zbyzFdsvYTG8qhcQrXIzEWnj4vl7kLydlZ9Ihd30Z/aVvVf+VS9iNvnQcd92A/rRVwr4tl+Xr+3Keggr38hQ031m+2Xv/mZlta7hGCIwrJR+6cNiER8eM2Laa/Oh2MVKcl5j55ebF+4b2JQJhz0tL2XpI1G4XSNDhsXtJrCxczj/J829ZLxejLeeK4acVvDSeWV7nZdjYltlSnSfiHqroaqlHSZjEk5jWvScEiSSobHGV25obPT2Plt13rflqija9K2dlU0p75pitF08vpdRcvVNjadiYbR+31L132w1hTb3tPambItbnuupXUwZPSS5uOcW69LS6aqlnQem7G11l7N2hV27JN+CnevZTGaOxKbmFvezJWnvVqWaVHrsA550u1bl9t+7Rovq9cNO6PU0FCb07TblMehpu8GHrfzsidfNG3FRTPNSdJ89yf9amELAx0BhW+NHJOZ542H6pjx8cHTPln1cv+6lXme1Jnjq1phUDZHQEbdN2gCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwJ/yEwrkMvYWYSZ1AAAAAElFTkSuQmCC'" style="height:350px" class="img-fluid w-100">
            <div class="movie__overlay"></div>
            <div class="movie__detail w-100 text-center text-white">
                <i class="fa fa-play d-block mx-auto mb-3 video-playvenobox  vbox-item" href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                <p>
                <a href="#" class="movie__icon"><i class="fa fa-file"></i></a>
                <a 
                data-maphim=${MaPhim}
                data-tenphim=${TenPhim}
                data-trailer=${Trailer}
                data-hinhanh=${HinhAnh}
                data-mota=${MoTa}
                data-manhom=${MaNhom}
                data-ngaychieu=${NgayKhoiChieu}
                data-danhgia=${DanhGia}
                class="movie__icon btnAddToCart"><i class="fa fa-cart-plus"></i>
                </a>
                </p>
                <span>Released: ${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018/12/10'}</span>
            </div>
        </div>
        <p class="movie__name text-center my-3">${TenPhim}</p>
        ${renderStar(parseInt(DanhGia))}
    </div>
        `
    }
    (<HTMLDivElement>document.getElementById('movieList')).innerHTML = content;
    themPhimVaoGioHang('btnAddToCart');
}

let renderStar = (num: number) => {
    let starts = ``;
    if (num) {
        for (let i = 0; i < num; i++) {
            starts += `
            <i class="fa fa-star movie__star"></i>
            `
        }
        // tạo ra ngôi sao rỗng
        for (let k = 5; k > num; k--) {
            starts += `
            <i class="fa fa-star-o movie__star"></i>
            `
        }
    } else {
        for (let i = 0; i < 5; i++) {
            starts += `
            <i class="fa fa-star movie__star"></i>
            `
        }
    }
    return starts;
}

let themPhimVaoGioHang = (btnClass) => {
    let btns: any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            let maphim = btn.getAttribute('data-maphim');
            let tenphim = btn.getAttribute('data-tenphim');
            let trailer = btn.getAttribute('data-trailer');
            let hinhanh = btn.getAttribute('data-hinhanh');
            let mota = btn.getAttribute('data-mota');
            let manhom = btn.getAttribute('data-manhom');
            let ngaykhoichieu = btn.getAttribute('data-ngaykhoichieu');
            let danhgia = btn.getAttribute('data-danhgia');

            let PhimItem = new Phim(maphim, tenphim, trailer, hinhanh, mota, manhom, ngaykhoichieu, danhgia)
            // kiểm tra sản phầm đã có trong giỏ hàng hay chưa
            let index = timPhimTheoMa(PhimItem.MaPhim);
            if (index === -1) {
                // spread operator
                danhSachGioHang = [...danhSachGioHang, PhimItem];
            }

            localStorage.setItem('cartList', JSON.stringify(danhSachGioHang));
            (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();
        })
    }
}

let timPhimTheoMa = (maPhim: String) => {
    for (let movie of danhSachGioHang) {
        if (movie.MaPhim === maPhim) {
            return 1;
        }
    }
    return -1;
}

let dangKy = () => {
    let taikhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let matkhau = (<HTMLInputElement>document.getElementById('MatKhau')).value;
    let hoten = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('Email')).value;
    let sodt = (<HTMLInputElement>document.getElementById('SoDT')).value;
    let manhom = 'GP01';
    let maloainguoidung = 'KhachHang';

    let NguoiDangKi = new NguoiDung(taikhoan, matkhau, email, sodt, manhom, maloainguoidung, hoten);

    NguoiDungSV.DangKy(NguoiDangKi).done(kq => {
        if (typeof (kq) !== 'string') {
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }).fail(err => {
        console.log(err);
    })

}

(<HTMLButtonElement>document.getElementById('btndangky')).addEventListener('click', dangKy);

let dangNhap = () => {
    let taikhoan = (<HTMLInputElement>document.getElementById('dangnhapTaiKhoan')).value;
    let matkhau = (<HTMLInputElement>document.getElementById('dangnhapMatKhau')).value;

    console.log(taikhoan);
    console.log(matkhau);
    NguoiDungSV.DangNhap(taikhoan, matkhau).done(kq => {
        console.log(kq);
        (<HTMLButtonElement>document.getElementById('CloseDangNhap')).click();
        getUser();
    }).fail(err => {
        console.log(err);
    })
}

(<HTMLButtonElement>document.getElementById('btndangnhap')).addEventListener('click', dangNhap);

let getUser=()=>{
    let localUser = JSON.parse(localStorage.getItem('userInfo'));
    if(localUser){
        (<HTMLSpanElement>document.getElementById('userInfo')).style.display='inline';
        (<HTMLSpanElement>document.getElementById('userName')).innerHTML=localUser.TaiKhoan;
    }
}