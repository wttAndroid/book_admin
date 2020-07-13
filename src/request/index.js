import {
  request
} from './request';


export const getLogin = (params) => {
  return request.post(`/users/login`, params);
}

export const getRegist = (params) => {
  return request.post(`/users/register`, params)
}

export const getUserAll = () => {
  return request.get(`/users/getUserAll`)
}


export const updateUserstat = (params) => {
  return request.post(`/users/editUserStatus`, params)
}

export const findUsername = (params) => {
  return request.post(`/users/findUsername`, params)
}

export const deletUser = (params) => {
  return request.post(`/users/deleteUser`, params)
}

export const upUserinfo = (params) => {
  return request.post(`/users/editUserinfo`, params)
}
export const findUserInfo = (params) => {
  return request.post(`/users/getUserInfo`, params)
}

export const editUserpass = (params) => {
  return request.post(`/users/editUserpass`, params)
}


export const getBookAll = (params) => {
  return request.post(`/book/getBookAll`, params)
}

export const findBook = (params) => {
  return request.post(`/book/findBook`, params)
}
export const findBookAuthor = (params) => {
  return request.post(`/book/findBookAuthor`, params)
}

export const findBookIsbn = (params) => {
  return request.post(`/book/findBookIsbn`, params)
}


export const findBookId = (params) => {
  return request.post(`/book/findBookId`, params)
}

export const deleteBookId = (params) => {
  return request.post(`/book/deleteBookId`, params)
}


export const addBook = (params) => {
  return request.post(`/book/addBook`, params)
}
export const getBorrowAll = (params) => {
  return request.post(`/borrow/getBorrowList`, params)
}


export const findBorrowUser = (params) => {
  return request.post(`/borrow/findBorrowUser`, params)
}

export const addBookStatus = (params) => {
  return request.post(`/borrow/addBookStatus`, params)
}


export const addBorrow = (params) => {
  return request.post(`/borrow/addBorrow`, params)
}

export const userDataCount = () => {
  return request.get(`/users/userDataCount`)
}
