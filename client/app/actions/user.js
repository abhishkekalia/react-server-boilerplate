import axios from 'axios';
import {API_URL} from '../config'
import {
  SAVE_USER, LOG_OUT,USER_LIST,STATUS_LIST, DELETE_LIST,EDIT_USER,NEW_USER,FILTER_DATA,ADMIN_DATA
} from './types';


//LOGIN REDUCER
export const signIn = (user, callback) => async dispatch => {
 try {
  let response = await axios.post(API_URL+'/adminLogin', user);
  let {data}=response;
  if(data.status == 1){
    await localStorage.setItem("access_token", data.access_token);
    console.log(JSON.stringify(localStorage.getItem("access_token")));
    let payload = {
        access_token : data.access_token,
        _id : data.data._id,
        firstname:data.data.firstname,
        lastname:data.data.lastname,
         profilePic : data.data.photo
    }
    dispatch({ type: SAVE_USER, payload });
    console.log(JSON.stringify(data.access_token));
  }
  callback(response);
  } catch (error) {
    throw error;
  }
};

//LOGOUT REDUCER
export const logOut = () => async dispatch => {
  try {
    await localStorage.setItem("access_token", null);
    dispatch({ type: LOG_OUT, payload: {undefined} });
  } catch (error) {
    throw error;
  }
};


//USERLIST REDUCER
export const userlist =(body,access_token,callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/userListing',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(body),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
      let payload = {
          data : data.data
         
      }
      dispatch({ type: USER_LIST, payload });
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

//user toogle
  export const statuslist =(udata,access_token,callback) => async dispatch =>{
    console.log("109"+access_token);
    console.log("110"+ JSON.stringify(udata));
    try {
      let response = await axios({
        method: 'post',
        url:API_URL+'/changeStatus',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': access_token
          },
        data: JSON.stringify(udata),
        
      });
      let {data}=response;
  
      if(data.status == 1){
        await localStorage.setItem("user", JSON.stringify(data));
          }
      callback(response);
      } catch (error) {
        throw error;
      }
    };

  //DELETE REDUCER
export const deleteUserlist =(udata,access_token,callback) => async dispatch =>{
  try {
    console.log(udata)
    let response = await axios({
      method: 'post',
      url:API_URL+'/deleteUsers',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;
    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

   //EDIT REDUCER
export const editUser =(udata,access_token) => async dispatch =>{
      dispatch({ type: EDIT_USER, payload: udata });   
 }
  ;

//SUBMIT USER DATA
export const submitUserlist =(udata,access_token,callback) => async dispatch =>{
  console.log("109"+access_token);
  console.log("110"+ JSON.stringify(udata));
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/editUserListing',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
        }
    callback(response);
    } catch (error) {
      throw error;
    }
  };



  //SUBMIT NEW USER
export const submitnewUser =(udata,token,callback) => async dispatch =>{
  console.log("110"+ JSON.stringify(udata));
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/register',
       headers: {
          'Content-Type': 'application/json',
        },
      data: JSON.stringify(udata),
    });
    let {data}=response;
    console.log(data)
    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data)); 
       console.log(response)
     
        }
        callback(response);
   
    } catch (error) {
      throw error;
    }
  };


    //SUBMIT CSV Upload
export const csvUpload =(csv,access_token,callback) => async dispatch =>{
 try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/uploadFile',
       headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': access_token
        },
      data:csv
      
    });
    let {data}=response;
    console.log(data)
    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data)); 
       console.log(response)
     
        }
        callback(response);
   
    } catch (error) {
      throw error;
    }
  };


  //Download CSV
  export const DownloadCsv =(access_token,callback) => async dispatch =>{

    try {
      let response = await axios({
        method: 'get',
        url:API_URL+'/downloadFile',
         headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': access_token
          }
      });
      let {data}=response;
      console.log(data)
      if(data.status == 1){
        await localStorage.setItem("user", JSON.stringify(data)); 
         console.log(response)
          }
          callback(response);
     
      } catch (error) {
        throw error;
      }
    };

    /// Search Data
    export const searchdata =(filter,access_token, callback) => async dispatch =>{
      try {
        let response = await axios({
          method: 'post',
          url:API_URL+'/search',
           headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token
            },
            data:JSON.stringify(filter)
        });
        let {data}=response;
        console.log(data)
        if(data.status == 1){
          await localStorage.setItem("user", JSON.stringify(data)); 
      
          let payload = {
            data : data
           
        }
        dispatch({ type: FILTER_DATA, payload });
           console.log(response)
            }
            callback(response);
       
        } catch (error) {
          throw error;
        }
      };
  

         /// Admin Profile
    export const adminProfile =(udata,access_token, callback) => async dispatch =>{
      try {
        let response = await axios({
          method: 'post',
          url:API_URL+'/adminProfile',
           headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token
            },
            data:udata
        });
        let {data}=response;
        console.log(data)
        if(data.status == 1){
          await localStorage.setItem("user", JSON.stringify(data)); 
          let payload = {
            data : data.data
           }
        dispatch({ type: ADMIN_DATA, payload });
           console.log(response)
            }
            callback(response);
       
        } catch (error) {
          throw error;
        }
      };

              /// EditAdmin Profile
    export const editAdminProfile =(udata,access_token, callback) => async dispatch =>{
      try {
        let response = await axios({
          method: 'post',
          url:API_URL+'/editAdminProfile',
           headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token
            },
            data:udata
        });
        let {data}=response;
        console.log(data)
        if(data.status == 1){
          await localStorage.setItem("user", JSON.stringify(data)); 
          let payload = {
            data : data.data
           }
        dispatch({ type: ADMIN_DATA, payload });
           console.log(response)
            }
            callback(response);
       
        } catch (error) {
          throw error;
        }
      };
  
      /// Admin Password
      export const adminPassword =(udata,access_token, callback) => async dispatch =>{
        try {
          let response = await axios({
            method: 'post',
            url:API_URL+'/adminChangePassword',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
              data:udata
          });
          let {data}=response;
          console.log(data)
          if(data.status == 1){
        console.log(response)
              }
              callback(response);
         
          } catch (error) {
            throw error;
          }
        };

//CMS list
export const cmslist =(body,access_token,callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/cmsList',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(body),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
      let payload = {
          data : data
         
      }
      dispatch({ type: USER_LIST, payload });
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

    //DELETE Cms row
export const deleteCmslist =(udata,access_token,callback) => async dispatch =>{
  try {
    console.log(udata)
    let response = await axios({
      method: 'post',
      url:API_URL+'/cmsDelete',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;
    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

     //EDIT REDUCER
export const editCms =(udata,access_token) => async dispatch =>{
  dispatch({ type: EDIT_USER, payload: udata });   
}
;


//SUBMIT USER DATA
export const submitCsmlist =(udata,access_token,callback) => async dispatch =>{
  console.log("109"+access_token);
  console.log("110"+ JSON.stringify(udata));
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/cmsUpdate',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
        }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

      /// Search Cms
      export const searchCmsdata =(filter,access_token, callback) => async dispatch =>{
        try {
          let response = await axios({
            method: 'post',
            url:API_URL+'/searchCms',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
              data:JSON.stringify(filter)
          });
          let {data}=response;
          console.log(data)
          if(data.status == 1){
            await localStorage.setItem("user", JSON.stringify(data)); 
        
            let payload = {
              data : data
             
          }
          dispatch({ type: FILTER_DATA, payload });
             console.log(response)
              }
              callback(response);
         
          } catch (error) {
            throw error;
          }
        };

        //Email list
export const emaillist =(body,access_token,callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/listEmail',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(body),
      
    });
    let {data}=response;
    console.log("emial data",data)

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
      let payload = {
          data : data
         
      }
      dispatch({ type: USER_LIST, payload });
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

      /// Search Email
      export const searchEmaildata =(filter,access_token, callback) => async dispatch =>{
        try {
          let response = await axios({
            method: 'post',
            url:API_URL+'/searchEmail',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
              data:JSON.stringify(filter)
          });
          let {data}=response;
          console.log(data)
          if(data.status == 1){
            await localStorage.setItem("user", JSON.stringify(data)); 
        
            let payload = {
              data : data
             
          }
          dispatch({ type: FILTER_DATA, payload });
             console.log(response)
              }
              callback(response);
         
          } catch (error) {
            throw error;
          }
        };
    
//SUBMIT Email data
export const submitEmaillist =(udata,access_token,callback) => async dispatch =>{
  console.log("109"+access_token);
  console.log("110"+ JSON.stringify(udata));
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/emailUpdate',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
        }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

  //Blog list
export const bloglist =(body,access_token,callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/listBlog',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(body),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
      let payload = {
          data : data
         
      }
      dispatch({ type: USER_LIST, payload });
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

      /// Search Blog
export const searcBlogldata =(filter,access_token, callback) => async dispatch =>{
        try {
          let response = await axios({
            method: 'post',
            url:API_URL+'/searchBlog',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
              data:JSON.stringify(filter)
          });
          let {data}=response;
          console.log(data)
          if(data.status == 1){
            await localStorage.setItem("user", JSON.stringify(data)); 
        
            let payload = {
              data : data
             
          }
          dispatch({ type: FILTER_DATA, payload });
             console.log(response)
              }
              callback(response);
         
          } catch (error) {
            throw error;
          }
        };
    
  //SUBMIT Email data
export const submitBloglist =(udata,access_token,callback) => async dispatch =>{
  console.log("109"+access_token);
  console.log("110"+ JSON.stringify(udata));
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/emailUpdate',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(udata),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
        }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

    //Blog list
export const seolist =(body,access_token,callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/listMeta',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      data: JSON.stringify(body),
      
    });
    let {data}=response;

    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data));
      let payload = {
          data : data
         
      }
      dispatch({ type: USER_LIST, payload });
    }
    callback(response);
    } catch (error) {
      throw error;
    }
  };

    //SUBMIT Edit Meta data
    export const submitSeolist =(udata,access_token,callback) => async dispatch =>{
      console.log("109"+access_token);
      console.log("110"+ JSON.stringify(udata));
      try {
        let response = await axios({
          method: 'post',
          url:API_URL+'/emailUpdate',
           headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token
            },
          data: JSON.stringify(udata),
          
        });
        let {data}=response;
    
        if(data.status == 1){
          await localStorage.setItem("user", JSON.stringify(data));
            }
        callback(response);
        } catch (error) {
          throw error;
        }
      };

            /// Search Blog
export const searchSeodata =(filter,access_token, callback) => async dispatch =>{
  try {
    let response = await axios({
      method: 'post',
      url:API_URL+'/searchMeta',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
        data:JSON.stringify(filter)
    });
    let {data}=response;
    console.log(data)
    if(data.status == 1){
      await localStorage.setItem("user", JSON.stringify(data)); 
  
      let payload = {
        data : data
       
    }
    dispatch({ type: FILTER_DATA, payload });
       console.log(response)
        }
        callback(response);
   
    } catch (error) {
      throw error;
    }
  };

    


  

  

  

