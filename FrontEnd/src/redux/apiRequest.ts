import { message } from 'antd';
import axios from "axios";
import { loginStart, loginFail, loginSuccess, createStart, createSuccess, createFail,getLoginStart, getLoginSuccess, getLoginFail, logoutSuccess } from "./slice/authSlice";
import {getAllStart, getAllSuccess, getAllFail} from "./slice/userSlice";
import {getAllProductStart, getAllProductSuccess, getAllProductFail, fetchBooks} from "./slice/productSlice";

// authSlice
export const loginUser = (newForm: any, navigate:any) => async (dispatch: any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/login/",
            newForm,
            { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err:any) {
        dispatch(loginFail());
        if (err.response && err.response.data) {
            alert(err.response.data.message);
        } else {
            console.log('Không thể kết nối severs.');
        }
    }
};

export const getLogin = () => async (dispatch: any) => {
    dispatch(getLoginStart());
    try {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/auth/getAccount",
            { withCredentials: true }
        );
        dispatch(getLoginSuccess(res.data));
    } catch (err:any) {
        dispatch(getLoginFail());
    }
};

export const RegisterUser = (newForm: any, navigate:any) => async (dispatch: any) => {
    dispatch(createStart());
    try {
        await axios.post(
            "http://127.0.0.1:8000/api/auth/register/",
            newForm,
            { withCredentials: true }
        );
        dispatch(createSuccess());
        navigate('/login');
        alert('Check mail để kích hoạt tài khoản!');
    } catch (err:any) {
        dispatch(createFail());
        if (err.response && err.response.data) {
            alert(err.response.data.message.email);
        } else {
            console.log('Không thể kết nối severs.');
        }   
    }
};

export const createUser = (name:any, email:any, password:any) => {
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/auth/register/`,
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
};

export const updateUser = (id:any, name:any, role:any) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ name, role })); 
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/user/edit/${id}`,
        data: formData,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });
};

export const deleteUser = (id:any) => {
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/user/delete/${id}`,
        withCredentials: true,
    });
}

export const restore = (id:any) => {
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/user/restore/${id}`,
        withCredentials: true,
    });
}

export const loginGoogle = (newForm: any, navigate:any) => async (dispatch: any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/google",
            newForm,
            { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        navigate('/')
    } catch (err:any) {
        dispatch(loginFail());
        if (err.response && err.response.data) {
            console.log(err.response.data.error);
        } else {
            console.log('Không thể kết nối severs.');
        }   
    }
};

export const logOutUser = (navigate: any) => async (dispatch: any) => {
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/auth/logout/", null, {
            withCredentials: true
        });
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (err) {
        console.log(err);
    }
};

//userSlice
export const getAll = () => async (dispatch: any) => {
    dispatch(getAllStart());
    try {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/user",
            { withCredentials: true }
        );
        dispatch(getAllSuccess(res.data));
    } catch (err) {
        dispatch(getAllFail());
    }
}
//ProductSlice
export const getAllProduct = () => async (dispatch: any) => {
    dispatch(getAllProductStart());
    try {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/product/getAll/",
            { withCredentials: true }
        );
        dispatch(getAllProductSuccess(res.data));
    } catch (err) {
        dispatch(getAllProductFail());
    }
}

export const productAdd = (formData:any) => {
    
    return axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/product/create",
        data: formData,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });
};

export const deleteProduct = (id:any) => {
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/product/delete/${id}`,
        withCredentials: true,
    });
}

export const restoreProduct = (id:any) => {
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/product/restore/${id}`,
        withCredentials: true,
    });
}

export const productEdit = (formData:any, id:any) => {
    
    return axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/product/edit/${id}`,
        data: formData,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });
};

//Category

export const getAllCategory = () => {
    return axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/category/",
    });
};

export const fetchBooksWithPaginateHomePage = (softs:any) => async (dispatch: any) => {
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/product/${softs}`,
        );
        dispatch(fetchBooks(res.data));
    } catch (err) {
        console.log(err);
    }
}
