import * as type from '../../constants/actionType';
import api from "../../services/api";
import {API_URL} from '../../services/config'
import { notify } from '../../components/Notify/Notify';
import axios from 'axios'
const localUser = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {};


const getHeader =()=>{
    let token = localUser.accessToken
    let Authorization = {"Authorization":`Bearer  ${token}`}
    return Authorization;
}

const request =(endpoint,method="GET",data)=>{
    let Authorization=getHeader()
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: data,
        headers:Authorization
      }).then(res => console.log(res)).catch(er=>console.log(er));
} 


export const getCourseRequest = () => {
    return dispatch => {
        api.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
            .then(res => {
                console.log("res",res)
               return dispatch(getCourse(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getCourse = (coursesData) => {
    return {
        type: type.GET_COURSES,
        payload: coursesData
    }
}

export const addCourseRequest = course => {
    return dispatch => {
        console.log("course",course)
        console.log(localUser.accessToken)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.accessToken;
        api.post("QuanLyKhoaHoc/ThemKhoaHoc", course)
            .then(res => {
                dispatch(addCourse(course))
                console.log(res) 
            })
            .catch(err => { 
                console.log(err) 
            })
    }
}

export const addCourse = course => {
    return {
        type: type.ADD_COURSE,
        payload: course
    }
}

// export const deleteCourseRequest = maKhoaHoc => {
//     return dispatch => {
//         api.delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
//             .then(res => {
//                 dispatch(deleteCourse(maKhoaHoc))
//                 console.log(res) 
//             })
//             .catch(err => { 
//                 console.log(err) 
//             })
//     }
// }

export const deleteCourse = maKhoaHoc => {
    // return {
    //     type: type.DELETE_COURSE,
    //     payload: maKhoaHoc
    // }
   return dispatch =>{
    let endpoint =`QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`
    request(endpoint,"DELETE").then(res =>
         {
            console.log("res",res) 
            return dispatch({
                type: type.DELETE_COURSE,
                payload: maKhoaHoc
            })
        }).catch(er=>console.log(er))
}}

// export const editCourseRequest = course => {
//     return dispatch => {
//         api.delete("QuanLyKhoaHoc/CapNhatKhoaHoc", course)
//             .then(res => {
//                 dispatch(editCourse(course))
//                 console.log(res) 
//             })
//             .catch(err => { 
//                 console.log(err) 
//             })
//     }
// }

export const editCourse = course => {
    return {
        type: type.EDIT_COURSE,
        payload: course
    }
}

export const updateCourse = course => {
    console.log("course",course)
    let {maKhoaHoc,biDanh,tenKhoaHoc,moTa,luotXem,maNhom,ngayTao,soLuongHocVien,nguoiTao} = course 
    console.log("nguoiTao",nguoiTao)
    let data ={
        maKhoaHoc,biDanh,tenKhoaHoc,moTa,luotXem,maNhom,ngayTao,soLuongHocVien,nguoiTao,
        maDanhMucKhoahoc:course.danhMucKhoaHoc.maDanhMucKhoahoc
    }
    console.log(data)
    return dispatch => {

        request("QuanLyKhoaHoc/CapNhatKhoaHoc","PUT",course)
            .then(res => {
                dispatch(editCourse(data))
                console.log(res) 
            })
            .catch(err => { 
                console.log(err) 
            })
    }


    return {
        type: type.UPDATE_COURSE,
        payload: course
    }
}

export const getUsersRequest = () => {
    return dispatch => {
        api.get('QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01')
            .then(res => {
                dispatch(getUsers(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getUsers = (usersData) => {
    return {
        type: type.GET_USERS,
        payload: usersData
    }
}

export const addUserRequest = user => {
    console.log(user.accessToken);
    
    api.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.accessToken;
    api.post('QuanLyNguoiDung/ThemNguoiDung', user)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    })
}

export const signupRequest = (user, callback) => {
    api.post('/QuanLyNguoiDung/DangKy', user)
        .then(res => {
            callback();
            notify('success', 'Sign Up Successful');
        })
        .catch(err => {
            notify('error', 'Something went wrong!');
        })
}

export const signinRequest = (user, callback) => {
    api.post('QuanLyNguoiDung/DangNhap', user)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            callback(res.data);
            notify('success', 'Sign In Successful');
        })
        .catch(err => {
            notify('error', 'Something went wrong!');
        })
}

export const setCurrentUser = user => {
    return {
        type: type.SET__CURRENT__USER,
        payload: user
    }
}

export const getUserDetail = (taiKhoan, callback) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.accessToken;
    api.post('QuanLyNguoiDung/ThongTinTaiKhoan', {taiKhoan})
    .then(res => {
        callback(res.data)
    })
    .catch(err => {
        console.log(err);
    })
}

export const displayCourses = displayType => {
    return {
        type: type.DISPLAY_COURSES,
        payload: displayType
    }
}

export const searchCourses = keyword => {
    return {
        type: type.SEARCH_COURSES,
        payload: keyword
    }
}

export const addToCart = course => {
    return {
        type: type.ADD_TO_CART,
        payload: course
    }
}

export const deleteCart = (maKhoaHoc) => {
    return {
        type: type.DELETE_CART,
        payload: maKhoaHoc
    }
}