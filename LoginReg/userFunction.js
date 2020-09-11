import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:8000/api/userReg', {
     newUser
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('http://localhost:8000/api/userLog', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      return err
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:5000/users/userRead', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateProfile = user => {
  return axios
    .put('http://localhost:8000/api/userUp', {
      
      first_name: user.first_name,
      last_name: user.last_name,
      DOB:user.DOB,
      phone:user.phone,
      location:user.location,
      gender:user.gender,
      password:user.password,
    })
    .then(data =>{
      return data.data
    })
    .catch(err =>{
      return err
    })
}